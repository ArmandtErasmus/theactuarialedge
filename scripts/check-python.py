"""Runs every Python reference solution against its tests with the site's grading rule.

Solutions run through the same harness as the browser (src/workers/harness.py), so values
are normalised exactly as they are for users. DataFrame problems need pandas; without it
they are skipped here (node scripts/problems/gen-python.ts check covers them in Pyodide).

Run: python scripts/check-python.py   (exits 1 on failures)
"""
import json
import math
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
problems = json.loads((ROOT / "content/coding/python.json").read_text(encoding="utf8"))
H = {}
exec((ROOT / "src/workers/harness.py").read_text(encoding="utf8"), H)

try:
    import pandas  # noqa: F401
    HAVE_PANDAS = True
except ImportError:
    HAVE_PANDAS = False


def close(actual, expected):
    """Mirror of src/lib/grade.ts valuesMatch: numbers within 0.5% / last decimal, lists elementwise."""
    if isinstance(expected, bool) or isinstance(actual, bool):
        return actual == expected
    if isinstance(expected, (int, float)) and isinstance(actual, (int, float)):
        exp_s = repr(expected)
        decimals = len(exp_s.split(".")[1]) if "." in exp_s and "e" not in exp_s else 0
        tol = max(abs(expected) * 0.005, 0.5 * 10 ** -decimals if decimals else 1e-9)
        return math.isfinite(actual) and abs(actual - expected) <= tol + 1e-12
    if isinstance(expected, (list, tuple)) and isinstance(actual, (list, tuple)):
        return len(actual) == len(expected) and all(close(a, e) for a, e in zip(actual, expected))
    if isinstance(expected, dict) and isinstance(actual, dict):
        return expected.keys() == actual.keys() and all(close(actual[k], expected[k]) for k in expected)
    return actual == expected


failures = skipped = 0
for p in problems:
    if "__df__" in json.dumps(p["tests"]) and not HAVE_PANDAS:
        skipped += 1
        continue
    res = json.loads(H["__ae_run"](p["solution"], p["entry"], json.dumps([t["args"] for t in p["tests"]])))
    if "compileError" in res:
        print(f"{p['id']} {p['title']}: solution does not load: {res['compileError']}")
        failures += 1
        continue
    for i, (t, r) in enumerate(zip(p["tests"], res["results"])):
        if not r["ok"]:
            print(f"{p['id']} test {i}: raised {r['error']}")
            failures += 1
        elif not close(r["value"], t["expected"]):
            print(f"{p['id']} test {i}: expected {t['expected']!r} got {r['value']!r}")
            failures += 1

note = f", {skipped} DataFrame problems skipped (pandas not installed)" if skipped else ""
print(f"{len(problems)} problems, {sum(len(p['tests']) for p in problems)} tests, {failures} failures{note}")
sys.exit(1 if failures else 0)
