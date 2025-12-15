// Python Practice Problems for Actuaries
const pythonProblems = [
    {
        id: 1,
        title: "Calculate Present Value",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>present_value(future_value, interest_rate, years)</code> that calculates the present value of a future amount.</p>
        <p><strong>Formula:</strong> PV = FV / (1 + r)^n</p>
        
        <h3>Example</h3>
        <pre><code>present_value(1000, 0.05, 10)
# Returns: 613.91</code></pre>
        
        <h3>Constraints</h3>
        <ul>
            <li>future_value > 0</li>
            <li>interest_rate > 0</li>
            <li>years >= 0</li>
        </ul>`,
        starterCode: `def present_value(future_value, interest_rate, years):
    # Write your code here
    pass`,
        solution: `def present_value(future_value, interest_rate, years):
    return future_value / ((1 + interest_rate) ** years)`,
        testCases: [
            { input: [1000, 0.05, 10], expected: 613.91 },
            { input: [5000, 0.06, 5], expected: 3736.29 },
            { input: [10000, 0.04, 20], expected: 4563.87 }
        ]
    },
    {
        id: 2,
        title: "Calculate Future Value",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>future_value(present_value, interest_rate, years)</code> that calculates the future value of a present amount.</p>
        <p><strong>Formula:</strong> FV = PV × (1 + r)^n</p>
        
        <h3>Example</h3>
        <pre><code>future_value(1000, 0.05, 10)
# Returns: 1628.89</code></pre>`,
        starterCode: `def future_value(present_value, interest_rate, years):
    # Write your code here
    pass`,
        solution: `def future_value(present_value, interest_rate, years):
    return present_value * ((1 + interest_rate) ** years)`,
        testCases: [
            { input: [1000, 0.05, 10], expected: 1628.89 },
            { input: [5000, 0.06, 5], expected: 6691.13 },
            { input: [10000, 0.04, 20], expected: 21911.23 }
        ]
    },
    {
        id: 3,
        title: "Calculate Annuity Present Value",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>annuity_pv(payment, interest_rate, years)</code> that calculates the present value of an ordinary annuity.</p>
        <p><strong>Formula:</strong> PV = Payment × [(1 - (1 + r)^(-n)) / r]</p>
        
        <h3>Example</h3>
        <pre><code>annuity_pv(1000, 0.05, 10)
# Returns: 7721.73</code></pre>`,
        starterCode: `def annuity_pv(payment, interest_rate, years):
    # Write your code here
    pass`,
        solution: `def annuity_pv(payment, interest_rate, years):
    if interest_rate == 0:
        return payment * years
    return payment * (1 - (1 + interest_rate) ** (-years)) / interest_rate`,
        testCases: [
            { input: [1000, 0.05, 10], expected: 7721.73 },
            { input: [500, 0.06, 15], expected: 4856.04 },
            { input: [2000, 0.04, 20], expected: 27181.14 }
        ]
    },
    {
        id: 4,
        title: "Calculate Bond Price",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>bond_price(face_value, coupon_rate, years_to_maturity, yield_rate)</code> that calculates the price of a bond.</p>
        <p>The bond pays annual coupons. Price = PV of coupons + PV of face value.</p>
        
        <h3>Example</h3>
        <pre><code>bond_price(1000, 0.05, 10, 0.06)
# Returns: 926.40</code></pre>`,
        starterCode: `def bond_price(face_value, coupon_rate, years_to_maturity, yield_rate):
    # Write your code here
    pass`,
        solution: `def bond_price(face_value, coupon_rate, years_to_maturity, yield_rate):
    annual_coupon = face_value * coupon_rate
    pv_coupons = annual_coupon * (1 - (1 + yield_rate) ** (-years_to_maturity)) / yield_rate
    pv_face = face_value / ((1 + yield_rate) ** years_to_maturity)
    return pv_coupons + pv_face`,
        testCases: [
            { input: [1000, 0.05, 10, 0.06], expected: 926.40 },
            { input: [1000, 0.06, 5, 0.05], expected: 1043.76 },
            { input: [5000, 0.04, 15, 0.05], expected: 4313.24 }
        ]
    },
    {
        id: 5,
        title: "Calculate Loan Payment",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>loan_payment(principal, interest_rate, years)</code> that calculates the annual payment for a loan.</p>
        <p><strong>Formula:</strong> Payment = Principal × [r(1+r)^n] / [(1+r)^n - 1]</p>
        
        <h3>Example</h3>
        <pre><code>loan_payment(100000, 0.05, 30)
# Returns: 6505.15</code></pre>`,
        starterCode: `def loan_payment(principal, interest_rate, years):
    # Write your code here
    pass`,
        solution: `def loan_payment(principal, interest_rate, years):
    if interest_rate == 0:
        return principal / years
    numerator = interest_rate * ((1 + interest_rate) ** years)
    denominator = ((1 + interest_rate) ** years) - 1
    return principal * (numerator / denominator)`,
        testCases: [
            { input: [100000, 0.05, 30], expected: 6505.15 },
            { input: [50000, 0.06, 10], expected: 6793.40 },
            { input: [200000, 0.04, 20], expected: 14714.26 }
        ]
    },
    {
        id: 6,
        title: "Calculate Effective Interest Rate",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>effective_rate(nominal_rate, compounding_periods)</code> that converts a nominal interest rate to an effective annual rate.</p>
        <p><strong>Formula:</strong> i = (1 + r/m)^m - 1</p>
        <h3>Example</h3>
        <pre><code>effective_rate(0.06, 12)
# Returns: 0.0617</code></pre>`,
        starterCode: `def effective_rate(nominal_rate, compounding_periods):
    # Write your code here
    pass`,
        solution: `def effective_rate(nominal_rate, compounding_periods):
    return (1 + nominal_rate / compounding_periods) ** compounding_periods - 1`,
        testCases: [
            { input: [0.06, 12], expected: 0.0617 },
            { input: [0.05, 4], expected: 0.0509 },
            { input: [0.04, 2], expected: 0.0404 }
        ]
    },
    {
        id: 7,
        title: "Calculate Annuity Future Value",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>annuity_fv(payment, interest_rate, years)</code> that calculates the future value of an ordinary annuity.</p>
        <p><strong>Formula:</strong> FV = Payment × [((1 + r)^n - 1) / r]</p>
        <h3>Example</h3>
        <pre><code>annuity_fv(1000, 0.05, 10)
# Returns: 12577.89</code></pre>`,
        starterCode: `def annuity_fv(payment, interest_rate, years):
    # Write your code here
    pass`,
        solution: `def annuity_fv(payment, interest_rate, years):
    if interest_rate == 0:
        return payment * years
    return payment * (((1 + interest_rate) ** years - 1) / interest_rate)`,
        testCases: [
            { input: [1000, 0.05, 10], expected: 12577.89 },
            { input: [500, 0.06, 15], expected: 12336.28 },
            { input: [2000, 0.04, 20], expected: 59556.16 }
        ]
    },
    {
        id: 8,
        title: "Calculate Mortgage Balance",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>mortgage_balance(principal, interest_rate, years, payments_made)</code> that calculates the remaining balance on a mortgage after a certain number of payments.</p>
        <h3>Example</h3>
        <pre><code>mortgage_balance(100000, 0.05, 30, 60)
# Returns: 90698.67</code></pre>`,
        starterCode: `def mortgage_balance(principal, interest_rate, years, payments_made):
    # Write your code here
    pass`,
        solution: `def mortgage_balance(principal, interest_rate, years, payments_made):
    monthly_rate = interest_rate / 12
    total_payments = years * 12
    if monthly_rate == 0:
        return principal * (1 - payments_made / total_payments)
    payment = principal * (monthly_rate * (1 + monthly_rate) ** total_payments) / ((1 + monthly_rate) ** total_payments - 1)
    balance = principal * ((1 + monthly_rate) ** total_payments - (1 + monthly_rate) ** payments_made) / ((1 + monthly_rate) ** total_payments - 1)
    return balance`,
        testCases: [
            { input: [100000, 0.05, 30, 60], expected: 90698.67 },
            { input: [200000, 0.04, 20, 120], expected: 134567.89 }
        ]
    },
    {
        id: 9,
        title: "Calculate Yield to Maturity",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>ytm(bond_price, face_value, coupon_rate, years, coupon_frequency)</code> that calculates the yield to maturity using approximation formula.</p>
        <p><strong>Approximation:</strong> YTM ≈ (C + (F-P)/n) / ((F+P)/2)</p>
        <h3>Example</h3>
        <pre><code>ytm(950, 1000, 0.05, 10, 2)
# Returns: 0.055</code></pre>`,
        starterCode: `def ytm(bond_price, face_value, coupon_rate, years, coupon_frequency):
    # Write your code here
    pass`,
        solution: `def ytm(bond_price, face_value, coupon_rate, years, coupon_frequency):
    annual_coupon = face_value * coupon_rate
    periods = years * coupon_frequency
    coupon_per_period = annual_coupon / coupon_frequency
    numerator = coupon_per_period + (face_value - bond_price) / periods
    denominator = (face_value + bond_price) / 2
    return (numerator / denominator) * coupon_frequency`,
        testCases: [
            { input: [950, 1000, 0.05, 10, 2], expected: 0.055 },
            { input: [1050, 1000, 0.06, 5, 2], expected: 0.052 }
        ]
    },
    {
        id: 10,
        title: "Calculate Duration",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>bond_duration(face_value, coupon_rate, yield_rate, years, frequency)</code> that calculates Macaulay duration of a bond.</p>
        <h3>Example</h3>
        <pre><code>bond_duration(1000, 0.05, 0.06, 10, 2)
# Returns: 7.8</code></pre>`,
        starterCode: `def bond_duration(face_value, coupon_rate, yield_rate, years, frequency):
    # Write your code here
    pass`,
        solution: `def bond_duration(face_value, coupon_rate, yield_rate, years, frequency):
    periods = years * frequency
    coupon = face_value * coupon_rate / frequency
    period_yield = yield_rate / frequency
    pv_sum = 0
    weighted_sum = 0
    
    for t in range(1, periods + 1):
        if t == periods:
            cash_flow = coupon + face_value
        else:
            cash_flow = coupon
        pv = cash_flow / ((1 + period_yield) ** t)
        pv_sum += pv
        weighted_sum += t * pv
    
    return (weighted_sum / pv_sum) / frequency`,
        testCases: [
            { input: [1000, 0.05, 0.06, 10, 2], expected: 7.8 },
            { input: [1000, 0.06, 0.05, 5, 2], expected: 4.5 }
        ]
    },
    {
        id: 11,
        title: "Calculate Mortality Probability",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>mortality_probability(deaths, exposure)</code> that calculates the probability of death.</p>
        <h3>Example</h3>
        <pre><code>mortality_probability(50, 10000)
# Returns: 0.005</code></pre>`,
        starterCode: `def mortality_probability(deaths, exposure):
    # Write your code here
    pass`,
        solution: `def mortality_probability(deaths, exposure):
    return deaths / exposure`,
        testCases: [
            { input: [50, 10000], expected: 0.005 },
            { input: [120, 50000], expected: 0.0024 }
        ]
    },
    {
        id: 12,
        title: "Calculate Survival Probability",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>survival_probability(mortality_rate)</code> that calculates survival probability from mortality rate.</p>
        <h3>Example</h3>
        <pre><code>survival_probability(0.005)
# Returns: 0.995</code></pre>`,
        starterCode: `def survival_probability(mortality_rate):
    # Write your code here
    pass`,
        solution: `def survival_probability(mortality_rate):
    return 1 - mortality_rate`,
        testCases: [
            { input: [0.005], expected: 0.995 },
            { input: [0.01], expected: 0.99 }
        ]
    },
    {
        id: 13,
        title: "Calculate Net Premium",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>net_premium(sum_assured, mortality_rate, interest_rate)</code> that calculates net premium for term insurance.</p>
        <h3>Example</h3>
        <pre><code>net_premium(100000, 0.01, 0.05)
# Returns: 952.38</code></pre>`,
        starterCode: `def net_premium(sum_assured, mortality_rate, interest_rate):
    # Write your code here
    pass`,
        solution: `def net_premium(sum_assured, mortality_rate, interest_rate):
    pv_benefit = sum_assured * mortality_rate / (1 + interest_rate)
    return pv_benefit / (1 - mortality_rate)`,
        testCases: [
            { input: [100000, 0.01, 0.05], expected: 952.38 },
            { input: [50000, 0.02, 0.06], expected: 943.40 }
        ]
    },
    {
        id: 14,
        title: "Calculate Reserve",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>reserve(premium, benefit, mortality_rate, interest_rate, years_elapsed)</code> that calculates policy reserve.</p>
        <h3>Example</h3>
        <pre><code>reserve(1000, 100000, 0.01, 0.05, 5)
# Returns: 4500.00</code></pre>`,
        starterCode: `def reserve(premium, benefit, mortality_rate, interest_rate, years_elapsed):
    # Write your code here
    pass`,
        solution: `def reserve(premium, benefit, mortality_rate, interest_rate, years_elapsed):
    pv_future_benefits = benefit * mortality_rate / (1 + interest_rate) ** (years_elapsed + 1)
    pv_future_premiums = premium * (1 - mortality_rate) / (1 + interest_rate) ** years_elapsed
    return pv_future_benefits - pv_future_premiums`,
        testCases: [
            { input: [1000, 100000, 0.01, 0.05, 5], expected: 4500.00 }
        ]
    },
    {
        id: 15,
        title: "Calculate IRR",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>irr(cash_flows, initial_guess)</code> that calculates internal rate of return using Newton-Raphson method.</p>
        <h3>Example</h3>
        <pre><code>irr([-1000, 300, 300, 300, 300], 0.1)
# Returns: 0.077</code></pre>`,
        starterCode: `def irr(cash_flows, initial_guess):
    # Write your code here
    pass`,
        solution: `def irr(cash_flows, initial_guess):
    rate = initial_guess
    for _ in range(100):
        npv = sum(cf / (1 + rate) ** i for i, cf in enumerate(cash_flows))
        npv_derivative = sum(-i * cf / (1 + rate) ** (i + 1) for i, cf in enumerate(cash_flows))
        if abs(npv_derivative) < 1e-10:
            break
        rate = rate - npv / npv_derivative
    return rate`,
        testCases: [
            { input: [[-1000, 300, 300, 300, 300], 0.1], expected: 0.077 }
        ]
    },
    {
        id: 16,
        title: "Calculate Sharpe Ratio",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>sharpe_ratio(returns, risk_free_rate)</code> that calculates Sharpe ratio.</p>
        <h3>Example</h3>
        <pre><code>sharpe_ratio([0.1, 0.12, 0.08, 0.15], 0.03)
# Returns: 1.2</code></pre>`,
        starterCode: `def sharpe_ratio(returns, risk_free_rate):
    # Write your code here
    pass`,
        solution: `def sharpe_ratio(returns, risk_free_rate):
    import statistics
    mean_return = statistics.mean(returns)
    std_return = statistics.stdev(returns)
    return (mean_return - risk_free_rate) / std_return if std_return > 0 else 0`,
        testCases: [
            { input: [[0.1, 0.12, 0.08, 0.15], 0.03], expected: 1.2 }
        ]
    },
    {
        id: 17,
        title: "Calculate Portfolio Return",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>portfolio_return(weights, returns)</code> that calculates weighted portfolio return.</p>
        <h3>Example</h3>
        <pre><code>portfolio_return([0.5, 0.3, 0.2], [0.1, 0.12, 0.08])
# Returns: 0.104</code></pre>`,
        starterCode: `def portfolio_return(weights, returns):
    # Write your code here
    pass`,
        solution: `def portfolio_return(weights, returns):
    return sum(w * r for w, r in zip(weights, returns))`,
        testCases: [
            { input: [[0.5, 0.3, 0.2], [0.1, 0.12, 0.08]], expected: 0.104 }
        ]
    },
    {
        id: 18,
        title: "Calculate Portfolio Variance",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>portfolio_variance(weights, covariance_matrix)</code> that calculates portfolio variance.</p>
        <h3>Example</h3>
        <pre><code>portfolio_variance([0.5, 0.5], [[0.04, 0.01], [0.01, 0.09]])
# Returns: 0.0375</code></pre>`,
        starterCode: `def portfolio_variance(weights, covariance_matrix):
    # Write your code here
    pass`,
        solution: `def portfolio_variance(weights, covariance_matrix):
    variance = 0
    for i in range(len(weights)):
        for j in range(len(weights)):
            variance += weights[i] * weights[j] * covariance_matrix[i][j]
    return variance`,
        testCases: [
            { input: [[0.5, 0.5], [[0.04, 0.01], [0.01, 0.09]]], expected: 0.0375 }
        ]
    },
    {
        id: 19,
        title: "Calculate Value at Risk",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>var(returns, confidence_level)</code> that calculates Value at Risk.</p>
        <h3>Example</h3>
        <pre><code>var([0.1, -0.05, 0.08, -0.02], 0.95)
# Returns: -0.05</code></pre>`,
        starterCode: `def var(returns, confidence_level):
    # Write your code here
    pass`,
        solution: `def var(returns, confidence_level):
    import statistics
    sorted_returns = sorted(returns)
    index = int((1 - confidence_level) * len(sorted_returns))
    return sorted_returns[index] if index < len(sorted_returns) else sorted_returns[0]`,
        testCases: [
            { input: [[0.1, -0.05, 0.08, -0.02], 0.95], expected: -0.05 }
        ]
    },
    {
        id: 20,
        title: "Calculate Modified Duration",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>modified_duration(macaulay_duration, yield_rate, frequency)</code> that calculates modified duration.</p>
        <h3>Example</h3>
        <pre><code>modified_duration(7.5, 0.06, 2)
# Returns: 7.28</code></pre>`,
        starterCode: `def modified_duration(macaulay_duration, yield_rate, frequency):
    # Write your code here
    pass`,
        solution: `def modified_duration(macaulay_duration, yield_rate, frequency):
    return macaulay_duration / (1 + yield_rate / frequency)`,
        testCases: [
            { input: [7.5, 0.06, 2], expected: 7.28 }
        ]
    },
    {
        id: 21,
        title: "Calculate Convexity",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>convexity(face_value, coupon_rate, yield_rate, years, frequency)</code> that calculates bond convexity.</p>
        <h3>Example</h3>
        <pre><code>convexity(1000, 0.05, 0.06, 10, 2)
# Returns: 65.2</code></pre>`,
        starterCode: `def convexity(face_value, coupon_rate, yield_rate, years, frequency):
    # Write your code here
    pass`,
        solution: `def convexity(face_value, coupon_rate, yield_rate, years, frequency):
    periods = years * frequency
    coupon = face_value * coupon_rate / frequency
    period_yield = yield_rate / frequency
    price = sum(coupon / (1 + period_yield) ** t for t in range(1, periods + 1)) + face_value / (1 + period_yield) ** periods
    convexity_sum = sum(t * (t + 1) * coupon / (1 + period_yield) ** (t + 2) for t in range(1, periods + 1))
    convexity_sum += periods * (periods + 1) * face_value / (1 + period_yield) ** (periods + 2)
    return convexity_sum / price`,
        testCases: [
            { input: [1000, 0.05, 0.06, 10, 2], expected: 65.2 }
        ]
    },
    {
        id: 22,
        title: "Calculate Perpetuity PV",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>perpetuity_pv(payment, interest_rate)</code> that calculates present value of a perpetuity.</p>
        <h3>Example</h3>
        <pre><code>perpetuity_pv(100, 0.05)
# Returns: 2000</code></pre>`,
        starterCode: `def perpetuity_pv(payment, interest_rate):
    # Write your code here
    pass`,
        solution: `def perpetuity_pv(payment, interest_rate):
    return payment / interest_rate`,
        testCases: [
            { input: [100, 0.05], expected: 2000 },
            { input: [50, 0.04], expected: 1250 }
        ]
    },
    {
        id: 23,
        title: "Calculate Growing Perpetuity PV",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>growing_perpetuity_pv(payment, interest_rate, growth_rate)</code> that calculates PV of growing perpetuity.</p>
        <h3>Example</h3>
        <pre><code>growing_perpetuity_pv(100, 0.05, 0.02)
# Returns: 3333.33</code></pre>`,
        starterCode: `def growing_perpetuity_pv(payment, interest_rate, growth_rate):
    # Write your code here
    pass`,
        solution: `def growing_perpetuity_pv(payment, interest_rate, growth_rate):
    return payment / (interest_rate - growth_rate)`,
        testCases: [
            { input: [100, 0.05, 0.02], expected: 3333.33 }
        ]
    },
    {
        id: 24,
        title: "Calculate Annuity Due PV",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>annuity_due_pv(payment, interest_rate, years)</code> that calculates present value of annuity-due.</p>
        <h3>Example</h3>
        <pre><code>annuity_due_pv(1000, 0.05, 10)
# Returns: 8107.82</code></pre>`,
        starterCode: `def annuity_due_pv(payment, interest_rate, years):
    # Write your code here
    pass`,
        solution: `def annuity_due_pv(payment, interest_rate, years):
    if interest_rate == 0:
        return payment * years
    return payment * (1 - (1 + interest_rate) ** (-years)) / interest_rate * (1 + interest_rate)`,
        testCases: [
            { input: [1000, 0.05, 10], expected: 8107.82 }
        ]
    },
    {
        id: 25,
        title: "Calculate Deferred Annuity PV",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>deferred_annuity_pv(payment, interest_rate, deferral_years, payment_years)</code> that calculates PV of deferred annuity.</p>
        <h3>Example</h3>
        <pre><code>deferred_annuity_pv(1000, 0.05, 5, 10)
# Returns: 5868.38</code></pre>`,
        starterCode: `def deferred_annuity_pv(payment, interest_rate, deferral_years, payment_years):
    # Write your code here
    pass`,
        solution: `def deferred_annuity_pv(payment, interest_rate, deferral_years, payment_years):
    if interest_rate == 0:
        pv_at_deferral = payment * payment_years
    else:
        pv_at_deferral = payment * (1 - (1 + interest_rate) ** (-payment_years)) / interest_rate
    return pv_at_deferral / ((1 + interest_rate) ** deferral_years)`,
        testCases: [
            { input: [1000, 0.05, 5, 10], expected: 5868.38 }
        ]
    },
    {
        id: 26,
        title: "Calculate Life Annuity PV",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>life_annuity_pv(payment, age, mortality_table, interest_rate)</code> that calculates PV of life annuity using mortality table.</p>
        <h3>Example</h3>
        <pre><code>life_annuity_pv(1000, 65, {65: 0.02, 66: 0.03, 67: 0.04}, 0.05)
# Returns: 12000</code></pre>`,
        starterCode: `def life_annuity_pv(payment, age, mortality_table, interest_rate):
    # Write your code here
    pass`,
        solution: `def life_annuity_pv(payment, age, mortality_table, interest_rate):
    pv = 0
    survival_prob = 1.0
    for i, (curr_age, qx) in enumerate(sorted(mortality_table.items())):
        if curr_age < age:
            continue
        pv += payment * survival_prob / ((1 + interest_rate) ** (curr_age - age))
        survival_prob *= (1 - qx)
    return pv`,
        testCases: [
            { input: [1000, 65, {65: 0.02, 66: 0.03, 67: 0.04}, 0.05], expected: 12000 }
        ]
    },
    {
        id: 27,
        title: "Calculate Net Single Premium",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>net_single_premium(sum_assured, age, mortality_table, interest_rate, term)</code> that calculates NSP for term insurance.</p>
        <h3>Example</h3>
        <pre><code>net_single_premium(100000, 30, {30: 0.001, 31: 0.0012}, 0.05, 10)
# Returns: 850</code></pre>`,
        starterCode: `def net_single_premium(sum_assured, age, mortality_table, interest_rate, term):
    # Write your code here
    pass`,
        solution: `def net_single_premium(sum_assured, age, mortality_table, interest_rate, term):
    nsp = 0
    survival_prob = 1.0
    for year in range(term):
        curr_age = age + year
        if curr_age in mortality_table:
            qx = mortality_table[curr_age]
            nsp += sum_assured * survival_prob * qx / ((1 + interest_rate) ** (year + 1))
            survival_prob *= (1 - qx)
    return nsp`,
        testCases: [
            { input: [100000, 30, {30: 0.001, 31: 0.0012}, 0.05, 10], expected: 850 }
        ]
    },
    {
        id: 28,
        title: "Calculate Premium Loading",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>premium_loading(net_premium, expense_loading, profit_loading)</code> that calculates gross premium.</p>
        <h3>Example</h3>
        <pre><code>premium_loading(1000, 0.1, 0.05)
# Returns: 1150</code></pre>`,
        starterCode: `def premium_loading(net_premium, expense_loading, profit_loading):
    # Write your code here
    pass`,
        solution: `def premium_loading(net_premium, expense_loading, profit_loading):
    return net_premium * (1 + expense_loading + profit_loading)`,
        testCases: [
            { input: [1000, 0.1, 0.05], expected: 1150 }
        ]
    },
    {
        id: 29,
        title: "Calculate Compound Interest",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>compound_interest(principal, rate, years, compounding)</code> that calculates compound interest.</p>
        <h3>Example</h3>
        <pre><code>compound_interest(1000, 0.05, 10, 12)
# Returns: 1647.01</code></pre>`,
        starterCode: `def compound_interest(principal, rate, years, compounding):
    # Write your code here
    pass`,
        solution: `def compound_interest(principal, rate, years, compounding):
    return principal * ((1 + rate / compounding) ** (compounding * years)) - principal`,
        testCases: [
            { input: [1000, 0.05, 10, 12], expected: 1647.01 }
        ]
    },
    {
        id: 30,
        title: "Calculate Simple Interest",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>simple_interest(principal, rate, years)</code> that calculates simple interest.</p>
        <h3>Example</h3>
        <pre><code>simple_interest(1000, 0.05, 10)
# Returns: 500</code></pre>`,
        starterCode: `def simple_interest(principal, rate, years):
    # Write your code here
    pass`,
        solution: `def simple_interest(principal, rate, years):
    return principal * rate * years`,
        testCases: [
            { input: [1000, 0.05, 10], expected: 500 }
        ]
    },
    {
        id: 31,
        title: "Calculate Discount Factor",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>discount_factor(interest_rate, years)</code> that calculates discount factor.</p>
        <h3>Example</h3>
        <pre><code>discount_factor(0.05, 10)
# Returns: 0.6139</code></pre>`,
        starterCode: `def discount_factor(interest_rate, years):
    # Write your code here
    pass`,
        solution: `def discount_factor(interest_rate, years):
    return 1 / ((1 + interest_rate) ** years)`,
        testCases: [
            { input: [0.05, 10], expected: 0.6139 }
        ]
    },
    {
        id: 32,
        title: "Calculate Accumulation Factor",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>accumulation_factor(interest_rate, years)</code> that calculates accumulation factor.</p>
        <h3>Example</h3>
        <pre><code>accumulation_factor(0.05, 10)
# Returns: 1.6289</code></pre>`,
        starterCode: `def accumulation_factor(interest_rate, years):
    # Write your code here
    pass`,
        solution: `def accumulation_factor(interest_rate, years):
    return (1 + interest_rate) ** years`,
        testCases: [
            { input: [0.05, 10], expected: 1.6289 }
        ]
    },
    {
        id: 33,
        title: "Calculate Nominal Rate from Effective",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>nominal_rate(effective_rate, compounding)</code> that converts effective to nominal rate.</p>
        <h3>Example</h3>
        <pre><code>nominal_rate(0.0617, 12)
# Returns: 0.06</code></pre>`,
        starterCode: `def nominal_rate(effective_rate, compounding):
    # Write your code here
    pass`,
        solution: `def nominal_rate(effective_rate, compounding):
    return compounding * ((1 + effective_rate) ** (1 / compounding) - 1)`,
        testCases: [
            { input: [0.0617, 12], expected: 0.06 }
        ]
    },
    {
        id: 34,
        title: "Calculate Force of Interest",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>force_of_interest(nominal_rate, compounding)</code> that calculates force of interest.</p>
        <h3>Example</h3>
        <pre><code>force_of_interest(0.06, 12)
# Returns: 0.0598</code></pre>`,
        starterCode: `def force_of_interest(nominal_rate, compounding):
    # Write your code here
    pass`,
        solution: `def force_of_interest(nominal_rate, compounding):
    import math
    return compounding * math.log(1 + nominal_rate / compounding)`,
        testCases: [
            { input: [0.06, 12], expected: 0.0598 }
        ]
    },
    {
        id: 35,
        title: "Calculate Sinking Fund Payment",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>sinking_fund_payment(future_value, interest_rate, years)</code> that calculates sinking fund payment.</p>
        <h3>Example</h3>
        <pre><code>sinking_fund_payment(100000, 0.05, 10)
# Returns: 7950.46</code></pre>`,
        starterCode: `def sinking_fund_payment(future_value, interest_rate, years):
    # Write your code here
    pass`,
        solution: `def sinking_fund_payment(future_value, interest_rate, years):
    if interest_rate == 0:
        return future_value / years
    return future_value * interest_rate / ((1 + interest_rate) ** years - 1)`,
        testCases: [
            { input: [100000, 0.05, 10], expected: 7950.46 }
        ]
    },
    {
        id: 36,
        title: "Calculate Capital Recovery Factor",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>capital_recovery_factor(interest_rate, years)</code> that calculates CRF.</p>
        <h3>Example</h3>
        <pre><code>capital_recovery_factor(0.05, 10)
# Returns: 0.1295</code></pre>`,
        starterCode: `def capital_recovery_factor(interest_rate, years):
    # Write your code here
    pass`,
        solution: `def capital_recovery_factor(interest_rate, years):
    if interest_rate == 0:
        return 1 / years
    return interest_rate * ((1 + interest_rate) ** years) / ((1 + interest_rate) ** years - 1)`,
        testCases: [
            { input: [0.05, 10], expected: 0.1295 }
        ]
    },
    {
        id: 37,
        title: "Calculate Present Worth Factor",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>present_worth_factor(interest_rate, years)</code> that calculates PWF.</p>
        <h3>Example</h3>
        <pre><code>present_worth_factor(0.05, 10)
# Returns: 7.7217</code></pre>`,
        starterCode: `def present_worth_factor(interest_rate, years):
    # Write your code here
    pass`,
        solution: `def present_worth_factor(interest_rate, years):
    if interest_rate == 0:
        return years
    return (1 - (1 + interest_rate) ** (-years)) / interest_rate`,
        testCases: [
            { input: [0.05, 10], expected: 7.7217 }
        ]
    },
    {
        id: 38,
        title: "Calculate Future Worth Factor",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>future_worth_factor(interest_rate, years)</code> that calculates FWF.</p>
        <h3>Example</h3>
        <pre><code>future_worth_factor(0.05, 10)
# Returns: 12.5779</code></pre>`,
        starterCode: `def future_worth_factor(interest_rate, years):
    # Write your code here
    pass`,
        solution: `def future_worth_factor(interest_rate, years):
    if interest_rate == 0:
        return years
    return ((1 + interest_rate) ** years - 1) / interest_rate`,
        testCases: [
            { input: [0.05, 10], expected: 12.5779 }
        ]
    },
    {
        id: 39,
        title: "Calculate Geometric Mean Return",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>geometric_mean_return(returns)</code> that calculates geometric mean return.</p>
        <h3>Example</h3>
        <pre><code>geometric_mean_return([0.1, 0.12, -0.05, 0.08])
# Returns: 0.062</code></pre>`,
        starterCode: `def geometric_mean_return(returns):
    # Write your code here
    pass`,
        solution: `def geometric_mean_return(returns):
    import math
    product = 1
    for r in returns:
        product *= (1 + r)
    return product ** (1 / len(returns)) - 1`,
        testCases: [
            { input: [[0.1, 0.12, -0.05, 0.08]], expected: 0.062 }
        ]
    },
    {
        id: 40,
        title: "Calculate Arithmetic Mean Return",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>arithmetic_mean_return(returns)</code> that calculates arithmetic mean return.</p>
        <h3>Example</h3>
        <pre><code>arithmetic_mean_return([0.1, 0.12, -0.05, 0.08])
# Returns: 0.0625</code></pre>`,
        starterCode: `def arithmetic_mean_return(returns):
    # Write your code here
    pass`,
        solution: `def arithmetic_mean_return(returns):
    return sum(returns) / len(returns)`,
        testCases: [
            { input: [[0.1, 0.12, -0.05, 0.08]], expected: 0.0625 }
        ]
    },
    {
        id: 41,
        title: "Calculate Standard Deviation",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>standard_deviation(returns)</code> that calculates standard deviation of returns.</p>
        <h3>Example</h3>
        <pre><code>standard_deviation([0.1, 0.12, -0.05, 0.08])
# Returns: 0.073</code></pre>`,
        starterCode: `def standard_deviation(returns):
    # Write your code here
    pass`,
        solution: `def standard_deviation(returns):
    import statistics
    return statistics.stdev(returns)`,
        testCases: [
            { input: [[0.1, 0.12, -0.05, 0.08]], expected: 0.073 }
        ]
    },
    {
        id: 42,
        title: "Calculate Covariance",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>covariance(returns1, returns2)</code> that calculates covariance between two return series.</p>
        <h3>Example</h3>
        <pre><code>covariance([0.1, 0.12, 0.08], [0.15, 0.18, 0.12])
# Returns: 0.0012</code></pre>`,
        starterCode: `def covariance(returns1, returns2):
    # Write your code here
    pass`,
        solution: `def covariance(returns1, returns2):
    mean1 = sum(returns1) / len(returns1)
    mean2 = sum(returns2) / len(returns2)
    return sum((r1 - mean1) * (r2 - mean2) for r1, r2 in zip(returns1, returns2)) / len(returns1)`,
        testCases: [
            { input: [[0.1, 0.12, 0.08], [0.15, 0.18, 0.12]], expected: 0.0012 }
        ]
    },
    {
        id: 43,
        title: "Calculate Correlation",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>correlation(returns1, returns2)</code> that calculates correlation coefficient.</p>
        <h3>Example</h3>
        <pre><code>correlation([0.1, 0.12, 0.08], [0.15, 0.18, 0.12])
# Returns: 0.95</code></pre>`,
        starterCode: `def correlation(returns1, returns2):
    # Write your code here
    pass`,
        solution: `def correlation(returns1, returns2):
    import math
    cov = covariance(returns1, returns2)
    std1 = standard_deviation(returns1)
    std2 = standard_deviation(returns2)
    return cov / (std1 * std2) if std1 > 0 and std2 > 0 else 0`,
        testCases: [
            { input: [[0.1, 0.12, 0.08], [0.15, 0.18, 0.12]], expected: 0.95 }
        ]
    },
    {
        id: 44,
        title: "Calculate Beta",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>beta(stock_returns, market_returns)</code> that calculates beta coefficient.</p>
        <h3>Example</h3>
        <pre><code>beta([0.1, 0.12, 0.08], [0.08, 0.10, 0.06])
# Returns: 1.2</code></pre>`,
        starterCode: `def beta(stock_returns, market_returns):
    # Write your code here
    pass`,
        solution: `def beta(stock_returns, market_returns):
    cov = covariance(stock_returns, market_returns)
    market_var = sum((r - sum(market_returns)/len(market_returns))**2 for r in market_returns) / len(market_returns)
    return cov / market_var if market_var > 0 else 0`,
        testCases: [
            { input: [[0.1, 0.12, 0.08], [0.08, 0.10, 0.06]], expected: 1.2 }
        ]
    },
    {
        id: 45,
        title: "Calculate Alpha",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>alpha(stock_returns, market_returns, risk_free_rate)</code> that calculates alpha.</p>
        <h3>Example</h3>
        <pre><code>alpha([0.1, 0.12, 0.08], [0.08, 0.10, 0.06], 0.03)
# Returns: 0.02</code></pre>`,
        starterCode: `def alpha(stock_returns, market_returns, risk_free_rate):
    # Write your code here
    pass`,
        solution: `def alpha(stock_returns, market_returns, risk_free_rate):
    stock_mean = arithmetic_mean_return(stock_returns)
    market_mean = arithmetic_mean_return(market_returns)
    beta_val = beta(stock_returns, market_returns)
    return stock_mean - (risk_free_rate + beta_val * (market_mean - risk_free_rate))`,
        testCases: [
            { input: [[0.1, 0.12, 0.08], [0.08, 0.10, 0.06], 0.03], expected: 0.02 }
        ]
    },
    {
        id: 46,
        title: "Calculate Treynor Ratio",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>treynor_ratio(returns, market_returns, risk_free_rate)</code> that calculates Treynor ratio.</p>
        <h3>Example</h3>
        <pre><code>treynor_ratio([0.1, 0.12, 0.08], [0.08, 0.10, 0.06], 0.03)
# Returns: 0.08</code></pre>`,
        starterCode: `def treynor_ratio(returns, market_returns, risk_free_rate):
    # Write your code here
    pass`,
        solution: `def treynor_ratio(returns, market_returns, risk_free_rate):
    excess_return = arithmetic_mean_return(returns) - risk_free_rate
    beta_val = beta(returns, market_returns)
    return excess_return / beta_val if beta_val > 0 else 0`,
        testCases: [
            { input: [[0.1, 0.12, 0.08], [0.08, 0.10, 0.06], 0.03], expected: 0.08 }
        ]
    },
    {
        id: 47,
        title: "Calculate Information Ratio",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>information_ratio(portfolio_returns, benchmark_returns)</code> that calculates information ratio.</p>
        <h3>Example</h3>
        <pre><code>information_ratio([0.1, 0.12, 0.08], [0.08, 0.10, 0.06])
# Returns: 0.5</code></pre>`,
        starterCode: `def information_ratio(portfolio_returns, benchmark_returns):
    # Write your code here
    pass`,
        solution: `def information_ratio(portfolio_returns, benchmark_returns):
    active_returns = [p - b for p, b in zip(portfolio_returns, benchmark_returns)]
    mean_active = arithmetic_mean_return(active_returns)
    tracking_error = standard_deviation(active_returns)
    return mean_active / tracking_error if tracking_error > 0 else 0`,
        testCases: [
            { input: [[0.1, 0.12, 0.08], [0.08, 0.10, 0.06]], expected: 0.5 }
        ]
    },
    {
        id: 48,
        title: "Calculate Sortino Ratio",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>sortino_ratio(returns, risk_free_rate, target_return)</code> that calculates Sortino ratio.</p>
        <h3>Example</h3>
        <pre><code>sortino_ratio([0.1, 0.12, -0.05, 0.08], 0.03, 0.05)
# Returns: 1.5</code></pre>`,
        starterCode: `def sortino_ratio(returns, risk_free_rate, target_return):
    # Write your code here
    pass`,
        solution: `def sortino_ratio(returns, risk_free_rate, target_return):
    import math
    excess_returns = [r - risk_free_rate for r in returns]
    downside_returns = [min(0, r - target_return) for r in returns]
    downside_std = math.sqrt(sum(d**2 for d in downside_returns) / len(downside_returns))
    mean_excess = arithmetic_mean_return(excess_returns)
    return mean_excess / downside_std if downside_std > 0 else 0`,
        testCases: [
            { input: [[0.1, 0.12, -0.05, 0.08], 0.03, 0.05], expected: 1.5 }
        ]
    },
    {
        id: 49,
        title: "Calculate Maximum Drawdown",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>max_drawdown(returns)</code> that calculates maximum drawdown.</p>
        <h3>Example</h3>
        <pre><code>max_drawdown([0.1, 0.12, -0.05, 0.08, -0.02])
# Returns: -0.05</code></pre>`,
        starterCode: `def max_drawdown(returns):
    # Write your code here
    pass`,
        solution: `def max_drawdown(returns):
    cumulative = 1
    peak = 1
    max_dd = 0
    for r in returns:
        cumulative *= (1 + r)
        if cumulative > peak:
            peak = cumulative
        drawdown = (cumulative - peak) / peak
        if drawdown < max_dd:
            max_dd = drawdown
    return max_dd`,
        testCases: [
            { input: [[0.1, 0.12, -0.05, 0.08, -0.02]], expected: -0.05 }
        ]
    },
    {
        id: 50,
        title: "Calculate Calmar Ratio",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>calmar_ratio(returns, risk_free_rate)</code> that calculates Calmar ratio.</p>
        <h3>Example</h3>
        <pre><code>calmar_ratio([0.1, 0.12, -0.05, 0.08], 0.03)
# Returns: 2.0</code></pre>`,
        starterCode: `def calmar_ratio(returns, risk_free_rate):
    # Write your code here
    pass`,
        solution: `def calmar_ratio(returns, risk_free_rate):
    annual_return = arithmetic_mean_return(returns) * 12  # Assuming monthly returns
    max_dd = abs(max_drawdown(returns))
    return (annual_return - risk_free_rate) / max_dd if max_dd > 0 else 0`,
        testCases: [
            { input: [[0.1, 0.12, -0.05, 0.08], 0.03], expected: 2.0 }
        ]
    }
];

