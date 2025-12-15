// SQL Practice Problems for Actuaries
const sqlProblems = [
    {
        id: 1,
        title: "Query Policy Data",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a SQL query to select all policies from the policies table where the premium is greater than 1000.</p>
        
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  policy_holder_name VARCHAR(100),
  premium DECIMAL(10,2),
  start_date DATE,
  status VARCHAR(20)
)</code></pre>
        
        <h3>Sample Data</h3>
        <p>The policies table contains insurance policy records with various premiums.</p>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT * 
FROM policies
WHERE premium > 1000;`,
        sampleData: [
            { policy_id: 1, policy_holder_name: 'John Doe', premium: 1500.00, start_date: '2023-01-01', status: 'Active' },
            { policy_id: 2, policy_holder_name: 'Jane Smith', premium: 800.00, start_date: '2023-02-15', status: 'Active' },
            { policy_id: 3, policy_holder_name: 'Bob Johnson', premium: 1200.00, start_date: '2023-03-20', status: 'Active' }
        ],
        expectedResult: [
            { policy_id: 1, policy_holder_name: 'John Doe', premium: 1500.00 },
            { policy_id: 3, policy_holder_name: 'Bob Johnson', premium: 1200.00 }
        ]
    },
    {
        id: 2,
        title: "Calculate Total Premiums",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a SQL query to calculate the total premium for all active policies.</p>
        
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2),
  status VARCHAR(20)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT SUM(premium) AS total_premium
FROM policies
WHERE status = 'Active';`,
        sampleData: [
            { policy_id: 1, premium: 1500.00, status: 'Active' },
            { policy_id: 2, premium: 800.00, status: 'Active' },
            { policy_id: 3, premium: 1200.00, status: 'Cancelled' }
        ],
        expectedResult: [{ total_premium: 2300.00 }]
    },
    {
        id: 3,
        title: "Join Claims and Policies",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query to join the claims table with the policies table to show claim amounts with policy holder names.</p>
        
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT PRIMARY KEY,
  policy_holder_name VARCHAR(100)
)

