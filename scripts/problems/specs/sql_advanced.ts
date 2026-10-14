import type { SqlSpec } from '../build_sql.ts'
import type { Row } from '../../../src/lib/sqlSchema.ts'

// Builds table rows from a column list and positional values.
const rows = (cols: string[], data: (string | number | null)[][]): Row[] =>
  data.map(r => Object.fromEntries(cols.map((c, i) => [c, r[i]])))

export const problems: SqlSpec[] = [
  // ---------------------------------------------------------------- easy
  {
    title: 'Trainee Exam Score Ranking',
    difficulty: 'easy',
    topics: ['Window functions'],
    statement:
      'Trainee underwriters sit an internal exam and their results are stored in `exam_results`. Rank the candidates by `score`, highest first, so that equal scores share a rank and the next rank follows on without a gap (for example 1, 2, 2, 3). Candidates who were absent have a `NULL` score: leave them out.\n\nReturn `candidate_name`, `score` and `score_rank`. Sort by `score_rank`, then by `candidate_name` alphabetically.',
    tables: {
      exam_results: rows(
        ['candidate_id', 'candidate_name', 'score'],
        [
          [1, 'Sipho', 82.5],
          [2, 'Anika', 91],
          [3, 'Lerato', 82.5],
          [4, 'Johan', 77],
          [5, 'Fatima', 91],
          [6, 'Neo', null],
          [7, 'Brandon', 68.5],
          [8, 'Ayesha', 88],
        ],
      ),
    },
    solution: `SELECT
  candidate_name,
  score,
  DENSE_RANK() OVER (ORDER BY score DESC) AS score_rank
FROM exam_results
WHERE score IS NOT NULL
ORDER BY score_rank, candidate_name;`,
    notes: ['`RANK()` would leave a gap in the ranks after each tie; this question wants no gaps.'],
  },
  {
    title: 'First Portal Login per Policyholder',
    difficulty: 'easy',
    topics: ['Retention'],
    statement:
      'Each row of `portal_logins` records one login to the policyholder self-service portal. For every policyholder who has logged in, return `policyholder_id`, `first_login` (the earliest `login_date`) and `login_count` (the number of login rows for that policyholder). Sort by `policyholder_id`.',
    tables: {
      portal_logins: rows(
        ['login_id', 'policyholder_id', 'login_date', 'device'],
        [
          [1, 204, '2025-02-11', 'mobile'],
          [2, 201, '2025-02-03', 'desktop'],
          [3, 204, '2025-01-28', 'mobile'],
          [4, 202, '2025-02-14', 'tablet'],
          [5, 201, '2025-01-30', 'mobile'],
          [6, 203, '2025-03-01', 'desktop'],
          [7, 201, '2025-02-03', 'mobile'],
          [8, 204, '2025-02-01', 'desktop'],
        ],
      ),
    },
    solution: `SELECT
  policyholder_id,
  MIN(login_date) AS first_login,
  COUNT(*) AS login_count
FROM portal_logins
GROUP BY policyholder_id
ORDER BY policyholder_id;`,
    notes: ["The lowest `login_id` isn't always the earliest login."],
  },
  {
    title: 'Cumulative Member Contributions',
    difficulty: 'easy',
    topics: ['Running metrics'],
    statement:
      'A retirement fund records monthly member contributions in `contributions`. Each member has at most one row per `contribution_month`.\n\nReturn `member_id`, `contribution_month`, `amount` and `cumulative_amount`: the member’s total contributions up to and including that month. Each member’s running total starts from zero. Sort by `member_id`, then `contribution_month`.',
    tables: {
      contributions: rows(
        ['member_id', 'contribution_month', 'amount'],
        [
          [12, '2025-02-01', 1500],
          [10, '2025-01-01', 2000],
          [10, '2025-03-01', 2200],
          [11, '2025-01-01', 900],
          [10, '2025-02-01', 2000],
          [12, '2025-01-01', 1500],
          [11, '2025-03-01', 950],
          [12, '2025-04-01', 1800],
          [13, '2025-02-01', 3000],
        ],
      ),
    },
    solution: `SELECT
  member_id,
  contribution_month,
  amount,
  SUM(amount) OVER (
    PARTITION BY member_id
    ORDER BY contribution_month
  ) AS cumulative_amount
FROM contributions
ORDER BY member_id, contribution_month;`,
  },
  {
    title: 'Monthly Active Portal Users',
    difficulty: 'easy',
    topics: ['Retention'],
    statement:
      'Using `portal_logins`, count the monthly active users: the number of different policyholders who logged in at least once in each calendar month. A policyholder who logs in many times in a month counts once for that month.\n\nReturn `activity_month` as text in the form `YYYY-MM` and `active_users`. Only months with at least one login appear. Sort by `activity_month`.',
    tables: {
      portal_logins: rows(
        ['login_id', 'policyholder_id', 'login_date'],
        [
          [1, 301, '2024-12-04'],
          [2, 302, '2024-12-19'],
          [3, 301, '2024-12-20'],
          [4, 303, '2025-01-02'],
          [5, 301, '2025-01-15'],
          [6, 303, '2025-01-16'],
          [7, 303, '2025-01-31'],
          [8, 302, '2025-02-01'],
          [9, 304, '2025-12-10'],
          [10, 304, '2025-02-27'],
        ],
      ),
    },
    solution: `SELECT
  strftime('%Y-%m', login_date) AS activity_month,
  COUNT(DISTINCT policyholder_id) AS active_users
FROM portal_logins
GROUP BY activity_month
ORDER BY activity_month;`,
    notes: ['December 2024 and December 2025 are different months.'],
  },

  // ---------------------------------------------------------------- medium
  {
    title: 'Second-Largest Claim per Policyholder',
    difficulty: 'medium',
    topics: ['Window functions'],
    statement:
      'For every policyholder in `policyholders`, return `policyholder_id`, `full_name` and `second_largest`: the second-highest distinct claim `amount` among that policyholder’s claims. Two claims of the same amount count as one value. Ignore claims with a `NULL` amount. If a policyholder has fewer than two distinct amounts (including no claims at all), `second_largest` is `NULL`.\n\nSort by `policyholder_id`.',
    tables: {
      policyholders: rows(
        ['policyholder_id', 'full_name'],
        [
          [1, 'Zodwa Khumalo'],
          [2, 'Hendrik Botha'],
          [3, 'Amina Patel'],
          [4, 'Luke Daniels'],
          [5, 'Palesa Mokoena'],
          [6, 'Chen Wei'],
        ],
      ),
      claims: rows(
        ['claim_id', 'policyholder_id', 'amount'],
        [
          [1, 1, 5000],
          [2, 1, 12000],
          [3, 1, 12000],
          [4, 1, 3000],
          [5, 2, 8000],
          [6, 3, 4000],
          [7, 3, 4000],
          [8, 5, 2500],
          [9, 5, 9000],
          [10, 5, 7000],
          [11, 6, 1500],
          [12, 6, null],
          [13, 6, 1200],
        ],
      ),
    },
    solution: `WITH ranked AS (
  SELECT
    policyholder_id,
    amount,
    DENSE_RANK() OVER (PARTITION BY policyholder_id ORDER BY amount DESC) AS rnk
  FROM claims
  WHERE amount IS NOT NULL
)
SELECT
  p.policyholder_id,
  p.full_name,
  MAX(r.amount) AS second_largest
FROM policyholders AS p
LEFT JOIN ranked AS r
  ON r.policyholder_id = p.policyholder_id
  AND r.rnk = 2
GROUP BY p.policyholder_id, p.full_name
ORDER BY p.policyholder_id;`,
  },
  {
    title: 'Three Matching Risk Grades in a Row',
    difficulty: 'medium',
    topics: ['Consecutive & streaks'],
    statement:
      'Underwriters log each risk assessment in `risk_assessments` in the order it was done, by `assessment_id`. Find every `risk_grade` that was given at least three times in a row (three or more assessments with consecutive `assessment_id` values and the same grade). List each such grade once.\n\nReturn a single column `repeated_grade`.',
    tables: {
      risk_assessments: rows(
        ['assessment_id', 'risk_grade'],
        [
          [1, 'A'],
          [2, 'A'],
          [3, 'B'],
          [4, 'B'],
          [5, 'B'],
          [6, 'C'],
          [7, 'A'],
          [8, 'C'],
          [9, 'C'],
          [10, 'C'],
          [11, 'C'],
          [12, 'B'],
          [13, 'A'],
          [14, 'A'],
        ],
      ),
    },
    solution: `WITH neighbours AS (
  SELECT
    risk_grade,
    LAG(risk_grade, 1) OVER (ORDER BY assessment_id) AS prev_grade,
    LAG(risk_grade, 2) OVER (ORDER BY assessment_id) AS prev_grade_2
  FROM risk_assessments
)
SELECT DISTINCT risk_grade AS repeated_grade
FROM neighbours
WHERE risk_grade = prev_grade
  AND risk_grade = prev_grade_2;`,
    notes: ['`A` is the most common grade overall, but it never appears three times in a row.'],
  },
  {
    title: 'Adjacent Free Assessment Slots',
    difficulty: 'medium',
    topics: ['Consecutive & streaks'],
    statement:
      'Motor assessors offer numbered half-hour slots each day. In `assessor_slots`, `is_free` is 1 if the slot is open and 0 if it is booked. Slot numbers start at 1 for each assessor and have no gaps.\n\nA customer wants a one-hour inspection, so they need two back-to-back free slots with the same assessor. Return `assessor_id` and `slot_id` for every free slot that sits next to another free slot of the same assessor (the slot just before or just after it). Sort by `assessor_id`, then `slot_id`.',
    tables: {
      assessor_slots: rows(
        ['assessor_id', 'slot_id', 'is_free'],
        [
          [1, 1, 0],
          [1, 2, 1],
          [1, 3, 1],
          [1, 4, 0],
          [1, 5, 1],
          [1, 6, 0],
          [1, 7, 0],
          [1, 8, 1],
          [2, 1, 1],
          [2, 2, 0],
          [2, 3, 1],
          [2, 4, 1],
          [2, 5, 1],
          [2, 6, 0],
        ],
      ),
    },
    solution: `WITH neighbours AS (
  SELECT
    assessor_id,
    slot_id,
    is_free,
    LAG(is_free) OVER (PARTITION BY assessor_id ORDER BY slot_id) AS prev_free,
    LEAD(is_free) OVER (PARTITION BY assessor_id ORDER BY slot_id) AS next_free
  FROM assessor_slots
)
SELECT
  assessor_id,
  slot_id
FROM neighbours
WHERE is_free = 1
  AND (prev_free = 1 OR next_free = 1)
ORDER BY assessor_id, slot_id;`,
    notes: ["Assessor 1’s last slot and assessor 2’s first slot are both free, but they belong to different people, so they don't form a pair."],
  },
  {
    title: 'Running Account Balance',
    difficulty: 'medium',
    topics: ['Running metrics'],
    statement:
      'Each row of `account_transactions` is a movement on a policyholder’s premium account. A `payment` adds `amount` to the balance and a `charge` subtracts it. Every account starts at a balance of 0. Transactions are applied in date order, and transactions on the same date are applied in `txn_id` order.\n\nReturn `txn_id`, `policyholder_id`, `txn_date` and `balance`, the account balance straight after that transaction. Sort by `policyholder_id`, then `txn_date`, then `txn_id`.',
    tables: {
      account_transactions: rows(
        ['txn_id', 'policyholder_id', 'txn_date', 'txn_type', 'amount'],
        [
          [1, 101, '2025-01-05', 'charge', 450],
          [2, 102, '2025-01-03', 'payment', 300],
          [3, 101, '2025-01-05', 'payment', 500],
          [4, 101, '2025-02-05', 'charge', 450],
          [5, 102, '2025-02-03', 'charge', 300],
          [6, 101, '2025-01-20', 'payment', 400],
          [7, 103, '2025-01-10', 'payment', 1000],
          [8, 102, '2025-02-03', 'payment', 250],
          [9, 101, '2025-02-28', 'payment', 450],
          [10, 103, '2025-03-10', 'charge', 950],
        ],
      ),
    },
    solution: `SELECT
  txn_id,
  policyholder_id,
  txn_date,
  SUM(CASE WHEN txn_type = 'payment' THEN amount ELSE -amount END) OVER (
    PARTITION BY policyholder_id
    ORDER BY txn_date, txn_id
  ) AS balance
FROM account_transactions
ORDER BY policyholder_id, txn_date, txn_id;`,
    notes: ['Two transactions on the same day must still show different balances.'],
  },
  {
    title: 'Year-on-Year Premium Growth by Product',
    difficulty: 'medium',
    topics: ['Running metrics'],
    statement:
      '`premium_written` holds written premium by product, branch and underwriting year. First total the premium for each product and `uw_year`. Then compare each total with the same product’s total for the year immediately before (`uw_year - 1`).\n\nReturn `product`, `uw_year`, `total_premium` and `growth_pct` = 100 × (this year − last year) / last year, rounded with `ROUND(x, 2)`. If the product has no premium in the year immediately before, `growth_pct` is `NULL`. Sort by `product`, then `uw_year`.',
    tables: {
      premium_written: rows(
        ['product', 'branch', 'uw_year', 'premium'],
        [
          ['Funeral', 'Durban', 2022, 1000],
          ['Funeral', 'Cape Town', 2022, 500],
          ['Funeral', 'Durban', 2023, 1200],
          ['Funeral', 'Cape Town', 2023, 600],
          ['Funeral', 'Durban', 2024, 1700],
          ['Motor', 'Durban', 2022, 4000],
          ['Motor', 'Durban', 2024, 5000],
          ['Motor', 'Durban', 2025, 4500],
          ['Motor', 'Cape Town', 2025, 1500],
          ['Life', 'Pretoria', 2023, 2500],
          ['Life', 'Pretoria', 2024, 2500],
        ],
      ),
    },
    solution: `WITH yearly AS (
  SELECT
    product,
    uw_year,
    SUM(premium) AS total_premium
  FROM premium_written
  GROUP BY product, uw_year
)
SELECT
  cur.product,
  cur.uw_year,
  cur.total_premium,
  ROUND(100.0 * (cur.total_premium - prev.total_premium) / prev.total_premium, 2) AS growth_pct
FROM yearly AS cur
LEFT JOIN yearly AS prev
  ON prev.product = cur.product
  AND prev.uw_year = cur.uw_year - 1
ORDER BY cur.product, cur.uw_year;`,
    notes: ['Motor has nothing in 2023, so its 2024 growth is `NULL` rather than a comparison with 2022.'],
  },
  {
    title: 'Next-Day Return Rate',
    difficulty: 'medium',
    topics: ['Retention'],
    statement:
      'Using `portal_logins`, find the share of policyholders who came back to the portal on the calendar day straight after their first login day. A policyholder counts if they have a login on the date one day after their earliest `login_date`.\n\nReturn one row with one column, `return_rate`: the number of such policyholders divided by the number of different policyholders in the table, rounded with `ROUND(x, 2)`.',
    tables: {
      portal_logins: rows(
        ['policyholder_id', 'login_date'],
        [
          [1, '2025-03-01'],
          [1, '2025-03-02'],
          [1, '2025-03-05'],
          [2, '2025-03-03'],
          [2, '2025-03-03'],
          [2, '2025-03-05'],
          [2, '2025-03-06'],
          [3, '2025-03-31'],
          [3, '2025-04-01'],
          [4, '2025-03-10'],
          [5, '2025-03-14'],
          [5, '2025-03-12'],
          [6, '2025-03-20'],
          [6, '2025-03-21'],
          [7, '2025-03-25'],
        ],
      ),
    },
    solution: `WITH first_login AS (
  SELECT
    policyholder_id,
    MIN(login_date) AS first_date
  FROM portal_logins
  GROUP BY policyholder_id
)
SELECT
  ROUND(
    1.0 * COUNT(DISTINCT l.policyholder_id) / (SELECT COUNT(*) FROM first_login),
    2
  ) AS return_rate
FROM first_login AS f
LEFT JOIN portal_logins AS l
  ON l.policyholder_id = f.policyholder_id
  AND l.login_date = date(f.first_date, '+1 day');`,
    notes: ['Policyholder 2 logs in on two days in a row, but not the day after their first login.'],
  },
  {
    title: 'Active Every Month of the Quarter',
    difficulty: 'medium',
    topics: ['Retention'],
    statement:
      'Return the `policyholder_id` of every policyholder who logged in to the portal at least once in each of January, February and March 2025. Logins in other months or years don’t count towards this but don’t disqualify anyone either. Sort by `policyholder_id`.',
    tables: {
      portal_logins: rows(
        ['login_id', 'policyholder_id', 'login_date'],
        [
          [1, 1, '2025-01-08'],
          [2, 1, '2025-02-14'],
          [3, 1, '2025-03-03'],
          [4, 2, '2025-01-05'],
          [5, 2, '2025-01-19'],
          [6, 2, '2025-03-11'],
          [7, 3, '2025-01-12'],
          [8, 3, '2025-02-09'],
          [9, 3, '2024-03-15'],
          [10, 4, '2025-02-01'],
          [11, 4, '2025-04-02'],
          [12, 4, '2025-03-31'],
          [13, 4, '2025-01-31'],
          [14, 5, '2025-03-17'],
        ],
      ),
    },
    solution: `SELECT policyholder_id
FROM portal_logins
WHERE login_date BETWEEN '2025-01-01' AND '2025-03-31'
GROUP BY policyholder_id
HAVING COUNT(DISTINCT strftime('%m', login_date)) = 3
ORDER BY policyholder_id;`,
    notes: ['Policyholder 2 has three logins in the quarter, but only in two different months.'],
  },
  {
    title: 'Claim Amount Quartiles',
    difficulty: 'medium',
    topics: ['Medians & percentiles'],
    statement:
      'Split the claims in `claims` into four quartile groups by `amount`, smallest amounts in group 1. Sort the claims by `amount` and break ties by `claim_id` (smallest first), then deal them into four groups that are as equal in size as possible; when the claims don’t divide evenly, the earlier groups get one extra claim each. This is exactly what `NTILE(4)` does.\n\nReturn `claim_id`, `amount` and `quartile`. Sort by `amount`, then `claim_id`.',
    tables: {
      claims: rows(
        ['claim_id', 'amount'],
        [
          [1, 4500],
          [2, 2000],
          [3, 1500],
          [4, 7000],
          [5, 3100],
          [6, 15000],
          [7, 1200],
          [8, 9800],
          [9, 2000],
          [10, 4000],
        ],
      ),
    },
    solution: `SELECT
  claim_id,
  amount,
  NTILE(4) OVER (ORDER BY amount, claim_id) AS quartile
FROM claims
ORDER BY amount, claim_id;`,
    notes: ['With 10 claims the groups hold 3, 3, 2 and 2 claims.'],
  },
  {
    title: 'Cumulative Share of Sums Assured',
    difficulty: 'medium',
    topics: ['Medians & percentiles'],
    statement:
      'Build the cumulative distribution of `sum_assured` in `policies`. For each distinct `sum_assured`, return `sum_assured`, `policy_count` (policies with exactly that sum assured) and `cumulative_share`: the fraction of policies whose sum assured is less than or equal to it, rounded with `ROUND(x, 2)`. Leave out policies with a `NULL` sum assured entirely, including from the total. Sort by `sum_assured`.',
    tables: {
      policies: rows(
        ['policy_id', 'sum_assured'],
        [
          [1, 250000],
          [2, 100000],
          [3, 750000],
          [4, 250000],
          [5, null],
          [6, 500000],
          [7, 100000],
          [8, 1000000],
          [9, 250000],
          [10, 750000],
        ],
      ),
    },
    solution: `SELECT
  sum_assured,
  COUNT(*) AS policy_count,
  ROUND(
    1.0 * SUM(COUNT(*)) OVER (ORDER BY sum_assured) / SUM(COUNT(*)) OVER (),
    2
  ) AS cumulative_share
FROM policies
WHERE sum_assured IS NOT NULL
GROUP BY sum_assured
ORDER BY sum_assured;`,
    notes: ['`CUME_DIST()` gives the same fractions if you apply it before grouping.'],
  },
  {
    title: 'Swap Neighbouring Callback Positions',
    difficulty: 'medium',
    topics: ['Advanced'],
    statement:
      'A call-centre bug put every pair of callers in `callback_queue` the wrong way round. Swap positions 1 and 2, 3 and 4, 5 and 6, and so on. If there is an odd number of callers, the caller in the last position stays where they are. Positions start at 1 and have no gaps.\n\nReturn `position` and `caller_name` after the swap, sorted by `position`.',
    tables: {
      callback_queue: rows(
        ['position', 'caller_name'],
        [
          [1, 'Bheki'],
          [2, 'Charlene'],
          [3, 'Dumisani'],
          [4, 'Elize'],
          [5, 'Faith'],
          [6, 'Gustav'],
          [7, 'Hlengiwe'],
        ],
      ),
    },
    solution: `SELECT
  CASE
    WHEN position % 2 = 0 THEN position - 1
    WHEN position = (SELECT MAX(position) FROM callback_queue) THEN position
    ELSE position + 1
  END AS position,
  caller_name
FROM callback_queue
ORDER BY position;`,
  },
  {
    title: 'Fill Down Missing Branch Codes',
    difficulty: 'medium',
    topics: ['Advanced'],
    statement:
      'A spreadsheet of broker sales was loaded into `broker_import`. The `branch_code` is only filled in on the first line of each block; the lines below it in the same block have `NULL` and belong to the same branch. Line numbers go up in steps of 10.\n\nReturn `line_no`, `branch_code` (with every `NULL` replaced by the most recent non-null code on an earlier line) and `broker_name`. Sort by `line_no`.',
    tables: {
      broker_import: rows(
        ['line_no', 'branch_code', 'broker_name', 'premium'],
        [
          [10, 'DBN', 'Ndlovu Brokers', 12000],
          [20, null, 'Coastal Cover', 8500],
          [30, null, 'Umhlanga Risk', 4300],
          [40, 'CPT', 'Table Bay Brokers', 15000],
          [50, null, 'Peninsula Assure', 6100],
          [60, 'DBN', 'Berea Brokers', 7300],
          [70, null, 'Ridge Insure', 9900],
          [80, 'JHB', 'Gold Reef Brokers', 11200],
        ],
      ),
    },
    solution: `WITH blocks AS (
  SELECT
    line_no,
    branch_code,
    broker_name,
    COUNT(branch_code) OVER (ORDER BY line_no) AS block_no
  FROM broker_import
)
SELECT
  line_no,
  MAX(branch_code) OVER (PARTITION BY block_no) AS branch_code,
  broker_name
FROM blocks
ORDER BY line_no;`,
    notes: ['`COUNT(column)` skips `NULL`s, so a running count of codes numbers the blocks.'],
  },
  {
    title: 'Missing Claim Numbers',
    difficulty: 'medium',
    topics: ['Advanced'],
    statement:
      'Claim numbers are issued in sequence starting at 1, but some claims were withdrawn and deleted from `claims`. Use a recursive CTE to list every whole number from 1 up to the largest `claim_no` in the table that doesn’t appear in `claims`.\n\nReturn one column, `missing_claim_no`, sorted in ascending order.',
    tables: {
      claims: rows(
        ['claim_no', 'reported_date'],
        [
          [2, '2025-01-04'],
          [3, '2025-01-04'],
          [5, '2025-01-09'],
          [9, '2025-01-15'],
          [10, '2025-01-15'],
          [13, '2025-01-22'],
        ],
      ),
    },
    solution: `WITH RECURSIVE numbers(n) AS (
  SELECT 1
  UNION ALL
  SELECT n + 1
  FROM numbers
  WHERE n < (SELECT MAX(claim_no) FROM claims)
)
SELECT n AS missing_claim_no
FROM numbers
WHERE n NOT IN (SELECT claim_no FROM claims)
ORDER BY n;`,
    notes: ['Claim 1 is missing too, so start the sequence at 1 rather than at the smallest claim number.'],
  },
  {
    title: 'Quarterly Premium Pivot',
    difficulty: 'medium',
    topics: ['Advanced'],
    statement:
      'Using `premium_receipts`, build a table of 2025 premium received with one row per `product` and one column per calendar quarter: `q1` (January to March), `q2`, `q3` and `q4`. Each cell is the total `amount` received in that quarter, or 0 if there was none. Ignore receipts outside 2025, and only include products with at least one 2025 receipt.\n\nReturn `product`, `q1`, `q2`, `q3`, `q4`, sorted by `product`.',
    tables: {
      premium_receipts: rows(
        ['receipt_id', 'product', 'receipt_date', 'amount'],
        [
          [1, 'Motor', '2025-01-15', 3200],
          [2, 'Motor', '2025-03-31', 1800],
          [3, 'Motor', '2025-04-01', 2500],
          [4, 'Home', '2025-02-10', 1200],
          [5, 'Home', '2025-11-30', 1400],
          [6, 'Motor', '2024-12-31', 9999],
          [7, 'Life', '2025-07-01', 5000],
          [8, 'Life', '2025-09-30', 5000],
          [9, 'Travel', '2024-06-15', 750],
          [10, 'Home', '2025-12-31', 600],
          [11, 'Motor', '2026-01-01', 4100],
        ],
      ),
    },
    solution: `WITH receipts_2025 AS (
  SELECT
    product,
    amount,
    (CAST(strftime('%m', receipt_date) AS INTEGER) + 2) / 3 AS quarter
  FROM premium_receipts
  WHERE receipt_date BETWEEN '2025-01-01' AND '2025-12-31'
)
SELECT
  product,
  SUM(CASE WHEN quarter = 1 THEN amount ELSE 0 END) AS q1,
  SUM(CASE WHEN quarter = 2 THEN amount ELSE 0 END) AS q2,
  SUM(CASE WHEN quarter = 3 THEN amount ELSE 0 END) AS q3,
  SUM(CASE WHEN quarter = 4 THEN amount ELSE 0 END) AS q4
FROM receipts_2025
GROUP BY product
ORDER BY product;`,
  },
  {
    title: 'Last Claim Paid within the Budget',
    difficulty: 'medium',
    topics: ['Advanced'],
    statement:
      'The claims team has a daily payment budget of 50 000. Claims in `payment_queue` are paid strictly in `queue_position` order, and paying stops at the first claim that would take the total paid above 50 000 (a total of exactly 50 000 is allowed). No later claim is paid, even a small one.\n\nReturn one row with `last_paid_claim` (the `claim_id` of the last claim paid) and `total_paid` (the total of all claims paid).',
    tables: {
      payment_queue: rows(
        ['claim_id', 'queue_position', 'amount'],
        [
          [107, 1, 12000],
          [103, 2, 8500],
          [110, 3, 15000],
          [101, 4, 9500],
          [105, 5, 5000],
          [102, 6, 3000],
          [108, 7, 700],
          [104, 8, 21000],
        ],
      ),
    },
    solution: `WITH running AS (
  SELECT
    claim_id,
    queue_position,
    SUM(amount) OVER (ORDER BY queue_position) AS paid_so_far
  FROM payment_queue
)
SELECT
  claim_id AS last_paid_claim,
  paid_so_far AS total_paid
FROM running
WHERE paid_so_far <= 50000
ORDER BY queue_position DESC
LIMIT 1;`,
    notes: ['Every amount is positive, so the running total only goes up.'],
  },
  {
    title: 'First and Second Active Days',
    difficulty: 'medium',
    topics: ['Retention'],
    statement:
      'Each row of `document_uploads` is one document a policyholder uploaded to the portal. A policyholder’s active days are the distinct dates on which they uploaded something. For each policyholder, compare their first active day with their second active day (the next date on which they uploaded, which need not be the next calendar day).\n\nReturn `policyholder_id`, `first_day`, `first_day_uploads`, `second_day` and `second_day_uploads`. If a policyholder has only one active day, `second_day` and `second_day_uploads` are `NULL`. Sort by `policyholder_id`.',
    tables: {
      document_uploads: rows(
        ['upload_id', 'policyholder_id', 'upload_date'],
        [
          [1, 1, '2025-03-01'],
          [2, 1, '2025-03-01'],
          [3, 1, '2025-03-04'],
          [4, 1, '2025-03-05'],
          [5, 1, '2025-03-05'],
          [6, 2, '2025-03-02'],
          [7, 3, '2025-03-03'],
          [8, 3, '2025-03-04'],
          [9, 3, '2025-03-04'],
          [10, 4, '2025-03-10'],
          [11, 4, '2025-03-08'],
          [12, 4, '2025-03-08'],
          [13, 4, '2025-03-12'],
          [14, 4, '2025-03-10'],
          [15, 4, '2025-03-10'],
        ],
      ),
    },
    solution: `WITH daily AS (
  SELECT
    policyholder_id,
    upload_date,
    COUNT(*) AS uploads,
    ROW_NUMBER() OVER (PARTITION BY policyholder_id ORDER BY upload_date) AS day_no
  FROM document_uploads
  GROUP BY policyholder_id, upload_date
)
SELECT
  policyholder_id,
  MAX(CASE WHEN day_no = 1 THEN upload_date END) AS first_day,
  MAX(CASE WHEN day_no = 1 THEN uploads END) AS first_day_uploads,
  MAX(CASE WHEN day_no = 2 THEN upload_date END) AS second_day,
  MAX(CASE WHEN day_no = 2 THEN uploads END) AS second_day_uploads
FROM daily
GROUP BY policyholder_id
ORDER BY policyholder_id;`,
  },

  // ---------------------------------------------------------------- hard
  {
    title: 'Top Three Pay Levels per Branch',
    difficulty: 'hard',
    topics: ['Window functions'],
    statement:
      'For each branch, find the staff whose `salary` is one of the three highest distinct salaries in their branch. Staff who share a salary are both included, so a branch can return more than three people. If a branch has fewer than three distinct salaries, everyone in it is included. Branches with no staff don’t appear.\n\nReturn `branch_name`, `staff_name` and `salary`. Sort by `branch_name`, then `salary` from highest to lowest, then `staff_name`.',
    tables: {
      branches: rows(
        ['branch_id', 'branch_name'],
        [
          [1, 'Durban'],
          [2, 'Cape Town'],
          [3, 'Pretoria'],
          [4, 'Polokwane'],
        ],
      ),
      staff: rows(
        ['staff_id', 'staff_name', 'branch_id', 'salary'],
        [
          [1, 'Ayanda', 1, 90000],
          [2, 'Bongani', 1, 85000],
          [3, 'Carla', 1, 85000],
          [4, 'Dev', 1, 70000],
          [5, 'Elena', 1, 65000],
          [6, 'Farouk', 1, 70000],
          [7, 'Gerrit', 2, 72000],
          [8, 'Hannah', 2, 60000],
          [9, 'Isaac', 3, 50000],
          [10, 'Jabu', 3, 55000],
          [11, 'Karen', 3, 61000],
          [12, 'Lwazi', 3, 48000],
        ],
      ),
    },
    solution: `WITH ranked AS (
  SELECT
    branch_id,
    staff_name,
    salary,
    DENSE_RANK() OVER (PARTITION BY branch_id ORDER BY salary DESC) AS pay_level
  FROM staff
)
SELECT
  b.branch_name,
  r.staff_name,
  r.salary
FROM ranked AS r
JOIN branches AS b
  ON b.branch_id = r.branch_id
WHERE r.pay_level <= 3
ORDER BY b.branch_name, r.salary DESC, r.staff_name;`,
    notes: ['`RANK()` or `ROW_NUMBER()` would drop people tied on the third-highest salary.'],
  },
  {
    title: 'Three or More Busy Days in a Row',
    difficulty: 'hard',
    topics: ['Consecutive & streaks'],
    statement:
      'A day in `call_centre_days` is busy if `calls_received` is 500 or more. Days with no row are treated as not busy. Return every busy day that is part of a run of at least three consecutive calendar days that are all busy.\n\nReturn `call_date` and `calls_received`, sorted by `call_date`.',
    tables: {
      call_centre_days: rows(
        ['call_date', 'calls_received'],
        [
          ['2025-05-01', 520],
          ['2025-05-02', 610],
          ['2025-05-03', 480],
          ['2025-05-04', 700],
          ['2025-05-05', 505],
          ['2025-05-06', 500],
          ['2025-05-07', 530],
          ['2025-05-09', 800],
          ['2025-05-10', 900],
          ['2025-05-12', 650],
          ['2025-05-13', 700],
          ['2025-05-30', 510],
          ['2025-05-31', 520],
          ['2025-06-01', 540],
          ['2025-06-03', 499],
        ],
      ),
    },
    solution: `WITH busy AS (
  SELECT
    call_date,
    calls_received,
    julianday(call_date) - ROW_NUMBER() OVER (ORDER BY call_date) AS island
  FROM call_centre_days
  WHERE calls_received >= 500
),
islands AS (
  SELECT
    call_date,
    calls_received,
    COUNT(*) OVER (PARTITION BY island) AS run_length
  FROM busy
)
SELECT
  call_date,
  calls_received
FROM islands
WHERE run_length >= 3
ORDER BY call_date;`,
    notes: ['9, 10, 12 and 13 May are four busy rows in a row, but 11 May is missing, so they are not consecutive days.'],
  },
  {
    title: 'Longest Daily Login Streak',
    difficulty: 'hard',
    topics: ['Consecutive & streaks'],
    statement:
      'A login streak is a run of consecutive calendar days on which a policyholder logged in at least once. A policyholder may log in several times on the same day. For each policyholder in `portal_logins`, find the length in days of their longest streak (a single day on its own is a streak of 1).\n\nReturn `policyholder_id` and `longest_streak`. Sort by `longest_streak` from highest to lowest, then by `policyholder_id`.',
    tables: {
      portal_logins: rows(
        ['policyholder_id', 'login_date'],
        [
          [1, '2025-03-01'],
          [1, '2025-03-02'],
          [1, '2025-03-02'],
          [1, '2025-03-03'],
          [1, '2025-03-05'],
          [2, '2025-03-10'],
          [3, '2025-02-27'],
          [3, '2025-02-28'],
          [3, '2025-03-01'],
          [3, '2025-03-02'],
          [4, '2025-03-04'],
          [4, '2025-03-06'],
          [5, '2025-03-11'],
          [5, '2025-03-12'],
          [5, '2025-03-14'],
        ],
      ),
    },
    solution: `WITH login_days AS (
  SELECT DISTINCT
    policyholder_id,
    login_date
  FROM portal_logins
),
islands AS (
  SELECT
    policyholder_id,
    julianday(login_date)
      - ROW_NUMBER() OVER (PARTITION BY policyholder_id ORDER BY login_date) AS island
  FROM login_days
),
streaks AS (
  SELECT
    policyholder_id,
    COUNT(*) AS streak_length
  FROM islands
  GROUP BY policyholder_id, island
)
SELECT
  policyholder_id,
  MAX(streak_length) AS longest_streak
FROM streaks
GROUP BY policyholder_id
ORDER BY longest_streak DESC, policyholder_id;`,
    notes: ['Remove repeat logins on the same day first, or they break the date-minus-row-number trick.'],
  },
  {
    title: 'Valuation Run Outcome Periods',
    difficulty: 'hard',
    topics: ['Consecutive & streaks'],
    statement:
      'The overnight reserving valuation runs once a night, and `nightly_runs` has exactly one row per night with no missing dates. Group the 2025 nights into periods: a period is a run of consecutive nights with the same `outcome`. Ignore nights before 2025, so a period never starts before 1 January 2025.\n\nReturn `outcome`, `period_start` and `period_end` (the first and last `run_date` of each period). Sort by `period_start`.',
    tables: {
      nightly_runs: rows(
        ['run_date', 'outcome'],
        [
          ['2025-01-06', 'success'],
          ['2024-12-30', 'success'],
          ['2024-12-31', 'failure'],
          ['2025-01-01', 'failure'],
          ['2025-01-02', 'failure'],
          ['2025-01-03', 'success'],
          ['2025-01-04', 'success'],
          ['2025-01-05', 'failure'],
          ['2025-01-07', 'success'],
          ['2025-01-08', 'success'],
          ['2025-01-09', 'failure'],
          ['2025-01-10', 'failure'],
        ],
      ),
    },
    solution: `WITH numbered AS (
  SELECT
    run_date,
    outcome,
    ROW_NUMBER() OVER (ORDER BY run_date)
      - ROW_NUMBER() OVER (PARTITION BY outcome ORDER BY run_date) AS period_key
  FROM nightly_runs
  WHERE run_date >= '2025-01-01'
)
SELECT
  outcome,
  MIN(run_date) AS period_start,
  MAX(run_date) AS period_end
FROM numbered
GROUP BY outcome, period_key
ORDER BY period_start;`,
    notes: ['A one-night period has the same start and end date.'],
  },
  {
    title: 'Seven-Day Moving Average of Claims Paid',
    difficulty: 'hard',
    topics: ['Running metrics'],
    statement:
      '`claim_payments` lists claim payments; there can be several on one day and none on others. For each date that has at least one payment, look at the seven calendar days ending on that date (the date itself and the six days before it). Days with no payments count as 0. Only report dates that are at least six days after the first payment date in the table, so that every window covers a full week of history.\n\nReturn `paid_date`, `week_total` (the total paid in the seven-day window) and `week_average` (`week_total` divided by 7, rounded with `ROUND(x, 2)`). Sort by `paid_date`.',
    tables: {
      claim_payments: rows(
        ['payment_id', 'paid_date', 'amount'],
        [
          [1, '2025-07-01', 1000],
          [2, '2025-07-01', 500],
          [3, '2025-07-02', 800],
          [4, '2025-07-03', 1200],
          [5, '2025-07-05', 400],
          [6, '2025-07-06', 900],
          [7, '2025-07-07', 700],
          [8, '2025-07-07', 300],
          [9, '2025-07-08', 1700],
          [10, '2025-07-10', 600],
          [11, '2025-07-11', 2000],
          [12, '2025-07-14', 100],
        ],
      ),
    },
    solution: `WITH daily AS (
  SELECT
    paid_date,
    SUM(amount) AS day_total
  FROM claim_payments
  GROUP BY paid_date
)
SELECT
  d.paid_date,
  SUM(w.day_total) AS week_total,
  ROUND(SUM(w.day_total) / 7.0, 2) AS week_average
FROM daily AS d
JOIN daily AS w
  ON w.paid_date BETWEEN date(d.paid_date, '-6 days') AND d.paid_date
WHERE d.paid_date >= (SELECT date(MIN(paid_date), '+6 days') FROM claim_payments)
GROUP BY d.paid_date
ORDER BY d.paid_date;`,
    notes: ['A window of `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` counts rows, not days, so it goes wrong when dates are missing.'],
  },
  {
    title: 'Day-One Retention by First Login Date',
    difficulty: 'hard',
    topics: ['Retention'],
    statement:
      'A policyholder’s first login date is their earliest `login_date` in `portal_logins`. They are retained on day one if they also logged in on the calendar day straight after it.\n\nFor each date that is someone’s first login date, return `first_login_date`, `new_users` (how many policyholders first logged in that day) and `day1_retention` (the fraction of those new users retained on day one, rounded with `ROUND(x, 2)`). Sort by `first_login_date`.',
    tables: {
      portal_logins: rows(
        ['policyholder_id', 'login_date'],
        [
          [1, '2025-04-01'],
          [1, '2025-04-02'],
          [2, '2025-04-01'],
          [2, '2025-04-03'],
          [3, '2025-04-01'],
          [3, '2025-04-01'],
          [3, '2025-04-02'],
          [4, '2025-04-02'],
          [4, '2025-04-03'],
          [5, '2025-04-02'],
          [6, '2025-04-05'],
          [6, '2025-04-06'],
          [7, '2025-04-04'],
          [7, '2025-04-02'],
        ],
      ),
    },
    solution: `WITH firsts AS (
  SELECT
    policyholder_id,
    MIN(login_date) AS first_login_date
  FROM portal_logins
  GROUP BY policyholder_id
),
flagged AS (
  SELECT
    f.first_login_date,
    f.policyholder_id,
    EXISTS (
      SELECT 1
      FROM portal_logins AS l
      WHERE l.policyholder_id = f.policyholder_id
        AND l.login_date = date(f.first_login_date, '+1 day')
    ) AS retained
  FROM firsts AS f
)
SELECT
  first_login_date,
  COUNT(*) AS new_users,
  ROUND(1.0 * SUM(retained) / COUNT(*), 2) AS day1_retention
FROM flagged
GROUP BY first_login_date
ORDER BY first_login_date;`,
    notes: ['Logins on 2 April by policyholders who first logged in on 1 April are not new users for 2 April.'],
  },
  {
    title: 'Median Claim per Branch',
    difficulty: 'hard',
    topics: ['Medians & percentiles'],
    statement:
      'Find the median claim `amount` for each `branch` in `claims`, without using a median function. Sort each branch’s amounts; with an odd number of claims the median is the middle one, and with an even number it is the average of the two middle ones. Ignore claims with a `NULL` amount.\n\nReturn `branch` and `median_amount`, rounded with `ROUND(x, 2)`. Sort by `branch`.',
    tables: {
      claims: rows(
        ['claim_id', 'branch', 'amount'],
        [
          [1, 'Durban', 1250],
          [2, 'Durban', 8000],
          [3, 'Durban', 3001],
          [4, 'Durban', 5000],
          [5, 'Cape Town', 2500],
          [6, 'Cape Town', 900],
          [7, 'Cape Town', 4100],
          [8, 'Pretoria', 7000],
          [9, 'East London', 3000],
          [10, 'East London', 10000],
          [11, 'East London', null],
          [12, 'East London', 500],
          [13, 'East London', 3000],
          [14, 'East London', 1500],
        ],
      ),
    },
    solution: `WITH ordered AS (
  SELECT
    branch,
    amount,
    ROW_NUMBER() OVER (PARTITION BY branch ORDER BY amount) AS rn,
    COUNT(*) OVER (PARTITION BY branch) AS n
  FROM claims
  WHERE amount IS NOT NULL
)
SELECT
  branch,
  ROUND(AVG(amount), 2) AS median_amount
FROM ordered
WHERE rn IN ((n + 1) / 2, (n + 2) / 2)
GROUP BY branch
ORDER BY branch;`,
    notes: ['In SQLite, dividing two integers gives an integer, which is handy for finding the middle positions.'],
  },
  {
    title: 'Nearest-Rank 90th Percentile per Product',
    difficulty: 'hard',
    topics: ['Medians & percentiles'],
    statement:
      'Use the nearest-rank method to find the 90th percentile claim `amount` for each `product` in `claims`. Sort a product’s claims by `amount` from smallest to largest and number them from 1 to n. The 90th percentile is the amount in position ⌈0.9 × n⌉ (0.9 × n rounded up to a whole number).\n\nReturn `product`, `claim_count` (n) and `p90_amount`. Sort by `product`.',
    tables: {
      claims: rows(
        ['claim_id', 'product', 'amount'],
        [
          [1, 'Motor', 2600],
          [2, 'Motor', 500],
          [3, 'Motor', 25000],
          [4, 'Motor', 1200],
          [5, 'Motor', 9000],
          [6, 'Motor', 800],
          [7, 'Motor', 4500],
          [8, 'Motor', 1200],
          [9, 'Motor', 3100],
          [10, 'Motor', 2000],
          [11, 'Home', 1500],
          [12, 'Home', 400],
          [13, 'Home', 2200],
          [14, 'Home', 900],
          [15, 'Life', 50000],
        ],
      ),
    },
    solution: `WITH ordered AS (
  SELECT
    product,
    amount,
    ROW_NUMBER() OVER (PARTITION BY product ORDER BY amount) AS rn,
    COUNT(*) OVER (PARTITION BY product) AS n
  FROM claims
)
SELECT
  product,
  n AS claim_count,
  amount AS p90_amount
FROM ordered
WHERE rn = (9 * n + 9) / 10
ORDER BY product;`,
    notes: ['For whole numbers a and b, ⌈a / b⌉ equals the integer division (a + b − 1) / b.'],
  },
  {
    title: 'Daily Cancellation Rate Excluding Blocked Users',
    difficulty: 'hard',
    topics: ['Advanced'],
    statement:
      'Clients ask brokers for quotes through the portal. Each row of `quote_requests` names a `client_id` and a `broker_id`, both of which are `user_id`s in `portal_users`. A request is cancelled if its `status` is `cancelled_by_client` or `cancelled_by_broker`.\n\nFor each day from `2025-06-01` to `2025-06-03` inclusive, work out the cancellation rate: cancelled requests divided by all requests that day, counting only requests where neither the client nor the broker is blocked (`is_blocked = \'Yes\'`). Leave out days with no such requests.\n\nReturn `request_date` and `cancellation_rate`, rounded with `ROUND(x, 2)`, sorted by `request_date`.',
    tables: {
      portal_users: rows(
        ['user_id', 'role', 'is_blocked'],
        [
          [1, 'client', 'No'],
          [2, 'client', 'Yes'],
          [3, 'client', 'No'],
          [4, 'client', 'No'],
          [10, 'broker', 'No'],
          [11, 'broker', 'No'],
          [12, 'broker', 'Yes'],
          [13, 'broker', 'No'],
        ],
      ),
      quote_requests: rows(
        ['request_id', 'client_id', 'broker_id', 'status', 'request_date'],
        [
          [1, 1, 10, 'completed', '2025-06-01'],
          [2, 2, 11, 'cancelled_by_client', '2025-06-01'],
          [3, 3, 12, 'completed', '2025-06-01'],
          [4, 4, 13, 'cancelled_by_broker', '2025-06-01'],
          [5, 1, 10, 'completed', '2025-06-02'],
          [6, 3, 10, 'completed', '2025-06-02'],
          [7, 2, 10, 'completed', '2025-06-02'],
          [8, 4, 12, 'cancelled_by_client', '2025-06-02'],
          [9, 3, 11, 'cancelled_by_client', '2025-06-03'],
          [10, 1, 13, 'cancelled_by_broker', '2025-06-03'],
          [11, 4, 11, 'completed', '2025-06-03'],
          [12, 1, 10, 'cancelled_by_client', '2025-06-04'],
          [13, 3, 13, 'cancelled_by_broker', '2025-05-31'],
        ],
      ),
    },
    solution: `SELECT
  q.request_date,
  ROUND(
    1.0 * SUM(CASE WHEN q.status LIKE 'cancelled%' THEN 1 ELSE 0 END) / COUNT(*),
    2
  ) AS cancellation_rate
FROM quote_requests AS q
JOIN portal_users AS c
  ON c.user_id = q.client_id
  AND c.is_blocked = 'No'
JOIN portal_users AS b
  ON b.user_id = q.broker_id
  AND b.is_blocked = 'No'
WHERE q.request_date BETWEEN '2025-06-01' AND '2025-06-03'
GROUP BY q.request_date
ORDER BY q.request_date;`,
    notes: ['A day with eligible requests but no cancellations still appears, with a rate of 0.'],
  },
  {
    title: 'Chain of Command with a Recursive CTE',
    difficulty: 'hard',
    topics: ['Advanced'],
    statement:
      'In `staff`, `manager_id` is the `staff_id` of each person’s line manager; the head of the claims department has a `NULL` manager. Use a recursive CTE to describe where everyone sits in the hierarchy.\n\nReturn `staff_id`, `staff_name`, `level` (1 for the head, 2 for people who report to the head, and so on) and `reporting_line`: the names from the head down to this person joined with `\' > \'` (for example `Thandiwe > Pieter`). Sort by `level`, then `staff_id`.',
    tables: {
      staff: rows(
        ['staff_id', 'staff_name', 'manager_id'],
        [
          [1, 'Thandiwe', null],
          [4, 'Pieter', 1],
          [2, 'Naledi', 1],
          [7, 'Ruan', 4],
          [3, 'Kagiso', 4],
          [9, 'Zanele', 2],
          [5, 'Imran', 3],
          [8, 'Lindiwe', 3],
          [6, 'Megan', 9],
        ],
      ),
    },
    solution: `WITH RECURSIVE tree(staff_id, staff_name, level, reporting_line) AS (
  SELECT
    staff_id,
    staff_name,
    1,
    staff_name
  FROM staff
  WHERE manager_id IS NULL
  UNION ALL
  SELECT
    s.staff_id,
    s.staff_name,
    t.level + 1,
    t.reporting_line || ' > ' || s.staff_name
  FROM staff AS s
  JOIN tree AS t
    ON s.manager_id = t.staff_id
)
SELECT
  staff_id,
  staff_name,
  level,
  reporting_line
FROM tree
ORDER BY level, staff_id;`,
  },
  {
    title: 'Repeated Fund Prices',
    difficulty: 'hard',
    topics: ['Advanced'],
    statement:
      '`fund_prices` holds the daily unit price of each investment fund. On days when no price was published, `unit_price` is `NULL`. Find the days on which a fund’s published price was exactly the same as its previous published price: compare each non-null price with the most recent earlier non-null price for the same fund, skipping over any `NULL` days in between. A fund’s first published price has nothing to compare with.\n\nReturn `fund_code`, `price_date` and `unit_price`. Sort by `fund_code`, then `price_date`.',
    tables: {
      fund_prices: rows(
        ['fund_code', 'price_date', 'unit_price'],
        [
          ['EQT', '2025-01-02', 10.5],
          ['EQT', '2025-01-03', null],
          ['EQT', '2025-01-06', 10.5],
          ['EQT', '2025-01-07', 10.62],
          ['EQT', '2025-01-08', 10.62],
          ['EQT', '2025-01-09', null],
          ['EQT', '2025-01-10', 10.7],
          ['BND', '2025-01-02', 5.1],
          ['BND', '2025-01-03', 5.1],
          ['BND', '2025-01-06', null],
          ['BND', '2025-01-07', null],
          ['BND', '2025-01-08', 5.12],
          ['BND', '2025-01-09', 5.1],
          ['MMK', '2025-01-02', 10.7],
          ['MMK', '2025-01-03', 10.7],
        ],
      ),
    },
    solution: `WITH published AS (
  SELECT
    fund_code,
    price_date,
    unit_price,
    LAG(unit_price) OVER (PARTITION BY fund_code ORDER BY price_date) AS prev_price
  FROM fund_prices
  WHERE unit_price IS NOT NULL
)
SELECT
  fund_code,
  price_date,
  unit_price
FROM published
WHERE unit_price = prev_price
ORDER BY fund_code, price_date;`,
    notes: ['Filtering out the `NULL` days before using `LAG` makes "previous" mean "previous published".'],
  },
  {
    title: 'Monthly New Policies Including Empty Months',
    difficulty: 'hard',
    topics: ['Advanced'],
    statement:
      'Report new business from `policies` month by month, from the month of the earliest `start_date` to the month of the latest, including months in which no policies started.\n\nReturn `start_month` as text in the form `YYYY-MM`, `new_policies` (policies starting that month, 0 if none) and `policies_to_date` (the running total of new policies up to and including that month). Sort by `start_month`.',
    tables: {
      policies: rows(
        ['policy_id', 'start_date', 'product'],
        [
          [1, '2024-11-03', 'Motor'],
          [2, '2024-11-28', 'Home'],
          [3, '2025-01-15', 'Motor'],
          [4, '2025-01-02', 'Life'],
          [5, '2025-01-31', 'Motor'],
          [6, '2025-02-01', 'Home'],
          [7, '2025-05-20', 'Funeral'],
          [8, '2025-05-21', 'Motor'],
        ],
      ),
    },
    solution: `WITH RECURSIVE months(month_start) AS (
  SELECT date(MIN(start_date), 'start of month')
  FROM policies
  UNION ALL
  SELECT date(month_start, '+1 month')
  FROM months
  WHERE month_start < (SELECT date(MAX(start_date), 'start of month') FROM policies)
),
monthly AS (
  SELECT
    strftime('%Y-%m', m.month_start) AS start_month,
    COUNT(p.policy_id) AS new_policies
  FROM months AS m
  LEFT JOIN policies AS p
    ON strftime('%Y-%m', p.start_date) = strftime('%Y-%m', m.month_start)
  GROUP BY m.month_start
)
SELECT
  start_month,
  new_policies,
  SUM(new_policies) OVER (ORDER BY start_month) AS policies_to_date
FROM monthly
ORDER BY start_month;`,
    notes: ['`date(x, \'start of month\')` and `date(x, \'+1 month\')` make it easy to step through months.'],
  },
]