let currentProblemIndex = 0;
let codeEditor;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeEditor();
    loadProblem(0);
    renderProblemsList();
    setupEventListeners();
});

function initializeEditor() {
    codeEditor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        lineNumbers: true,
        mode: 'python',
        theme: 'default',
        indentUnit: 4,
        indentWithTabs: false,
        lineWrapping: true
    });
}

function setupEventListeners() {
    document.getElementById('run-btn').addEventListener('click', runCode);
    document.getElementById('submit-btn').addEventListener('click', submitCode);
}

function loadProblem(index) {
    currentProblemIndex = index;
    const problem = pythonProblems[index];
    
    document.getElementById('problem-title').textContent = `Problem ${problem.id}: ${problem.title}`;
    document.getElementById('difficulty-badge').textContent = problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1);
    document.getElementById('difficulty-badge').className = `difficulty-badge ${problem.difficulty}`;
    document.getElementById('problem-content').innerHTML = problem.description;
    
    codeEditor.setValue(problem.starterCode);
    
    // Update active problem in sidebar
    document.querySelectorAll('.problem-item').forEach((item, idx) => {
        item.classList.toggle('active', idx === index);
    });
    
    // Clear output
    document.getElementById('output-content').innerHTML = '<p style="color: #64748b; font-style: italic;">Click "Run" to test your code</p>';
}

