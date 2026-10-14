import type { SqlSpec } from '../build_sql.ts'

// Core interview-style SQL problems: joins, aggregation, subqueries, filtering, strings and dates.
export const problems: SqlSpec[] = [
  // ---------------------------------------------------------------- easy
  {
    title: 'Policyholders and Their Addresses',
    difficulty: 'easy',
    topics: ['Joins'],
    statement:
      'Each policyholder has at most one address on file in `addresses`. Return `first_name`, `last_name`, `city` and `province` for every policyholder in `policyholders`. If a policyholder has no address, return `NULL` for `city` and `province`. Addresses that belong to a `holder_id` not in `policyholders` should be ignored.',
    tables: {
      policyholders: [
        { holder_id: 1, first_name: 'Thandi', last_name: 'Mokoena' },
        { holder_id: 2, first_name: 'Pieter', last_name: 'van Wyk' },
        { holder_id: 3, first_name: 'Ayesha', last_name: 'Patel' },
        { holder_id: 4, first_name: 'Sipho', last_name: 'Dlamini' },
        { holder_id: 5, first_name: 'Megan', last_name: 'Botha' },
        { holder_id: 6, first_name: 'Johan', last_name: 'Kruger' },
      ],
      addresses: [
        { address_id: 1, holder_id: 3, city: 'Durban', province: 'KwaZulu-Natal' },
        { address_id: 2, holder_id: 1, city: 'Soweto', province: 'Gauteng' },
        { address_id: 3, holder_id: 7, city: 'Kimberley', province: 'Northern Cape' },
        { address_id: 4, holder_id: 5, city: 'Stellenbosch', province: 'Western Cape' },
        { address_id: 5, holder_id: 6, city: 'Polokwane', province: null },
      ],
    },
    solution: `SELECT p.first_name, p.last_name, a.city, a.province
FROM policyholders AS p
LEFT JOIN addresses AS a
  ON a.holder_id = p.holder_id;`,
  },
  {
    title: 'Agents Who Sold Nothing',
    difficulty: 'easy',
    topics: ['Joins'],
    statement:
      'Return the `agent_name` of every agent in `agents` who has not sold a single policy in `policies`. Policies bought directly online have a `NULL` `agent_id`.',
    tables: {
      agents: [
        { agent_id: 1, agent_name: 'Lerato Nkosi' },
        { agent_id: 2, agent_name: 'Craig Adams' },
        { agent_id: 3, agent_name: 'Fatima Essop' },
        { agent_id: 4, agent_name: 'Bongani Zulu' },
        { agent_id: 5, agent_name: 'Annika Steyn' },
        { agent_id: 6, agent_name: 'Ravi Naidoo' },
      ],
      policies: [
        { policy_id: 101, agent_id: 1, premium: 850 },
        { policy_id: 102, agent_id: 3, premium: 1200 },
        { policy_id: 103, agent_id: null, premium: 640 },
        { policy_id: 104, agent_id: 1, premium: 990 },
        { policy_id: 105, agent_id: 5, premium: 1500 },
        { policy_id: 106, agent_id: null, premium: 720 },
        { policy_id: 107, agent_id: 3, premium: 430 },
      ],
    },
    solution: `SELECT a.agent_name
FROM agents AS a
LEFT JOIN policies AS p
  ON p.agent_id = a.agent_id
WHERE p.policy_id IS NULL;`,
    notes: ['`x NOT IN (...)` is never true when the list contains a `NULL`.'],
  },
  {
    title: 'Staff Paid More Than Their Manager',
    difficulty: 'easy',
    topics: ['Joins'],
    statement:
      'The `staff` table lists the employees of an insurer, and `manager_id` is the `staff_id` of each person’s manager (`NULL` for people with no manager). Return the `full_name` of every employee who earns strictly more than their manager, as `staff_name`.',
    tables: {
      staff: [
        { staff_id: 1, full_name: 'Nomsa Khumalo', salary: 98000, manager_id: null },
        { staff_id: 2, full_name: 'David Smit', salary: 61000, manager_id: 1 },
        { staff_id: 3, full_name: 'Kagiso Molefe', salary: 102000, manager_id: 1 },
        { staff_id: 4, full_name: 'Elena Rossi', salary: 45000, manager_id: 2 },
        { staff_id: 5, full_name: 'Tumi Mabaso', salary: 61000, manager_id: 2 },
        { staff_id: 6, full_name: 'Grant Peters', salary: 70000, manager_id: 2 },
        { staff_id: 7, full_name: 'Zanele Ndlovu', salary: 39000, manager_id: 3 },
        { staff_id: 8, full_name: 'Hendrik Venter', salary: 120000, manager_id: null },
      ],
    },
    solution: `SELECT s.full_name AS staff_name
FROM staff AS s
JOIN staff AS m
  ON m.staff_id = s.manager_id
WHERE s.salary > m.salary;`,
  },
  {
    title: 'Shared Email Addresses',
    difficulty: 'easy',
    topics: ['Aggregation'],
    statement:
      'Some policyholders were captured more than once, or share an email address with someone else. Return each `email` that appears on more than one row of `policyholders`, once each. Compare emails exactly as stored (upper and lower case count as different), and ignore missing (`NULL`) emails.',
    tables: {
      policyholders: [
        { holder_id: 1, full_name: 'Sarah Jacobs', email: 'sarah.j@mailbox.co.za' },
        { holder_id: 2, full_name: 'Musa Cele', email: 'musa.cele@webmail.com' },
        { holder_id: 3, full_name: 'Sarah Jacobs', email: 'sarah.j@mailbox.co.za' },
        { holder_id: 4, full_name: 'Liam Fourie', email: 'liam@fourie.net' },
        { holder_id: 5, full_name: 'Mpho Sithole', email: 'musa.cele@webmail.com' },
        { holder_id: 6, full_name: 'Karen Lee', email: null },
        { holder_id: 7, full_name: 'Ahmed Khan', email: null },
        { holder_id: 8, full_name: 'Sarah J', email: 'sarah.j@mailbox.co.za' },
        { holder_id: 9, full_name: 'Liam F', email: 'Liam@Fourie.net' },
      ],
    },
    solution: `SELECT email
FROM policyholders
WHERE email IS NOT NULL
GROUP BY email
HAVING COUNT(*) > 1;`,
  },
  {
    title: 'Large Group Schemes',
    difficulty: 'easy',
    topics: ['Filtering'],
    statement:
      'A group risk scheme counts as large if it has at least 500 `members` or an `annual_premium` of at least 2 000 000. Return `scheme_name`, `members` and `annual_premium` for every large scheme in `schemes`.',
    tables: {
      schemes: [
        { scheme_id: 1, scheme_name: 'Harbour Logistics', members: 420, annual_premium: 2350000 },
        { scheme_id: 2, scheme_name: 'Karoo Farmers Co-op', members: 510, annual_premium: 1200000 },
        { scheme_id: 3, scheme_name: 'Metro Dental Group', members: 85, annual_premium: 310000 },
        { scheme_id: 4, scheme_name: 'Summit Engineering', members: 500, annual_premium: 1999999 },
        { scheme_id: 5, scheme_name: 'Coastal Schools Trust', members: 300, annual_premium: 2000000 },
        { scheme_id: 6, scheme_name: 'Pinewood Retail', members: 499, annual_premium: 1999999 },
        { scheme_id: 7, scheme_name: 'Blue Crane Mining', members: 1200, annual_premium: 5400000 },
      ],
    },
    solution: `SELECT scheme_name, members, annual_premium
FROM schemes
WHERE members >= 500
   OR annual_premium >= 2000000;`,
  },
  {
    title: 'Not Referred by Agent 2',
    difficulty: 'easy',
    topics: ['Filtering'],
    statement:
      'Return the `full_name` of every policyholder in `policyholders` who was not referred by the agent with id `2`. Policyholders who signed up without a referring agent have a `NULL` `referring_agent_id` and should be included.',
    tables: {
      policyholders: [
        { holder_id: 1, full_name: 'Busi Mthembu', referring_agent_id: null },
        { holder_id: 2, full_name: 'Chris Olivier', referring_agent_id: 2 },
        { holder_id: 3, full_name: 'Naledi Mahlangu', referring_agent_id: 1 },
        { holder_id: 4, full_name: 'Yusuf Davids', referring_agent_id: null },
        { holder_id: 5, full_name: 'Lindiwe Shabalala', referring_agent_id: 2 },
        { holder_id: 6, full_name: 'Marco Ferreira', referring_agent_id: 3 },
      ],
    },
    solution: `SELECT full_name
FROM policyholders
WHERE referring_agent_id IS NULL
   OR referring_agent_id <> 2;`,
    notes: ['A comparison with `NULL`, such as `NULL <> 2`, is neither true nor false.'],
  },
  {
    title: 'Valid Motor Policy Numbers',
    difficulty: 'easy',
    topics: ['Strings & nulls'],
    statement:
      'A motor policy number is valid when it starts with exactly `MTR-` (in upper case) and is exactly 10 characters long. Return `policy_id` and `policy_number` for every policy in `policies` with a valid motor policy number.',
    tables: {
      policies: [
        { policy_id: 1, policy_number: 'MTR-104522' },
        { policy_id: 2, policy_number: 'MTR-88' },
        { policy_id: 3, policy_number: 'HOM-204511' },
        { policy_id: 4, policy_number: 'MTR-2045119' },
        { policy_id: 5, policy_number: 'mtr-554210' },
        { policy_id: 6, policy_number: 'MTR-731002' },
        { policy_id: 7, policy_number: 'XMTR-73100' },
        { policy_id: 8, policy_number: null },
      ],
    },
    solution: `SELECT policy_id, policy_number
FROM policies
WHERE SUBSTR(policy_number, 1, 4) = 'MTR-'
  AND LENGTH(policy_number) = 10;`,
    notes: ['In SQLite, `LIKE` ignores the case of ASCII letters, so `\'mtr-1\' LIKE \'MTR-%\'` is true.'],
  },
  {
    title: 'Tidy Policyholder Surnames',
    difficulty: 'easy',
    topics: ['Strings & nulls'],
    statement:
      'Surnames in `policyholders` were captured with random capitalisation. Return `holder_id` and the tidied surname as `surname`, where the first character is upper case and every other character is lower case. Order the rows by `holder_id`, lowest first.',
    tables: {
      policyholders: [
        { holder_id: 4, surname: 'mokoena' },
        { holder_id: 1, surname: 'BOTHA' },
        { holder_id: 6, surname: 'nAIDOO' },
        { holder_id: 2, surname: 'Smith' },
        { holder_id: 5, surname: 'dLAMINI' },
        { holder_id: 3, surname: 'x' },
      ],
    },
    solution: `SELECT holder_id,
       UPPER(SUBSTR(surname, 1, 1)) || LOWER(SUBSTR(surname, 2)) AS surname
FROM policyholders
ORDER BY holder_id;`,
  },
  {
    title: 'Best Contact Number',
    difficulty: 'easy',
    topics: ['Strings & nulls'],
    statement:
      'The call centre tries a policyholder’s mobile number first, then their work number, then their home number. Return `holder_id` and the number to call as `contact_number`: the first of `mobile`, `work_phone` and `home_phone` that is not `NULL`, or the text `No number` if all three are `NULL`.',
    tables: {
      policyholders: [
        { holder_id: 1, full_name: 'Gugu Shange', mobile: '082 555 0101', work_phone: '011 555 0199', home_phone: null },
        { holder_id: 2, full_name: 'Neil Pretorius', mobile: null, work_phone: '021 555 0142', home_phone: '021 555 0177' },
        { holder_id: 3, full_name: 'Priya Govender', mobile: null, work_phone: null, home_phone: '031 555 0123' },
        { holder_id: 4, full_name: 'Tom Bekker', mobile: null, work_phone: null, home_phone: null },
        { holder_id: 5, full_name: 'Zola Mkhize', mobile: '073 555 0188', work_phone: null, home_phone: '012 555 0110' },
        { holder_id: 6, full_name: 'Anel Swart', mobile: null, work_phone: '044 555 0165', home_phone: null },
      ],
    },
    solution: `SELECT holder_id,
       COALESCE(mobile, work_phone, home_phone, 'No number') AS contact_number
FROM policyholders;`,
  },
  {
    title: 'Triangular Stands',
    difficulty: 'easy',
    topics: ['Filtering'],
    statement:
      'A home insurer’s surveyors record the three boundary lengths of triangular stands in `stands`. Three lengths can only form a real triangle when each one is strictly less than the sum of the other two. Return `stand_id` and `is_valid`, which is `Yes` if the three sides can form a triangle and `No` otherwise.',
    tables: {
      stands: [
        { stand_id: 1, side_a: 30, side_b: 40, side_c: 50 },
        { stand_id: 2, side_a: 10, side_b: 20, side_c: 30 },
        { stand_id: 3, side_a: 25, side_b: 25, side_c: 25 },
        { stand_id: 4, side_a: 12, side_b: 5, side_c: 40 },
        { stand_id: 5, side_a: 60, side_b: 20, side_c: 45 },
        { stand_id: 6, side_a: 8, side_b: 90, side_c: 80 },
        { stand_id: 7, side_a: 15, side_b: 15, side_c: 29 },
      ],
    },
    solution: `SELECT stand_id,
       CASE
         WHEN side_a + side_b > side_c
          AND side_a + side_c > side_b
          AND side_b + side_c > side_a THEN 'Yes'
         ELSE 'No'
       END AS is_valid
FROM stands;`,
  },
  {
    title: 'Claims Reported in March 2025',
    difficulty: 'easy',
    topics: ['Dates'],
    statement:
      'Return `claim_id` and `reported_date` for every claim in `claims` reported in March 2025, that is from `2025-03-01` to `2025-03-31` inclusive.',
    tables: {
      claims: [
        { claim_id: 1, policy_id: 11, reported_date: '2025-02-28', amount: 3200 },
        { claim_id: 2, policy_id: 12, reported_date: '2025-03-01', amount: 850 },
        { claim_id: 3, policy_id: 11, reported_date: '2025-03-15', amount: 12400 },
        { claim_id: 4, policy_id: 14, reported_date: '2025-03-31', amount: 2100 },
        { claim_id: 5, policy_id: 15, reported_date: '2025-04-01', amount: 640 },
        { claim_id: 6, policy_id: 12, reported_date: '2024-03-12', amount: 5100 },
        { claim_id: 7, policy_id: 17, reported_date: '2025-03-09', amount: 990 },
      ],
    },
    solution: `SELECT claim_id, reported_date
FROM claims
WHERE reported_date BETWEEN '2025-03-01' AND '2025-03-31';`,
  },
  {
    title: 'Largest One-Off Claim Amount',
    difficulty: 'easy',
    topics: ['Subqueries'],
    statement:
      'Return the largest `amount` in `claims` that appears on exactly one claim, as `largest_single`. If every amount appears more than once, return a single row with `NULL`.',
    tables: {
      claims: [
        { claim_id: 1, amount: 9100 },
        { claim_id: 2, amount: 5000 },
        { claim_id: 3, amount: 9100 },
        { claim_id: 4, amount: 7200 },
        { claim_id: 5, amount: 3100 },
        { claim_id: 6, amount: 5000 },
        { claim_id: 7, amount: 2500 },
      ],
    },
    solution: `SELECT MAX(amount) AS largest_single
FROM (
  SELECT amount
  FROM claims
  GROUP BY amount
  HAVING COUNT(*) = 1
);`,
  },

  // ---------------------------------------------------------------- medium
  {
    title: 'Second-Highest Underwriter Salary',
    difficulty: 'medium',
    topics: ['Subqueries'],
    statement:
      'Return the second-highest distinct `salary` in `underwriters` as `second_highest_salary`. Several people can earn the same amount, so look at distinct salaries only, and ignore `NULL` salaries. If there is no second distinct salary, return a single row with `NULL`.',
    tables: {
      underwriters: [
        { underwriter_id: 1, full_name: 'Michelle Daniels', salary: 820000 },
        { underwriter_id: 2, full_name: 'Thabo Mokwena', salary: 765000 },
        { underwriter_id: 3, full_name: 'Rachel Adams', salary: 820000 },
        { underwriter_id: 4, full_name: 'Vusi Khoza', salary: 640000 },
        { underwriter_id: 5, full_name: 'Ilse Nel', salary: 765000 },
        { underwriter_id: 6, full_name: 'Kabelo Seleka', salary: null },
        { underwriter_id: 7, full_name: 'Shirin Hassan', salary: 590000 },
      ],
    },
    solution: `SELECT MAX(salary) AS second_highest_salary
FROM underwriters
WHERE salary < (
  SELECT MAX(salary)
  FROM underwriters
);`,
  },
  {
    title: 'Top Earner in Each Branch',
    difficulty: 'medium',
    topics: ['Subqueries'],
    statement:
      'Return `branch_name`, the employee’s `full_name` as `staff_name`, and `salary` for the highest-paid employee in each branch. If several people share the top salary in a branch, return all of them. Branches with no staff are not listed.',
    tables: {
      branches: [
        { branch_id: 1, branch_name: 'Cape Town' },
        { branch_id: 2, branch_name: 'Johannesburg' },
        { branch_id: 3, branch_name: 'Durban' },
        { branch_id: 4, branch_name: 'Gqeberha' },
      ],
      staff: [
        { staff_id: 1, full_name: 'Aisha Moosa', salary: 54000, branch_id: 1 },
        { staff_id: 2, full_name: 'Brent Cloete', salary: 61000, branch_id: 1 },
        { staff_id: 3, full_name: 'Carla Pillay', salary: 61000, branch_id: 1 },
        { staff_id: 4, full_name: 'Dumisani Ngcobo', salary: 72000, branch_id: 2 },
        { staff_id: 5, full_name: 'Erin Walsh', salary: 58000, branch_id: 2 },
        { staff_id: 6, full_name: 'Farouk Ismail', salary: 49000, branch_id: 3 },
        { staff_id: 7, full_name: 'Grace Mokoena', salary: 61000, branch_id: 3 },
        { staff_id: 8, full_name: 'Hannah Kruger', salary: 66000, branch_id: 3 },
      ],
    },
    solution: `SELECT b.branch_name, s.full_name AS staff_name, s.salary
FROM staff AS s
JOIN branches AS b
  ON b.branch_id = s.branch_id
WHERE s.salary = (
  SELECT MAX(s2.salary)
  FROM staff AS s2
  WHERE s2.branch_id = s.branch_id
);`,
  },
  {
    title: 'Team Leaders with Three or More Reports',
    difficulty: 'medium',
    topics: ['Aggregation'],
    statement:
      'In `claims_staff`, `team_leader_id` is the `staff_id` of each person’s team leader. Return the `full_name` of every team leader with at least three people reporting directly to them. Some staff still point to a team leader who has left and is no longer in the table; ignore those.',
    tables: {
      claims_staff: [
        { staff_id: 1, full_name: 'Precious Dube', team_leader_id: null },
        { staff_id: 2, full_name: 'Werner Louw', team_leader_id: 1 },
        { staff_id: 3, full_name: 'Ntombi Zwane', team_leader_id: 1 },
        { staff_id: 4, full_name: 'Ricardo Gomes', team_leader_id: 1 },
        { staff_id: 5, full_name: 'Sanele Mkhize', team_leader_id: 2 },
        { staff_id: 6, full_name: 'Tasneem Adams', team_leader_id: 2 },
        { staff_id: 7, full_name: 'Ulrich Brandt', team_leader_id: 12 },
        { staff_id: 8, full_name: 'Vuyo Tshabalala', team_leader_id: 12 },
        { staff_id: 9, full_name: 'Wendy Hart', team_leader_id: 12 },
        { staff_id: 10, full_name: 'Xolani Mthethwa', team_leader_id: 2 },
        { staff_id: 11, full_name: 'Yolanda Baker', team_leader_id: 3 },
      ],
    },
    solution: `SELECT l.full_name
FROM claims_staff AS l
JOIN claims_staff AS s
  ON s.team_leader_id = l.staff_id
GROUP BY l.staff_id, l.full_name
HAVING COUNT(*) >= 3;`,
  },
  {
    title: 'Monthly Debit Order Summary',
    difficulty: 'medium',
    topics: ['Aggregation'],
    statement:
      'Each row of `debit_orders` is one premium collection attempt, with `outcome` either `Paid` or `Returned`. For every calendar month that has at least one attempt, return `month` (as `YYYY-MM`), the number of attempts as `order_count`, the number paid as `paid_count`, the total of all `amount`s as `total_amount`, and the total of paid amounts as `paid_amount` (`0` if nothing was paid that month).',
    tables: {
      debit_orders: [
        { debit_id: 1, policy_id: 101, run_date: '2025-01-03', amount: 450, outcome: 'Paid' },
        { debit_id: 2, policy_id: 102, run_date: '2025-01-03', amount: 820, outcome: 'Returned' },
        { debit_id: 3, policy_id: 103, run_date: '2025-01-25', amount: 300, outcome: 'Paid' },
        { debit_id: 4, policy_id: 101, run_date: '2025-02-03', amount: 450, outcome: 'Returned' },
        { debit_id: 5, policy_id: 102, run_date: '2025-02-03', amount: 820, outcome: 'Returned' },
        { debit_id: 6, policy_id: 101, run_date: '2025-03-03', amount: 450, outcome: 'Paid' },
        { debit_id: 7, policy_id: 102, run_date: '2025-03-03', amount: 820, outcome: 'Paid' },
        { debit_id: 8, policy_id: 103, run_date: '2025-03-25', amount: 300, outcome: 'Returned' },
        { debit_id: 9, policy_id: 104, run_date: '2024-01-15', amount: 600, outcome: 'Paid' },
      ],
    },
    solution: `SELECT strftime('%Y-%m', run_date) AS month,
       COUNT(*) AS order_count,
       SUM(CASE WHEN outcome = 'Paid' THEN 1 ELSE 0 END) AS paid_count,
       SUM(amount) AS total_amount,
       SUM(CASE WHEN outcome = 'Paid' THEN amount ELSE 0 END) AS paid_amount
FROM debit_orders
GROUP BY strftime('%Y-%m', run_date);`,
  },
  {
    title: 'Most Common Cause of Loss',
    difficulty: 'medium',
    topics: ['Aggregation'],
    statement:
      'Return the `cause` that appears on the most claims in `claims`, with the number of claims as `claim_count`. If several causes tie for the most claims, return all of them. Ignore claims whose `cause` is `NULL` (not yet assessed).',
    tables: {
      claims: [
        { claim_id: 1, cause: 'Hail' },
        { claim_id: 2, cause: 'Theft' },
        { claim_id: 3, cause: null },
        { claim_id: 4, cause: 'Fire' },
        { claim_id: 5, cause: 'Hail' },
        { claim_id: 6, cause: null },
        { claim_id: 7, cause: 'Flood' },
        { claim_id: 8, cause: 'Theft' },
        { claim_id: 9, cause: null },
        { claim_id: 10, cause: 'Hail' },
        { claim_id: 11, cause: 'Theft' },
        { claim_id: 12, cause: null },
      ],
    },
    solution: `SELECT cause, COUNT(*) AS claim_count
FROM claims
WHERE cause IS NOT NULL
GROUP BY cause
HAVING COUNT(*) = (
  SELECT MAX(n)
  FROM (
    SELECT COUNT(*) AS n
    FROM claims
    WHERE cause IS NOT NULL
    GROUP BY cause
  )
);`,
  },
  {
    title: 'Holders of Every Product',
    difficulty: 'medium',
    topics: ['Aggregation'],
    statement:
      'Return the `holder_id` of every policyholder who holds at least one policy for every product in `products`. A holder may have several policies for the same product. Some old policies refer to retired products that are no longer in `products`; those do not count.',
    tables: {
      products: [
        { product_id: 1, product_name: 'Motor' },
        { product_id: 2, product_name: 'Home' },
        { product_id: 3, product_name: 'Life' },
      ],
      policies: [
        { policy_id: 1, holder_id: 1, product_id: 1 },
        { policy_id: 2, holder_id: 1, product_id: 2 },
        { policy_id: 3, holder_id: 1, product_id: 3 },
        { policy_id: 4, holder_id: 2, product_id: 1 },
        { policy_id: 5, holder_id: 2, product_id: 1 },
        { policy_id: 6, holder_id: 2, product_id: 2 },
        { policy_id: 7, holder_id: 3, product_id: 3 },
        { policy_id: 8, holder_id: 3, product_id: 2 },
        { policy_id: 9, holder_id: 3, product_id: 1 },
        { policy_id: 10, holder_id: 3, product_id: 1 },
        { policy_id: 11, holder_id: 4, product_id: 2 },
        { policy_id: 12, holder_id: 5, product_id: 1 },
        { policy_id: 13, holder_id: 5, product_id: 2 },
        { policy_id: 14, holder_id: 5, product_id: 4 },
      ],
    },
    solution: `SELECT p.holder_id
FROM policies AS p
JOIN products AS pr
  ON pr.product_id = p.product_id
GROUP BY p.holder_id
HAVING COUNT(DISTINCT p.product_id) = (
  SELECT COUNT(*)
  FROM products
);`,
  },
  {
    title: 'Agents Above Their Branch Average',
    difficulty: 'medium',
    topics: ['Subqueries'],
    statement:
      'An agent’s total is the sum of `premium` over their rows in `sales` (`0` if they have no sales). A branch’s average is the average of the totals of all agents in that branch, including agents with a total of `0`. Return `agent_name`, `branch` and `total_premium` for every agent whose total is strictly greater than their branch’s average.',
    tables: {
      agents: [
        { agent_id: 1, agent_name: 'Ama Owusu', branch: 'Pretoria' },
        { agent_id: 2, agent_name: 'Ben Joubert', branch: 'Pretoria' },
        { agent_id: 3, agent_name: 'Cleo Daniels', branch: 'Pretoria' },
        { agent_id: 4, agent_name: 'Dirk Visser', branch: 'Bloemfontein' },
        { agent_id: 5, agent_name: 'Esi Mensah', branch: 'Bloemfontein' },
        { agent_id: 6, agent_name: 'Fikile Radebe', branch: 'Bloemfontein' },
      ],
      sales: [
        { sale_id: 1, agent_id: 1, premium: 1000 },
        { sale_id: 2, agent_id: 1, premium: 500 },
        { sale_id: 3, agent_id: 2, premium: 900 },
        { sale_id: 4, agent_id: 3, premium: 300 },
        { sale_id: 5, agent_id: 4, premium: 2000 },
        { sale_id: 6, agent_id: 5, premium: 700 },
        { sale_id: 7, agent_id: 5, premium: 500 },
      ],
    },
    solution: `WITH totals AS (
  SELECT a.agent_id, a.agent_name, a.branch, COALESCE(SUM(s.premium), 0) AS total_premium
  FROM agents AS a
  LEFT JOIN sales AS s
    ON s.agent_id = a.agent_id
  GROUP BY a.agent_id, a.agent_name, a.branch
)
SELECT t.agent_name, t.branch, t.total_premium
FROM totals AS t
WHERE t.total_premium > (
  SELECT AVG(t2.total_premium)
  FROM totals AS t2
  WHERE t2.branch = t.branch
);`,
  },
  {
    title: 'Motor but Never Home',
    difficulty: 'medium',
    topics: ['Subqueries'],
    statement:
      'Return the `full_name` of every policyholder who has at least one `Motor` policy in `policies` but has never had a `Home` policy. List each person once.',
    tables: {
      policyholders: [
        { holder_id: 1, full_name: 'Jabu Mahlaba' },
        { holder_id: 2, full_name: 'Kerry Nolan' },
        { holder_id: 3, full_name: 'Lwazi Gumede' },
        { holder_id: 4, full_name: 'Mariam Khan' },
        { holder_id: 5, full_name: 'Nico Hattingh' },
        { holder_id: 6, full_name: 'Olwethu Bam' },
      ],
      policies: [
        { policy_id: 1, holder_id: 1, product: 'Motor' },
        { policy_id: 2, holder_id: 1, product: 'Motor' },
        { policy_id: 3, holder_id: 2, product: 'Motor' },
        { policy_id: 4, holder_id: 2, product: 'Home' },
        { policy_id: 5, holder_id: 3, product: 'Home' },
        { policy_id: 6, holder_id: 4, product: 'Life' },
        { policy_id: 7, holder_id: 4, product: 'Motor' },
        { policy_id: 8, holder_id: 6, product: 'Home' },
        { policy_id: 9, holder_id: 6, product: 'Life' },
      ],
    },
    solution: `SELECT h.full_name
FROM policyholders AS h
WHERE EXISTS (
    SELECT 1
    FROM policies AS p
    WHERE p.holder_id = h.holder_id
      AND p.product = 'Motor'
  )
  AND NOT EXISTS (
    SELECT 1
    FROM policies AS p
    WHERE p.holder_id = h.holder_id
      AND p.product = 'Home'
  );`,
  },
  {
    title: 'First Policy Each Holder Bought',
    difficulty: 'medium',
    topics: ['Subqueries'],
    statement:
      'For each policyholder, return their earliest policy in `policies`, meaning the one with the earliest `start_date`. Return `holder_id`, `product`, `start_date` and `premium`. If a holder started several policies on their earliest date, return all of them.',
    tables: {
      policies: [
        { policy_id: 1, holder_id: 1, product: 'Motor', start_date: '2022-05-01', premium: 650 },
        { policy_id: 2, holder_id: 1, product: 'Home', start_date: '2021-11-15', premium: 420 },
        { policy_id: 3, holder_id: 1, product: 'Life', start_date: '2023-01-01', premium: 300 },
        { policy_id: 4, holder_id: 2, product: 'Funeral', start_date: '2020-03-01', premium: 120 },
        { policy_id: 5, holder_id: 2, product: 'Motor', start_date: '2020-03-01', premium: 780 },
        { policy_id: 6, holder_id: 3, product: 'Home', start_date: '2024-07-19', premium: 510 },
        { policy_id: 7, holder_id: 4, product: 'Life', start_date: '2019-02-10', premium: 260 },
        { policy_id: 8, holder_id: 4, product: 'Motor', start_date: '2019-02-11', premium: 900 },
        { policy_id: 9, holder_id: 2, product: 'Home', start_date: '2021-06-30', premium: 400 },
      ],
    },
    solution: `SELECT p.holder_id, p.product, p.start_date, p.premium
FROM policies AS p
WHERE p.start_date = (
  SELECT MIN(p2.start_date)
  FROM policies AS p2
  WHERE p2.holder_id = p.holder_id
);`,
  },
  {
    title: 'Possible Duplicate Claims',
    difficulty: 'medium',
    topics: ['Subqueries'],
    statement:
      'A claim is a possible duplicate if at least one other claim in `claims` has the same `policy_id`, the same `loss_date` and the same `amount`. Return `claim_id`, `policy_id`, `loss_date` and `amount` for every claim that is a possible duplicate (all claims in each matching group, not just the extra ones).',
    tables: {
      claims: [
        { claim_id: 1, policy_id: 501, loss_date: '2025-02-10', amount: 4200 },
        { claim_id: 2, policy_id: 502, loss_date: '2025-02-10', amount: 4200 },
        { claim_id: 3, policy_id: 501, loss_date: '2025-02-10', amount: 4200 },
        { claim_id: 4, policy_id: 503, loss_date: '2025-03-05', amount: 900 },
        { claim_id: 5, policy_id: 503, loss_date: '2025-03-05', amount: 950 },
        { claim_id: 6, policy_id: 504, loss_date: '2025-04-01', amount: 12500 },
        { claim_id: 7, policy_id: 504, loss_date: '2025-04-01', amount: 12500 },
        { claim_id: 8, policy_id: 504, loss_date: '2025-04-01', amount: 12500 },
        { claim_id: 9, policy_id: 501, loss_date: '2025-02-11', amount: 4200 },
      ],
    },
    solution: `SELECT c.claim_id, c.policy_id, c.loss_date, c.amount
FROM claims AS c
WHERE (
  SELECT COUNT(*)
  FROM claims AS c2
  WHERE c2.policy_id = c.policy_id
    AND c2.loss_date = c.loss_date
    AND c2.amount = c.amount
) > 1;`,
  },
  {
    title: 'Every Agent and Every Product',
    difficulty: 'medium',
    topics: ['Joins'],
    statement:
      'Return one row for every combination of an agent in `agents` and a product in `products`, with `agent_name`, `product_name` and the number of matching rows in `sales` as `policies_sold` (`0` if that agent never sold that product). Order the rows by `agent_name`, then by `product_name`, both in ascending order.',
    tables: {
      agents: [
        { agent_id: 1, agent_name: 'Kayla Moodley' },
        { agent_id: 2, agent_name: 'Bheki Nxumalo' },
        { agent_id: 3, agent_name: 'Dawn Fischer' },
      ],
      products: [
        { product_id: 1, product_name: 'Motor' },
        { product_id: 2, product_name: 'Home' },
        { product_id: 3, product_name: 'Life' },
      ],
      sales: [
        { sale_id: 1, agent_id: 1, product_id: 1 },
        { sale_id: 2, agent_id: 1, product_id: 1 },
        { sale_id: 3, agent_id: 1, product_id: 2 },
        { sale_id: 4, agent_id: 2, product_id: 1 },
        { sale_id: 5, agent_id: 2, product_id: 3 },
        { sale_id: 6, agent_id: 2, product_id: 3 },
        { sale_id: 7, agent_id: 2, product_id: 3 },
        { sale_id: 8, agent_id: 1, product_id: 1 },
      ],
    },
    solution: `SELECT a.agent_name, p.product_name, COUNT(s.sale_id) AS policies_sold
FROM agents AS a
CROSS JOIN products AS p
LEFT JOIN sales AS s
  ON s.agent_id = a.agent_id
 AND s.product_id = p.product_id
GROUP BY a.agent_id, a.agent_name, p.product_id, p.product_name
ORDER BY a.agent_name, p.product_name;`,
  },
  {
    title: 'Claims with Holder and Handler',
    difficulty: 'medium',
    topics: ['Joins'],
    statement:
      'Every claim in `claims` belongs to a policy in `policies`. Return `claim_id`, the policy’s `holder_name`, and the `handler_name` of the claims handler from `handlers`. If a claim has no handler (`handler_id` is `NULL`) or its handler is no longer in `handlers`, return `Unassigned` as the `handler_name`.',
    tables: {
      claims: [
        { claim_id: 1, policy_id: 10, handler_id: 1, amount: 4500 },
        { claim_id: 2, policy_id: 11, handler_id: null, amount: 1200 },
        { claim_id: 3, policy_id: 10, handler_id: 2, amount: 800 },
        { claim_id: 4, policy_id: 12, handler_id: 9, amount: 15600 },
        { claim_id: 5, policy_id: 13, handler_id: 1, amount: 2300 },
        { claim_id: 6, policy_id: 12, handler_id: 2, amount: 640 },
        { claim_id: 7, policy_id: 11, handler_id: 1, amount: 3900 },
      ],
      policies: [
        { policy_id: 10, holder_name: 'Sibusiso Ntuli' },
        { policy_id: 11, holder_name: 'Lauren Meyer' },
        { policy_id: 12, holder_name: 'Imran Patel' },
        { policy_id: 13, holder_name: 'Palesa Motaung' },
        { policy_id: 14, holder_name: 'Gert Coetzee' },
      ],
      handlers: [
        { handler_id: 1, handler_name: 'Rene Lombard' },
        { handler_id: 2, handler_name: 'Themba Sithebe' },
        { handler_id: 3, handler_name: 'Ursula Becker' },
      ],
    },
    solution: `SELECT c.claim_id, p.holder_name, COALESCE(h.handler_name, 'Unassigned') AS handler_name
FROM claims AS c
JOIN policies AS p
  ON p.policy_id = c.policy_id
LEFT JOIN handlers AS h
  ON h.handler_id = c.handler_id;`,
  },
  {
    title: 'Products Sold per Day',
    difficulty: 'medium',
    topics: ['Strings & nulls'],
    statement:
      'For each `sale_date` in `sales`, return `sale_date`, the number of different products sold that day as `product_count`, and the names of those products as `products`: each name once, in alphabetical order, separated by commas with no spaces (for example `Home,Motor`). Order the rows by `sale_date`, earliest first.',
    tables: {
      sales: [
        { sale_id: 1, sale_date: '2025-05-01', product: 'Motor' },
        { sale_id: 2, sale_date: '2025-05-01', product: 'Home' },
        { sale_id: 3, sale_date: '2025-05-01', product: 'Motor' },
        { sale_id: 4, sale_date: '2025-05-02', product: 'Life' },
        { sale_id: 5, sale_date: '2025-05-03', product: 'Travel' },
        { sale_id: 6, sale_date: '2025-05-03', product: 'Funeral' },
        { sale_id: 7, sale_date: '2025-05-03', product: 'Home' },
        { sale_id: 8, sale_date: '2025-05-03', product: 'Funeral' },
        { sale_id: 9, sale_date: '2025-04-30', product: 'Life' },
        { sale_id: 10, sale_date: '2025-04-30', product: 'Gap Cover' },
      ],
    },
    solution: `SELECT sale_date,
       COUNT(DISTINCT product) AS product_count,
       GROUP_CONCAT(DISTINCT product ORDER BY product) AS products
FROM sales
GROUP BY sale_date
ORDER BY sale_date;`,
    notes: ['SQLite’s `GROUP_CONCAT` accepts `DISTINCT` and an `ORDER BY` inside its brackets.'],
  },
  {
    title: 'Average Days to Settle per Handler',
    difficulty: 'medium',
    topics: ['Dates'],
    statement:
      'The time to settle a claim is the number of days from `reported_date` to `settled_date`. Open claims have a `NULL` `settled_date` and are left out. Return every handler’s `handler_name` and their average time to settle as `avg_days_to_settle`, rounded to 2 decimal places. Handlers with no settled claims are still listed, with `NULL`.',
    tables: {
      handlers: [
        { handler_id: 1, handler_name: 'Refilwe Moagi' },
        { handler_id: 2, handler_name: 'Stefan du Toit' },
        { handler_id: 3, handler_name: 'Lebo Ramaphosa' },
        { handler_id: 4, handler_name: 'Joanne Wu' },
      ],
      claims: [
        { claim_id: 1, handler_id: 1, reported_date: '2025-01-02', settled_date: '2025-01-12' },
        { claim_id: 2, handler_id: 1, reported_date: '2025-01-20', settled_date: '2025-02-03' },
        { claim_id: 3, handler_id: 1, reported_date: '2025-02-01', settled_date: null },
        { claim_id: 4, handler_id: 2, reported_date: '2025-03-01', settled_date: '2025-03-01' },
        { claim_id: 5, handler_id: 2, reported_date: '2025-03-10', settled_date: '2025-03-17' },
        { claim_id: 6, handler_id: 2, reported_date: '2025-02-27', settled_date: '2025-03-02' },
        { claim_id: 7, handler_id: 3, reported_date: '2025-04-01', settled_date: null },
      ],
    },
    solution: `SELECT h.handler_name,
       ROUND(AVG(julianday(c.settled_date) - julianday(c.reported_date)), 2) AS avg_days_to_settle
FROM handlers AS h
LEFT JOIN claims AS c
  ON c.handler_id = h.handler_id
GROUP BY h.handler_id, h.handler_name;`,
    notes: ['`julianday(b) - julianday(a)` is the number of days from date `a` to date `b`.'],
  },
  {
    title: 'Busier Than the Day Before',
    difficulty: 'medium',
    topics: ['Dates'],
    statement:
      '`daily_claims` holds the number of claims reported on each day, but days with no record are missing from the table. Return every `report_date` on which `claims_reported` was strictly higher than on the previous calendar day. If the previous calendar day has no row, that date is not returned.',
    tables: {
      daily_claims: [
        { report_date: '2025-06-01', claims_reported: 12 },
        { report_date: '2025-06-02', claims_reported: 15 },
        { report_date: '2025-06-03', claims_reported: 15 },
        { report_date: '2025-06-04', claims_reported: 9 },
        { report_date: '2025-06-06', claims_reported: 20 },
        { report_date: '2025-06-07', claims_reported: 22 },
        { report_date: '2025-06-08', claims_reported: 18 },
        { report_date: '2025-06-30', claims_reported: 10 },
        { report_date: '2025-07-01', claims_reported: 14 },
      ],
    },
    solution: `SELECT today.report_date
FROM daily_claims AS today
JOIN daily_claims AS prev
  ON prev.report_date = date(today.report_date, '-1 day')
WHERE today.claims_reported > prev.claims_reported;`,
  },
  {
    title: 'Debit Order Success Rate',
    difficulty: 'medium',
    topics: ['Joins'],
    statement:
      'Each row of `collections` is one debit order attempt for a policyholder, with `outcome` either `Paid` or `Returned`. For every policyholder in `policyholders`, return `holder_id` and `success_rate`: the number of `Paid` attempts divided by the number of attempts, rounded to 2 decimal places. A policyholder with no attempts has a `success_rate` of `0`.',
    tables: {
      policyholders: [
        { holder_id: 1, full_name: 'Andile Nene' },
        { holder_id: 2, full_name: 'Bianca Rossouw' },
        { holder_id: 3, full_name: 'Calvin Moyo' },
        { holder_id: 4, full_name: 'Deepa Reddy' },
        { holder_id: 5, full_name: 'Eben Vermaak' },
      ],
      collections: [
        { collection_id: 1, holder_id: 1, run_date: '2025-01-01', outcome: 'Paid' },
        { collection_id: 2, holder_id: 1, run_date: '2025-02-01', outcome: 'Paid' },
        { collection_id: 3, holder_id: 1, run_date: '2025-03-01', outcome: 'Returned' },
        { collection_id: 4, holder_id: 2, run_date: '2025-01-01', outcome: 'Returned' },
        { collection_id: 5, holder_id: 4, run_date: '2025-01-01', outcome: 'Paid' },
        { collection_id: 6, holder_id: 5, run_date: '2025-01-01', outcome: 'Paid' },
        { collection_id: 7, holder_id: 5, run_date: '2025-02-01', outcome: 'Returned' },
        { collection_id: 8, holder_id: 5, run_date: '2025-03-01', outcome: 'Returned' },
        { collection_id: 9, holder_id: 5, run_date: '2025-04-01', outcome: 'Paid' },
      ],
    },
    solution: `SELECT h.holder_id,
       ROUND(COALESCE(SUM(CASE WHEN c.outcome = 'Paid' THEN 1.0 ELSE 0 END) / COUNT(c.collection_id), 0), 2) AS success_rate
FROM policyholders AS h
LEFT JOIN collections AS c
  ON c.holder_id = h.holder_id
GROUP BY h.holder_id;`,
    notes: ['In SQLite, dividing by zero gives `NULL`.'],
  },

  // ---------------------------------------------------------------- hard
  {
    title: 'Branch Payouts Against the Company',
    difficulty: 'hard',
    topics: ['Subqueries'],
    statement:
      'Each payout in `payouts` was made by a claims handler, and `handlers` gives each handler’s `branch_id`. For each month (as `YYYY-MM`) and each branch with payouts that month, compare the branch’s average payout `amount` with the company’s average payout that month (the average over all payouts in the month, not the average of the branch averages). Return `pay_month`, `branch_id` and `comparison`, which is `higher`, `lower` or `same`. Order the rows by `pay_month`, then by `branch_id`, both ascending.',
    tables: {
      handlers: [
        { handler_id: 1, branch_id: 10 },
        { handler_id: 2, branch_id: 10 },
        { handler_id: 3, branch_id: 20 },
        { handler_id: 4, branch_id: 30 },
      ],
      payouts: [
        { payout_id: 1, handler_id: 1, pay_date: '2025-01-08', amount: 6000 },
        { payout_id: 2, handler_id: 2, pay_date: '2025-01-15', amount: 2000 },
        { payout_id: 3, handler_id: 3, pay_date: '2025-01-20', amount: 5000 },
        { payout_id: 4, handler_id: 4, pay_date: '2025-01-28', amount: 3000 },
        { payout_id: 5, handler_id: 1, pay_date: '2025-02-03', amount: 9000 },
        { payout_id: 6, handler_id: 3, pay_date: '2025-02-10', amount: 3000 },
        { payout_id: 7, handler_id: 3, pay_date: '2025-02-14', amount: 4000 },
        { payout_id: 8, handler_id: 3, pay_date: '2025-02-21', amount: 5000 },
        { payout_id: 9, handler_id: 4, pay_date: '2025-02-25', amount: 6000 },
        { payout_id: 10, handler_id: 4, pay_date: '2025-03-04', amount: 2500 },
        { payout_id: 11, handler_id: 2, pay_date: '2025-03-19', amount: 2500 },
      ],
    },
    solution: `WITH monthly AS (
  SELECT strftime('%Y-%m', p.pay_date) AS pay_month, h.branch_id, p.amount
  FROM payouts AS p
  JOIN handlers AS h
    ON h.handler_id = p.handler_id
),
branch_avg AS (
  SELECT pay_month, branch_id, AVG(amount) AS avg_amount
  FROM monthly
  GROUP BY pay_month, branch_id
),
company_avg AS (
  SELECT pay_month, AVG(amount) AS avg_amount
  FROM monthly
  GROUP BY pay_month
)
SELECT b.pay_month,
       b.branch_id,
       CASE
         WHEN b.avg_amount > c.avg_amount THEN 'higher'
         WHEN b.avg_amount < c.avg_amount THEN 'lower'
         ELSE 'same'
       END AS comparison
FROM branch_avg AS b
JOIN company_avg AS c
  ON c.pay_month = b.pay_month
ORDER BY b.pay_month, b.branch_id;`,
  },
  {
    title: 'Average Rate Charged per Product',
    difficulty: 'hard',
    topics: ['Joins'],
    statement:
      'The `rates` table gives each product’s `rate` per unit of cover for periods from `start_date` to `end_date` inclusive; a product’s periods never overlap. Each sale in `sales` is charged the rate in force for its product on its `sale_date`. For every product in `rates`, return `product_id` and the unit-weighted average rate charged as `avg_rate`: the total of `rate * units` divided by the total `units`, rounded to 2 decimal places. A product with no sales has an `avg_rate` of `0`.',
    tables: {
      rates: [
        { product_id: 1, start_date: '2025-01-01', end_date: '2025-03-31', rate: 12.5 },
        { product_id: 1, start_date: '2025-04-01', end_date: '2025-12-31', rate: 14 },
        { product_id: 2, start_date: '2025-01-01', end_date: '2025-06-30', rate: 30 },
        { product_id: 2, start_date: '2025-07-01', end_date: '2025-12-31', rate: 27.5 },
        { product_id: 3, start_date: '2025-01-01', end_date: '2025-12-31', rate: 8 },
      ],
      sales: [
        { sale_id: 1, product_id: 1, sale_date: '2025-02-14', units: 100 },
        { sale_id: 2, product_id: 1, sale_date: '2025-03-31', units: 40 },
        { sale_id: 3, product_id: 1, sale_date: '2025-04-01', units: 60 },
        { sale_id: 4, product_id: 2, sale_date: '2025-06-30', units: 10 },
        { sale_id: 5, product_id: 2, sale_date: '2025-07-15', units: 30 },
        { sale_id: 6, product_id: 2, sale_date: '2025-12-31', units: 20 },
      ],
    },
    solution: `SELECT r.product_id,
       ROUND(COALESCE(SUM(r.rate * s.units) / SUM(s.units), 0), 2) AS avg_rate
FROM rates AS r
LEFT JOIN sales AS s
  ON s.product_id = r.product_id
 AND s.sale_date BETWEEN r.start_date AND r.end_date
GROUP BY r.product_id;`,
  },
  {
    title: 'Rate in Force on the Valuation Date',
    difficulty: 'hard',
    topics: ['Subqueries'],
    statement:
      'Every product starts with a rate of `100`, and `rate_changes` records each change to a new rate from its `change_date` onwards. For every product in `products`, return `product_name` and the `rate` in force on the valuation date `2025-06-30`: the `new_rate` of its latest change on or before that date, or `100` if it had no change by then.',
    tables: {
      products: [
        { product_id: 1, product_name: 'Motor Plus' },
        { product_id: 2, product_name: 'Home Secure' },
        { product_id: 3, product_name: 'Life Classic' },
        { product_id: 4, product_name: 'Funeral Basic' },
      ],
      rate_changes: [
        { product_id: 1, change_date: '2025-01-01', new_rate: 105 },
        { product_id: 1, change_date: '2025-06-30', new_rate: 110 },
        { product_id: 1, change_date: '2025-07-01', new_rate: 120 },
        { product_id: 2, change_date: '2024-11-15', new_rate: 95 },
        { product_id: 2, change_date: '2025-03-01', new_rate: 98 },
        { product_id: 2, change_date: '2025-09-01', new_rate: 101 },
        { product_id: 3, change_date: '2025-08-01', new_rate: 130 },
      ],
    },
    solution: `SELECT p.product_name,
       COALESCE((
         SELECT rc.new_rate
         FROM rate_changes AS rc
         WHERE rc.product_id = p.product_id
           AND rc.change_date <= '2025-06-30'
         ORDER BY rc.change_date DESC
         LIMIT 1
       ), 100) AS rate
FROM products AS p;`,
  },
  {
    title: 'Same-Day Settlement of First Claims',
    difficulty: 'hard',
    topics: ['Subqueries'],
    statement:
      'A policyholder’s first claim is their claim in `claims` with the earliest `reported_date` (no holder reported two claims on their first day). Among all policyholders’ first claims, find the percentage that were settled on the same day they were reported. Open claims have a `NULL` `settled_date` and count as not settled on the same day. Return a single value `same_day_pct`, as a percentage rounded to 2 decimal places (for example `25.0` for a quarter).',
    tables: {
      claims: [
        { claim_id: 1, holder_id: 1, reported_date: '2025-01-05', settled_date: '2025-01-05' },
        { claim_id: 2, holder_id: 1, reported_date: '2025-02-10', settled_date: '2025-02-10' },
        { claim_id: 3, holder_id: 2, reported_date: '2025-01-07', settled_date: '2025-01-09' },
        { claim_id: 4, holder_id: 2, reported_date: '2025-03-01', settled_date: '2025-03-01' },
        { claim_id: 5, holder_id: 3, reported_date: '2025-02-02', settled_date: '2025-02-02' },
        { claim_id: 6, holder_id: 4, reported_date: '2025-02-20', settled_date: null },
        { claim_id: 7, holder_id: 5, reported_date: '2025-03-03', settled_date: '2025-03-03' },
        { claim_id: 8, holder_id: 4, reported_date: '2025-01-30', settled_date: '2025-02-05' },
        { claim_id: 9, holder_id: 6, reported_date: '2025-04-11', settled_date: '2025-04-12' },
        { claim_id: 10, holder_id: 7, reported_date: '2025-05-01', settled_date: '2025-05-01' },
        { claim_id: 11, holder_id: 6, reported_date: '2025-05-20', settled_date: null },
      ],
    },
    solution: `SELECT ROUND(100.0 * SUM(CASE WHEN c.settled_date = c.reported_date THEN 1 ELSE 0 END) / COUNT(*), 2) AS same_day_pct
FROM claims AS c
WHERE c.reported_date = (
  SELECT MIN(c2.reported_date)
  FROM claims AS c2
  WHERE c2.holder_id = c.holder_id
);`,
  },
  {
    title: 'Sum Insured of Distinctive Properties',
    difficulty: 'hard',
    topics: ['Subqueries'],
    statement:
      'A property in `properties` counts towards the total if both of these hold: no other property has the same `postal_code`, and at least one other property has the same `construction` type. Return the total `sum_insured` of the properties that count, as `total_sum_insured`, rounded to 2 decimal places.',
    tables: {
      properties: [
        { property_id: 1, postal_code: '7441', construction: 'Brick', sum_insured: 1250000.5 },
        { property_id: 2, postal_code: '7441', construction: 'Timber', sum_insured: 980000 },
        { property_id: 3, postal_code: '2196', construction: 'Brick', sum_insured: 2100000.25 },
        { property_id: 4, postal_code: '4001', construction: 'Thatch', sum_insured: 760000 },
        { property_id: 5, postal_code: '0081', construction: 'Timber', sum_insured: 1430000.75 },
        { property_id: 6, postal_code: '8001', construction: 'Steel', sum_insured: 3300000 },
        { property_id: 7, postal_code: '9301', construction: 'Brick', sum_insured: 1890000.1 },
        { property_id: 8, postal_code: '0081', construction: 'Brick', sum_insured: 2750000 },
        { property_id: 9, postal_code: '6001', construction: 'Brick', sum_insured: 1675000.4 },
      ],
    },
    solution: `SELECT ROUND(SUM(p.sum_insured), 2) AS total_sum_insured
FROM properties AS p
WHERE (
    SELECT COUNT(*)
    FROM properties AS q
    WHERE q.postal_code = p.postal_code
  ) = 1
  AND (
    SELECT COUNT(*)
    FROM properties AS q
    WHERE q.construction = p.construction
  ) > 1;`,
  },
  {
    title: 'Best-Connected Policyholder',
    difficulty: 'hard',
    topics: ['Aggregation'],
    statement:
      'Each row of `referrals` records that one policyholder referred another. Two people are connected if either referred the other; a connection counts once, even if it was recorded twice or in both directions. Return `person_id` and their number of distinct connections as `connections` for the person with the most connections. If several people tie, return all of them.',
    tables: {
      referrals: [
        { referrer_id: 1, referred_id: 2, referral_date: '2025-01-03' },
        { referrer_id: 1, referred_id: 3, referral_date: '2025-01-09' },
        { referrer_id: 2, referred_id: 3, referral_date: '2025-02-14' },
        { referrer_id: 3, referred_id: 4, referral_date: '2025-02-20' },
        { referrer_id: 4, referred_id: 3, referral_date: '2025-03-02' },
        { referrer_id: 3, referred_id: 1, referral_date: '2025-03-11' },
        { referrer_id: 5, referred_id: 1, referral_date: '2025-03-15' },
        { referrer_id: 2, referred_id: 6, referral_date: '2025-04-01' },
        { referrer_id: 2, referred_id: 7, referral_date: '2025-04-18' },
        { referrer_id: 8, referred_id: 3, referral_date: '2025-05-05' },
      ],
    },
    solution: `WITH pairs AS (
  SELECT DISTINCT
         MIN(referrer_id, referred_id) AS person_a,
         MAX(referrer_id, referred_id) AS person_b
  FROM referrals
),
links AS (
  SELECT person_a AS person_id
  FROM pairs
  UNION ALL
  SELECT person_b AS person_id
  FROM pairs
),
counts AS (
  SELECT person_id, COUNT(*) AS connections
  FROM links
  GROUP BY person_id
)
SELECT person_id, connections
FROM counts
WHERE connections = (
  SELECT MAX(connections)
  FROM counts
);`,
    notes: ['With two or more arguments, `MIN(a, b)` and `MAX(a, b)` return the smaller and larger of their arguments.'],
  },
]
