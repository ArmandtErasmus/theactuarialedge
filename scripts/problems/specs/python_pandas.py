# DataFrame (pandas) problems. Validate with:
#   node scripts/problems/gen-python.ts check scripts/problems/specs/python_pandas.py

PROBLEMS = [
    # ------------------------------------------------------------------ easy
    dict(
        title="Portfolio Size",
        difficulty="easy",
        topics=["Pandas", "Creating & selecting"],
        statement=(
            "Before running any analysis on a policy extract you want to know how big it is. "
            "The `policies` table can have any number of rows and columns.\n\n"
            "Return a one-row DataFrame with two columns:\n\n"
            "- `rows`: the number of rows in `policies`\n"
            "- `columns`: the number of columns in `policies`"
        ),
        signature="def portfolio_size(policies: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def portfolio_size(policies):\n"
            "    n_rows, n_cols = policies.shape\n"
            "    return pd.DataFrame({'rows': [n_rows], 'columns': [n_cols]})\n"
        ),
        tests=[
            [df(["policy_id", "holder", "product", "annual_premium"], [
                [101, "Thandi Mokoena", "Life", 4800],
                [102, "Johan Smit", "Funeral", 1320],
                [103, "Aisha Patel", "Disability", 3150],
                [104, "Pieter Nel", "Life", 6025],
                [105, "Lerato Dube", "Funeral", 990],
            ])],
            [df(["policy_id", "status"], [[201, "active"]])],
            [df(["policy_id", "holder", "product"], [])],
        ],
    ),
    dict(
        title="First Three Claims",
        difficulty="easy",
        topics=["Pandas", "Creating & selecting"],
        statement=(
            "The claims team wants a quick peek at the top of the `claims` table.\n\n"
            "Return the first three rows of `claims` as they appear in the table, with all of its columns "
            "(`claim_id`, `policy_id`, `reported`, `amount`). If the table has fewer than three rows, return all of them."
        ),
        signature="def first_three_claims(claims: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def first_three_claims(claims):\n"
            "    return claims.head(3)\n"
        ),
        tests=[
            [df(["claim_id", "policy_id", "reported", "amount"], [
                [5001, "P-210", "2024-02-03", 18500],
                [5002, "P-118", "2024-02-05", 4200],
                [5003, "P-210", "2024-02-11", 7600],
                [5004, "P-305", "2024-02-12", 31000],
                [5005, "P-122", "2024-02-20", 950],
                [5006, "P-118", "2024-02-28", 12750],
            ], dates=["reported"])],
            [df(["claim_id", "policy_id", "reported", "amount"], [
                [6101, "P-400", "2023-11-30", 2300],
                [6102, "P-401", "2023-12-01", 15400],
            ], dates=["reported"])],
        ],
    ),
    dict(
        title="Look Up a Policyholder",
        difficulty="easy",
        topics=["Pandas", "Creating & selecting"],
        statement=(
            "A call centre agent types a policy number into a search box and wants to see who owns it.\n\n"
            "Given the `holders` table and a string `policy_id`, return the rows of `holders` with that `policy_id`, "
            "keeping only two columns:\n\n"
            "- `name`: the policyholder's name\n"
            "- `age`: the policyholder's age\n\n"
            "If no row has that `policy_id`, return an empty DataFrame with the same two columns."
        ),
        signature="def look_up_holder(holders: pd.DataFrame, policy_id: str) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def look_up_holder(holders, policy_id):\n"
            "    return holders.loc[holders['policy_id'] == policy_id, ['name', 'age']]\n"
        ),
        tests=[
            [df(["policy_id", "name", "age", "province"], [
                ["POL-0041", "Sipho Khumalo", 38, "Gauteng"],
                ["POL-0042", "Megan Botha", 29, "Western Cape"],
                ["POL-0043", "Rashid Essop", 51, "KwaZulu-Natal"],
                ["POL-0044", "Nandi Mthembu", 44, "Gauteng"],
            ]), "POL-0042"],
            [df(["policy_id", "name", "age", "province"], [
                ["POL-0041", "Sipho Khumalo", 38, "Gauteng"],
                ["POL-0042", "Megan Botha", 29, "Western Cape"],
            ]), "POL-9999"],
            [df(["policy_id", "name", "age", "province"], [
                ["POL-0107", "Grace Naidoo", 63, "Free State"],
            ]), "POL-0107"],
        ],
    ),
    dict(
        title="Remove Duplicate Policies",
        difficulty="easy",
        topics=["Pandas", "Cleaning"],
        statement=(
            "A policy extract was loaded twice for some policies, so a few `policy_id` values appear more than once, "
            "sometimes with a different premium on the later row.\n\n"
            "Keep only the first row for each `policy_id` (the one that appears highest in the table) and drop the rest. "
            "Return all the columns: `policy_id`, `holder` and `annual_premium`."
        ),
        signature="def remove_duplicate_policies(policies: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def remove_duplicate_policies(policies):\n"
            "    return policies.drop_duplicates(subset='policy_id', keep='first')\n"
        ),
        tests=[
            [df(["policy_id", "holder", "annual_premium"], [
                [3101, "Bongani Zwane", 5400],
                [3102, "Carla Fourie", 2880],
                [3101, "Bongani Zwane", 5650],
                [3103, "Imran Moosa", 7120],
                [3102, "Carla Fourie", 2880],
                [3104, "Zanele Ngcobo", 1990],
            ])],
            [df(["policy_id", "holder", "annual_premium"], [
                [4001, "Andre Venter", 3600],
                [4002, "Palesa Molefe", 4100],
            ])],
            [df(["policy_id", "holder", "annual_premium"], [
                [4500, "Yusuf Adams", 2500],
                [4500, "Yusuf Adams", 2400],
                [4500, "Yusuf Adams", 2600],
            ])],
        ],
    ),
    dict(
        title="Drop Unassessed Claims",
        difficulty="easy",
        topics=["Pandas", "Cleaning"],
        statement=(
            "Some claims in `claims` have not been assessed yet, so their `amount` is missing.\n\n"
            "Return only the rows where `amount` is present, with all the columns: `claim_id`, `policy_id` and `amount`. "
            "A missing value in any other column is fine and should not remove the row."
        ),
        signature="def assessed_claims(claims: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def assessed_claims(claims):\n"
            "    return claims.dropna(subset=['amount'])\n"
        ),
        tests=[
            [df(["claim_id", "policy_id", "amount"], [
                [701, "P-11", 12500.0],
                [702, "P-14", None],
                [703, None, 3400.0],
                [704, "P-11", 860.5],
                [705, "P-20", None],
            ])],
            [df(["claim_id", "policy_id", "amount"], [
                [801, "P-31", None],
                [802, "P-32", None],
            ])],
            [df(["claim_id", "policy_id", "amount"], [
                [901, "P-40", 2200.0],
                [902, "P-41", 15000.0],
                [903, "P-40", 640.0],
            ])],
        ],
    ),
    dict(
        title="Fill Missing Excess",
        difficulty="easy",
        topics=["Pandas", "Cleaning"],
        statement=(
            "In the motor book, the `excess` column of `policies` is missing for policies that have no excess at all.\n\n"
            "Replace every missing `excess` with `0` and return all the columns: `policy_id`, `vehicle` and `excess`. "
            "Leave the excess values that are already there unchanged."
        ),
        signature="def fill_missing_excess(policies: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def fill_missing_excess(policies):\n"
            "    out = policies.copy()\n"
            "    out['excess'] = out['excess'].fillna(0)\n"
            "    return out\n"
        ),
        tests=[
            [df(["policy_id", "vehicle", "excess"], [
                [6001, "Toyota Corolla", 2500],
                [6002, "VW Polo", None],
                [6003, "Ford Ranger", 5000],
                [6004, "Suzuki Swift", None],
                [6005, "BMW X3", 7500],
            ])],
            [df(["policy_id", "vehicle", "excess"], [
                [6101, "Kia Picanto", None],
                [6102, "Honda Jazz", None],
            ])],
            [df(["policy_id", "vehicle", "excess"], [
                [6201, "Nissan NP200", 3000],
                [6202, "Mazda CX-5", 0],
            ])],
        ],
    ),
    dict(
        title="Rename Bordereau Columns",
        difficulty="easy",
        topics=["Pandas", "Cleaning"],
        statement=(
            "A broker sends a monthly bordereau with cryptic column headings: `PolNo`, `Insured`, `GWP` and `Comm`.\n\n"
            "Return the same data with the columns renamed so they match the house standard, keeping the same order:\n\n"
            "- `PolNo` becomes `policy_id`\n"
            "- `Insured` becomes `insured_name`\n"
            "- `GWP` becomes `gross_premium`\n"
            "- `Comm` becomes `commission`"
        ),
        signature="def rename_bordereau(bordereau: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def rename_bordereau(bordereau):\n"
            "    return bordereau.rename(columns={\n"
            "        'PolNo': 'policy_id',\n"
            "        'Insured': 'insured_name',\n"
            "        'GWP': 'gross_premium',\n"
            "        'Comm': 'commission',\n"
            "    })\n"
        ),
        tests=[
            [df(["PolNo", "Insured", "GWP", "Comm"], [
                ["BR-1001", "Kagiso Motors", 48200, 6266],
                ["BR-1002", "Coastal Bakery", 15600, 2028],
                ["BR-1003", "Lindiwe Shabalala", 7300, 949],
            ])],
            [df(["PolNo", "Insured", "GWP", "Comm"], [
                ["BR-2001", "Ridge Logistics", 120500, 15665],
            ])],
        ],
    ),
    dict(
        title="Referrals for Underwriting",
        difficulty="easy",
        topics=["Pandas", "Filtering"],
        statement=(
            "New life applications in `applications` are sent to an underwriter when the applicant is a smoker "
            "and at least one of these is true:\n\n"
            "- the applicant's `age` is 55 or more\n"
            "- the `sum_assured` is more than 2 000 000\n\n"
            "`smoker` is a boolean column. Return the applications that must be referred, with all the columns: "
            "`app_id`, `age`, `smoker` and `sum_assured`."
        ),
        signature="def underwriting_referrals(applications: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def underwriting_referrals(applications):\n"
            "    a = applications\n"
            "    mask = a['smoker'] & ((a['age'] >= 55) | (a['sum_assured'] > 2_000_000))\n"
            "    return a[mask]\n"
        ),
        tests=[
            [df(["app_id", "age", "smoker", "sum_assured"], [
                ["A-01", 58, True, 1_000_000],
                ["A-02", 42, True, 2_000_000],
                ["A-03", 61, False, 3_500_000],
                ["A-04", 35, True, 2_500_000],
                ["A-05", 55, True, 750_000],
                ["A-06", 47, False, 1_200_000],
            ])],
            [df(["app_id", "age", "smoker", "sum_assured"], [
                ["A-11", 30, False, 5_000_000],
                ["A-12", 54, True, 1_999_999],
            ])],
            [df(["app_id", "age", "smoker", "sum_assured"], [
                ["A-21", 66, True, 4_000_000],
                ["A-22", 25, True, 2_000_001],
                ["A-23", 70, False, 500_000],
            ])],
        ],
    ),
    dict(
        title="Funeral Policies in Selected Provinces",
        difficulty="easy",
        topics=["Pandas", "Filtering"],
        statement=(
            "A regional manager wants the funeral policies sold in some of the provinces they look after. "
            "Funeral products are the ones whose `product_code` starts with `FUN` (exactly, in capitals).\n\n"
            "Given `policies` and a list of province names `provinces`, return the policies whose `product_code` starts "
            "with `FUN` and whose `province` is in `provinces`, with columns `policy_id` and `province`."
        ),
        signature="def funeral_in_provinces(policies: pd.DataFrame, provinces: list) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def funeral_in_provinces(policies, provinces):\n"
            "    mask = policies['product_code'].str.startswith('FUN') & policies['province'].isin(provinces)\n"
            "    return policies.loc[mask, ['policy_id', 'province']]\n"
        ),
        tests=[
            [df(["policy_id", "product_code", "province"], [
                [8001, "FUN-BASIC", "Gauteng"],
                [8002, "LIFE-STD", "Gauteng"],
                [8003, "FUN-PLUS", "Limpopo"],
                [8004, "FUN-PLUS", "Western Cape"],
                [8005, "LIFE-FUN", "Western Cape"],
                [8006, "FUN-FAMILY", "Eastern Cape"],
                [8007, "DIS-INC", "Gauteng"],
            ]), ["Gauteng", "Western Cape", "Eastern Cape"]],
            [df(["policy_id", "product_code", "province"], [
                [8101, "FUN-BASIC", "Mpumalanga"],
                [8102, "FUN-PLUS", "North West"],
            ]), ["Gauteng"]],
            [df(["policy_id", "product_code", "province"], [
                [8201, "FUN-BASIC", "Northern Cape"],
                [8202, "XFUN-LITE", "Northern Cape"],
                [8203, "FUN-FAMILY", "Free State"],
            ]), ["Northern Cape", "Free State"]],
        ],
    ),
    dict(
        title="Monthly Premium Instalments",
        difficulty="easy",
        topics=["Pandas", "New columns"],
        statement=(
            "Most policyholders pay monthly rather than once a year. For each policy in `policies`, work out the monthly "
            "instalment as the annual premium divided by 12.\n\n"
            "Return columns:\n\n"
            "- `policy_id`\n"
            "- `annual_premium`: unchanged\n"
            "- `monthly_premium`: `annual_premium / 12`, rounded to 2 decimal places"
        ),
        signature="def monthly_instalments(policies: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def monthly_instalments(policies):\n"
            "    out = policies[['policy_id', 'annual_premium']].copy()\n"
            "    out['monthly_premium'] = (out['annual_premium'] / 12).round(2)\n"
            "    return out\n"
        ),
        tests=[
            [df(["policy_id", "holder", "annual_premium"], [
                [9001, "Ayanda Cele", 6000],
                [9002, "Ruan Steyn", 4150],
                [9003, "Fatima Jacobs", 1999],
                [9004, "Tumelo Sithole", 12345],
            ])],
            [df(["policy_id", "holder", "annual_premium"], [
                [9101, "Michelle Kruger", 0],
                [9102, "David Mabena", 100],
            ])],
        ],
    ),
    dict(
        title="Claims Count by Status",
        difficulty="easy",
        topics=["Pandas", "Grouping"],
        statement=(
            "Each claim in `claims` has a `status` such as `open`, `settled` or `declined`.\n\n"
            "Return one row per status that appears in the table, with columns:\n\n"
            "- `status`\n"
            "- `claims`: the number of claims with that status"
        ),
        signature="def claims_by_status(claims: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def claims_by_status(claims):\n"
            "    return claims.groupby('status').size().reset_index(name='claims')\n"
        ),
        tests=[
            [df(["claim_id", "status", "amount"], [
                [1201, "open", 5400],
                [1202, "settled", 1200],
                [1203, "open", 22000],
                [1204, "declined", 3100],
                [1205, "settled", 760],
                [1206, "open", 9800],
            ])],
            [df(["claim_id", "status", "amount"], [
                [1301, "settled", 450],
            ])],
            [df(["claim_id", "status", "amount"], [
                [1401, "reopened", 3000],
                [1402, "declined", 1800],
                [1403, "declined", 2600],
            ])],
        ],
    ),
    # ------------------------------------------------------------------ medium
    dict(
        title="Tidy Agent Records",
        difficulty="medium",
        topics=["Pandas", "Cleaning"],
        statement=(
            "The `agents` table was typed in by hand. Agent codes and names have stray spaces at either end and "
            "inconsistent capitals, and each agent's monthly sales `target` is stored as text such as `R120,000`.\n\n"
            "Return a cleaned table with columns:\n\n"
            "- `agent_code`: the code with spaces removed from both ends, in upper case\n"
            "- `name`: the name with spaces removed from both ends, with the first letter of each word in capitals and "
            "the rest in lower case\n"
            "- `monthly_target`: the target as a whole number (integer), without the `R` and the commas"
        ),
        signature="def tidy_agents(agents: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def tidy_agents(agents):\n"
            "    target = agents['target'].str.replace('R', '', regex=False).str.replace(',', '', regex=False)\n"
            "    return pd.DataFrame({\n"
            "        'agent_code': agents['agent_code'].str.strip().str.upper(),\n"
            "        'name': agents['name'].str.strip().str.title(),\n"
            "        'monthly_target': target.astype(int),\n"
            "    })\n"
        ),
        tests=[
            [df(["agent_code", "name", "target"], [
                [" ag104 ", "lindiwe zulu", "R120,000"],
                ["AG105", "  MARK JACOBS ", "R95,500"],
                ["ag106  ", "Nomsa dlamini", "R1,250,000"],
                ["Ag107", "kevin Pillay ", "R80,000"],
            ])],
            [df(["agent_code", "name", "target"], [
                ["AG201", "Busi Ndlovu", "R750"],
                ["  ag202", "  thabo mokoena", "R0"],
            ])],
        ],
    ),
    dict(
        title="Claims Reported in a Window",
        difficulty="medium",
        topics=["Pandas", "Filtering"],
        statement=(
            "An auditor wants every claim reported during a certain period. You are given `claims` and two dates "
            "`start` and `end` as `'YYYY-MM-DD'` strings.\n\n"
            "Return the claims whose `reported` date is on or after `start` and on or before `end` (both ends included), "
            "with columns `claim_id` and `reported`."
        ),
        signature="def claims_in_window(claims: pd.DataFrame, start: str, end: str) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def claims_in_window(claims, start, end):\n"
            "    mask = claims['reported'].between(pd.to_datetime(start), pd.to_datetime(end))\n"
            "    return claims.loc[mask, ['claim_id', 'reported']]\n"
        ),
        tests=[
            [df(["claim_id", "reported", "amount"], [
                [2101, "2024-03-28", 4500],
                [2102, "2024-04-01", 12000],
                [2103, "2024-04-17", 830],
                [2104, "2024-04-30", 26500],
                [2105, "2024-05-01", 3900],
                [2106, "2024-06-12", 7100],
            ], dates=["reported"]), "2024-04-01", "2024-04-30"],
            [df(["claim_id", "reported", "amount"], [
                [2201, "2023-12-30", 1500],
                [2202, "2024-01-03", 640],
            ], dates=["reported"]), "2023-12-31", "2024-01-02"],
            [df(["claim_id", "reported", "amount"], [
                [2301, "2024-07-15", 2000],
                [2302, "2024-07-15", 5000],
                [2303, "2024-07-16", 800],
            ], dates=["reported"]), "2024-07-15", "2024-07-15"],
        ],
    ),
    dict(
        title="Agents Without Sales",
        difficulty="medium",
        topics=["Pandas", "Filtering"],
        statement=(
            "Sales management wants to follow up with agents who have not sold anything yet.\n\n"
            "`agents` lists every agent. `policies` lists policies sold, with the `agent_id` of the agent who sold each one "
            "(missing for policies bought directly online). Return the agents whose `agent_id` does not appear in "
            "`policies`, with columns `agent_id` and `name`."
        ),
        signature="def agents_without_sales(agents: pd.DataFrame, policies: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def agents_without_sales(agents, policies):\n"
            "    sold = agents['agent_id'].isin(policies['agent_id'])\n"
            "    return agents.loc[~sold, ['agent_id', 'name']]\n"
        ),
        tests=[
            [df(["agent_id", "name"], [
                [11, "Refilwe Maseko"],
                [12, "Jacques du Toit"],
                [13, "Priya Govender"],
                [14, "Lwazi Hadebe"],
            ]), df(["policy_id", "agent_id", "premium"], [
                [501, 12, 3400],
                [502, None, 2100],
                [503, 12, 5600],
                [504, 14, 1800],
            ])],
            [df(["agent_id", "name"], [
                [21, "Sarah Wilson"],
                [22, "Mandla Shezi"],
            ]), df(["policy_id", "agent_id", "premium"], [
                [601, 21, 4000],
                [602, 22, 2500],
            ])],
            [df(["agent_id", "name"], [
                [31, "Hannes Coetzee"],
                [32, "Zodwa Mahlangu"],
            ]), df(["policy_id", "agent_id", "premium"], [
                [701, None, 1500],
            ])],
        ],
    ),
    dict(
        title="Premium Bands",
        difficulty="medium",
        topics=["Pandas", "New columns"],
        statement=(
            "For a portfolio report, each policy in `policies` is put in a premium band based on its `annual_premium`:\n\n"
            "- `low`: below 1 000\n"
            "- `medium`: 1 000 or more, but below 5 000\n"
            "- `high`: 5 000 or more\n\n"
            "Return columns `policy_id`, `annual_premium` (unchanged) and `band` (one of the three labels above)."
        ),
        signature="def premium_bands(policies: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n"
            "import numpy as np\n\n"
            "def premium_bands(policies):\n"
            "    out = policies[['policy_id', 'annual_premium']].copy()\n"
            "    p = out['annual_premium']\n"
            "    out['band'] = np.select([p < 1000, p < 5000], ['low', 'medium'], default='high')\n"
            "    return out\n"
        ),
        tests=[
            [df(["policy_id", "annual_premium"], [
                [1501, 850],
                [1502, 1000],
                [1503, 4999],
                [1504, 5000],
                [1505, 12400],
                [1506, 2300],
            ])],
            [df(["policy_id", "annual_premium"], [
                [1601, 0],
                [1602, 999.99],
            ])],
        ],
    ),
    dict(
        title="Policy Reference Codes",
        difficulty="medium",
        topics=["Pandas", "New columns"],
        statement=(
            "Letters to policyholders quote a reference code built from three parts joined by hyphens:\n\n"
            "1. the `product` name in upper case\n"
            "2. the `policy_id` written with leading zeros so that it is 6 digits long\n"
            "3. the year of `start_date`\n\n"
            "For example, a `life` policy with `policy_id` 42 that started on 2023-05-01 has reference `LIFE-000042-2023`.\n\n"
            "Return columns `policy_id` and `reference`."
        ),
        signature="def policy_references(policies: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def policy_references(policies):\n"
            "    ref = (policies['product'].str.upper() + '-'\n"
            "           + policies['policy_id'].astype(str).str.zfill(6) + '-'\n"
            "           + policies['start_date'].dt.year.astype(str))\n"
            "    return pd.DataFrame({'policy_id': policies['policy_id'], 'reference': ref})\n"
        ),
        tests=[
            [df(["policy_id", "product", "start_date"], [
                [42, "life", "2023-05-01"],
                [1375, "Funeral", "2021-11-15"],
                [250001, "disability", "2024-01-01"],
                [7, "FUNERAL", "2019-12-31"],
            ], dates=["start_date"])],
            [df(["policy_id", "product", "start_date"], [
                [880, "motor", "2022-02-28"],
            ], dates=["start_date"])],
        ],
    ),
    dict(
        title="Claim Reporting Delay",
        difficulty="medium",
        topics=["Pandas", "New columns"],
        statement=(
            "Reserving actuaries care about how long it takes for a loss to be reported. Each claim in `claims` has a "
            "`loss_date` (when the event happened) and a `reported_date` (when the insurer heard about it).\n\n"
            "Return columns:\n\n"
            "- `claim_id`\n"
            "- `loss_year`: the year of `loss_date`\n"
            "- `loss_month`: the month number of `loss_date` (1 to 12)\n"
            "- `delay_days`: the number of whole days from `loss_date` to `reported_date` (0 if reported on the same day)"
        ),
        signature="def reporting_delay(claims: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def reporting_delay(claims):\n"
            "    return pd.DataFrame({\n"
            "        'claim_id': claims['claim_id'],\n"
            "        'loss_year': claims['loss_date'].dt.year,\n"
            "        'loss_month': claims['loss_date'].dt.month,\n"
            "        'delay_days': (claims['reported_date'] - claims['loss_date']).dt.days,\n"
            "    })\n"
        ),
        tests=[
            [df(["claim_id", "loss_date", "reported_date"], [
                [3301, "2023-12-28", "2024-01-04"],
                [3302, "2024-02-10", "2024-02-10"],
                [3303, "2024-02-27", "2024-03-02"],
                [3304, "2024-05-15", "2024-08-20"],
            ], dates=["loss_date", "reported_date"])],
            [df(["claim_id", "loss_date", "reported_date"], [
                [3401, "2022-06-30", "2023-06-30"],
                [3402, "2024-10-01", "2024-10-02"],
            ], dates=["loss_date", "reported_date"])],
        ],
    ),
    dict(
        title="Nth Largest Claim",
        difficulty="medium",
        topics=["Pandas", "Sorting & ranking"],
        statement=(
            "Given `claims` and a positive integer `n`, find the `n`-th largest distinct claim `amount`. Equal amounts "
            "count only once, so if the two biggest claims are both 50 000, the second largest is the next amount below "
            "50 000.\n\n"
            "Return a one-row DataFrame with a single column `nth_largest` holding that amount. If there are fewer than "
            "`n` distinct amounts, the value should be missing (`None`)."
        ),
        signature="def nth_largest_claim(claims: pd.DataFrame, n: int) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def nth_largest_claim(claims, n):\n"
            "    amounts = claims['amount'].drop_duplicates().sort_values(ascending=False)\n"
            "    value = amounts.iloc[n - 1] if len(amounts) >= n else None\n"
            "    return pd.DataFrame({'nth_largest': [value]})\n"
        ),
        tests=[
            [df(["claim_id", "amount"], [
                [401, 50000],
                [402, 12500],
                [403, 50000],
                [404, 38000],
                [405, 9900],
            ]), 2],
            [df(["claim_id", "amount"], [
                [501, 7000],
                [502, 7000],
                [503, 3000],
            ]), 3],
            [df(["claim_id", "amount"], [
                [601, 2500],
                [602, 18000],
                [603, 6400],
                [604, 18000],
            ]), 1],
        ],
    ),
    dict(
        title="Broker Commission Ranking",
        difficulty="medium",
        topics=["Pandas", "Sorting & ranking"],
        statement=(
            "Rank the brokers in `brokers` by the `commission` they earned this year.\n\n"
            "Return columns:\n\n"
            "- `broker_id`\n"
            "- `commission`: unchanged\n"
            "- `rank`: an integer, where 1 is the highest commission. Brokers with equal commission share a rank, and "
            "the next lower commission gets the next whole number, with no gaps (so 1, 2, 2, 3, not 1, 2, 2, 4)."
        ),
        signature="def rank_brokers(brokers: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def rank_brokers(brokers):\n"
            "    out = brokers[['broker_id', 'commission']].copy()\n"
            "    out['rank'] = out['commission'].rank(method='dense', ascending=False).astype(int)\n"
            "    return out\n"
        ),
        tests=[
            [df(["broker_id", "name", "commission"], [
                ["B01", "Summit Brokers", 184000],
                ["B02", "Karoo Cover", 96500],
                ["B03", "Harbour Risk", 184000],
                ["B04", "Blue Crane Advisers", 41200],
                ["B05", "Jacaranda Insure", 96500],
                ["B06", "Mopane Partners", 120300],
            ])],
            [df(["broker_id", "name", "commission"], [
                ["B11", "Fynbos Financial", 30000],
            ])],
            [df(["broker_id", "name", "commission"], [
                ["B21", "Baobab Brokers", 5000],
                ["B22", "Protea Risk", 5000],
                ["B23", "Ironwood Advisers", 5000],
            ])],
        ],
    ),
    dict(
        title="Latest Claim per Policy",
        difficulty="medium",
        topics=["Pandas", "Sorting & ranking"],
        statement=(
            "For each policy in `claims`, find its most recent claim: the one with the latest `reported` date. If a policy "
            "has more than one claim on its latest date, choose the one with the larger `claim_id`.\n\n"
            "Return one row per policy with columns `policy_id`, `claim_id` and `reported`."
        ),
        signature="def latest_claims(claims: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def latest_claims(claims):\n"
            "    ordered = claims.sort_values(['policy_id', 'reported', 'claim_id'])\n"
            "    last = ordered.drop_duplicates(subset='policy_id', keep='last')\n"
            "    return last[['policy_id', 'claim_id', 'reported']]\n"
        ),
        tests=[
            [df(["claim_id", "policy_id", "reported", "amount"], [
                [9101, "P-1", "2024-01-15", 3000],
                [9102, "P-2", "2024-02-02", 1200],
                [9103, "P-1", "2024-03-08", 8700],
                [9104, "P-3", "2023-11-20", 450],
                [9105, "P-2", "2024-02-02", 6100],
                [9099, "P-1", "2024-02-28", 2200],
            ], dates=["reported"])],
            [df(["claim_id", "policy_id", "reported", "amount"], [
                [9201, "P-7", "2024-05-05", 900],
            ], dates=["reported"])],
            [df(["claim_id", "policy_id", "reported", "amount"], [
                [9310, "P-8", "2024-06-01", 400],
                [9302, "P-8", "2024-06-01", 1300],
                [9305, "P-9", "2024-04-10", 2750],
            ], dates=["reported"])],
        ],
    ),
    dict(
        title="Product Premium Summary",
        difficulty="medium",
        topics=["Pandas", "Grouping"],
        statement=(
            "Summarise the `policies` table by `product`, but only for products with at least 2 policies. Products with "
            "a single policy are left out of the summary.\n\n"
            "Return one row per product with columns:\n\n"
            "- `product`\n"
            "- `policies`: the number of policies\n"
            "- `total_premium`: the sum of `annual_premium`\n"
            "- `average_premium`: the mean `annual_premium`, rounded to 2 decimal places"
        ),
        signature="def product_summary(policies: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def product_summary(policies):\n"
            "    g = policies.groupby('product').agg(\n"
            "        policies=('policy_id', 'count'),\n"
            "        total_premium=('annual_premium', 'sum'),\n"
            "        average_premium=('annual_premium', 'mean'),\n"
            "    ).reset_index()\n"
            "    g = g[g['policies'] >= 2].copy()\n"
            "    g['average_premium'] = g['average_premium'].round(2)\n"
            "    return g\n"
        ),
        tests=[
            [df(["policy_id", "product", "annual_premium"], [
                [1, "Life", 4800],
                [2, "Funeral", 1320],
                [3, "Life", 6100],
                [4, "Disability", 3150],
                [5, "Funeral", 990],
                [6, "Life", 5025],
                [7, "Funeral", 1100],
            ])],
            [df(["policy_id", "product", "annual_premium"], [
                [11, "Motor", 9600],
                [12, "Home", 3100],
                [13, "Travel", 450],
            ])],
            [df(["policy_id", "product", "annual_premium"], [
                [21, "Gap Cover", 1000],
                [22, "Gap Cover", 1001],
                [23, "Gap Cover", 1001],
            ])],
        ],
    ),
    dict(
        title="Share of Claims by Region",
        difficulty="medium",
        topics=["Pandas", "Grouping"],
        statement=(
            "Work out how much of the total claims bill comes from each region in `claims`.\n\n"
            "Return one row per region with columns:\n\n"
            "- `region`\n"
            "- `total_claims`: the sum of `amount` for that region\n"
            "- `share_pct`: the region's total as a percentage of the total of all claims, rounded to 2 decimal places "
            "(for example `25.0` for a quarter)"
        ),
        signature="def claims_share(claims: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def claims_share(claims):\n"
            "    g = claims.groupby('region')['amount'].sum().reset_index(name='total_claims')\n"
            "    g['share_pct'] = (g['total_claims'] / g['total_claims'].sum() * 100).round(2)\n"
            "    return g\n"
        ),
        tests=[
            [df(["claim_id", "region", "amount"], [
                [1, "North", 12000],
                [2, "Coastal", 8000],
                [3, "North", 6000],
                [4, "Inland", 3000],
                [5, "Coastal", 11000],
            ])],
            [df(["claim_id", "region", "amount"], [
                [11, "Metro", 2500],
                [12, "Metro", 7500],
            ])],
            [df(["claim_id", "region", "amount"], [
                [21, "East", 1000],
                [22, "West", 1000],
                [23, "South", 1000],
            ])],
        ],
    ),
    dict(
        title="Policies With Holder Names",
        difficulty="medium",
        topics=["Pandas", "Joining & reshaping"],
        statement=(
            "`policies` records which policyholder (`holder_id`) owns each policy, and `holders` gives each "
            "policyholder's `name`. A policyholder can own several policies.\n\n"
            "Return one row per policy whose `holder_id` is found in `holders`, with columns `policy_id`, `product` and "
            "`name`. Policies whose holder is not in `holders` are left out."
        ),
        signature="def policies_with_names(policies: pd.DataFrame, holders: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def policies_with_names(policies, holders):\n"
            "    merged = policies.merge(holders, on='holder_id', how='inner')\n"
            "    return merged[['policy_id', 'product', 'name']]\n"
        ),
        tests=[
            [df(["policy_id", "holder_id", "product"], [
                [301, "H1", "Life"],
                [302, "H2", "Funeral"],
                [303, "H1", "Disability"],
                [304, "H9", "Life"],
            ]), df(["holder_id", "name", "birth_date"], [
                ["H1", "Keabetswe Moloi", "1985-04-12"],
                ["H2", "Liam O'Connor", "1990-09-03"],
                ["H3", "Shireen Daniels", "1972-01-27"],
            ], dates=["birth_date"])],
            [df(["policy_id", "holder_id", "product"], [
                [401, "H7", "Motor"],
            ]), df(["holder_id", "name", "birth_date"], [
                ["H8", "Tshepo Radebe", "2000-06-30"],
            ], dates=["birth_date"])],
        ],
    ),
    dict(
        title="Mortality Table to Long Format",
        difficulty="medium",
        topics=["Pandas", "Joining & reshaping"],
        statement=(
            "A mortality table arrives in wide format: one row per `age`, with the male rate in `qx_male` and the female "
            "rate in `qx_female`. The pricing model needs it in long format instead.\n\n"
            "Return one row per age per sex, with columns:\n\n"
            "- `age`\n"
            "- `sex`: either `male` or `female`\n"
            "- `qx`: the mortality rate for that age and sex, unchanged"
        ),
        signature="def mortality_long(table: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def mortality_long(table):\n"
            "    long = table.melt(id_vars='age', value_vars=['qx_male', 'qx_female'], var_name='sex', value_name='qx')\n"
            "    long['sex'] = long['sex'].str.replace('qx_', '', regex=False)\n"
            "    return long[['age', 'sex', 'qx']]\n"
        ),
        tests=[
            [df(["age", "qx_male", "qx_female"], [
                [40, 0.0021, 0.0014],
                [41, 0.0023, 0.0016],
                [42, 0.0026, 0.0017],
            ])],
            [df(["age", "qx_male", "qx_female"], [
                [80, 0.0654, 0.0478],
            ])],
        ],
    ),
    dict(
        title="Combine Two Quarters",
        difficulty="medium",
        topics=["Pandas", "Joining & reshaping"],
        statement=(
            "Premium payments are kept in one table per quarter, `q1` and `q2`, with the same columns. A few payments "
            "made near the end of March were captured in both tables, with the same `payment_id`.\n\n"
            "Stack both tables into one and keep each `payment_id` only once. Return columns `payment_id`, `policy_id` "
            "and `amount`."
        ),
        signature="def combine_quarters(q1: pd.DataFrame, q2: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def combine_quarters(q1, q2):\n"
            "    both = pd.concat([q1, q2], ignore_index=True)\n"
            "    return both.drop_duplicates(subset='payment_id')[['payment_id', 'policy_id', 'amount']]\n"
        ),
        tests=[
            [df(["payment_id", "policy_id", "amount"], [
                [1001, "P-1", 450],
                [1002, "P-2", 1200],
                [1003, "P-3", 800],
            ]), df(["payment_id", "policy_id", "amount"], [
                [1003, "P-3", 800],
                [1004, "P-1", 450],
                [1005, "P-2", 1200],
            ])],
            [df(["payment_id", "policy_id", "amount"], [
                [2001, "P-9", 300],
            ]), df(["payment_id", "policy_id", "amount"], [
                [2002, "P-9", 300],
                [2003, "P-10", 975],
            ])],
            [df(["payment_id", "policy_id", "amount"], [
                [3001, "P-4", 610],
                [3002, "P-5", 220],
            ]), df(["payment_id", "policy_id", "amount"], [
                [3001, "P-4", 610],
                [3002, "P-5", 220],
            ])],
        ],
    ),
    # ------------------------------------------------------------------ hard
    dict(
        title="Top Two Claim Amounts per Branch",
        difficulty="hard",
        topics=["Pandas", "Sorting & ranking"],
        statement=(
            "Each branch manager reviews their biggest claims. For every `branch` in `claims`, find the two highest "
            "distinct claim amounts in that branch, and return every claim whose amount is one of them. Claims with equal "
            "amounts are all returned, so a branch can have more than two rows. A branch with only one distinct amount "
            "returns all its claims.\n\n"
            "Return columns `branch`, `claim_id` and `amount`."
        ),
        signature="def top_two_per_branch(claims: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def top_two_per_branch(claims):\n"
            "    r = claims.groupby('branch')['amount'].rank(method='dense', ascending=False)\n"
            "    return claims.loc[r <= 2, ['branch', 'claim_id', 'amount']]\n"
        ),
        tests=[
            [df(["claim_id", "branch", "amount"], [
                [1, "Durban", 42000],
                [2, "Durban", 15500],
                [3, "Durban", 42000],
                [4, "Durban", 30100],
                [5, "Pretoria", 8800],
                [6, "Pretoria", 12750],
                [7, "Pretoria", 4300],
                [8, "Gqeberha", 21000],
            ])],
            [df(["claim_id", "branch", "amount"], [
                [11, "Polokwane", 5000],
                [12, "Polokwane", 3000],
                [13, "Polokwane", 3000],
                [14, "Polokwane", 1000],
            ])],
            [df(["claim_id", "branch", "amount"], [
                [21, "Kimberley", 700],
                [22, "Kimberley", 700],
                [23, "Bloemfontein", 9100],
            ])],
        ],
    ),
    dict(
        title="Running Totals of Claim Payments",
        difficulty="hard",
        topics=["Pandas", "Grouping"],
        statement=(
            "A claim is often paid out in several instalments. `payments` lists every instalment, in no particular order.\n\n"
            "For each payment, work out how much had been paid on that claim up to and including that payment, taking "
            "payments in order of `paid_on`. If a claim has two payments on the same day, the one with the smaller "
            "`payment_id` counts as earlier.\n\n"
            "Return columns:\n\n"
            "- `payment_id`\n"
            "- `claim_id`\n"
            "- `paid_on`\n"
            "- `paid_to_date`: the running total of `amount` for that claim, including this payment"
        ),
        signature="def running_claim_totals(payments: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def running_claim_totals(payments):\n"
            "    s = payments.sort_values(['claim_id', 'paid_on', 'payment_id']).copy()\n"
            "    s['paid_to_date'] = s.groupby('claim_id')['amount'].cumsum()\n"
            "    return s[['payment_id', 'claim_id', 'paid_on', 'paid_to_date']]\n"
        ),
        tests=[
            [df(["payment_id", "claim_id", "paid_on", "amount"], [
                [1, "C-10", "2024-03-01", 5000],
                [2, "C-11", "2024-03-04", 1200],
                [3, "C-10", "2024-01-15", 2000],
                [4, "C-10", "2024-05-20", 3500],
                [5, "C-11", "2024-03-04", 800],
                [6, "C-12", "2024-02-10", 15000],
            ], dates=["paid_on"])],
            [df(["payment_id", "claim_id", "paid_on", "amount"], [
                [21, "C-30", "2023-12-31", 100],
                [20, "C-30", "2024-01-01", 250],
                [22, "C-30", "2023-12-31", 400],
            ], dates=["paid_on"])],
        ],
    ),
    dict(
        title="Loss Ratio by Product",
        difficulty="hard",
        topics=["Pandas", "Joining & reshaping"],
        statement=(
            "`policies` gives each policy's `product` and its `earned_premium` for the year. `claims` gives the "
            "`incurred` amount of each claim and the `policy_id` it was made on. A policy can have no claims or several.\n\n"
            "For each product in `policies`, return:\n\n"
            "- `product`\n"
            "- `earned_premium`: the total earned premium of its policies\n"
            "- `incurred`: the total incurred on claims made on its policies (0 if there are none)\n"
            "- `loss_ratio_pct`: `incurred / earned_premium * 100`, rounded to 2 decimal places\n\n"
            "Ignore claims whose `policy_id` is not in `policies`. Make sure a policy's premium is counted only once, even "
            "if it has several claims."
        ),
        signature="def loss_ratio_by_product(policies: pd.DataFrame, claims: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def loss_ratio_by_product(policies, claims):\n"
            "    per_policy = claims.groupby('policy_id')['incurred'].sum().reset_index()\n"
            "    p = policies.merge(per_policy, on='policy_id', how='left')\n"
            "    p['incurred'] = p['incurred'].fillna(0)\n"
            "    g = p.groupby('product')[['earned_premium', 'incurred']].sum().reset_index()\n"
            "    g['loss_ratio_pct'] = (g['incurred'] / g['earned_premium'] * 100).round(2)\n"
            "    return g\n"
        ),
        tests=[
            [df(["policy_id", "product", "earned_premium"], [
                [1, "Motor", 12000],
                [2, "Motor", 8000],
                [3, "Home", 5000],
                [4, "Home", 3000],
                [5, "Travel", 900],
            ]), df(["claim_id", "policy_id", "incurred"], [
                [101, 1, 6000],
                [102, 1, 4500],
                [103, 2, 3500],
                [104, 3, 2000],
                [105, 99, 7000],
            ])],
            [df(["policy_id", "product", "earned_premium"], [
                [11, "Funeral", 2400],
                [12, "Funeral", 3600],
            ]), df(["claim_id", "policy_id", "incurred"], [
                [201, 12, 10000],
            ])],
            [df(["policy_id", "product", "earned_premium"], [
                [21, "Gap Cover", 1500],
            ]), df(["claim_id", "policy_id", "incurred"], [
                [301, 22, 800],
            ])],
        ],
    ),
    dict(
        title="Quarterly Collections Pivot",
        difficulty="hard",
        topics=["Pandas", "Joining & reshaping"],
        statement=(
            "`collections` lists premium payments received in the first quarter of 2024 (all `paid_on` dates fall in "
            "January, February or March 2024). A policy can pay more than once in a month, or skip a month.\n\n"
            "Return one row per `policy_id` with columns:\n\n"
            "- `policy_id`\n"
            "- `jan`: total `amount` collected from that policy in January\n"
            "- `feb`: total collected in February\n"
            "- `mar`: total collected in March\n\n"
            "Use `0` for a month with no payments. All three month columns must be present, even if no policy paid in "
            "that month."
        ),
        signature="def collections_pivot(collections: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def collections_pivot(collections):\n"
            "    c = collections.copy()\n"
            "    c['month'] = c['paid_on'].dt.month.map({1: 'jan', 2: 'feb', 3: 'mar'})\n"
            "    wide = c.pivot_table(index='policy_id', columns='month', values='amount', aggfunc='sum', fill_value=0)\n"
            "    wide = wide.reindex(columns=['jan', 'feb', 'mar'], fill_value=0).reset_index()\n"
            "    wide.columns.name = None\n"
            "    return wide[['policy_id', 'jan', 'feb', 'mar']]\n"
        ),
        tests=[
            [df(["payment_id", "policy_id", "paid_on", "amount"], [
                [1, "P-1", "2024-01-05", 500],
                [2, "P-2", "2024-01-07", 320],
                [3, "P-1", "2024-02-05", 500],
                [4, "P-1", "2024-02-19", 150],
                [5, "P-3", "2024-03-01", 780],
                [6, "P-2", "2024-03-07", 320],
                [7, "P-1", "2024-03-05", 500],
            ], dates=["paid_on"])],
            [df(["payment_id", "policy_id", "paid_on", "amount"], [
                [11, "P-8", "2024-01-31", 1000],
                [12, "P-9", "2024-03-31", 250],
                [13, "P-8", "2024-03-15", 1000],
            ], dates=["paid_on"])],
        ],
    ),
    dict(
        title="Three Missed Premiums in a Row",
        difficulty="hard",
        topics=["Pandas", "Grouping"],
        statement=(
            "A policy is flagged for lapse review if it missed at least three monthly premiums in a row.\n\n"
            "`premiums` has one row per policy per month it was in force: the `policy_id`, the `month` number and a "
            "boolean `paid`. For each policy the months run on with no gaps, but the rows are in no particular order.\n\n"
            "Return the policies with three or more consecutive months where `paid` is `False`, as a single column "
            "`policy_id` with each policy once."
        ),
        signature="def lapse_review(premiums: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def lapse_review(premiums):\n"
            "    s = premiums.sort_values(['policy_id', 'month']).copy()\n"
            "    s['missed'] = (~s['paid']).astype(int)\n"
            "    in_a_row = s.groupby('policy_id')['missed'].transform(lambda x: x.rolling(3).sum())\n"
            "    ids = s.loc[in_a_row >= 3, 'policy_id'].drop_duplicates()\n"
            "    return pd.DataFrame({'policy_id': ids})\n"
        ),
        tests=[
            [df(["policy_id", "month", "paid"], [
                ["P-1", 1, True],
                ["P-1", 2, False],
                ["P-1", 4, False],
                ["P-1", 3, False],
                ["P-2", 1, False],
                ["P-2", 2, True],
                ["P-2", 3, False],
                ["P-2", 4, False],
                ["P-3", 3, False],
                ["P-3", 1, True],
                ["P-3", 2, True],
                ["P-4", 1, False],
                ["P-4", 2, False],
            ])],
            [df(["policy_id", "month", "paid"], [
                ["P-7", 1, False],
                ["P-7", 2, False],
                ["P-7", 3, True],
                ["P-7", 4, False],
                ["P-7", 5, False],
            ])],
            [df(["policy_id", "month", "paid"], [
                ["P-8", 6, False],
                ["P-8", 5, False],
                ["P-8", 4, False],
                ["P-8", 3, False],
                ["P-9", 1, True],
            ])],
        ],
    ),
    dict(
        title="Exposure Within a Calendar Year",
        difficulty="hard",
        topics=["Pandas", "New columns"],
        statement=(
            "To estimate claim frequencies you need each policy's exposure in a calendar year: the fraction of that year "
            "during which the policy was in force.\n\n"
            "Each policy in `policies` is in force from `start_date` up to, but not including, `end_date`. A missing "
            "`end_date` means the policy is still in force. Given an integer `year`, count the days in force that fall "
            "inside that year (1 January to 31 December) and divide by the number of days in that year (365, or 366 in "
            "a leap year). A policy not in force at all during the year has exposure 0.\n\n"
            "Return columns `policy_id` and `exposure`, rounded to 4 decimal places."
        ),
        signature="def calendar_year_exposure(policies: pd.DataFrame, year: int) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def calendar_year_exposure(policies, year):\n"
            "    y0 = pd.Timestamp(year=year, month=1, day=1)\n"
            "    y1 = pd.Timestamp(year=year + 1, month=1, day=1)\n"
            "    start = policies['start_date'].clip(lower=y0)\n"
            "    end = policies['end_date'].fillna(y1).clip(upper=y1)\n"
            "    days = (end - start).dt.days.clip(lower=0)\n"
            "    return pd.DataFrame({\n"
            "        'policy_id': policies['policy_id'],\n"
            "        'exposure': (days / (y1 - y0).days).round(4),\n"
            "    })\n"
        ),
        tests=[
            [df(["policy_id", "start_date", "end_date"], [
                [1, "2023-06-01", None],
                [2, "2024-07-01", None],
                [3, "2023-03-15", "2024-03-15"],
                [4, "2024-02-01", "2024-02-11"],
                [5, "2022-01-01", "2023-12-31"],
                [6, "2025-01-01", None],
            ], dates=["start_date", "end_date"]), 2024],
            [df(["policy_id", "start_date", "end_date"], [
                [11, "2023-01-01", "2024-01-01"],
                [12, "2023-12-31", None],
                [13, "2023-10-01", "2024-06-30"],
            ], dates=["start_date", "end_date"]), 2023],
        ],
    ),
    dict(
        title="Claim Frequency by Age Band",
        difficulty="hard",
        topics=["Pandas", "Grouping"],
        statement=(
            "Group the scheme `members` (all aged 18 or over) into age bands and measure how often each band claims. The "
            "bands are `18-34`, `35-49`, `50-64` and `65+`, based on `age`. `claims` has one row per claim with the "
            "`member_id` that made it; ignore claims whose `member_id` is not in `members`.\n\n"
            "Return one row for each band that has at least one member, with columns:\n\n"
            "- `age_band`: the band label exactly as written above\n"
            "- `members`: the number of members in the band\n"
            "- `claims`: the number of claims made by members in the band (an integer, 0 if none)\n"
            "- `frequency`: `claims / members`, rounded to 2 decimal places"
        ),
        signature="def claim_frequency_by_band(members: pd.DataFrame, claims: pd.DataFrame) -> pd.DataFrame",
        solution=(
            "import pandas as pd\n\n"
            "def claim_frequency_by_band(members, claims):\n"
            "    per_member = claims.groupby('member_id').size()\n"
            "    m = members.copy()\n"
            "    m['n_claims'] = m['member_id'].map(per_member).fillna(0).astype(int)\n"
            "    bands = pd.cut(m['age'], bins=[17, 34, 49, 64, 200], labels=['18-34', '35-49', '50-64', '65+'])\n"
            "    m['age_band'] = bands.astype(str)\n"
            "    g = m.groupby('age_band').agg(members=('member_id', 'count'), claims=('n_claims', 'sum')).reset_index()\n"
            "    g['frequency'] = (g['claims'] / g['members']).round(2)\n"
            "    return g\n"
        ),
        tests=[
            [df(["member_id", "age"], [
                [1, 22],
                [2, 34],
                [3, 35],
                [4, 49],
                [5, 50],
                [6, 71],
                [7, 41],
            ]), df(["claim_id", "member_id"], [
                [901, 1],
                [902, 3],
                [903, 3],
                [904, 4],
                [905, 6],
                [906, 6],
                [907, 6],
                [908, 42],
            ])],
            [df(["member_id", "age"], [
                [11, 65],
                [12, 64],
                [13, 18],
            ]), df(["claim_id", "member_id"], [
                [911, 12],
            ])],
        ],
    ),
]