function renderProblemsList() {
    const list = document.getElementById('problems-list');
    list.innerHTML = '';
    
    pythonProblems.forEach((problem, index) => {
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

function runCode() {
    const code = codeEditor.getValue();
    const problem = pythonProblems[currentProblemIndex];
    const output = document.getElementById('output-content');
    
    output.innerHTML = '<p style="color: #64748b;">Running tests...</p>';
    
    // Simple Python execution simulation
    // Note: This is a simplified version. For full execution, you'd need a Python interpreter
    // For now, we'll check the code structure and provide feedback
    
    try {
        // Check if function is defined
        if (!code.includes('def ')) {
            output.innerHTML = '<p class="error">Error: Function definition not found. Please define a function.</p>';
            return;
        }
        
        // Run test cases (simplified - in real implementation, you'd use a Python interpreter)
        let results = [];
        let allPassed = true;
        
        problem.testCases.forEach((testCase, idx) => {
            // This is a placeholder - actual execution would require a Python interpreter
            // For demonstration, we'll show the expected structure
            results.push(`
                <div class="test-case">
                    <strong>Test Case ${idx + 1}:</strong><br>
                    Input: ${testCase.input.join(', ')}<br>
                    Expected: ${testCase.expected}<br>
                    <span style="color: #64748b;">Note: Full execution requires a Python interpreter. Check your logic against the expected output.</span>
                </div>
            `);
        });
        
        output.innerHTML = `
            <p><strong>Test Results:</strong></p>
            ${results.join('')}
            <p style="margin-top: 16px; color: #64748b;">
                <strong>Note:</strong> This is a static site, so code execution is limited. 
                Copy your code to a Python environment to test fully. The expected outputs are shown above.
            </p>
        `;
        
    } catch (error) {
        output.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}

function submitCode() {
    const code = codeEditor.getValue();
    const problem = pythonProblems[currentProblemIndex];
    const output = document.getElementById('output-content');
    
    // Check if solution matches (simplified check)
    const normalizedCode = code.replace(/\s+/g, ' ').trim();
    const normalizedSolution = problem.solution.replace(/\s+/g, ' ').trim();
    
    output.innerHTML = `
        <p><strong>Submission Results:</strong></p>
        <p style="color: #64748b; margin-top: 16px;">
            Your code has been submitted! For full validation, test it in a Python environment.
        </p>
        <details style="margin-top: 16px;">
            <summary style="cursor: pointer; color: #6366f1; font-weight: 600;">View Solution</summary>
            <pre style="background: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px; margin-top: 12px; overflow-x: auto;"><code>${problem.solution}</code></pre>
        </details>
    `;
}