claims (
  claim_id INT,
  policy_id INT,
  claim_amount DECIMAL(10,2),
  claim_date DATE
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT p.policy_holder_name, c.claim_amount, c.claim_date
FROM claims c
INNER JOIN policies p ON c.policy_id = p.policy_id;`,
        sampleData: {
            policies: [
                { policy_id: 1, policy_holder_name: 'John Doe' },
                { policy_id: 2, policy_holder_name: 'Jane Smith' }
            ],
            claims: [
                { claim_id: 1, policy_id: 1, claim_amount: 5000.00, claim_date: '2023-06-01' },
                { claim_id: 2, policy_id: 2, claim_amount: 3000.00, claim_date: '2023-07-15' }
            ]
        },
        expectedResult: [
            { policy_holder_name: 'John Doe', claim_amount: 5000.00, claim_date: '2023-06-01' },
            { policy_holder_name: 'Jane Smith', claim_amount: 3000.00, claim_date: '2023-07-15' }
        ]
    },
    {
        id: 4,
        title: "Group By and Aggregate",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query to find the average premium by status.</p>
        
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2),
  status VARCHAR(20)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT status, AVG(premium) AS avg_premium
FROM policies
GROUP BY status;`,
        sampleData: [
            { policy_id: 1, premium: 1500.00, status: 'Active' },
            { policy_id: 2, premium: 800.00, status: 'Active' },
            { policy_id: 3, premium: 1200.00, status: 'Cancelled' }
        ],
        expectedResult: [
            { status: 'Active', avg_premium: 1150.00 },
            { status: 'Cancelled', avg_premium: 1200.00 }
        ]
    },
    {
        id: 5,
        title: "Find Maximum Premium",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a SQL query to find the maximum premium from the policies table.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT MAX(premium) AS max_premium
FROM policies;`,
        sampleData: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 2, premium: 800.00 },
            { policy_id: 3, premium: 1200.00 }
        ],
        expectedResult: [{ max_premium: 1500.00 }]
    },
    {
        id: 6,
        title: "Find Minimum Premium",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a SQL query to find the minimum premium from the policies table.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT MIN(premium) AS min_premium
FROM policies;`,
        sampleData: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 2, premium: 800.00 },
            { policy_id: 3, premium: 1200.00 }
        ],
        expectedResult: [{ min_premium: 800.00 }]
    },
    {
        id: 7,
        title: "Count Policies by Status",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a SQL query to count the number of policies grouped by status.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  status VARCHAR(20)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT status, COUNT(*) AS policy_count
FROM policies
GROUP BY status;`,
        sampleData: [
            { policy_id: 1, status: 'Active' },
            { policy_id: 2, status: 'Active' },
            { policy_id: 3, status: 'Cancelled' }
        ],
        expectedResult: [
            { status: 'Active', policy_count: 2 },
            { status: 'Cancelled', policy_count: 1 }
        ]
    },
    {
        id: 8,
        title: "Filter Policies by Date Range",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query to select policies started between two dates.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  start_date DATE
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT *
FROM policies
WHERE start_date BETWEEN '2023-01-01' AND '2023-12-31';`,
        sampleData: [
            { policy_id: 1, start_date: '2023-01-01' },
            { policy_id: 2, start_date: '2022-12-15' },
            { policy_id: 3, start_date: '2023-03-20' }
        ],
        expectedResult: [
            { policy_id: 1, start_date: '2023-01-01' },
            { policy_id: 3, start_date: '2023-03-20' }
        ]
    },
    {
        id: 9,
        title: "Order Policies by Premium",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a SQL query to select all policies ordered by premium in descending order.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT *
FROM policies
ORDER BY premium DESC;`,
        sampleData: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 2, premium: 800.00 },
            { policy_id: 3, premium: 1200.00 }
        ],
        expectedResult: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 3, premium: 1200.00 },
            { policy_id: 2, premium: 800.00 }
        ]
    },
    {
        id: 10,
        title: "Calculate Average Claim Amount",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a SQL query to calculate the average claim amount from the claims table.</p>
        <h3>Database Schema</h3>
        <pre><code>claims (
  claim_id INT,
  claim_amount DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT AVG(claim_amount) AS avg_claim
FROM claims;`,
        sampleData: [
            { claim_id: 1, claim_amount: 5000.00 },
            { claim_id: 2, claim_amount: 3000.00 },
            { claim_id: 3, claim_amount: 4000.00 }
        ],
        expectedResult: [{ avg_claim: 4000.00 }]
    },
    {
        id: 11,
        title: "Left Join Policies and Claims",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query to left join policies with claims to show all policies and their claims.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (policy_id, policy_holder_name)
claims (claim_id, policy_id, claim_amount)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT p.policy_id, p.policy_holder_name, c.claim_amount
FROM policies p
LEFT JOIN claims c ON p.policy_id = c.policy_id;`,
        sampleData: {
            policies: [
                { policy_id: 1, policy_holder_name: 'John Doe' },
                { policy_id: 2, policy_holder_name: 'Jane Smith' }
            ],
            claims: [
                { claim_id: 1, policy_id: 1, claim_amount: 5000.00 }
            ]
        },
        expectedResult: [
            { policy_id: 1, policy_holder_name: 'John Doe', claim_amount: 5000.00 },
            { policy_id: 2, policy_holder_name: 'Jane Smith', claim_amount: null }
        ]
    },
    {
        id: 12,
        title: "Right Join Policies and Claims",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query to right join policies with claims.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (policy_id, policy_holder_name)
claims (claim_id, policy_id, claim_amount)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT p.policy_id, p.policy_holder_name, c.claim_amount
FROM policies p
RIGHT JOIN claims c ON p.policy_id = c.policy_id;`,
        sampleData: {
            policies: [
                { policy_id: 1, policy_holder_name: 'John Doe' }
            ],
            claims: [
                { claim_id: 1, policy_id: 1, claim_amount: 5000.00 },
                { claim_id: 2, policy_id: 2, claim_amount: 3000.00 }
            ]
        },
        expectedResult: [
            { policy_id: 1, policy_holder_name: 'John Doe', claim_amount: 5000.00 },
            { policy_id: 2, policy_holder_name: null, claim_amount: 3000.00 }
        ]
    },
    {
        id: 13,
        title: "Full Outer Join",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a SQL query to perform a full outer join between policies and claims.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (policy_id, policy_holder_name)
claims (claim_id, policy_id, claim_amount)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT p.policy_id, p.policy_holder_name, c.claim_amount
FROM policies p
FULL OUTER JOIN claims c ON p.policy_id = c.policy_id;`,
        sampleData: {
            policies: [
                { policy_id: 1, policy_holder_name: 'John Doe' }
            ],
            claims: [
                { claim_id: 1, policy_id: 2, claim_amount: 3000.00 }
            ]
        },
        expectedResult: [
            { policy_id: 1, policy_holder_name: 'John Doe', claim_amount: null },
            { policy_id: 2, policy_holder_name: null, claim_amount: 3000.00 }
        ]
    },
    {
        id: 14,
        title: "Subquery for Maximum Premium",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query using a subquery to find policies with the maximum premium.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT *
FROM policies
WHERE premium = (SELECT MAX(premium) FROM policies);`,
        sampleData: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 2, premium: 800.00 },
            { policy_id: 3, premium: 1500.00 }
        ],
        expectedResult: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 3, premium: 1500.00 }
        ]
    },
    {
        id: 15,
        title: "HAVING Clause",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query to find statuses with average premium greater than 1000.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  status VARCHAR(20),
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT status, AVG(premium) AS avg_premium
FROM policies
GROUP BY status
HAVING AVG(premium) > 1000;`,
        sampleData: [
            { policy_id: 1, status: 'Active', premium: 1500.00 },
            { policy_id: 2, status: 'Active', premium: 800.00 },
            { policy_id: 3, status: 'Cancelled', premium: 1200.00 }
        ],
        expectedResult: [
            { status: 'Active', avg_premium: 1150.00 },
            { status: 'Cancelled', avg_premium: 1200.00 }
        ]
    },
    {
        id: 16,
        title: "IN Clause",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a SQL query to select policies with specific statuses using IN clause.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  status VARCHAR(20)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT *
FROM policies
WHERE status IN ('Active', 'Pending');`,
        sampleData: [
            { policy_id: 1, status: 'Active' },
            { policy_id: 2, status: 'Cancelled' },
            { policy_id: 3, status: 'Pending' }
        ],
        expectedResult: [
            { policy_id: 1, status: 'Active' },
            { policy_id: 3, status: 'Pending' }
        ]
    },
    {
        id: 17,
        title: "LIKE Pattern Matching",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a SQL query to find policy holders whose names start with 'J'.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  policy_holder_name VARCHAR(100)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT *
FROM policies
WHERE policy_holder_name LIKE 'J%';`,
        sampleData: [
            { policy_id: 1, policy_holder_name: 'John Doe' },
            { policy_id: 2, policy_holder_name: 'Jane Smith' },
            { policy_id: 3, policy_holder_name: 'Bob Johnson' }
        ],
        expectedResult: [
            { policy_id: 1, policy_holder_name: 'John Doe' },
            { policy_id: 2, policy_holder_name: 'Jane Smith' }
        ]
    },
    {
        id: 18,
        title: "DISTINCT Values",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a SQL query to get distinct status values from policies.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  status VARCHAR(20)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT DISTINCT status
FROM policies;`,
        sampleData: [
            { policy_id: 1, status: 'Active' },
            { policy_id: 2, status: 'Active' },
            { policy_id: 3, status: 'Cancelled' }
        ],
        expectedResult: [
            { status: 'Active' },
            { status: 'Cancelled' }
        ]
    },
    {
        id: 19,
        title: "LIMIT Results",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a SQL query to select the top 3 policies by premium.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT *
FROM policies
ORDER BY premium DESC
LIMIT 3;`,
        sampleData: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 2, premium: 800.00 },
            { policy_id: 3, premium: 1200.00 },
            { policy_id: 4, premium: 900.00 }
        ],
        expectedResult: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 3, premium: 1200.00 },
            { policy_id: 4, premium: 900.00 }
        ]
    },
    {
        id: 20,
        title: "CASE Statement",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query using CASE to categorize premiums as High, Medium, or Low.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT policy_id, premium,
  CASE
    WHEN premium > 1200 THEN 'High'
    WHEN premium > 800 THEN 'Medium'
    ELSE 'Low'
  END AS premium_category
FROM policies;`,
        sampleData: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 2, premium: 800.00 },
            { policy_id: 3, premium: 1000.00 }
        ],
        expectedResult: [
            { policy_id: 1, premium: 1500.00, premium_category: 'High' },
            { policy_id: 2, premium: 800.00, premium_category: 'Low' },
            { policy_id: 3, premium: 1000.00, premium_category: 'Medium' }
        ]
    },
    {
        id: 21,
        title: "UNION Query",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query using UNION to combine results from two tables.</p>
        <h3>Database Schema</h3>
        <pre><code>policies_2023 (policy_id, premium)
policies_2024 (policy_id, premium)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT policy_id, premium
FROM policies_2023
UNION
SELECT policy_id, premium
FROM policies_2024;`,
        sampleData: {
            policies_2023: [
                { policy_id: 1, premium: 1500.00 },
                { policy_id: 2, premium: 800.00 }
            ],
            policies_2024: [
                { policy_id: 3, premium: 1200.00 }
            ]
        },
        expectedResult: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 2, premium: 800.00 },
            { policy_id: 3, premium: 1200.00 }
        ]
    },
    {
        id: 22,
        title: "EXISTS Subquery",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a SQL query using EXISTS to find policies that have claims.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (policy_id)
claims (claim_id, policy_id)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT *
FROM policies p
WHERE EXISTS (
  SELECT 1
  FROM claims c
  WHERE c.policy_id = p.policy_id
);`,
        sampleData: {
            policies: [
                { policy_id: 1 },
                { policy_id: 2 }
            ],
            claims: [
                { claim_id: 1, policy_id: 1 }
            ]
        },
        expectedResult: [
            { policy_id: 1 }
        ]
    },
    {
        id: 23,
        title: "NOT EXISTS Subquery",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a SQL query using NOT EXISTS to find policies without claims.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (policy_id)
claims (claim_id, policy_id)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT *
FROM policies p
WHERE NOT EXISTS (
  SELECT 1
  FROM claims c
  WHERE c.policy_id = p.policy_id
);`,
        sampleData: {
            policies: [
                { policy_id: 1 },
                { policy_id: 2 }
            ],
            claims: [
                { claim_id: 1, policy_id: 1 }
            ]
        },
        expectedResult: [
            { policy_id: 2 }
        ]
    },
    {
        id: 24,
        title: "Window Function ROW_NUMBER",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a SQL query using ROW_NUMBER to rank policies by premium.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT policy_id, premium,
  ROW_NUMBER() OVER (ORDER BY premium DESC) AS rank
FROM policies;`,
        sampleData: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 2, premium: 800.00 },
            { policy_id: 3, premium: 1200.00 }
        ],
        expectedResult: [
            { policy_id: 1, premium: 1500.00, rank: 1 },
            { policy_id: 3, premium: 1200.00, rank: 2 },
            { policy_id: 2, premium: 800.00, rank: 3 }
        ]
    },
    {
        id: 25,
        title: "Window Function RANK",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a SQL query using RANK to rank policies by premium with ties.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT policy_id, premium,
  RANK() OVER (ORDER BY premium DESC) AS rank
FROM policies;`,
        sampleData: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 2, premium: 1500.00 },
            { policy_id: 3, premium: 1200.00 }
        ],
        expectedResult: [
            { policy_id: 1, premium: 1500.00, rank: 1 },
            { policy_id: 2, premium: 1500.00, rank: 1 },
            { policy_id: 3, premium: 1200.00, rank: 3 }
        ]
    },
    {
        id: 26,
        title: "Window Function DENSE_RANK",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a SQL query using DENSE_RANK to rank policies without gaps.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT policy_id, premium,
  DENSE_RANK() OVER (ORDER BY premium DESC) AS rank
FROM policies;`,
        sampleData: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 2, premium: 1500.00 },
            { policy_id: 3, premium: 1200.00 }
        ],
        expectedResult: [
            { policy_id: 1, premium: 1500.00, rank: 1 },
            { policy_id: 2, premium: 1500.00, rank: 1 },
            { policy_id: 3, premium: 1200.00, rank: 2 }
        ]
    },
    {
        id: 27,
        title: "Window Function LAG",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a SQL query using LAG to compare current premium with previous.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2),
  start_date DATE
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT policy_id, premium,
  LAG(premium) OVER (ORDER BY start_date) AS previous_premium
