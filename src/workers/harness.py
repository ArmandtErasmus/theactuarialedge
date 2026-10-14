# Test harness for Python problems. The browser worker runs it in Pyodide, and
# scripts/problems/build_python.py runs the same file to compute expected values,
# so a user's answer and the reference answer are always normalised the same way.
#
# Each test runs in a fresh call and returns JSON, so results cross the worker
# boundary as plain data: tuples -> lists, numpy -> float/list, and pandas
# DataFrames -> {"__df__": {"columns": [...], "rows": [[...], ...]}} with rows in
# a canonical order (row order never matters for DataFrame answers).
import json, traceback, math


def __ae_cell(v):
    try:
        import numpy as _np
        if isinstance(v, _np.generic):
            v = v.item()
    except ImportError:
        pass
    if v is None or type(v).__name__ in ("NAType", "NaTType"):
        return None
    if isinstance(v, float):
        return None if math.isnan(v) else v if math.isfinite(v) else str(v)
    if hasattr(v, "hour") and hasattr(v, "strftime"):
        return v.strftime("%Y-%m-%d") if (v.hour, v.minute, v.second) == (0, 0, 0) else v.strftime("%Y-%m-%d %H:%M:%S")
    if hasattr(v, "isoformat") and hasattr(v, "year"):
        return v.isoformat()
    return v


def __ae_row_key(row):
    return [(0, 0) if x is None else (1, x) if isinstance(x, (int, float)) else (2, str(x)) for x in row]


def __ae_frame(v):
    if type(v).__name__ == "Series":
        v = v.to_frame()
    rows = [[__ae_cell(x) for x in r] for r in v.itertuples(index=False, name=None)]
    rows.sort(key=__ae_row_key)
    return {"__df__": {"columns": [str(c) for c in v.columns], "rows": rows}}


def __ae_plain(v):
    if type(v).__module__.startswith("pandas") and type(v).__name__ in ("DataFrame", "Series"):
        return __ae_frame(v)
    try:
        import numpy as _np
        if isinstance(v, _np.generic):
            return __ae_plain(v.item())
        if isinstance(v, _np.ndarray):
            return __ae_plain(v.tolist())
    except ImportError:
        pass
    if isinstance(v, (tuple, list)):
        return [__ae_plain(x) for x in v]
    if isinstance(v, dict):
        return {str(k): __ae_plain(x) for k, x in v.items()}
    if isinstance(v, float) and not math.isfinite(v):
        return str(v)
    return v


def __ae_arg(a):
    if isinstance(a, dict) and "__df__" in a:
        import pandas as pd
        spec = a["__df__"]
        df = pd.DataFrame(spec["rows"], columns=spec["columns"])
        for c in spec.get("dates", []):
            df[c] = pd.to_datetime(df[c])
        return df
    return a


def __ae_run(source, entry, tests_json):
    tests = json.loads(tests_json)
    results = []
    ns = {}
    try:
        exec(compile(source, "solution.py", "exec"), ns)
    except Exception:
        return json.dumps({"compileError": traceback.format_exc(limit=-3)})
    fn = ns.get(entry)
    if not callable(fn):
        return json.dumps({"compileError": f"Define a function named {entry}(...)"})
    for args in tests:
        try:
            results.append({"ok": True, "value": __ae_plain(fn(*[__ae_arg(a) for a in args]))})
        except Exception as e:
            tb = traceback.format_exc(limit=-2)
            results.append({"ok": False, "error": f"{type(e).__name__}: {e}", "trace": tb})
    return json.dumps({"results": results})
