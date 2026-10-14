# Writing code problems

Problems 1–50 in each of `content/coding/{python,sql}.json` are hand-written. Everything after
that is generated from the spec files in `specs/` by the builders here, which run each reference
solution in the same runtime the site uses and write the expected values, the example and the
notes for you. Never edit generated problems in the JSON by hand: change the spec and rebuild.

```bash
python scripts/problems/build_python.py check specs/python_maths_a.py   # quick check, no pandas needed
python scripts/problems/build_python.py show specs/python_maths_a.py    # check and print the problems
node scripts/problems/gen-python.ts check scripts/problems/specs/python_pandas.py   # DataFrame problems (real Pyodide + pandas)
node scripts/problems/build_sql.ts show scripts/problems/specs/sql_basics.ts
node scripts/problems/gen-python.ts write    # rebuild content/coding/python.json
node scripts/problems/build_sql.ts write     # rebuild content/coding/sql.json
```

Problems are numbered in file order (spec files sorted by name, then list order), so append new
problems to the end of the last file to keep existing numbers (and saved progress) stable.

## House rules

- **Original wording.** Write every statement, title, example and dataset yourself. Problems can
  practise the same ideas as well-known interview sets, but never copy their text, titles or
  sample data, and never mention other sites.
- **Plain, friendly English.** British spelling. Short sentences. Say exactly what to return,
  including types, rounding, column names and ordering. Use `code` for names and values.
- Use an insurance, pensions or finance setting where it fits naturally (policies, claims,
  premiums, agents, members, payments); plain maths is fine for maths problems.
- Give edge cases in the tests (zero, empty, ties, nulls, one row), not just the happy path.
- No em dashes in statements.

## Python specs (`specs/python_*.py`)

```python
PROBLEMS = [
    dict(
        title="Palindromic Policy Number",
        difficulty="easy",                       # easy | medium | hard
        topics=["Maths", "Digits"],              # first topic is the area, then a sub-topic
        statement="Return `True` if the integer `x` reads the same from left to right as from right to left...",
        signature="def is_palindrome(x: int) -> bool",
        solution="def is_palindrome(x):\n    return x >= 0 and str(x) == str(x)[::-1]\n",
        tests=[[121], [-121], [10], [0], [1234321]],   # each test is the list of arguments
        notes=["Don't convert the number to a string."],  # optional
    ),
]
```

- At least 4 tests for plain functions; the first one becomes the example, so make it a good one.
- Arguments and results must be JSON values: numbers, strings, booleans, `None`, lists, dicts.
  Tuples come back as lists.
- Floats are compared within 0.5% (or half a unit in the last decimal), everything else exactly.
  If the answer is a list whose order isn't defined, say "in ascending order" and sort it.

### DataFrame (pandas) problems

Use `df(columns, rows, dates=[...])` (provided by the builder) for each DataFrame argument;
`dates` lists columns to convert with `pd.to_datetime`.

```python
dict(
    title="Large Open Claims",
    difficulty="easy",
    topics=["Pandas", "Filtering"],
    statement="Return the claims in `claims` that are still open and larger than 10 000, with columns `claim_id` and `amount`.",
    signature="def large_open_claims(claims: pd.DataFrame) -> pd.DataFrame",
    solution="import pandas as pd\n\ndef large_open_claims(claims):\n    ...\n",
    tests=[
        [df(["claim_id", "amount", "status", "reported"], [[1, 12000, "open", "2024-01-03"], ...], dates=["reported"])],
        [df([...], [...])],          # a second dataset with edge cases
    ],
)
```

- The function returns a DataFrame. Its index is ignored and row order never matters; the column
  names and their order do, so the statement must name the output columns in order.
- Dates in results come back as `'YYYY-MM-DD'` strings; missing values as `None`.
- 2–3 datasets per problem.

## SQL specs (`specs/sql_*.ts`)

```ts
import type { SqlSpec } from '../build_sql.ts'

export const problems: SqlSpec[] = [
  {
    title: 'Second-Largest Claim',
    difficulty: 'medium',
    topics: ['Subqueries'],
    statement: 'Return the second-largest distinct `amount` in `claims` as `second_largest`, or `NULL` if there isn’t one.',
    tables: { claims: [{ claim_id: 1, amount: 100 }, { claim_id: 2, amount: 300 }] },
    solution: 'SELECT ...;',
    notes: ['Optional extra notes.'],
  },
]
```

- The schema, example result and standard notes are generated. The database is SQLite 3.49
  (window functions, `RIGHT`/`FULL JOIN`, `strftime`, `julianday`; no `REGEXP`).
- Only one sample database per problem, so make the sample data rich enough that a wrong query
  gives a different answer (include ties, nulls, unmatched rows, and rows that should be excluded).
- If the outer query has `ORDER BY`, row order is graded and the statement must say how to order
  the rows. Otherwise any order is accepted.
- Ask for rounding explicitly (`ROUND(x, 2)`) whenever a result is a ratio or average.
- Dates are `'YYYY-MM-DD'` text.