FROM policies;`,
        sampleData: [
            { policy_id: 1, premium: 1500.00, start_date: '2023-01-01' },
            { policy_id: 2, premium: 800.00, start_date: '2023-02-01' },
            { policy_id: 3, premium: 1200.00, start_date: '2023-03-01' }
        ],
        expectedResult: [
            { policy_id: 1, premium: 1500.00, previous_premium: null },
            { policy_id: 2, premium: 800.00, previous_premium: 1500.00 },
            { policy_id: 3, premium: 1200.00, previous_premium: 800.00 }
        ]
    },
    {
        id: 28,
        title: "Window Function LEAD",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a SQL query using LEAD to compare current premium with next.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2),
  start_date DATE
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT policy_id, premium,
  LEAD(premium) OVER (ORDER BY start_date) AS next_premium
FROM policies;`,
        sampleData: [
            { policy_id: 1, premium: 1500.00, start_date: '2023-01-01' },
            { policy_id: 2, premium: 800.00, start_date: '2023-02-01' },
            { policy_id: 3, premium: 1200.00, start_date: '2023-03-01' }
        ],
        expectedResult: [
            { policy_id: 1, premium: 1500.00, next_premium: 800.00 },
            { policy_id: 2, premium: 800.00, next_premium: 1200.00 },
            { policy_id: 3, premium: 1200.00, next_premium: null }
        ]
    },
    {
        id: 29,
        title: "Window Function SUM",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query using SUM window function to calculate running total of premiums.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT policy_id, premium,
  SUM(premium) OVER (ORDER BY policy_id) AS running_total
FROM policies;`,
        sampleData: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 2, premium: 800.00 },
            { policy_id: 3, premium: 1200.00 }
        ],
        expectedResult: [
            { policy_id: 1, premium: 1500.00, running_total: 1500.00 },
            { policy_id: 2, premium: 800.00, running_total: 2300.00 },
            { policy_id: 3, premium: 1200.00, running_total: 3500.00 }
        ]
    },
    {
        id: 30,
        title: "Window Function AVG",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query using AVG window function to calculate moving average.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT policy_id, premium,
  AVG(premium) OVER (ORDER BY policy_id ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) AS moving_avg
FROM policies;`,
        sampleData: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 2, premium: 800.00 },
            { policy_id: 3, premium: 1200.00 }
        ],
        expectedResult: [
            { policy_id: 1, premium: 1500.00, moving_avg: 1500.00 },
            { policy_id: 2, premium: 800.00, moving_avg: 1150.00 },
            { policy_id: 3, premium: 1200.00, moving_avg: 1000.00 }
        ]
    },
    {
        id: 31,
        title: "Multiple Table Join",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a SQL query to join policies, claims, and customers tables.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (policy_id, customer_id, premium)
customers (customer_id, customer_name)
claims (claim_id, policy_id, claim_amount)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT c.customer_name, p.premium, cl.claim_amount
FROM policies p
JOIN customers c ON p.customer_id = c.customer_id
LEFT JOIN claims cl ON p.policy_id = cl.policy_id;`,
        sampleData: {
            policies: [
                { policy_id: 1, customer_id: 1, premium: 1500.00 }
            ],
            customers: [
                { customer_id: 1, customer_name: 'John Doe' }
            ],
            claims: [
                { claim_id: 1, policy_id: 1, claim_amount: 5000.00 }
            ]
        },
        expectedResult: [
            { customer_name: 'John Doe', premium: 1500.00, claim_amount: 5000.00 }
        ]
    },
    {
        id: 32,
        title: "Self Join",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a SQL query using self join to find policies with same premium.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT p1.policy_id AS policy1, p2.policy_id AS policy2, p1.premium
FROM policies p1
JOIN policies p2 ON p1.premium = p2.premium AND p1.policy_id < p2.policy_id;`,
        sampleData: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 2, premium: 1500.00 },
            { policy_id: 3, premium: 1200.00 }
        ],
        expectedResult: [
            { policy1: 1, policy2: 2, premium: 1500.00 }
        ]
    },
    {
        id: 33,
        title: "CTE (Common Table Expression)",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a SQL query using CTE to find policies above average premium.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `WITH avg_premium AS (
  SELECT AVG(premium) AS avg_val
  FROM policies
)
SELECT p.*
FROM policies p, avg_premium ap
WHERE p.premium > ap.avg_val;`,
        sampleData: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 2, premium: 800.00 },
            { policy_id: 3, premium: 1200.00 }
        ],
        expectedResult: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 3, premium: 1200.00 }
        ]
    },
    {
        id: 34,
        title: "Recursive CTE",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a SQL query using recursive CTE to generate numbers 1 to 10.</p>
        <h3>Example</h3>
        <pre><code>Should return numbers 1 through 10</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `WITH RECURSIVE numbers AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1
  FROM numbers
  WHERE n < 10
)
SELECT n FROM numbers;`,
        sampleData: [],
        expectedResult: [
            { n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 },
            { n: 6 }, { n: 7 }, { n: 8 }, { n: 9 }, { n: 10 }
        ]
    },
    {
        id: 35,
        title: "String Functions CONCAT",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a SQL query using CONCAT to combine first and last name.</p>
        <h3>Database Schema</h3>
        <pre><code>customers (
  customer_id INT,
  first_name VARCHAR(50),
  last_name VARCHAR(50)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT customer_id,
  CONCAT(first_name, ' ', last_name) AS full_name
FROM customers;`,
        sampleData: [
            { customer_id: 1, first_name: 'John', last_name: 'Doe' },
            { customer_id: 2, first_name: 'Jane', last_name: 'Smith' }
        ],
        expectedResult: [
            { customer_id: 1, full_name: 'John Doe' },
            { customer_id: 2, full_name: 'Jane Smith' }
        ]
    },
    {
        id: 36,
        title: "String Functions SUBSTRING",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query using SUBSTRING to extract first 3 characters of policy holder name.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  policy_holder_name VARCHAR(100)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT policy_id,
  SUBSTRING(policy_holder_name, 1, 3) AS name_prefix
FROM policies;`,
        sampleData: [
            { policy_id: 1, policy_holder_name: 'John Doe' },
            { policy_id: 2, policy_holder_name: 'Jane Smith' }
        ],
        expectedResult: [
            { policy_id: 1, name_prefix: 'Joh' },
            { policy_id: 2, name_prefix: 'Jan' }
        ]
    },
    {
        id: 37,
        title: "String Functions UPPER",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a SQL query using UPPER to convert policy holder names to uppercase.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  policy_holder_name VARCHAR(100)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT policy_id,
  UPPER(policy_holder_name) AS name_upper
FROM policies;`,
        sampleData: [
            { policy_id: 1, policy_holder_name: 'John Doe' },
            { policy_id: 2, policy_holder_name: 'Jane Smith' }
        ],
        expectedResult: [
            { policy_id: 1, name_upper: 'JOHN DOE' },
            { policy_id: 2, name_upper: 'JANE SMITH' }
        ]
    },
    {
        id: 38,
        title: "String Functions LOWER",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a SQL query using LOWER to convert status to lowercase.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  status VARCHAR(20)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT policy_id,
  LOWER(status) AS status_lower
FROM policies;`,
        sampleData: [
            { policy_id: 1, status: 'Active' },
            { policy_id: 2, status: 'CANCELLED' }
        ],
        expectedResult: [
            { policy_id: 1, status_lower: 'active' },
            { policy_id: 2, status_lower: 'cancelled' }
        ]
    },
    {
        id: 39,
        title: "Date Functions YEAR",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a SQL query using YEAR function to extract year from start_date.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  start_date DATE
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT policy_id,
  YEAR(start_date) AS start_year
FROM policies;`,
        sampleData: [
            { policy_id: 1, start_date: '2023-01-01' },
            { policy_id: 2, start_date: '2024-02-15' }
        ],
        expectedResult: [
            { policy_id: 1, start_year: 2023 },
            { policy_id: 2, start_year: 2024 }
        ]
    },
    {
        id: 40,
        title: "Date Functions MONTH",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a SQL query using MONTH function to extract month from start_date.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  start_date DATE
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT policy_id,
  MONTH(start_date) AS start_month
FROM policies;`,
        sampleData: [
            { policy_id: 1, start_date: '2023-01-01' },
            { policy_id: 2, start_date: '2023-06-15' }
        ],
        expectedResult: [
            { policy_id: 1, start_month: 1 },
            { policy_id: 2, start_month: 6 }
        ]
    },
    {
        id: 41,
        title: "Date Functions DATEDIFF",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query using DATEDIFF to calculate days between start_date and end_date.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  start_date DATE,
  end_date DATE
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT policy_id,
  DATEDIFF(end_date, start_date) AS days_duration
FROM policies;`,
        sampleData: [
            { policy_id: 1, start_date: '2023-01-01', end_date: '2023-12-31' },
            { policy_id: 2, start_date: '2023-06-01', end_date: '2023-12-31' }
        ],
        expectedResult: [
            { policy_id: 1, days_duration: 364 },
            { policy_id: 2, days_duration: 213 }
        ]
    },
    {
        id: 42,
        title: "Date Functions DATE_ADD",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query using DATE_ADD to add 1 year to start_date.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  start_date DATE
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT policy_id,
  DATE_ADD(start_date, INTERVAL 1 YEAR) AS renewal_date
FROM policies;`,
        sampleData: [
            { policy_id: 1, start_date: '2023-01-01' },
            { policy_id: 2, start_date: '2023-06-15' }
        ],
        expectedResult: [
            { policy_id: 1, renewal_date: '2024-01-01' },
            { policy_id: 2, renewal_date: '2024-06-15' }
        ]
    },
    {
        id: 43,
        title: "NULL Handling COALESCE",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query using COALESCE to replace NULL claim amounts with 0.</p>
        <h3>Database Schema</h3>
        <pre><code>claims (
  claim_id INT,
  claim_amount DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT claim_id,
  COALESCE(claim_amount, 0) AS claim_amount
FROM claims;`,
        sampleData: [
            { claim_id: 1, claim_amount: 5000.00 },
            { claim_id: 2, claim_amount: null }
        ],
        expectedResult: [
            { claim_id: 1, claim_amount: 5000.00 },
            { claim_id: 2, claim_amount: 0 }
        ]
    },
    {
        id: 44,
        title: "NULL Handling ISNULL",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query using ISNULL to replace NULL values.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT policy_id,
  ISNULL(premium, 0) AS premium
FROM policies;`,
        sampleData: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 2, premium: null }
        ],
        expectedResult: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 2, premium: 0 }
        ]
    },
    {
        id: 45,
        title: "Aggregate with WHERE",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query to calculate sum of premiums for active policies only.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2),
  status VARCHAR(20)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT SUM(premium) AS total_active_premium
