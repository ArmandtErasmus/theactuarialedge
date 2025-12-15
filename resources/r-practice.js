// R Practice Problems for Actuaries
const rProblems = [
    {
        id: 1,
        title: "Calculate Present Value",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>present_value(future_value, interest_rate, years)</code> that calculates the present value of a future amount.</p>
        <p><strong>Formula:</strong> PV = FV / (1 + r)^n</p>
        
        <h3>Example</h3>
        <pre><code>present_value(1000, 0.05, 10)
# Returns: 613.91</code></pre>`,
        starterCode: `present_value <- function(future_value, interest_rate, years) {
  # Write your code here
  
}`,
        solution: `present_value <- function(future_value, interest_rate, years) {
  return(future_value / ((1 + interest_rate) ^ years))
}`,
        testCases: [
            { input: [1000, 0.05, 10], expected: 613.91 },
            { input: [5000, 0.06, 5], expected: 3736.29 }
        ]
    },
    {
        id: 2,
        title: "Calculate Mortality Rate",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>mortality_rate(deaths, exposure)</code> that calculates the mortality rate.</p>
        <p><strong>Formula:</strong> q = deaths / exposure</p>
        
        <h3>Example</h3>
        <pre><code>mortality_rate(50, 10000)
# Returns: 0.005</code></pre>`,
        starterCode: `mortality_rate <- function(deaths, exposure) {
  # Write your code here
  
}`,
        solution: `mortality_rate <- function(deaths, exposure) {
  return(deaths / exposure)
}`,
        testCases: [
            { input: [50, 10000], expected: 0.005 },
            { input: [120, 50000], expected: 0.0024 }
        ]
    },
    {
        id: 3,
        title: "Calculate Life Expectancy",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>life_expectancy(survival_rates)</code> that calculates life expectancy from a vector of survival rates.</p>
        <p><strong>Formula:</strong> e₀ = Σ lₓ / l₀</p>
        
        <h3>Example</h3>
        <pre><code>life_expectancy(c(1.0, 0.99, 0.98, 0.97))
# Returns: 3.94</code></pre>`,
        starterCode: `life_expectancy <- function(survival_rates) {
  # Write your code here
  
}`,
        solution: `life_expectancy <- function(survival_rates) {
  return(sum(survival_rates) / survival_rates[1])
}`,
        testCases: [
            { input: [[1.0, 0.99, 0.98, 0.97]], expected: 3.94 }
        ]
    },
    {
        id: 4,
        title: "Calculate Future Value",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>future_value(present_value, interest_rate, years)</code> that calculates future value.</p>
        <h3>Example</h3>
        <pre><code>future_value(1000, 0.05, 10)
# Returns: 1628.89</code></pre>`,
        starterCode: `future_value <- function(present_value, interest_rate, years) {
  # Write your code here
  
}`,
        solution: `future_value <- function(present_value, interest_rate, years) {
  return(present_value * ((1 + interest_rate) ^ years))
}`,
        testCases: [
            { input: [1000, 0.05, 10], expected: 1628.89 }
        ]
    },
    {
        id: 5,
        title: "Calculate Annuity Present Value",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>annuity_pv(payment, interest_rate, years)</code> that calculates annuity PV.</p>
        <h3>Example</h3>
        <pre><code>annuity_pv(1000, 0.05, 10)
# Returns: 7721.73</code></pre>`,
        starterCode: `annuity_pv <- function(payment, interest_rate, years) {
  # Write your code here
  
}`,
        solution: `annuity_pv <- function(payment, interest_rate, years) {
  if (interest_rate == 0) {
    return(payment * years)
  }
  return(payment * (1 - (1 + interest_rate) ^ (-years)) / interest_rate)
}`,
        testCases: [
            { input: [1000, 0.05, 10], expected: 7721.73 }
        ]
    },
    {
        id: 6,
        title: "Calculate Survival Probability",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>survival_prob(mortality_rate)</code> that calculates survival probability.</p>
        <h3>Example</h3>
        <pre><code>survival_prob(0.005)
# Returns: 0.995</code></pre>`,
        starterCode: `survival_prob <- function(mortality_rate) {
  # Write your code here
  
}`,
        solution: `survival_prob <- function(mortality_rate) {
  return(1 - mortality_rate)
}`,
        testCases: [
            { input: [0.005], expected: 0.995 }
        ]
    },
    {
        id: 7,
        title: "Calculate Net Premium",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>net_premium(sum_assured, mortality_rate, interest_rate)</code> that calculates net premium.</p>
        <h3>Example</h3>
        <pre><code>net_premium(100000, 0.01, 0.05)
# Returns: 952.38</code></pre>`,
        starterCode: `net_premium <- function(sum_assured, mortality_rate, interest_rate) {
  # Write your code here
  
}`,
        solution: `net_premium <- function(sum_assured, mortality_rate, interest_rate) {
  pv_benefit <- sum_assured * mortality_rate / (1 + interest_rate)
  return(pv_benefit / (1 - mortality_rate))
}`,
        testCases: [
            { input: [100000, 0.01, 0.05], expected: 952.38 }
        ]
    },
    {
        id: 8,
        title: "Calculate Bond Price",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>bond_price(face_value, coupon_rate, years, yield_rate)</code> that calculates bond price.</p>
        <h3>Example</h3>
        <pre><code>bond_price(1000, 0.05, 10, 0.06)
# Returns: 926.40</code></pre>`,
        starterCode: `bond_price <- function(face_value, coupon_rate, years, yield_rate) {
  # Write your code here
  
}`,
        solution: `bond_price <- function(face_value, coupon_rate, years, yield_rate) {
  annual_coupon <- face_value * coupon_rate
  pv_coupons <- annual_coupon * (1 - (1 + yield_rate) ^ (-years)) / yield_rate
  pv_face <- face_value / ((1 + yield_rate) ^ years)
  return(pv_coupons + pv_face)
}`,
        testCases: [
            { input: [1000, 0.05, 10, 0.06], expected: 926.40 }
        ]
    },
    {
        id: 9,
        title: "Calculate Loan Payment",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>loan_payment(principal, interest_rate, years)</code> that calculates loan payment.</p>
        <h3>Example</h3>
        <pre><code>loan_payment(100000, 0.05, 30)
# Returns: 6505.15</code></pre>`,
        starterCode: `loan_payment <- function(principal, interest_rate, years) {
  # Write your code here
  
}`,
        solution: `loan_payment <- function(principal, interest_rate, years) {
  if (interest_rate == 0) {
    return(principal / years)
  }
  numerator <- interest_rate * ((1 + interest_rate) ^ years)
  denominator <- ((1 + interest_rate) ^ years) - 1
  return(principal * (numerator / denominator))
}`,
        testCases: [
            { input: [100000, 0.05, 30], expected: 6505.15 }
        ]
    },
    {
        id: 10,
        title: "Calculate Effective Rate",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>effective_rate(nominal_rate, compounding)</code> that calculates effective rate.</p>
        <h3>Example</h3>
        <pre><code>effective_rate(0.06, 12)
# Returns: 0.0617</code></pre>`,
        starterCode: `effective_rate <- function(nominal_rate, compounding) {
  # Write your code here
  
}`,
        solution: `effective_rate <- function(nominal_rate, compounding) {
  return((1 + nominal_rate / compounding) ^ compounding - 1)
}`,
        testCases: [
            { input: [0.06, 12], expected: 0.0617 }
        ]
    },
    {
        id: 11,
        title: "Calculate Portfolio Return",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>portfolio_return(weights, returns)</code> that calculates weighted portfolio return.</p>
        <h3>Example</h3>
        <pre><code>portfolio_return(c(0.5, 0.3, 0.2), c(0.1, 0.12, 0.08))
# Returns: 0.104</code></pre>`,
        starterCode: `portfolio_return <- function(weights, returns) {
  # Write your code here
  
}`,
        solution: `portfolio_return <- function(weights, returns) {
  return(sum(weights * returns))
}`,
        testCases: [
            { input: [[0.5, 0.3, 0.2], [0.1, 0.12, 0.08]], expected: 0.104 }
        ]
    },
    {
        id: 12,
        title: "Calculate Sharpe Ratio",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>sharpe_ratio(returns, risk_free_rate)</code> that calculates Sharpe ratio.</p>
        <h3>Example</h3>
        <pre><code>sharpe_ratio(c(0.1, 0.12, 0.08, 0.15), 0.03)
# Returns: 1.2</code></pre>`,
        starterCode: `sharpe_ratio <- function(returns, risk_free_rate) {
  # Write your code here
  
}`,
        solution: `sharpe_ratio <- function(returns, risk_free_rate) {
  mean_return <- mean(returns)
  std_return <- sd(returns)
  return((mean_return - risk_free_rate) / std_return)
}`,
        testCases: [
            { input: [[0.1, 0.12, 0.08, 0.15], 0.03], expected: 1.2 }
        ]
    },
    {
        id: 13,
        title: "Calculate Correlation",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>correlation_coef(returns1, returns2)</code> that calculates correlation coefficient.</p>
        <h3>Example</h3>
        <pre><code>correlation_coef(c(0.1, 0.12, 0.08), c(0.15, 0.18, 0.12))
# Returns: 0.95</code></pre>`,
        starterCode: `correlation_coef <- function(returns1, returns2) {
  # Write your code here
  
}`,
        solution: `correlation_coef <- function(returns1, returns2) {
  return(cor(returns1, returns2))
}`,
        testCases: [
            { input: [[0.1, 0.12, 0.08], [0.15, 0.18, 0.12]], expected: 0.95 }
        ]
    },
    {
        id: 14,
        title: "Calculate Covariance",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>covariance(returns1, returns2)</code> that calculates covariance.</p>
        <h3>Example</h3>
        <pre><code>covariance(c(0.1, 0.12, 0.08), c(0.15, 0.18, 0.12))
# Returns: 0.0012</code></pre>`,
        starterCode: `covariance <- function(returns1, returns2) {
  # Write your code here
  
}`,
        solution: `covariance <- function(returns1, returns2) {
  return(cov(returns1, returns2))
}`,
        testCases: [
            { input: [[0.1, 0.12, 0.08], [0.15, 0.18, 0.12]], expected: 0.0012 }
        ]
    },
    {
        id: 15,
        title: "Calculate Beta",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>beta(stock_returns, market_returns)</code> that calculates beta.</p>
        <h3>Example</h3>
        <pre><code>beta(c(0.1, 0.12, 0.08), c(0.08, 0.10, 0.06))
# Returns: 1.2</code></pre>`,
        starterCode: `beta <- function(stock_returns, market_returns) {
  # Write your code here
  
}`,
        solution: `beta <- function(stock_returns, market_returns) {
  cov_val <- cov(stock_returns, market_returns)
  market_var <- var(market_returns)
  return(cov_val / market_var)
}`,
        testCases: [
            { input: [[0.1, 0.12, 0.08], [0.08, 0.10, 0.06]], expected: 1.2 }
        ]
    },
    {
        id: 16,
        title: "Calculate Standard Deviation",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>std_dev(returns)</code> that calculates standard deviation.</p>
        <h3>Example</h3>
        <pre><code>std_dev(c(0.1, 0.12, -0.05, 0.08))
# Returns: 0.073</code></pre>`,
        starterCode: `std_dev <- function(returns) {
  # Write your code here
  
}`,
        solution: `std_dev <- function(returns) {
  return(sd(returns))
}`,
        testCases: [
            { input: [[0.1, 0.12, -0.05, 0.08]], expected: 0.073 }
        ]
    },
    {
        id: 17,
        title: "Calculate Variance",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>variance(returns)</code> that calculates variance.</p>
        <h3>Example</h3>
        <pre><code>variance(c(0.1, 0.12, -0.05, 0.08))
# Returns: 0.0053</code></pre>`,
        starterCode: `variance <- function(returns) {
  # Write your code here
  
}`,
        solution: `variance <- function(returns) {
  return(var(returns))
}`,
        testCases: [
            { input: [[0.1, 0.12, -0.05, 0.08]], expected: 0.0053 }
        ]
    },
    {
        id: 18,
        title: "Calculate Mean Return",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>mean_return(returns)</code> that calculates mean return.</p>
        <h3>Example</h3>
        <pre><code>mean_return(c(0.1, 0.12, -0.05, 0.08))
# Returns: 0.0625</code></pre>`,
        starterCode: `mean_return <- function(returns) {
  # Write your code here
  
}`,
        solution: `mean_return <- function(returns) {
  return(mean(returns))
}`,
        testCases: [
            { input: [[0.1, 0.12, -0.05, 0.08]], expected: 0.0625 }
        ]
    },
    {
        id: 19,
        title: "Calculate Geometric Mean",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>geometric_mean(returns)</code> that calculates geometric mean return.</p>
        <h3>Example</h3>
        <pre><code>geometric_mean(c(0.1, 0.12, -0.05, 0.08))
# Returns: 0.062</code></pre>`,
        starterCode: `geometric_mean <- function(returns) {
  # Write your code here
  
}`,
        solution: `geometric_mean <- function(returns) {
  product <- prod(1 + returns)
  return(product ^ (1 / length(returns)) - 1)
}`,
        testCases: [
            { input: [[0.1, 0.12, -0.05, 0.08]], expected: 0.062 }
        ]
    },
    {
        id: 20,
        title: "Calculate Value at Risk",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>var(returns, confidence_level)</code> that calculates Value at Risk.</p>
        <h3>Example</h3>
        <pre><code>var(c(0.1, -0.05, 0.08, -0.02), 0.95)
# Returns: -0.05</code></pre>`,
        starterCode: `var <- function(returns, confidence_level) {
  # Write your code here
  
}`,
        solution: `var <- function(returns, confidence_level) {
  sorted_returns <- sort(returns)
  index <- floor((1 - confidence_level) * length(sorted_returns)) + 1
  return(sorted_returns[index])
}`,
        testCases: [
            { input: [[0.1, -0.05, 0.08, -0.02], 0.95], expected: -0.05 }
        ]
    },
    {
        id: 21,
        title: "Calculate Perpetuity PV",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>perpetuity_pv(payment, interest_rate)</code> that calculates perpetuity PV.</p>
        <h3>Example</h3>
        <pre><code>perpetuity_pv(100, 0.05)
# Returns: 2000</code></pre>`,
        starterCode: `perpetuity_pv <- function(payment, interest_rate) {
  # Write your code here
  
}`,
        solution: `perpetuity_pv <- function(payment, interest_rate) {
  return(payment / interest_rate)
}`,
        testCases: [
            { input: [100, 0.05], expected: 2000 }
        ]
    },
    {
        id: 22,
        title: "Calculate Annuity Future Value",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>annuity_fv(payment, interest_rate, years)</code> that calculates annuity FV.</p>
        <h3>Example</h3>
        <pre><code>annuity_fv(1000, 0.05, 10)
# Returns: 12577.89</code></pre>`,
        starterCode: `annuity_fv <- function(payment, interest_rate, years) {
  # Write your code here
  
}`,
        solution: `annuity_fv <- function(payment, interest_rate, years) {
  if (interest_rate == 0) {
    return(payment * years)
  }
  return(payment * (((1 + interest_rate) ^ years - 1) / interest_rate))
}`,
        testCases: [
            { input: [1000, 0.05, 10], expected: 12577.89 }
        ]
    },
    {
        id: 23,
        title: "Calculate Discount Factor",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>discount_factor(interest_rate, years)</code> that calculates discount factor.</p>
        <h3>Example</h3>
        <pre><code>discount_factor(0.05, 10)
# Returns: 0.6139</code></pre>`,
        starterCode: `discount_factor <- function(interest_rate, years) {
  # Write your code here
  
}`,
        solution: `discount_factor <- function(interest_rate, years) {
  return(1 / ((1 + interest_rate) ^ years))
}`,
        testCases: [
            { input: [0.05, 10], expected: 0.6139 }
        ]
    },
    {
        id: 24,
        title: "Calculate Accumulation Factor",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>accumulation_factor(interest_rate, years)</code> that calculates accumulation factor.</p>
        <h3>Example</h3>
        <pre><code>accumulation_factor(0.05, 10)
# Returns: 1.6289</code></pre>`,
        starterCode: `accumulation_factor <- function(interest_rate, years) {
  # Write your code here
  
}`,
        solution: `accumulation_factor <- function(interest_rate, years) {
  return((1 + interest_rate) ^ years)
}`,
        testCases: [
            { input: [0.05, 10], expected: 1.6289 }
        ]
    },
    {
        id: 25,
        title: "Calculate Yield to Maturity",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>ytm(bond_price, face_value, coupon_rate, years, frequency)</code> that calculates YTM.</p>
        <h3>Example</h3>
        <pre><code>ytm(950, 1000, 0.05, 10, 2)
# Returns: 0.055</code></pre>`,
        starterCode: `ytm <- function(bond_price, face_value, coupon_rate, years, frequency) {
  # Write your code here
  
}`,
        solution: `ytm <- function(bond_price, face_value, coupon_rate, years, frequency) {
  annual_coupon <- face_value * coupon_rate
  periods <- years * frequency
  coupon_per_period <- annual_coupon / frequency
  numerator <- coupon_per_period + (face_value - bond_price) / periods
  denominator <- (face_value + bond_price) / 2
  return((numerator / denominator) * frequency)
}`,
        testCases: [
            { input: [950, 1000, 0.05, 10, 2], expected: 0.055 }
        ]
    },
    {
        id: 26,
        title: "Calculate Duration",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>duration(face_value, coupon_rate, yield_rate, years, frequency)</code> that calculates Macaulay duration.</p>
        <h3>Example</h3>
        <pre><code>duration(1000, 0.05, 0.06, 10, 2)
# Returns: 7.8</code></pre>`,
        starterCode: `duration <- function(face_value, coupon_rate, yield_rate, years, frequency) {
  # Write your code here
  
}`,
        solution: `duration <- function(face_value, coupon_rate, yield_rate, years, frequency) {
  periods <- years * frequency
  coupon <- face_value * coupon_rate / frequency
  period_yield <- yield_rate / frequency
  pv_sum <- 0
  weighted_sum <- 0
  
  for (t in 1:periods) {
    if (t == periods) {
      cash_flow <- coupon + face_value
    } else {
      cash_flow <- coupon
    }
    pv <- cash_flow / ((1 + period_yield) ^ t)
    pv_sum <- pv_sum + pv
    weighted_sum <- weighted_sum + t * pv
  }
  
  return((weighted_sum / pv_sum) / frequency)
}`,
        testCases: [
            { input: [1000, 0.05, 0.06, 10, 2], expected: 7.8 }
        ]
    },
    {
        id: 27,
        title: "Calculate Modified Duration",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>modified_duration(macaulay_duration, yield_rate, frequency)</code> that calculates modified duration.</p>
        <h3>Example</h3>
        <pre><code>modified_duration(7.5, 0.06, 2)
# Returns: 7.28</code></pre>`,
        starterCode: `modified_duration <- function(macaulay_duration, yield_rate, frequency) {
  # Write your code here
  
}`,
        solution: `modified_duration <- function(macaulay_duration, yield_rate, frequency) {
  return(macaulay_duration / (1 + yield_rate / frequency))
}`,
        testCases: [
            { input: [7.5, 0.06, 2], expected: 7.28 }
        ]
    },
    {
        id: 28,
        title: "Calculate Reserve",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>reserve(premium, benefit, mortality_rate, interest_rate, years_elapsed)</code> that calculates policy reserve.</p>
        <h3>Example</h3>
        <pre><code>reserve(1000, 100000, 0.01, 0.05, 5)
# Returns: 4500</code></pre>`,
        starterCode: `reserve <- function(premium, benefit, mortality_rate, interest_rate, years_elapsed) {
  # Write your code here
  
}`,
        solution: `reserve <- function(premium, benefit, mortality_rate, interest_rate, years_elapsed) {
  pv_future_benefits <- benefit * mortality_rate / ((1 + interest_rate) ^ (years_elapsed + 1))
  pv_future_premiums <- premium * (1 - mortality_rate) / ((1 + interest_rate) ^ years_elapsed)
  return(pv_future_benefits - pv_future_premiums)
}`,
        testCases: [
            { input: [1000, 100000, 0.01, 0.05, 5], expected: 4500 }
        ]
    },
    {
        id: 29,
        title: "Calculate Net Single Premium",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>net_single_premium(sum_assured, age, mortality_table, interest_rate, term)</code> that calculates NSP.</p>
        <h3>Example</h3>
        <pre><code>net_single_premium(100000, 30, list(30=0.001, 31=0.0012), 0.05, 10)
# Returns: 850</code></pre>`,
        starterCode: `net_single_premium <- function(sum_assured, age, mortality_table, interest_rate, term) {
  # Write your code here
  
}`,
        solution: `net_single_premium <- function(sum_assured, age, mortality_table, interest_rate, term) {
  nsp <- 0
  survival_prob <- 1.0
  for (year in 0:(term-1)) {
    curr_age <- age + year
    if (curr_age %in% names(mortality_table)) {
      qx <- mortality_table[[as.character(curr_age)]]
      nsp <- nsp + sum_assured * survival_prob * qx / ((1 + interest_rate) ^ (year + 1))
      survival_prob <- survival_prob * (1 - qx)
    }
  }
  return(nsp)
}`,
        testCases: [
            { input: [100000, 30, {30: 0.001, 31: 0.0012}, 0.05, 10], expected: 850 }
        ]
    },
    {
        id: 30,
        title: "Calculate Premium Loading",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>premium_loading(net_premium, expense_loading, profit_loading)</code> that calculates gross premium.</p>
        <h3>Example</h3>
        <pre><code>premium_loading(1000, 0.1, 0.05)
# Returns: 1150</code></pre>`,
        starterCode: `premium_loading <- function(net_premium, expense_loading, profit_loading) {
  # Write your code here
  
}`,
        solution: `premium_loading <- function(net_premium, expense_loading, profit_loading) {
  return(net_premium * (1 + expense_loading + profit_loading))
}`,
        testCases: [
            { input: [1000, 0.1, 0.05], expected: 1150 }
        ]
    },
    {
        id: 31,
        title: "Calculate Compound Interest",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>compound_interest(principal, rate, years, compounding)</code> that calculates compound interest.</p>
        <h3>Example</h3>
        <pre><code>compound_interest(1000, 0.05, 10, 12)
# Returns: 1647.01</code></pre>`,
        starterCode: `compound_interest <- function(principal, rate, years, compounding) {
  # Write your code here
  
}`,
        solution: `compound_interest <- function(principal, rate, years, compounding) {
  return(principal * ((1 + rate / compounding) ^ (compounding * years)) - principal)
}`,
        testCases: [
            { input: [1000, 0.05, 10, 12], expected: 1647.01 }
        ]
    },
    {
        id: 32,
        title: "Calculate Simple Interest",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>simple_interest(principal, rate, years)</code> that calculates simple interest.</p>
        <h3>Example</h3>
        <pre><code>simple_interest(1000, 0.05, 10)
# Returns: 500</code></pre>`,
        starterCode: `simple_interest <- function(principal, rate, years) {
  # Write your code here
  
}`,
        solution: `simple_interest <- function(principal, rate, years) {
  return(principal * rate * years)
}`,
        testCases: [
            { input: [1000, 0.05, 10], expected: 500 }
        ]
    },
    {
        id: 33,
        title: "Calculate Annuity Due PV",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>annuity_due_pv(payment, interest_rate, years)</code> that calculates annuity-due PV.</p>
        <h3>Example</h3>
        <pre><code>annuity_due_pv(1000, 0.05, 10)
# Returns: 8107.82</code></pre>`,
        starterCode: `annuity_due_pv <- function(payment, interest_rate, years) {
  # Write your code here
  
}`,
        solution: `annuity_due_pv <- function(payment, interest_rate, years) {
  if (interest_rate == 0) {
    return(payment * years)
  }
  return(payment * (1 - (1 + interest_rate) ^ (-years)) / interest_rate * (1 + interest_rate))
}`,
        testCases: [
            { input: [1000, 0.05, 10], expected: 8107.82 }
        ]
    },
    {
        id: 34,
        title: "Calculate Deferred Annuity PV",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>deferred_annuity_pv(payment, interest_rate, deferral_years, payment_years)</code> that calculates deferred annuity PV.</p>
        <h3>Example</h3>
        <pre><code>deferred_annuity_pv(1000, 0.05, 5, 10)
# Returns: 5868.38</code></pre>`,
        starterCode: `deferred_annuity_pv <- function(payment, interest_rate, deferral_years, payment_years) {
  # Write your code here
  
}`,
        solution: `deferred_annuity_pv <- function(payment, interest_rate, deferral_years, payment_years) {
  if (interest_rate == 0) {
    pv_at_deferral <- payment * payment_years
  } else {
    pv_at_deferral <- payment * (1 - (1 + interest_rate) ^ (-payment_years)) / interest_rate
  }
  return(pv_at_deferral / ((1 + interest_rate) ^ deferral_years))
}`,
        testCases: [
            { input: [1000, 0.05, 5, 10], expected: 5868.38 }
        ]
    },
    {
        id: 35,
        title: "Calculate Growing Perpetuity PV",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>growing_perpetuity_pv(payment, interest_rate, growth_rate)</code> that calculates growing perpetuity PV.</p>
        <h3>Example</h3>
        <pre><code>growing_perpetuity_pv(100, 0.05, 0.02)
# Returns: 3333.33</code></pre>`,
        starterCode: `growing_perpetuity_pv <- function(payment, interest_rate, growth_rate) {
  # Write your code here
  
}`,
        solution: `growing_perpetuity_pv <- function(payment, interest_rate, growth_rate) {
  return(payment / (interest_rate - growth_rate))
}`,
        testCases: [
            { input: [100, 0.05, 0.02], expected: 3333.33 }
        ]
    },
    {
        id: 36,
        title: "Calculate Sinking Fund Payment",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>sinking_fund_payment(future_value, interest_rate, years)</code> that calculates sinking fund payment.</p>
        <h3>Example</h3>
        <pre><code>sinking_fund_payment(100000, 0.05, 10)
# Returns: 7950.46</code></pre>`,
        starterCode: `sinking_fund_payment <- function(future_value, interest_rate, years) {
  # Write your code here
  
}`,
        solution: `sinking_fund_payment <- function(future_value, interest_rate, years) {
  if (interest_rate == 0) {
    return(future_value / years)
  }
  return(future_value * interest_rate / ((1 + interest_rate) ^ years - 1))
}`,
        testCases: [
            { input: [100000, 0.05, 10], expected: 7950.46 }
        ]
    },
    {
        id: 37,
        title: "Calculate Capital Recovery Factor",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>capital_recovery_factor(interest_rate, years)</code> that calculates CRF.</p>
        <h3>Example</h3>
        <pre><code>capital_recovery_factor(0.05, 10)
# Returns: 0.1295</code></pre>`,
        starterCode: `capital_recovery_factor <- function(interest_rate, years) {
  # Write your code here
  
}`,
        solution: `capital_recovery_factor <- function(interest_rate, years) {
  if (interest_rate == 0) {
    return(1 / years)
  }
  return(interest_rate * ((1 + interest_rate) ^ years) / ((1 + interest_rate) ^ years - 1))
}`,
        testCases: [
            { input: [0.05, 10], expected: 0.1295 }
        ]
    },
    {
        id: 38,
        title: "Calculate Present Worth Factor",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>present_worth_factor(interest_rate, years)</code> that calculates PWF.</p>
        <h3>Example</h3>
        <pre><code>present_worth_factor(0.05, 10)
# Returns: 7.7217</code></pre>`,
        starterCode: `present_worth_factor <- function(interest_rate, years) {
  # Write your code here
  
}`,
        solution: `present_worth_factor <- function(interest_rate, years) {
  if (interest_rate == 0) {
    return(years)
  }
  return((1 - (1 + interest_rate) ^ (-years)) / interest_rate)
}`,
        testCases: [
            { input: [0.05, 10], expected: 7.7217 }
        ]
    },
    {
        id: 39,
        title: "Calculate Future Worth Factor",
        difficulty: "easy",
        description: `<h3>Description</h3>
        <p>Write a function <code>future_worth_factor(interest_rate, years)</code> that calculates FWF.</p>
        <h3>Example</h3>
        <pre><code>future_worth_factor(0.05, 10)
# Returns: 12.5779</code></pre>`,
        starterCode: `future_worth_factor <- function(interest_rate, years) {
  # Write your code here
  
}`,
        solution: `future_worth_factor <- function(interest_rate, years) {
  if (interest_rate == 0) {
    return(years)
  }
  return(((1 + interest_rate) ^ years - 1) / interest_rate)
}`,
        testCases: [
            { input: [0.05, 10], expected: 12.5779 }
        ]
    },
    {
        id: 40,
        title: "Calculate Nominal Rate from Effective",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>nominal_rate(effective_rate, compounding)</code> that converts effective to nominal rate.</p>
        <h3>Example</h3>
        <pre><code>nominal_rate(0.0617, 12)
# Returns: 0.06</code></pre>`,
        starterCode: `nominal_rate <- function(effective_rate, compounding) {
  # Write your code here
  
}`,
        solution: `nominal_rate <- function(effective_rate, compounding) {
  return(compounding * ((1 + effective_rate) ^ (1 / compounding) - 1))
}`,
        testCases: [
            { input: [0.0617, 12], expected: 0.06 }
        ]
    },
    {
        id: 41,
        title: "Calculate Force of Interest",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>force_of_interest(nominal_rate, compounding)</code> that calculates force of interest.</p>
        <h3>Example</h3>
        <pre><code>force_of_interest(0.06, 12)
# Returns: 0.0598</code></pre>`,
        starterCode: `force_of_interest <- function(nominal_rate, compounding) {
  # Write your code here
  
}`,
        solution: `force_of_interest <- function(nominal_rate, compounding) {
  return(compounding * log(1 + nominal_rate / compounding))
}`,
        testCases: [
            { input: [0.06, 12], expected: 0.0598 }
        ]
    },
    {
        id: 42,
        title: "Calculate Maximum Drawdown",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>max_drawdown(returns)</code> that calculates maximum drawdown.</p>
        <h3>Example</h3>
        <pre><code>max_drawdown(c(0.1, 0.12, -0.05, 0.08, -0.02))
# Returns: -0.05</code></pre>`,
        starterCode: `max_drawdown <- function(returns) {
  # Write your code here
  
}`,
        solution: `max_drawdown <- function(returns) {
  cumulative <- 1
  peak <- 1
  max_dd <- 0
  for (r in returns) {
    cumulative <- cumulative * (1 + r)
    if (cumulative > peak) {
      peak <- cumulative
    }
    drawdown <- (cumulative - peak) / peak
    if (drawdown < max_dd) {
      max_dd <- drawdown
    }
  }
  return(max_dd)
}`,
        testCases: [
            { input: [[0.1, 0.12, -0.05, 0.08, -0.02]], expected: -0.05 }
        ]
    },
    {
        id: 43,
        title: "Calculate Alpha",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>alpha(stock_returns, market_returns, risk_free_rate)</code> that calculates alpha.</p>
        <h3>Example</h3>
        <pre><code>alpha(c(0.1, 0.12, 0.08), c(0.08, 0.10, 0.06), 0.03)
# Returns: 0.02</code></pre>`,
        starterCode: `alpha <- function(stock_returns, market_returns, risk_free_rate) {
  # Write your code here
  
}`,
        solution: `alpha <- function(stock_returns, market_returns, risk_free_rate) {
  stock_mean <- mean(stock_returns)
  market_mean <- mean(market_returns)
  beta_val <- beta(stock_returns, market_returns)
  return(stock_mean - (risk_free_rate + beta_val * (market_mean - risk_free_rate)))
}`,
        testCases: [
            { input: [[0.1, 0.12, 0.08], [0.08, 0.10, 0.06], 0.03], expected: 0.02 }
        ]
    },
    {
        id: 44,
        title: "Calculate Treynor Ratio",
        difficulty: "medium",
        description: `<h3>Description</h3>
        <p>Write a function <code>treynor_ratio(returns, market_returns, risk_free_rate)</code> that calculates Treynor ratio.</p>
        <h3>Example</h3>
        <pre><code>treynor_ratio(c(0.1, 0.12, 0.08), c(0.08, 0.10, 0.06), 0.03)
# Returns: 0.08</code></pre>`,
        starterCode: `treynor_ratio <- function(returns, market_returns, risk_free_rate) {
  # Write your code here
  
}`,
        solution: `treynor_ratio <- function(returns, market_returns, risk_free_rate) {
  excess_return <- mean(returns) - risk_free_rate
  beta_val <- beta(returns, market_returns)
  return(excess_return / beta_val)
}`,
        testCases: [
            { input: [[0.1, 0.12, 0.08], [0.08, 0.10, 0.06], 0.03], expected: 0.08 }
        ]
    },
    {
        id: 45,
        title: "Calculate Information Ratio",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>information_ratio(portfolio_returns, benchmark_returns)</code> that calculates information ratio.</p>
        <h3>Example</h3>
        <pre><code>information_ratio(c(0.1, 0.12, 0.08), c(0.08, 0.10, 0.06))
# Returns: 0.5</code></pre>`,
        starterCode: `information_ratio <- function(portfolio_returns, benchmark_returns) {
  # Write your code here
  
}`,
        solution: `information_ratio <- function(portfolio_returns, benchmark_returns) {
  active_returns <- portfolio_returns - benchmark_returns
  mean_active <- mean(active_returns)
  tracking_error <- sd(active_returns)
  return(mean_active / tracking_error)
}`,
        testCases: [
            { input: [[0.1, 0.12, 0.08], [0.08, 0.10, 0.06]], expected: 0.5 }
        ]
    },
    {
        id: 46,
        title: "Calculate Sortino Ratio",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>sortino_ratio(returns, risk_free_rate, target_return)</code> that calculates Sortino ratio.</p>
        <h3>Example</h3>
        <pre><code>sortino_ratio(c(0.1, 0.12, -0.05, 0.08), 0.03, 0.05)
# Returns: 1.5</code></pre>`,
        starterCode: `sortino_ratio <- function(returns, risk_free_rate, target_return) {
  # Write your code here
  
}`,
        solution: `sortino_ratio <- function(returns, risk_free_rate, target_return) {
  excess_returns <- returns - risk_free_rate
  downside_returns <- pmax(0, target_return - returns)
  downside_std <- sqrt(mean(downside_returns^2))
  mean_excess <- mean(excess_returns)
  return(mean_excess / downside_std)
}`,
        testCases: [
            { input: [[0.1, 0.12, -0.05, 0.08], 0.03, 0.05], expected: 1.5 }
        ]
    },
    {
        id: 47,
        title: "Calculate Calmar Ratio",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>calmar_ratio(returns, risk_free_rate)</code> that calculates Calmar ratio.</p>
        <h3>Example</h3>
        <pre><code>calmar_ratio(c(0.1, 0.12, -0.05, 0.08), 0.03)
# Returns: 2.0</code></pre>`,
        starterCode: `calmar_ratio <- function(returns, risk_free_rate) {
  # Write your code here
  
}`,
        solution: `calmar_ratio <- function(returns, risk_free_rate) {
  annual_return <- mean(returns) * 12
  max_dd <- abs(max_drawdown(returns))
  return((annual_return - risk_free_rate) / max_dd)
}`,
        testCases: [
            { input: [[0.1, 0.12, -0.05, 0.08], 0.03], expected: 2.0 }
        ]
    },
    {
        id: 48,
        title: "Calculate Portfolio Variance",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>portfolio_variance(weights, covariance_matrix)</code> that calculates portfolio variance.</p>
        <h3>Example</h3>
        <pre><code>portfolio_variance(c(0.5, 0.5), matrix(c(0.04, 0.01, 0.01, 0.09), nrow=2))
# Returns: 0.0375</code></pre>`,
        starterCode: `portfolio_variance <- function(weights, covariance_matrix) {
  # Write your code here
  
}`,
        solution: `portfolio_variance <- function(weights, covariance_matrix) {
  return(as.numeric(t(weights) %*% covariance_matrix %*% weights))
}`,
        testCases: [
            { input: [[0.5, 0.5], [[0.04, 0.01], [0.01, 0.09]]], expected: 0.0375 }
        ]
    },
    {
        id: 49,
        title: "Calculate IRR",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>irr(cash_flows, initial_guess)</code> that calculates internal rate of return.</p>
        <h3>Example</h3>
        <pre><code>irr(c(-1000, 300, 300, 300, 300), 0.1)
# Returns: 0.077</code></pre>`,
        starterCode: `irr <- function(cash_flows, initial_guess) {
  # Write your code here
  
}`,
        solution: `irr <- function(cash_flows, initial_guess) {
  rate <- initial_guess
  for (i in 1:100) {
    npv <- sum(cash_flows / ((1 + rate) ^ (0:(length(cash_flows)-1))))
    npv_derivative <- sum(-(0:(length(cash_flows)-1)) * cash_flows / ((1 + rate) ^ (1:length(cash_flows))))
    if (abs(npv_derivative) < 1e-10) break
    rate <- rate - npv / npv_derivative
  }
  return(rate)
}`,
        testCases: [
            { input: [[-1000, 300, 300, 300, 300], 0.1], expected: 0.077 }
        ]
    },
    {
        id: 50,
        title: "Calculate Convexity",
        difficulty: "hard",
        description: `<h3>Description</h3>
        <p>Write a function <code>convexity(face_value, coupon_rate, yield_rate, years, frequency)</code> that calculates bond convexity.</p>
        <h3>Example</h3>
        <pre><code>convexity(1000, 0.05, 0.06, 10, 2)
# Returns: 65.2</code></pre>`,
        starterCode: `convexity <- function(face_value, coupon_rate, yield_rate, years, frequency) {
  # Write your code here
  
}`,
        solution: `convexity <- function(face_value, coupon_rate, yield_rate, years, frequency) {
  periods <- years * frequency
  coupon <- face_value * coupon_rate / frequency
  period_yield <- yield_rate / frequency
  price <- sum(coupon / ((1 + period_yield) ^ (1:periods))) + face_value / ((1 + period_yield) ^ periods)
  convexity_sum <- sum((1:periods) * ((1:periods) + 1) * coupon / ((1 + period_yield) ^ ((1:periods) + 2)))
  convexity_sum <- convexity_sum + periods * (periods + 1) * face_value / ((1 + period_yield) ^ (periods + 2))
  return(convexity_sum / price)
}`,
        testCases: [
            { input: [1000, 0.05, 0.06, 10, 2], expected: 65.2 }
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
        mode: 'r',
        theme: 'default',
        indentUnit: 2,
        lineWrapping: true
    });
}

