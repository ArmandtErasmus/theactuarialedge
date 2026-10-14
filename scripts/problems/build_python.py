"""Builds Python code problems from the spec files in scripts/problems/specs/.

A spec gives the statement, signature, reference solution and test inputs; this
script runs the solution through the site's own test harness (src/workers/harness.py)
to get every expected value, then writes the full problem (description, starter
code, tests) into content/coding/python.json. The first 50 problems in that file
are hand-written and are kept as they are.

  python scripts/problems/build_python.py check [spec.py ...]   validate specs (all by default)
  python scripts/problems/build_python.py show [spec.py ...]    validate and print the generated problems
  python scripts/problems/build_python.py write                  rebuild content/coding/python.json

Problems whose inputs are DataFrames need pandas. Where it isn't installed, `check`
skips them and `write` refuses: run `node scripts/problems/gen-python.ts`, which runs
this script inside the site's Pyodide with pandas loaded.
"""
import json
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent.parent
SPECS = HERE / "specs"
OUT = ROOT / "content/coding/python.json"
KEEP = 50  # hand-written problems at the top of python.json

H = {}
exec((ROOT / "src/workers/harness.py").read_text(encoding="utf8"), H)

try:
    import pandas  # noqa: F401
    HAVE_PANDAS = True
except ImportError:
    HAVE_PANDAS = False

DIFFICULTIES = {"easy", "medium", "hard"}


def df(columns, rows, dates=()):
    """DataFrame input for a test: rows are lists in column order."""
    spec = {"columns": list(columns), "rows": [list(r) for r in rows]}
    if dates:
        spec["dates"] = list(dates)
    return {"__df__": spec}


def is_frame(v):
    return isinstance(v, dict) and "__df__" in v


def uses_frames(p):
    return any(is_frame(a) for t in p["tests"] for a in t)


# ---------- display helpers ----------
def num(x):
    if isinstance(x, bool) or not isinstance(x, float):
        return str(x)
    if x == int(x) and abs(x) < 1e15:
        return f"{x:.1f}"
    if abs(x) < 1e-4:
        return f"{x:.6g}"
    return f"{x:.4f}".rstrip("0").rstrip(".")


def pyrepr(v):
    if isinstance(v, float):
        return num(v)
    if isinstance(v, list):
        return "[" + ", ".join(pyrepr(x) for x in v) + "]"
    if isinstance(v, dict):
        return "{" + ", ".join(f"{pyrepr(k)}: {pyrepr(x)}" for k, x in v.items()) + "}"
    return repr(v)


def text_table(columns, rows, null="None"):
    cells = [[null if x is None else num(x) if isinstance(x, float) else str(x) for x in r] for r in rows]
    widths = [max([len(c)] + [len(r[i]) for r in cells]) for i, c in enumerate(columns)]
    line = lambda vals: " | ".join(v.ljust(w) for v, w in zip(vals, widths)).rstrip()
    sep = "+".join("-" * (w + 2) for w in widths)[1:-1]
    return "\n".join([line(columns), sep] + [line(r) for r in cells])


def round_floats(v):
    if isinstance(v, float):
        return round(v, 6)
    if isinstance(v, list):
        return [round_floats(x) for x in v]
    if isinstance(v, dict):
        return {k: round_floats(x) for k, x in v.items()}
    return v


def has_fraction(v):
    if isinstance(v, float):
        return v != int(v)
    if isinstance(v, list):
        return any(has_fraction(x) for x in v)
    if isinstance(v, dict):
        return any(has_fraction(x) for x in v.values())
    return False


# ---------- build ----------
SIG = re.compile(r"^def\s+([A-Za-z_]\w*)\s*\((.*)\)\s*(->\s*.+)?$")


def params_of(signature):
    m = SIG.match(signature.strip())
    if not m:
        raise ValueError(f"signature must look like 'def name(a: int, b: int) -> int', got {signature!r}")
    names = [re.split(r"[:=]", p)[0].strip() for p in m.group(2).split(",") if p.strip()]
    return m.group(1), names