FROM policies
WHERE status = 'Active';`,
        sampleData: [
            { policy_id: 1, premium: 1500.00, status: 'Active' },
            { policy_id: 2, premium: 800.00, status: 'Active' },
            { policy_id: 3, premium: 1200.00, status: 'Cancelled' }
        ],
        expectedResult: [
            { total_active_premium: 2300.00 }
        ]
    },
    {
        id: 46,
        title: "Multiple Aggregates",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a SQL query to calculate multiple aggregates (SUM, AVG, COUNT, MAX, MIN) for premiums.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT 
  SUM(premium) AS total,
  AVG(premium) AS average,
  COUNT(*) AS count,
  MAX(premium) AS maximum,
  MIN(premium) AS minimum
FROM policies;`,
        sampleData: [
            { policy_id: 1, premium: 1500.00 },
            { policy_id: 2, premium: 800.00 },
            { policy_id: 3, premium: 1200.00 }
        ],
        expectedResult: [
            { total: 3500.00, average: 1166.67, count: 3, maximum: 1500.00, minimum: 800.00 }
        ]
    },
    {
        id: 47,
        title: "Nested Subquery",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a SQL query with nested subquery to find policies with premium above average of their status group.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  status VARCHAR(20),
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT *
FROM policies p1
WHERE premium > (
  SELECT AVG(premium)
  FROM policies p2
  WHERE p2.status = p1.status
);`,
        sampleData: [
            { policy_id: 1, status: 'Active', premium: 1500.00 },
            { policy_id: 2, status: 'Active', premium: 800.00 },
            { policy_id: 3, status: 'Cancelled', premium: 1200.00 }
        ],
        expectedResult: [
            { policy_id: 1, status: 'Active', premium: 1500.00 }
        ]
    },
    {
        id: 48,
        title: "Correlated Subquery",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a SQL query with correlated subquery to find policies with premium greater than average of their status.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  status VARCHAR(20),
  premium DECIMAL(10,2)
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT *
FROM policies p1
WHERE premium > (
  SELECT AVG(premium)
  FROM policies p2
  WHERE p2.status = p1.status
);`,
        sampleData: [
            { policy_id: 1, status: 'Active', premium: 1500.00 },
            { policy_id: 2, status: 'Active', premium: 800.00 }
        ],
        expectedResult: [
            { policy_id: 1, status: 'Active', premium: 1500.00 }
        ]
    },
    {
        id: 49,
        title: "PIVOT Table",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a SQL query to pivot policies by status showing count for each year.</p>
        <h3>Database Schema</h3>
        <pre><code>policies (
  policy_id INT,
  status VARCHAR(20),
  start_date DATE
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT 
  YEAR(start_date) AS year,
  SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) AS active_count,
  SUM(CASE WHEN status = 'Cancelled' THEN 1 ELSE 0 END) AS cancelled_count
FROM policies
GROUP BY YEAR(start_date);`,
        sampleData: [
            { policy_id: 1, status: 'Active', start_date: '2023-01-01' },
            { policy_id: 2, status: 'Active', start_date: '2023-02-01' },
            { policy_id: 3, status: 'Cancelled', start_date: '2023-03-01' }
        ],
        expectedResult: [
            { year: 2023, active_count: 2, cancelled_count: 1 }
        ]
    },
    {
        id: 50,
        title: "UNPIVOT Table",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a SQL query to unpivot policy data from columns to rows.</p>
        <h3>Database Schema</h3>
        <pre><code>policies_summary (
  year INT,
  active_count INT,
  cancelled_count INT
)</code></pre>`,
        starterCode: `-- Write your SQL query here`,
        solution: `SELECT year, 'Active' AS status, active_count AS count
FROM policies_summary
UNION ALL
SELECT year, 'Cancelled' AS status, cancelled_count AS count
FROM policies_summary;`,
        sampleData: [
            { year: 2023, active_count: 2, cancelled_count: 1 }
        ],
        expectedResult: [
            { year: 2023, status: 'Active', count: 2 },
            { year: 2023, status: 'Cancelled', count: 1 }
        ]
    }
];