function setupEventListeners() {
    document.getElementById('run-btn').addEventListener('click', runCode);
    document.getElementById('submit-btn').addEventListener('click', submitCode);
}

function loadProblem(index) {
    currentProblemIndex = index;
    const problem = rProblems[index];
    
    document.getElementById('problem-title').textContent = `Problem ${problem.id}: ${problem.title}`;
    document.getElementById('difficulty-badge').textContent = problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1);
    document.getElementById('difficulty-badge').className = `difficulty-badge ${problem.difficulty}`;
    document.getElementById('problem-content').innerHTML = problem.description;
    
    codeEditor.setValue(problem.starterCode);
    
    document.querySelectorAll('.problem-item').forEach((item, idx) => {
        item.classList.toggle('active', idx === index);
    });
    
    document.getElementById('output-content').innerHTML = '<p style="color: #64748b; font-style: italic;">Click "Run" to test your code</p>';
}

function renderProblemsList() {
    const list = document.getElementById('problems-list');
    list.innerHTML = '';
    
    rProblems.forEach((problem, index) => {
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
    const problem = rProblems[currentProblemIndex];
    const output = document.getElementById('output-content');
    
    output.innerHTML = '<p style="color: #64748b;">Running tests...</p>';
    
    try {
        if (!code.includes('function')) {
            output.innerHTML = '<p class="error">Error: Function definition not found.</p>';
            return;
        }
        
        let results = [];
        problem.testCases.forEach((testCase, idx) => {
            results.push(`
                <div class="test-case">
                    <strong>Test Case ${idx + 1}:</strong><br>
                    Input: ${Array.isArray(testCase.input[0]) ? testCase.input[0].join(', ') : testCase.input.join(', ')}<br>
                    Expected: ${testCase.expected}<br>
                    <span style="color: #64748b;">Note: Full execution requires R. Check your logic against the expected output.</span>
                </div>
            `);
        });
        
        output.innerHTML = `
            <p><strong>Test Results:</strong></p>
            ${results.join('')}
            <p style="margin-top: 16px; color: #64748b;">
                <strong>Note:</strong> This is a static site. Copy your code to R to test fully.
            </p>
        `;
    } catch (error) {
        output.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}

function submitCode() {
    const problem = rProblems[currentProblemIndex];
    const output = document.getElementById('output-content');
    
    output.innerHTML = `
        <p><strong>Submission Results:</strong></p>
        <p style="color: #64748b; margin-top: 16px;">
            Your code has been submitted! Test it in R for full validation.
        </p>
        <details style="margin-top: 16px;">
            <summary style="cursor: pointer; color: #6366f1; font-weight: 600;">View Solution</summary>
            <pre style="background: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px; margin-top: 12px; overflow-x: auto;"><code>${problem.solution}</code></pre>
        </details>
    `;
}