def build(spec, n):
    errors = []
    for key in ("title", "difficulty", "topics", "statement", "signature", "solution", "tests"):
        if key not in spec:
            errors.append(f"missing {key}")
    if errors:
        raise ValueError("; ".join(errors))
    if spec["difficulty"] not in DIFFICULTIES:
        raise ValueError(f"difficulty must be one of {sorted(DIFFICULTIES)}")
    if not spec["topics"]:
        raise ValueError("give at least one topic")
    if "leetcode" in (spec["statement"] + spec["title"]).lower():
        raise ValueError("don't mention LeetCode")
    entry, params = params_of(spec["signature"])
    tests = spec["tests"]
    frames = uses_frames(spec)
    if len(tests) < (1 if frames else 3):
        raise ValueError(f"needs at least {1 if frames else 3} tests")
    if len({json.dumps(t) for t in tests}) != len(tests):
        raise ValueError("duplicate tests")
    for i, t in enumerate(tests):
        if not isinstance(t, list) or len(t) != len(params):
            raise ValueError(f"test {i} must be a list of {len(params)} argument(s) for ({', '.join(params)})")

    res = json.loads(H["__ae_run"](spec["solution"], entry, json.dumps(tests)))
    if "compileError" in res:
        raise ValueError("solution does not load:\n" + res["compileError"])
    expected = []
    for i, r in enumerate(res["results"]):
        if not r["ok"]:
            raise ValueError(f"solution fails test {i} ({pyrepr(tests[i])[:80]}): {r['error']}")
        expected.append(round_floats(r["value"]))
    if frames and not all(is_frame(e) for e in expected):
        raise ValueError("DataFrame problems must return a DataFrame")

    # description
    parts = [spec["statement"].strip(), "### Function signature", f"```python\n{spec['signature'].strip()}\n```", "### Example"]
    if frames:
        for name, a in zip(params, tests[0]):
            if is_frame(a):
                parts.append(f"Input `{name}`:\n\n```text\n{text_table(a['__df__']['columns'], a['__df__']['rows'])}\n```")
            else:
                parts.append(f"Input `{name}` = `{pyrepr(a)}`")
        out = expected[0]["__df__"]
        parts.append(f"Output:\n\n```text\n{text_table(out['columns'], out['rows'])}\n```")
    else:
        call = f"{entry}({', '.join(pyrepr(a) for a in tests[0])})"
        parts.append(f"```python\n>>> {call}\n{pyrepr(expected[0])}\n```")
    notes = list(spec.get("notes", []))
    if frames:
        notes.append("Return a DataFrame with exactly the columns shown, in that order. Row order doesn't matter.")
    elif any(has_fraction(e) for e in expected):
        notes.append("Don't round your result: example outputs are rounded for display, and answers are accepted within 0.5%.")
    if notes:
        parts += ["### Notes", "\n".join(f"- {x}" for x in notes)]

    if frames:
        starter = f"import pandas as pd\n\n\n{spec['signature'].strip()}:\n    # Write your code here\n    pass\n"
    else:
        starter = f"def {entry}({', '.join(params)}):\n    # Write your code here\n    pass\n"
    solution = spec["solution"].strip("\n") + "\n"
    return {
        "id": f"python-{n}",
        "lang": "python",
        "n": n,
        "title": spec["title"],
        "difficulty": spec["difficulty"],
        "topics": list(spec["topics"]),
        "description": "\n\n".join(parts),
        "starterCode": starter,
        "solution": solution,
        "entry": entry,
        "tests": [{"args": t, "expected": e} for t, e in zip(tests, expected)],
    }


def load_spec(path):
    ns = {"df": df}
    exec(compile(path.read_text(encoding="utf8"), str(path), "exec"), ns)
    probs = ns.get("PROBLEMS")
    if not isinstance(probs, list):
        raise SystemExit(f"{path.name}: define PROBLEMS = [dict(...), ...]")
    return probs


def spec_files():
    return sorted(SPECS.glob("python_*.py"))


def main(argv):
    mode = argv[1] if len(argv) > 1 else "check"
    files = [pathlib.Path(a) for a in argv[2:]] or spec_files()
    existing = json.loads(OUT.read_text(encoding="utf8"))[:KEEP]
    titles = {p["title"].lower() for p in existing}
    built, failures, skipped = [], 0, 0
    n = KEEP
    for f in (spec_files() if mode == "write" else files):
        for i, spec in enumerate(load_spec(f)):
            n += 1
            label = f"{f.name}[{i}] {spec.get('title', '?')!r}"
            if spec.get("title", "").lower() in titles:
                print(f"FAIL {label}: duplicate title")
                failures += 1
                continue
            titles.add(spec.get("title", "").lower())
            if uses_frames(spec) and not HAVE_PANDAS:
                if mode == "write":
                    raise SystemExit("pandas is not installed here: run `node scripts/problems/gen-python.ts` instead")
                skipped += 1
                continue
            try:
                built.append(build(spec, n))
            except Exception as e:  # noqa: BLE001
                failures += 1
                print(f"FAIL {label}: {e}")
    if mode == "show":
        for p in built:
            print(f"\n===== {p['title']} ({p['difficulty']}, {', '.join(p['topics'])})\n{p['description']}\n--- starter\n{p['starterCode']}--- tests")
            for t in p["tests"]:
                print(f"  {json.dumps(t['args'])[:160]} -> {json.dumps(t['expected'])[:160]}")
    print(f"{len(built)} built, {failures} failed" + (f", {skipped} DataFrame problems skipped (no pandas)" if skipped else ""))
    if mode == "write":
        if failures:
            raise SystemExit("not written: fix the failures first")
        for p in existing:
            p.setdefault("topics", ["Finance"])
        OUT.write_text(json.dumps(existing + built, indent=2, ensure_ascii=False) + "\n", encoding="utf8")
        print(f"wrote {OUT.relative_to(ROOT)}: {len(existing) + len(built)} problems")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