let currentProblemIndex = 0;
let codeEditor;

document.addEventListener('DOMContentLoaded', () => {
    initializeEditor();
    loadProblem(0);
    renderProblemsList();
    setupEventListeners();
});

function initializeEditor() {
    codeEditor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        lineNumbers: true,
        mode: 'text/x-sql',
        theme: 'default',
        indentUnit: 2,
        lineWrapping: true
    });
}

function setupEventListeners() {
    document.getElementById('run-btn').addEventListener('click', runQuery);
    document.getElementById('submit-btn').addEventListener('click', submitQuery);
}

function loadProblem(index) {
    currentProblemIndex = index;
    const problem = sqlProblems[index];
    
    document.getElementById('problem-title').textContent = `Problem ${problem.id}: ${problem.title}`;
    document.getElementById('difficulty-badge').textContent = problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1);
    document.getElementById('difficulty-badge').className = `difficulty-badge ${problem.difficulty}`;
    document.getElementById('problem-content').innerHTML = problem.description;
    
    codeEditor.setValue(problem.starterCode);
    
    document.querySelectorAll('.problem-item').forEach((item, idx) => {
        item.classList.toggle('active', idx === index);
    });
    
    document.getElementById('output-content').innerHTML = '<p style="color: #64748b; font-style: italic;">Click "Run" to execute your query</p>';
}

function renderProblemsList() {
    const list = document.getElementById('problems-list');
    list.innerHTML = '';
    
    sqlProblems.forEach((problem, index) => {
        const item = document.createElement('div');
        item.className = 'problem-item';
        if (index === 0) item.classList.add('active');
        item.innerHTML = `
            <div class="problem-item-title">${problem.id}. ${problem.title}</div>
            <div class="problem-item-difficulty">${problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}</div>
        `;
        item.addEventListener('click', () => loadProblem(index));
        list.appendChild(item);
    });
}

function runQuery() {
    const query = codeEditor.getValue().trim().toUpperCase();
    const problem = sqlProblems[currentProblemIndex];
    const output = document.getElementById('output-content');
    
    output.innerHTML = '<p style="color: #64748b;">Executing query...</p>';
    
    try {
        // Basic SQL validation
        if (!query.includes('SELECT')) {
            output.innerHTML = '<p class="error">Error: Query must start with SELECT</p>';
            return;
        }
        
        // Simulate query execution
        setTimeout(() => {
            let resultHTML = '<p><strong>Query Results:</strong></p>';
            
            if (problem.sampleData && Array.isArray(problem.sampleData)) {
                // Simple table display
                resultHTML += '<table style="width: 100%; border-collapse: collapse; margin-top: 16px;">';
                
                // Header
                const firstRow = problem.sampleData[0];
                resultHTML += '<tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0;">';
                Object.keys(firstRow).forEach(key => {
                    resultHTML += `<th style="padding: 12px; text-align: left; font-weight: 600; color: #1e293b;">${key}</th>`;
                });
                resultHTML += '</tr>';
                
                // Rows
                problem.sampleData.forEach(row => {
                    resultHTML += '<tr style="border-bottom: 1px solid #e2e8f0;">';
                    Object.values(row).forEach(val => {
                        resultHTML += `<td style="padding: 12px; color: #1e293b;">${val}</td>`;
                    });
                    resultHTML += '</tr>';
                });
                
                resultHTML += '</table>';
            }
            
            resultHTML += `
                <p style="margin-top: 16px; color: #64748b; font-size: 0.875rem;">
                    <strong>Note:</strong> This is a simulated result. For full SQL execution, use a database environment.
                </p>
            `;
            
            output.innerHTML = resultHTML;
        }, 500);
        
    } catch (error) {
        output.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}

function submitQuery() {
    const problem = sqlProblems[currentProblemIndex];
    const output = document.getElementById('output-content');
    
    output.innerHTML = `
        <p><strong>Submission Results:</strong></p>
        <p style="color: #64748b; margin-top: 16px;">
            Your query has been submitted! Compare it with the solution below.
        </p>
        <details style="margin-top: 16px;">
            <summary style="cursor: pointer; color: #6366f1; font-weight: 600;">View Solution</summary>
            <pre style="background: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px; margin-top: 12px; overflow-x: auto;"><code>${problem.solution}</code></pre>
        </details>
    `;
}

