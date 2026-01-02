// Financial Engineering Practice Questions Data
const questions = [
    {
        id: 1,
        question: "Which of the following forms of the Efficient Markets Hypothesis suggests that all past price information is reflected in current prices?",
        questionType: "multiple-choice",
        options: [
            { label: "Weak form", value: "true" },
            { label: "Semi-strong form", value: "false" },
            { label: "Strong form", value: "false" },
            { label: "Adaptive form", value: "false" }
        ],
        answer: "true",
        solution: "The weak form EMH states that past prices are fully reflected in current prices, so technical analysis cannot generate abnormal returns."
    },
    {
        id: 2,
        question: "A utility function is used to represent:",
        questionType: "multiple-choice",
        options: [
            { label: "Investor preferences over wealth or outcomes", value: "true" },
            { label: "Market equilibrium prices", value: "false" },
            { label: "Expected return of a portfolio", value: "false" },
            { label: "Risk-free rate of interest", value: "false" }
        ],
        answer: "true",
        solution: "Utility functions encode investor preferences and attitudes towards risk."
    },
    {
        id: 3,
        question: "Which property describes an investor who becomes less willing to take absolute risks as wealth increases?",
        questionType: "multiple-choice",
        options: [
            { label: "Decreasing absolute risk aversion", value: "true" },
            { label: "Increasing absolute risk aversion", value: "false" },
            { label: "Relative risk neutrality", value: "false" },
            { label: "Risk seeking", value: "false" }
        ],
        answer: "true",
        solution: "Decreasing absolute risk aversion means risk tolerance increases with wealth, so the investor is less risk averse in relative terms."
    },
    {
        id: 4,
        question: "Rational choice theory assumes that individuals:",
        questionType: "multiple-choice",
        options: [
            { label: "Select the option with maximum expected utility", value: "true" },
            { label: "Always prefer risky options", value: "false" },
            { label: "Act without considering probabilities", value: "false" },
            { label: "Focus only on past returns", value: "false" }
        ],
        answer: "true",
        solution: "Rational choice theory is based on the expected utility maximization principle."
    },
    {
        id: 5,
        question: "Expected utility theory helps to:",
        questionType: "multiple-choice",
        options: [
            { label: "Quantify preferences under uncertainty", value: "true" },
            { label: "Predict stock prices exactly", value: "false" },
            { label: "Calculate dividends directly", value: "false" },
            { label: "Eliminate market risk", value: "false" }
        ],
        answer: "true",
        solution: "Expected utility theory provides a framework for comparing uncertain outcomes based on their probabilities and utilities."
    },
    {
        id: 6,
        question: "Which type of utility function represents risk neutrality?",
        questionType: "multiple-choice",
        options: [
            { label: "Linear", value: "true" },
            { label: "Exponential", value: "false" },
            { label: "Quadratic", value: "false" },
            { label: "Logarithmic", value: "false" }
        ],
        answer: "true",
        solution: "A linear utility function implies constant marginal utility and no risk aversion."
    },
    {
        id: 7,
        question: "State-dependent utility functions mean:",
        questionType: "multiple-choice",
        options: [
            { label: "Utility depends on both wealth and the state of the world", value: "true" },
            { label: "Utility is independent of wealth", value: "false" },
            { label: "Utility depends only on previous returns", value: "false" },
            { label: "Utility is always quadratic", value: "false" }
        ],
        answer: "true",
        solution: "State-dependent utility accounts for external conditions affecting investor preferences."
    },
    {
        id: 8,
        question: "Which economic property corresponds to investors preferring more wealth to less?",
        questionType: "multiple-choice",
        options: [
            { label: "Non-satiation", value: "true" },
            { label: "Risk aversion", value: "false" },
            { label: "Absolute risk seeking", value: "false" },
            { label: "Time preference", value: "false" }
        ],
        answer: "true",
        solution: "Non-satiation indicates that more wealth is always preferred to less."
    },
    {
        id: 9,
        question: "Which investor attitude is captured by a concave utility function?",
        questionType: "multiple-choice",
        options: [
            { label: "Risk aversion", value: "true" },
            { label: "Risk seeking", value: "false" },
            { label: "Risk neutrality", value: "false" },
            { label: "Indifference", value: "false" }
        ],
        answer: "true",
        solution: "A concave utility function implies diminishing marginal utility of wealth, representing risk aversion."
    },
    {
        id: 10,
        question: "Which form of EMH suggests that all information, public and private, is reflected in asset prices?",
        questionType: "multiple-choice",
        options: [
            { label: "Strong form", value: "true" },
            { label: "Weak form", value: "false" },
            { label: "Semi-strong form", value: "false" },
            { label: "Adaptive form", value: "false" }
        ],
        answer: "true",
        solution: "The strong form EMH assumes no investor can earn abnormal returns, even with insider information."
    },
    {
        id: 11,
        question: "Evidence against semi-strong EMH might include:",
        questionType: "multiple-choice",
        options: [
            { label: "Persistent abnormal returns after public announcements", value: "true" },
            { label: "Random walk in stock prices", value: "false" },
            { label: "Efficient diversification", value: "false" },
            { label: "Low transaction costs", value: "false" }
        ],
        answer: "true",
        solution: "Semi-strong EMH assumes public info is reflected immediately; abnormal returns indicate a violation."
    },
    {
        id: 12,
        question: "Exponential utility functions are often used to model:",
        questionType: "multiple-choice",
        options: [
            { label: "Constant absolute risk aversion", value: "true" },
            { label: "Decreasing relative risk aversion", value: "false" },
            { label: "Risk neutrality", value: "false" },
            { label: "Non-satiation", value: "false" }
        ],
        answer: "true",
        solution: "Exponential utility has constant absolute risk aversion properties."
    },
    {
        id: 13,
        question: "Expected utility comparisons can be applied to:",
        questionType: "multiple-choice",
        options: [
            { label: "Insurance decisions", value: "true" },
            { label: "Forecasting GDP", value: "false" },
            { label: "Setting interest rates", value: "false" },
            { label: "Measuring inflation", value: "false" }
        ],
        answer: "true",
        solution: "Expected utility provides a framework to analyse trade-offs under uncertainty, such as in insurance."
    },
    {
        id: 14,
        question: "Utility theory assumes investors can:",
        questionType: "multiple-choice",
        options: [
            { label: "Rank all uncertain prospects consistently", value: "true" },
            { label: "Predict stock prices with certainty", value: "false" },
            { label: "Ignore probabilities", value: "false" },
            { label: "Guarantee arbitrage profits", value: "false" }
        ],
        answer: "true",
        solution: "Expected utility requires consistent preference ranking of uncertain prospects."
    },
    {
        id: 15,
        question: "A convex utility function represents an investor who is:",
        questionType: "multiple-choice",
        options: [
            { label: "Risk seeking", value: "true" },
            { label: "Risk averse", value: "false" },
            { label: "Risk neutral", value: "false" },
            { label: "Non-satiated", value: "false" }
        ],
        answer: "true",
        solution: "Convex utility implies increasing marginal utility of wealth, which corresponds to risk-seeking behavior."
    },
    {
        id: 16,
        question: "The semi-strong form of EMH states that:",
        questionType: "multiple-choice",
        options: [
            { label: "All publicly available information is reflected in current prices", value: "true" },
            { label: "Only past price information is reflected", value: "false" },
            { label: "All information, public and private, is reflected", value: "false" },
            { label: "Prices do not follow a random walk", value: "false" }
        ],
        answer: "true",
        solution: "Semi-strong EMH incorporates all publicly available information into prices, so fundamental analysis cannot generate abnormal returns."
    },
    {
        id: 17,
        question: "Which of the following illustrates non-satiation?",
        questionType: "multiple-choice",
        options: [
            { label: "Investors always prefer more wealth to less", value: "true" },
            { label: "Investors take infinite risk", value: "false" },
            { label: "Investors are indifferent between all options", value: "false" },
            { label: "Investors prefer riskier portfolios", value: "false" }
        ],
        answer: "true",
        solution: "Non-satiation assumes more wealth is always preferred, irrespective of risk."
    },
    {
        id: 18,
        question: "The expected utility theorem is used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Rank uncertain prospects based on their expected utility", value: "true" },
            { label: "Predict future stock returns", value: "false" },
            { label: "Estimate interest rates", value: "false" },
            { label: "Guarantee portfolio outperformance", value: "false" }
        ],
        answer: "true",
        solution: "Expected utility allows investors to make consistent decisions under uncertainty by comparing the expected utility of alternatives."
    },
    {
        id: 19,
        question: "Which utility function is most appropriate for constant relative risk aversion?",
        questionType: "multiple-choice",
        options: [
            { label: "Logarithmic", value: "true" },
            { label: "Linear", value: "false" },
            { label: "Exponential", value: "false" },
            { label: "Quadratic", value: "false" }
        ],
        answer: "true",
        solution: "Logarithmic utility implies constant relative risk aversion, meaning the proportion of wealth invested in risky assets does not change with wealth."
    },
    {
        id: 20,
        question: "A risk-neutral investor has a utility function that is:",
        questionType: "multiple-choice",
        options: [
            { label: "Linear", value: "true" },
            { label: "Concave", value: "false" },
            { label: "Convex", value: "false" },
            { label: "Exponential", value: "false" }
        ],
        answer: "true",
        solution: "Linear utility implies the investor values each additional unit of wealth equally, showing no risk aversion."
    },
    {
        id: 21,
        question: "Put-call parity is independent of:",
        questionType: "multiple-choice",
        options: [
            { label: "Investor utility function", value: "true" },
            { label: "Strike price", value: "false" },
            { label: "Option maturity", value: "false" },
            { label: "Underlying asset price", value: "false" }
        ],
        answer: "true",
        solution: "Put-call parity relies on arbitrage and the option’s characteristics, not investor preferences."
    },
    {
        id: 22,
        question: "State-dependent utility functions are useful for:",
        questionType: "multiple-choice",
        options: [
            { label: "Modelling preferences that change with external conditions", value: "true" },
            { label: "Assuming constant risk aversion", value: "false" },
            { label: "Evaluating only risk-free investments", value: "false" },
            { label: "Calculating expected returns only", value: "false" }
        ],
        answer: "true",
        solution: "State-dependent utilities allow for wealth-dependent or scenario-dependent changes in investor preferences."
    },
    {
        id: 23,
        question: "Evidence supporting weak-form EMH includes:",
        questionType: "multiple-choice",
        options: [
            { label: "Stock prices follow a random walk", value: "true" },
            { label: "Persistent post-announcement abnormal returns", value: "false" },
            { label: "All investors earn abnormal returns", value: "false" },
            { label: "Strong insider trading effects", value: "false" }
        ],
        answer: "true",
        solution: "Random-walk-like behaviour supports the weak form EMH, as past prices cannot predict future returns."
    },
    {
        id: 24,
        question: "The expected utility theorem requires which assumption about preferences?",
        questionType: "multiple-choice",
        options: [
            { label: "Completeness and transitivity", value: "true" },
            { label: "Risk seeking only", value: "false" },
            { label: "No time preference", value: "false" },
            { label: "Perfect information", value: "false" }
        ],
        answer: "true",
        solution: "Expected utility assumes that preferences are complete (all alternatives can be ranked) and transitive (consistent ranking)."
    },
    {
        id: 25,
        question: "Which type of risk attitude corresponds to a convex utility function?",
        questionType: "multiple-choice",
        options: [
            { label: "Risk seeking", value: "true" },
            { label: "Risk averse", value: "false" },
            { label: "Risk neutral", value: "false" },
            { label: "Non-satiated", value: "false" }
        ],
        answer: "true",
        solution: "Convex utility functions increase marginal utility with wealth, representing risk-seeking behaviour."
    },
    {
        id: 26,
        question: "Absolute risk aversion is decreasing if:",
        questionType: "multiple-choice",
        options: [
            { label: "The investor tolerates more absolute risk as wealth increases", value: "true" },
            { label: "The investor tolerates less risk as wealth increases", value: "false" },
            { label: "Risk neutrality occurs", value: "false" },
            { label: "Utility is quadratic", value: "false" }
        ],
        answer: "true",
        solution: "Decreasing absolute risk aversion implies that the investor becomes less risk averse in absolute terms as wealth rises."
    },
    {
        id: 27,
        question: "The expected utility approach can analyse:",
        questionType: "multiple-choice",
        options: [
            { label: "Insurance problems", value: "true" },
            { label: "Interest rate forecasts", value: "false" },
            { label: "GDP predictions", value: "false" },
            { label: "Inflation indexing", value: "false" }
        ],
        answer: "true",
        solution: "Expected utility provides a framework for decisions under uncertainty, e.g., whether to buy insurance."
    },
    {
        id: 28,
        question: "Which EMH form is easiest to refute empirically?",
        questionType: "multiple-choice",
        options: [
            { label: "Weak form", value: "true" },
            { label: "Semi-strong form", value: "false" },
            { label: "Strong form", value: "false" },
            { label: "Adaptive form", value: "false" }
        ],
        answer: "true",
        solution: "The weak form is easiest to test using historical prices; anomalies may refute it."
    },
    {
        id: 29,
        question: "Which property does a concave utility function demonstrate?",
        questionType: "multiple-choice",
        options: [
            { label: "Risk aversion", value: "true" },
            { label: "Risk seeking", value: "false" },
            { label: "Risk neutrality", value: "false" },
            { label: "Non-satiation", value: "false" }
        ],
        answer: "true",
        solution: "Concave utility functions reflect diminishing marginal utility and risk aversion."
    },
    {
        id: 30,
        question: "Which EMH form would predict that even insider information cannot generate abnormal returns?",
        questionType: "multiple-choice",
        options: [
            { label: "Strong form", value: "true" },
            { label: "Weak form", value: "false" },
            { label: "Semi-strong form", value: "false" },
            { label: "Adaptive form", value: "false" }
        ],
        answer: "true",
        solution: "Strong-form EMH assumes that all information, public or private, is reflected in prices."
    },
    {
        id: 31,
        question: "Shortfall probability measures:",
        questionType: "multiple-choice",
        options: [
            { label: "The probability that returns fall below a target level", value: "true" },
            { label: "The total variance of a portfolio", value: "false" },
            { label: "Expected portfolio return", value: "false" },
            { label: "The maximum possible return", value: "false" }
        ],
        answer: "true",
        solution: "Shortfall probability quantifies the likelihood of achieving less than a specified target return."
    },
    {
        id: 32,
        question: "Tail thickness of a return distribution affects:",
        questionType: "multiple-choice",
        options: [
            { label: "Risk measures such as VaR and Tail VaR", value: "true" },
            { label: "Expected return only", value: "false" },
            { label: "Diversification benefit", value: "false" },
            { label: "Risk-free rate", value: "false" }
        ],
        answer: "true",
        solution: "Thicker tails increase the probability of extreme losses, impacting tail-based risk measures."
    },
    {
        id: 33,
        question: "Variance and downside semi-variance are related to the investor's:",
        questionType: "multiple-choice",
        options: [
            { label: "Utility function", value: "true" },
            { label: "Investment horizon only", value: "false" },
            { label: "Inflation expectation", value: "false" },
            { label: "Tax considerations", value: "false" }
        ],
        answer: "true",
        solution: "Risk measures reflect investor preferences encoded in their utility functions."
    },
    {
        id: 34,
        question: "Insurance can reduce investment risk by:",
        questionType: "multiple-choice",
        options: [
            { label: "Transferring or pooling risk", value: "true" },
            { label: "Increasing expected return", value: "false" },
            { label: "Eliminating market risk completely", value: "false" },
            { label: "Changing asset correlations", value: "false" }
        ],
        answer: "true",
        solution: "Insurance reduces risk by transferring it to the insurer or pooling with other investors."
    },
    {
        id: 35,
        question: "Moral hazard occurs when:",
        questionType: "multiple-choice",
        options: [
            { label: "Behaviour changes because a party is protected from risk", value: "true" },
            { label: "An investor underestimates volatility", value: "false" },
            { label: "Expected return is miscalculated", value: "false" },
            { label: "Market prices are inaccurate", value: "false" }
        ],
        answer: "true",
        solution: "Moral hazard arises when protection from risk changes a party's behaviour, increasing the chance of loss."
    },
    {
        id: 36,
        question: "Adverse selection refers to:",
        questionType: "multiple-choice",
        options: [
            { label: "High-risk participants being more likely to seek insurance", value: "true" },
            { label: "Investors ignoring risk", value: "false" },
            { label: "Incorrect estimation of tail risk", value: "false" },
            { label: "Over-diversification of assets", value: "false" }
        ],
        answer: "true",
        solution: "Adverse selection occurs when those most likely to suffer a loss are more likely to engage with insurance or financial products."
    },
    {
        id: 37,
        question: "Semi-variance differs from variance because it:",
        questionType: "multiple-choice",
        options: [
            { label: "Focuses only on returns below the mean or target", value: "true" },
            { label: "Includes all returns", value: "false" },
            { label: "Measures expected return", value: "false" },
            { label: "Ignores correlations", value: "false" }
        ],
        answer: "true",
        solution: "Semi-variance captures only downside risk, ignoring returns above the threshold."
    },
    {
        id: 38,
        question: "Value at Risk at 95% confidence level means:",
        questionType: "multiple-choice",
        options: [
            { label: "There is a 5% chance losses exceed this value", value: "true" },
            { label: "The expected return is 95%", value: "false" },
            { label: "Portfolio variance is 95%", value: "false" },
            { label: "The portfolio is guaranteed not to lose", value: "false" }
        ],
        answer: "true",
        solution: "VaR at 95% confidence indicates a 5% probability of losses exceeding the VaR threshold."
    },
    {
        id: 39,
        question: "Expected Shortfall (Tail VaR) is considered:",
        questionType: "multiple-choice",
        options: [
            { label: "A coherent risk measure", value: "true" },
            { label: "Equivalent to standard deviation", value: "false" },
            { label: "Always less than VaR", value: "false" },
            { label: "A measure of expected return", value: "false" }
        ],
        answer: "true",
        solution: "Expected Shortfall accounts for average losses in the tail beyond the VaR level and satisfies coherence properties."
    },
    {
        id: 40,
        question: "Risk measures depend on the distribution of returns because:",
        questionType: "multiple-choice",
        options: [
            { label: "Different distributions affect the probability of extreme losses", value: "true" },
            { label: "Expected returns are constant", value: "false" },
            { label: "Covariance is irrelevant", value: "false" },
            { label: "Investors ignore variance", value: "false" }
        ],
        answer: "true",
        solution: "The shape and tails of the return distribution influence the risk as measured by VaR, Tail VaR, and semi-variance."
    },
    {
        id: 41,
        question: "Which risk measure is most sensitive to tail losses?",
        questionType: "multiple-choice",
        options: [
            { label: "Tail Value at Risk (Expected Shortfall)", value: "true" },
            { label: "Variance", value: "false" },
            { label: "Standard deviation", value: "false" },
            { label: "Mean return", value: "false" }
        ],
        answer: "true",
        solution: "Expected Shortfall specifically focuses on the expected loss in the tail of the distribution, making it sensitive to extreme losses."
    },
    {
        id: 42,
        question: "An investor's utility function is most relevant for:",
        questionType: "multiple-choice",
        options: [
            { label: "Interpreting how risk measures affect investment decisions", value: "true" },
            { label: "Determining inflation", value: "false" },
            { label: "Calculating historical returns", value: "false" },
            { label: "Estimating bond prices", value: "false" }
        ],
        answer: "true",
        solution: "Risk measures are interpreted through the lens of the investor's preferences as captured by their utility function."
    },
    {
        id: 43,
        question: "Which measure is best for evaluating downside risk?",
        questionType: "multiple-choice",
        options: [
            { label: "Downside semi-variance", value: "true" },
            { label: "Variance", value: "false" },
            { label: "Mean return", value: "false" },
            { label: "Skewness", value: "false" }
        ],
        answer: "true",
        solution: "Downside semi-variance isolates negative deviations from a target, making it suitable for downside risk assessment."
    },
    {
        id: 44,
        question: "Insurance mitigates risk primarily by:",
        questionType: "multiple-choice",
        options: [
            { label: "Pooling and transferring risk", value: "true" },
            { label: "Guaranteeing positive returns", value: "false" },
            { label: "Eliminating market volatility", value: "false" },
            { label: "Increasing expected return", value: "false" }
        ],
        answer: "true",
        solution: "Insurance reduces individual exposure to risk by spreading losses across many participants or transferring risk to the insurer."
    },
    {
        id: 45,
        question: "Adverse selection and moral hazard are:",
        questionType: "multiple-choice",
        options: [
            { label: "Challenges that insurance faces when reducing risk", value: "true" },
            { label: "Ways to increase returns", value: "false" },
            { label: "Market efficiency measures", value: "false" },
            { label: "Risk-free strategies", value: "false" }
        ],
        answer: "true",
        solution: "These concepts describe behavioural and informational challenges that can undermine risk reduction by insurance."
    },
    {
        id: 46,
        question: "Downside semi-variance focuses on:",
        questionType: "multiple-choice",
        options: [
            { label: "Returns below a target or mean", value: "true" },
            { label: "All returns equally", value: "false" },
            { label: "Only extreme positive returns", value: "false" },
            { label: "Portfolio covariance", value: "false" }
        ],
        answer: "true",
        solution: "Semi-variance isolates only negative deviations from a benchmark, capturing downside risk."
    },
    {
        id: 47,
        question: "Variance of return measures:",
        questionType: "multiple-choice",
        options: [
            { label: "Overall dispersion of returns around the mean", value: "true" },
            { label: "Probability of loss", value: "false" },
            { label: "Tail risk only", value: "false" },
            { label: "Expected return", value: "false" }
        ],
        answer: "true",
        solution: "Variance quantifies total variability of returns, considering deviations both above and below the mean."
    },
    {
        id: 48,
        question: "Value at Risk (VaR) does NOT provide:",
        questionType: "multiple-choice",
        options: [
            { label: "The expected loss beyond the threshold", value: "true" },
            { label: "The loss threshold at a given confidence level", value: "false" },
            { label: "A quantile of the loss distribution", value: "false" },
            { label: "A probabilistic measure of risk", value: "false" }
        ],
        answer: "true",
        solution: "VaR identifies a loss level not to be exceeded with a given probability but does not give the expected loss beyond that level; Tail VaR does."
    },
    {
        id: 49,
        question: "Expected Shortfall (Tail VaR) is preferred over VaR because:",
        questionType: "multiple-choice",
        options: [
            { label: "It considers the average of losses exceeding VaR", value: "true" },
            { label: "It ignores extreme losses", value: "false" },
            { label: "It equals the mean return", value: "false" },
            { label: "It measures expected gain", value: "false" }
        ],
        answer: "true",
        solution: "Expected Shortfall accounts for the severity of losses beyond the VaR threshold, making it a coherent risk measure."
    },
    {
        id: 50,
        question: "Thicker tails in a return distribution imply:",
        questionType: "multiple-choice",
        options: [
            { label: "Higher probability of extreme losses", value: "true" },
            { label: "Lower expected return", value: "false" },
            { label: "No change in risk measures", value: "false" },
            { label: "Guaranteed returns", value: "false" }
        ],
        answer: "true",
        solution: "Heavy tails increase the likelihood of extreme negative outcomes, impacting risk assessments."
    },
    {
        id: 51,
        question: "Shortfall probability can be used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Quantify risk relative to a target return", value: "true" },
            { label: "Measure overall variance", value: "false" },
            { label: "Calculate expected gain", value: "false" },
            { label: "Ignore downside risk", value: "false" }
        ],
        answer: "true",
        solution: "Shortfall probability focuses on the likelihood of failing to achieve a specific target, useful for risk-averse investors."
    },
    {
        id: 52,
        question: "Insurance companies mitigate risk mainly by:",
        questionType: "multiple-choice",
        options: [
            { label: "Pooling and transferring individual risk", value: "true" },
            { label: "Guaranteeing portfolio returns", value: "false" },
            { label: "Eliminating market volatility", value: "false" },
            { label: "Maximizing expected return", value: "false" }
        ],
        answer: "true",
        solution: "Insurance spreads risk across participants and transfers it to the insurer, reducing exposure to any single loss."
    },
    {
        id: 53,
        question: "Moral hazard arises when:",
        questionType: "multiple-choice",
        options: [
            { label: "Individuals change behaviour due to risk protection", value: "true" },
            { label: "Market returns are high", value: "false" },
            { label: "Investment horizon is long", value: "false" },
            { label: "Expected return is low", value: "false" }
        ],
        answer: "true",
        solution: "Protection from risk can encourage behaviour that increases the probability or magnitude of loss."
    },
    {
        id: 54,
        question: "Adverse selection can be described as:",
        questionType: "multiple-choice",
        options: [
            { label: "High-risk individuals being more likely to seek insurance", value: "true" },
            { label: "Incorrect calculation of variance", value: "false" },
            { label: "Ignoring diversification", value: "false" },
            { label: "Overestimating expected return", value: "false" }
        ],
        answer: "true",
        solution: "Those most likely to suffer losses are more inclined to participate in insurance, potentially increasing risk to the insurer."
    },
    {
        id: 55,
        question: "Which risk measure ignores gains above a target?",
        questionType: "multiple-choice",
        options: [
            { label: "Downside semi-variance", value: "true" },
            { label: "Variance", value: "false" },
            { label: "Expected return", value: "false" },
            { label: "Skewness", value: "false" }
        ],
        answer: "true",
        solution: "Downside semi-variance focuses solely on shortfalls, ignoring positive deviations from the target."
    },
    {
        id: 56,
        question: "The relationship between utility functions and risk measures is:",
        questionType: "multiple-choice",
        options: [
            { label: "Risk measures are interpreted based on investor preferences", value: "true" },
            { label: "Utility functions do not depend on risk", value: "false" },
            { label: "Risk measures ignore investor behaviour", value: "false" },
            { label: "Utility functions are unrelated to returns", value: "false" }
        ],
        answer: "true",
        solution: "Utility functions capture investor attitudes towards risk, allowing interpretation of variance, VaR, and semi-variance in terms of preference."
    },
    {
        id: 57,
        question: "VaR at 99% confidence implies:",
        questionType: "multiple-choice",
        options: [
            { label: "1% probability of exceeding the loss threshold", value: "true" },
            { label: "Expected return is 99%", value: "false" },
            { label: "Variance equals 99%", value: "false" },
            { label: "Portfolio cannot lose more than VaR", value: "false" }
        ],
        answer: "true",
        solution: "By definition, VaR at 99% confidence indicates a 1% chance that losses exceed the specified threshold."
    },
    {
        id: 58,
        question: "Expected Shortfall complements VaR because it:",
        questionType: "multiple-choice",
        options: [
            { label: "Provides the average loss beyond the VaR level", value: "true" },
            { label: "Ignores tail losses", value: "false" },
            { label: "Equals the mean return", value: "false" },
            { label: "Measures upside risk", value: "false" }
        ],
        answer: "true",
        solution: "Expected Shortfall accounts for extreme losses beyond the VaR threshold, providing a more comprehensive view of tail risk."
    },
    {
        id: 59,
        question: "Thicker tails in the distribution of returns result in:",
        questionType: "multiple-choice",
        options: [
            { label: "Higher risk measures for tail events", value: "true" },
            { label: "Lower variance", value: "false" },
            { label: "Higher expected return", value: "false" },
            { label: "Reduced probability of loss", value: "false" }
        ],
        answer: "true",
        solution: "Heavy tails increase the probability and expected severity of extreme losses, affecting tail-sensitive measures."
    },
    {
        id: 60,
        question: "Semi-variance and expected shortfall are both examples of:",
        questionType: "multiple-choice",
        options: [
            { label: "Downside risk measures", value: "true" },
            { label: "Mean return measures", value: "false" },
            { label: "Diversification metrics", value: "false" },
            { label: "Portfolio return measures", value: "false" }
        ],
        answer: "true",
        solution: "Both metrics specifically focus on negative deviations from a benchmark, quantifying downside risk."
    },
    {
        id: 61,
        question: "Mean-variance portfolio theory assumes investors:",
        questionType: "multiple-choice",
        options: [
            { label: "Choose portfolios based on expected return and variance", value: "true" },
            { label: "Ignore variance of returns", value: "false" },
            { label: "Only care about maximum return", value: "false" },
            { label: "Assume perfect information is unavailable", value: "false" }
        ],
        answer: "true",
        solution: "Investors are assumed to select portfolios that maximize expected return for a given level of risk (variance)."
    },
    {
        id: 62,
        question: "The benefit of diversification is:",
        questionType: "multiple-choice",
        options: [
            { label: "Reduction in portfolio risk without reducing expected return", value: "true" },
            { label: "Increase in variance of individual assets", value: "false" },
            { label: "Guaranteeing returns", value: "false" },
            { label: "Ignoring correlations", value: "false" }
        ],
        answer: "true",
        solution: "Diversification reduces unsystematic risk by combining assets with imperfectly correlated returns."
    },
    {
        id: 63,
        question: "The expected return of a portfolio is calculated by:",
        questionType: "multiple-choice",
        options: [
            { label: "Weighted sum of individual asset expected returns", value: "true" },
            { label: "Sum of variances of assets", value: "false" },
            { label: "Maximum return of any asset", value: "false" },
            { label: "Risk-free rate only", value: "false" }
        ],
        answer: "true",
        solution: "Portfolio expected return is the sum of the expected returns of assets weighted by their portfolio proportions."
    },
    {
        id: 64,
        question: "The portfolio variance depends on:",
        questionType: "multiple-choice",
        options: [
            { label: "Individual variances and covariances between assets", value: "true" },
            { label: "Expected return only", value: "false" },
            { label: "Risk-free rate only", value: "false" },
            { label: "Mean-variance efficiency", value: "false" }
        ],
        answer: "true",
        solution: "Variance accounts for each asset's risk and how assets move together (covariance)."
    },
    {
        id: 65,
        question: "CAPM assumes:",
        questionType: "multiple-choice",
        options: [
            { label: "All investors hold the market portfolio and are risk-averse", value: "true" },
            { label: "Investors ignore the risk-free rate", value: "false" },
            { label: "Returns are deterministic", value: "false" },
            { label: "Markets are always inefficient", value: "false" }
        ],
        answer: "true",
        solution: "CAPM assumes investors maximize expected utility using mean-variance preferences, holding combinations of the market portfolio and risk-free asset."
    },
    {
        id: 66,
        question: "In CAPM, beta measures:",
        questionType: "multiple-choice",
        options: [
            { label: "Systematic risk relative to the market", value: "true" },
            { label: "Total variance of an asset", value: "false" },
            { label: "Expected return of a portfolio", value: "false" },
            { label: "Risk-free rate", value: "false" }
        ],
        answer: "true",
        solution: "Beta quantifies how an asset's returns move with the market; higher beta means higher systematic risk."
    },
    {
        id: 67,
        question: "A single-index model uses:",
        questionType: "multiple-choice",
        options: [
            { label: "Market index to explain asset returns", value: "true" },
            { label: "Multiple macroeconomic factors", value: "false" },
            { label: "Risk-free rate only", value: "false" },
            { label: "Random error only", value: "false" }
        ],
        answer: "true",
        solution: "The single-index model simplifies return analysis by linking asset returns to one common factor, usually the market."
    },
    {
        id: 68,
        question: "Non-diversifiable risk is also called:",
        questionType: "multiple-choice",
        options: [
            { label: "Systematic risk", value: "true" },
            { label: "Unsystematic risk", value: "false" },
            { label: "Specific risk", value: "false" },
            { label: "Idiosyncratic risk", value: "false" }
        ],
        answer: "true",
        solution: "Systematic risk affects all assets and cannot be eliminated through diversification."
    },
    {
        id: 69,
        question: "Geometric Brownian motion is used to model:",
        questionType: "multiple-choice",
        options: [
            { label: "Continuous-time stock price evolution", value: "true" },
            { label: "Discrete portfolio returns only", value: "false" },
            { label: "Insurance claim counts", value: "false" },
            { label: "Risk-free bond prices", value: "false" }
        ],
        answer: "true",
        solution: "GBM models stock prices continuously with drift and volatility components."
    },
    {
        id: 70,
        question: "Ito's Lemma is applied to:",
        questionType: "multiple-choice",
        options: [
            { label: "Transform stochastic processes for functions of prices", value: "true" },
            { label: "Calculate risk-free rate", value: "false" },
            { label: "Measure portfolio variance", value: "false" },
            { label: "Estimate expected return only", value: "false" }
        ],
        answer: "true",
        solution: "Ito's Lemma allows computation of the differential of a function of a stochastic process."
    },
    {
        id: 71,
        question: "Ornstein-Uhlenbeck process models:",
        questionType: "multiple-choice",
        options: [
            { label: "Mean-reverting processes", value: "true" },
            { label: "Purely random walks", value: "false" },
            { label: "Poisson jumps", value: "false" },
            { label: "Systematic risk only", value: "false" }
        ],
        answer: "true",
        solution: "OU process models variables that tend to revert to a long-term mean over time."
    },
    {
        id: 72,
        question: "A term structure model describes:",
        questionType: "multiple-choice",
        options: [
            { label: "Relationship between interest rates and maturities", value: "true" },
            { label: "Portfolio weights", value: "false" },
            { label: "Expected return of stocks", value: "false" },
            { label: "Insurance claims", value: "false" }
        ],
        answer: "true",
        solution: "Term structure models describe how interest rates vary across different maturities, used in bond and derivative pricing."
    },
    {
        id: 73,
        question: "Vasicek model is used for:",
        questionType: "multiple-choice",
        options: [
            { label: "One-factor short rate modeling", value: "true" },
            { label: "Portfolio optimization", value: "false" },
            { label: "CAPM estimation", value: "false" },
            { label: "Option pricing only", value: "false" }
        ],
        answer: "true",
        solution: "Vasicek provides a mean-reverting model for short-term interest rates, used for bond pricing."
    },
    {
        id: 74,
        question: "Merton model addresses:",
        questionType: "multiple-choice",
        options: [
            { label: "Structural credit risk of a firm", value: "true" },
            { label: "Probability of ruin", value: "false" },
            { label: "Option Greeks", value: "false" },
            { label: "Poisson processes", value: "false" }
        ],
        answer: "true",
        solution: "Merton models default as a function of a firm’s asset value relative to liabilities."
    },
    {
        id: 75,
        question: "Credit risk intensity models are:",
        questionType: "multiple-choice",
        options: [
            { label: "Reduced-form approaches with stochastic default intensity", value: "true" },
            { label: "Same as CAPM beta", value: "false" },
            { label: "Portfolio diversification metrics", value: "false" },
            { label: "Poisson jump models only", value: "false" }
        ],
        answer: "true",
        solution: "Intensity-based models treat default as a stochastic event with a given probability per unit time."
    },
    {
        id: 76,
        question: "Continuous-time log-normal model assumes:",
        questionType: "multiple-choice",
        options: [
            { label: "Stock prices follow a geometric Brownian motion", value: "true" },
            { label: "Stock prices are deterministic", value: "false" },
            { label: "All assets have the same expected return", value: "false" },
            { label: "Interest rates are constant", value: "false" }
        ],
        answer: "true",
        solution: "The log-normal model describes stock prices as continuous-time processes with drift and volatility, ensuring positive values."
    },
    {
        id: 77,
        question: "Ito integral is used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Integrate with respect to stochastic processes", value: "true" },
            { label: "Compute simple interest", value: "false" },
            { label: "Calculate portfolio weights", value: "false" },
            { label: "Estimate discount factors", value: "false" }
        ],
        answer: "true",
        solution: "Ito integrals allow integration of functions along stochastic processes, fundamental in continuous-time finance."
    },
    {
        id: 78,
        question: "Black-Scholes model requires which assumption?",
        questionType: "multiple-choice",
        options: [
            { label: "Constant volatility and risk-free rate", value: "true" },
            { label: "Discrete trading only", value: "false" },
            { label: "Market inefficiency", value: "false" },
            { label: "No underlying asset", value: "false" }
        ],
        answer: "true",
        solution: "The Black-Scholes PDE assumes constant volatility and risk-free rate, continuous trading, and no arbitrage."
    },
    {
        id: 79,
        question: "The Greeks measure:",
        questionType: "multiple-choice",
        options: [
            { label: "Sensitivities of option prices to parameters", value: "true" },
            { label: "Portfolio expected return", value: "false" },
            { label: "Credit risk only", value: "false" },
            { label: "Historical volatility", value: "false" }
        ],
        answer: "true",
        solution: "Delta, gamma, vega, theta, rho are the primary Greeks that measure option sensitivity to underlying factors."
    },
    {
        id: 80,
        question: "Hull-White model extends Vasicek by:",
        questionType: "multiple-choice",
        options: [
            { label: "Time-dependent mean reversion", value: "true" },
            { label: "Assuming constant volatility only", value: "false" },
            { label: "Ignoring interest rates", value: "false" },
            { label: "Single-period returns only", value: "false" }
        ],
        answer: "true",
        solution: "Hull-White allows a time-varying mean reversion level to better fit the observed term structure of interest rates."
    },
    {
        id: 81,
        question: "Expected return of a portfolio with two assets depends on:",
        questionType: "multiple-choice",
        options: [
            { label: "Weighted average of the assets' expected returns", value: "true" },
            { label: "Only the variance of the first asset", value: "false" },
            { label: "Covariance alone", value: "false" },
            { label: "Risk-free rate only", value: "false" }
        ],
        answer: "true",
        solution: "The expected portfolio return is the sum of weighted individual asset returns."
    },
    {
        id: 82,
        question: "Variance of a two-asset portfolio depends on:",
        questionType: "multiple-choice",
        options: [
            { label: "Asset variances and their covariance", value: "true" },
            { label: "Expected returns only", value: "false" },
            { label: "Risk-free rate only", value: "false" },
            { label: "Portfolio mean only", value: "false" }
        ],
        answer: "true",
        solution: "Portfolio variance combines individual variances and the covariance term that captures how assets move together."
    },
    {
        id: 83,
        question: "Cox-Ingersoll-Ross model ensures:",
        questionType: "multiple-choice",
        options: [
            { label: "Non-negative interest rates", value: "true" },
            { label: "Mean-reverting stock prices", value: "false" },
            { label: "Constant dividend yields", value: "false" },
            { label: "Portfolio optimization", value: "false" }
        ],
        answer: "true",
        solution: "CIR model for short rates is mean-reverting and ensures interest rates remain positive."
    },
    {
        id: 84,
        question: "Structural credit risk models assume default occurs when:",
        questionType: "multiple-choice",
        options: [
            { label: "Firm's asset value falls below a threshold", value: "true" },
            { label: "Interest rates rise above a level", value: "false" },
            { label: "Market portfolio underperforms", value: "false" },
            { label: "Insurance premiums increase", value: "false" }
        ],
        answer: "true",
        solution: "Merton-type models link firm default to its assets relative to liabilities."
    },
    {
        id: 85,
        question: "Reduced-form credit models specify:",
        questionType: "multiple-choice",
        options: [
            { label: "Default intensity without modeling assets", value: "true" },
            { label: "Market portfolio returns", value: "false" },
            { label: "Term structure only", value: "false" },
            { label: "Option delta", value: "false" }
        ],
        answer: "true",
        solution: "Reduced-form (intensity-based) models treat default as an exogenous stochastic event."
    },
    {
        id: 86,
        question: "A two-state credit model uses:",
        questionType: "multiple-choice",
        options: [
            { label: "Constant transition intensity between states", value: "true" },
            { label: "Variable stock prices", value: "false" },
            { label: "Multiple interest rate factors", value: "false" },
            { label: "Option Greeks", value: "false" }
        ],
        answer: "true",
        solution: "Two-state models simplify credit ratings to default/non-default with a constant hazard rate."
    },
    {
        id: 87,
        question: "Expected return in CAPM is calculated as:",
        questionType: "multiple-choice",
        options: [
            { label: "Risk-free rate plus beta times market risk premium", value: "true" },
            { label: "Only risk-free rate", value: "false" },
            { label: "Sum of variances", value: "false" },
            { label: "Portfolio volatility only", value: "false" }
        ],
        answer: "true",
        solution: "CAPM formula: E[R_i] = R_f + β_i (E[R_m] – R_f)."
    },
    {
        id: 88,
        question: "Limitations of CAPM include:",
        questionType: "multiple-choice",
        options: [
            { label: "Assumes one-period horizon and single-factor market model", value: "true" },
            { label: "Cannot estimate expected return", value: "false" },
            { label: "Ignores risk-free asset", value: "false" },
            { label: "Overfits portfolios", value: "false" }
        ],
        answer: "true",
        solution: "CAPM relies on simplifying assumptions that are not fully realistic but useful for theory."
    },
    {
        id: 89,
        question: "Diversifiable risk can be:",
        questionType: "multiple-choice",
        options: [
            { label: "Eliminated through diversification", value: "true" },
            { label: "Systematic", value: "false" },
            { label: "Market risk only", value: "false" },
            { label: "Uncorrelated with portfolio", value: "false" }
        ],
        answer: "true",
        solution: "Diversifiable (unsystematic) risk is asset-specific and can be reduced by holding many assets."
    },
    {
        id: 90,
        question: "Empirical evidence suggests stock prices:",
        questionType: "multiple-choice",
        options: [
            { label: "Approximately follow log-normal distribution over short intervals", value: "true" },
            { label: "Are deterministic", value: "false" },
            { label: "Are uncorrelated with past values", value: "false" },
            { label: "Always mean-revert daily", value: "false" }
        ],
        answer: "true",
        solution: "Short-term stock price changes are often modeled as log-normal due to continuous compounding and randomness."
    },
    {
        id: 91,
        question: "The aggregate claim process models:",
        questionType: "multiple-choice",
        options: [
            { label: "Total claims over time for an insurer", value: "true" },
            { label: "Stock price movements", value: "false" },
            { label: "Interest rate fluctuations", value: "false" },
            { label: "Option Greeks", value: "false" }
        ],
        answer: "true",
        solution: "Aggregate claim process sums individual claim amounts and frequencies to model insurer liabilities."
    },
    {
        id: 92,
        question: "Probability of ruin in finite time can be calculated using:",
        questionType: "multiple-choice",
        options: [
            { label: "Simulation or analytical methods", value: "true" },
            { label: "CAPM", value: "false" },
            { label: "Option pricing", value: "false" },
            { label: "Single-factor regression", value: "false" }
        ],
        answer: "true",
        solution: "Finite-time ruin probability may require simulation or compound Poisson calculations."
    },
    {
        id: 93,
        question: "Poisson process is used to model:",
        questionType: "multiple-choice",
        options: [
            { label: "Number of events in a fixed interval", value: "true" },
            { label: "Portfolio returns", value: "false" },
            { label: "Option pricing paths", value: "false" },
            { label: "Discount factor curves", value: "false" }
        ],
        answer: "true",
        solution: "Poisson process describes the timing of independent random events, such as claims arrivals."
    },
    {
        id: 94,
        question: "Compound Poisson process differs from Poisson by:",
        questionType: "multiple-choice",
        options: [
            { label: "Summing random claim amounts, not just counts", value: "true" },
            { label: "Ignoring claims", value: "false" },
            { label: "Modeling stock prices only", value: "false" },
            { label: "Using deterministic arrivals", value: "false" }
        ],
        answer: "true",
        solution: "Compound Poisson accounts for both number and size of claims, unlike simple Poisson which counts events."
    },
    {
        id: 95,
        question: "Lundberg’s adjustment coefficient is used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Approximate the probability of ruin", value: "true" },
            { label: "Price options", value: "false" },
            { label: "Estimate bond yields", value: "false" },
            { label: "Measure portfolio beta", value: "false" }
        ],
        answer: "true",
        solution: "The adjustment coefficient helps bound the ruin probability in risk theory."
    },
    {
        id: 96,
        question: "Proportional reinsurance affects ruin probability by:",
        questionType: "multiple-choice",
        options: [
            { label: "Sharing claim amounts between insurer and reinsurer", value: "true" },
            { label: "Changing interest rates", value: "false" },
            { label: "Eliminating risk-free assets", value: "false" },
            { label: "Modifying CAPM beta", value: "false" }
        ],
        answer: "true",
        solution: "Proportional reinsurance reduces insurer’s exposure by ceding a proportion of claims."
    },
    {
        id: 97,
        question: "Excess-of-loss reinsurance works by:",
        questionType: "multiple-choice",
        options: [
            { label: "Insurer retains losses up to a threshold, reinsurer covers the excess", value: "true" },
            { label: "Insurer covers all claims", value: "false" },
            { label: "Redistributing returns in CAPM", value: "false" },
            { label: "Modeling term structure of interest rates", value: "false" }
        ],
        answer: "true",
        solution: "Excess-of-loss treaties cap the insurer’s liability per claim, with reinsurer covering excess losses."
    },
    {
        id: 98,
        question: "Run-off triangles are used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Project future claims from historical claims data", value: "true" },
            { label: "Price derivatives", value: "false" },
            { label: "Calculate expected returns", value: "false" },
            { label: "Model interest rates", value: "false" }
        ],
        answer: "true",
        solution: "Run-off triangles display cumulative claims by accident year and development year for projections."
    },
    {
        id: 99,
        question: "Chain ladder method assumes:",
        questionType: "multiple-choice",
        options: [
            { label: "Past development patterns continue into the future", value: "true" },
            { label: "Zero claims in the future", value: "false" },
            { label: "All claims are deterministic", value: "false" },
            { label: "Interest rates are constant", value: "false" }
        ],
        answer: "true",
        solution: "Chain ladder extrapolates future claims using historical development factors."
    },
    {
        id: 100,
        question: "Bornhuetter-Ferguson method combines:",
        questionType: "multiple-choice",
        options: [
            { label: "Prior expected claims and observed data", value: "true" },
            { label: "Option pricing and bond yields", value: "false" },
            { label: "CAPM beta and expected return", value: "false" },
            { label: "Poisson intensity and asset prices", value: "false" }
        ],
        answer: "true",
        solution: "Bornhuetter-Ferguson blends prior expected claims with partial claim development information."
    },
    {
        id: 101,
        question: "Average cost per claim method estimates:",
        questionType: "multiple-choice",
        options: [
            { label: "Outstanding claims using mean claim size", value: "true" },
            { label: "Portfolio expected return", value: "false" },
            { label: "Option Greeks", value: "false" },
            { label: "Interest rate curves", value: "false" }
        ],
        answer: "true",
        solution: "This method multiplies estimated number of outstanding claims by the average cost per claim."
    },
    {
        id: 102,
        question: "Statistical models underpinning run-off triangles help:",
        questionType: "multiple-choice",
        options: [
            { label: "Provide probabilistic estimates of future claims", value: "true" },
            { label: "Price forward contracts", value: "false" },
            { label: "Compute CAPM alpha", value: "false" },
            { label: "Measure diversification", value: "false" }
        ],
        answer: "true",
        solution: "Using a stochastic model provides confidence intervals and variance estimates for claims projections."
    },
    {
        id: 103,
        question: "Assumptions in run-off triangle methods include:",
        questionType: "multiple-choice",
        options: [
            { label: "Claims development patterns are stable over time", value: "true" },
            { label: "Interest rates are zero", value: "false" },
            { label: "All claims occur instantly", value: "false" },
            { label: "CAPM holds exactly", value: "false" }
        ],
        answer: "true",
        solution: "Stability in claim development factors is crucial for accurate projections."
    },
    {
        id: 104,
        question: "Simulation in liability valuation is used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Estimate probabilities and distributions of future claims", value: "true" },
            { label: "Compute CAPM beta", value: "false" },
            { label: "Price options", value: "false" },
            { label: "Calculate interest rate curves", value: "false" }
        ],
        answer: "true",
        solution: "Monte Carlo simulation allows modeling complex stochastic claims and reinsurance structures."
    },
    {
        id: 105,
        question: "Maximizing the adjustment coefficient under reinsurance aims to:",
        questionType: "multiple-choice",
        options: [
            { label: "Minimize probability of ruin", value: "true" },
            { label: "Maximize expected return", value: "false" },
            { label: "Eliminate interest rate risk", value: "false" },
            { label: "Increase CAPM alpha", value: "false" }
        ],
        answer: "true",
        solution: "A higher adjustment coefficient reduces the insurer's ruin probability under proportional or excess-of-loss treaties."
    },
    {
        id: 106,
        question: "Run-off triangles can be adjusted for inflation by:",
        questionType: "multiple-choice",
        options: [
            { label: "Scaling historical claims by expected inflation factors", value: "true" },
            { label: "Ignoring development factors", value: "false" },
            { label: "Using CAPM expected returns", value: "false" },
            { label: "Discounting by option prices", value: "false" }
        ],
        answer: "true",
        solution: "Adjusting historical claims for inflation ensures projections reflect future value changes."
    },
    {
        id: 107,
        question: "Chain ladder method assumes homogeneity in:",
        questionType: "multiple-choice",
        options: [
            { label: "Claims within each development period", value: "true" },
            { label: "Portfolio returns", value: "false" },
            { label: "Interest rates", value: "false" },
            { label: "Option deltas", value: "false" }
        ],
        answer: "true",
        solution: "Homogeneous claim experience ensures development factors are consistent and meaningful."
    },
    {
        id: 108,
        question: "In Bornhuetter-Ferguson method, unobserved claims are weighted by:",
        questionType: "multiple-choice",
        options: [
            { label: "Prior expected claims", value: "true" },
            { label: "Market CAPM returns", value: "false" },
            { label: "Option Greeks", value: "false" },
            { label: "Interest rate curves", value: "false" }
        ],
        answer: "true",
        solution: "Unobserved claims rely more on prior expectations, blending with observed development for accuracy."
    },
    {
        id: 109,
        question: "Average cost per claim method is most suitable when:",
        questionType: "multiple-choice",
        options: [
            { label: "Number of claims is uncertain but average size is known", value: "true" },
            { label: "Stock returns are modeled", value: "false" },
            { label: "Option pricing is required", value: "false" },
            { label: "Interest rates are stochastic", value: "false" }
        ],
        answer: "true",
        solution: "This method estimates total outstanding claims using average claim size and expected number of claims."
    },
    {
        id: 110,
        question: "Statistical models for run-off triangles allow:",
        questionType: "multiple-choice",
        options: [
            { label: "Confidence intervals for projections", value: "true" },
            { label: "CAPM beta estimation", value: "false" },
            { label: "Option delta calculation", value: "false" },
            { label: "Bond pricing", value: "false" }
        ],
        answer: "true",
        solution: "Stochastic models provide measures of uncertainty around claims projections."
    },
    {
        id: 111,
        question: "Key assumption of statistical run-off models is:",
        questionType: "multiple-choice",
        options: [
            { label: "Independence of claim increments", value: "true" },
            { label: "CAPM holds exactly", value: "false" },
            { label: "Options are priced perfectly", value: "false" },
            { label: "Interest rates are constant", value: "false" }
        ],
        answer: "true",
        solution: "Assuming independence allows probabilistic modeling of cumulative claims over time."
    },
    {
        id: 112,
        question: "Simulation is particularly useful when:",
        questionType: "multiple-choice",
        options: [
            { label: "Analytical solutions are intractable", value: "true" },
            { label: "CAPM returns are known", value: "false" },
            { label: "Option prices are given", value: "false" },
            { label: "Interest rates are deterministic", value: "false" }
        ],
        answer: "true",
        solution: "Monte Carlo simulation allows exploration of complex stochastic claims and reinsurance structures."
    },
    {
        id: 113,
        question: "Effect of proportional reinsurance on finite-time ruin probability is to:",
        questionType: "multiple-choice",
        options: [
            { label: "Lower it by sharing risk", value: "true" },
            { label: "Increase it", value: "false" },
            { label: "Eliminate it completely", value: "false" },
            { label: "Have no effect", value: "false" }
        ],
        answer: "true",
        solution: "Sharing claims with a reinsurer reduces the insurer’s exposure and probability of ruin."
    },
    {
        id: 114,
        question: "Excess-of-loss reinsurance limits the insurer’s liability by:",
        questionType: "multiple-choice",
        options: [
            { label: "Capping retention per claim", value: "true" },
            { label: "Reducing claim frequency", value: "false" },
            { label: "Eliminating tail risk completely", value: "false" },
            { label: "Modifying investment returns", value: "false" }
        ],
        answer: "true",
        solution: "Insurer retains losses up to a threshold; reinsurer covers the excess, limiting exposure."
    },
    {
        id: 115,
        question: "Adjustment coefficient is maximized to:",
        questionType: "multiple-choice",
        options: [
            { label: "Minimize probability of ruin", value: "true" },
            { label: "Maximize portfolio return", value: "false" },
            { label: "Optimize option pricing", value: "false" },
            { label: "Control interest rate risk", value: "false" }
        ],
        answer: "true",
        solution: "Higher adjustment coefficient lowers the probability of ruin under risk models."
    },
    {
        id: 116,
        question: "Infinite-time probability of ruin differs from finite-time because:",
        questionType: "multiple-choice",
        options: [
            { label: "It assumes the insurer continues indefinitely", value: "true" },
            { label: "It ignores claims", value: "false" },
            { label: "It uses CAPM instead", value: "false" },
            { label: "It is always zero", value: "false" }
        ],
        answer: "true",
        solution: "Infinite-time ruin considers the long-term survival of the insurer under the risk process."
    },
    {
        id: 117,
        question: "Compound Poisson distribution in liability modeling assumes:",
        questionType: "multiple-choice",
        options: [
            { label: "Independent claim counts and claim sizes", value: "true" },
            { label: "CAPM beta independence", value: "false" },
            { label: "Option price independence", value: "false" },
            { label: "Deterministic claim amounts", value: "false" }
        ],
        answer: "true",
        solution: "Compound Poisson combines random frequency (Poisson) with random claim sizes for total claims distribution."
    },
    {
        id: 118,
        question: "Simulation can incorporate:",
        questionType: "multiple-choice",
        options: [
            { label: "Complex reinsurance and stochastic claims", value: "true" },
            { label: "CAPM expected returns", value: "false" },
            { label: "Option Greeks", value: "false" },
            { label: "Deterministic interest rate curves", value: "false" }
        ],
        answer: "true",
        solution: "Monte Carlo simulation allows modeling of both claim size randomness and reinsurance arrangements."
    },
    {
        id: 119,
        question: "Maximizing adjustment coefficient is influenced by:",
        questionType: "multiple-choice",
        options: [
            { label: "Retention level and reinsurance type", value: "true" },
            { label: "Stock market beta", value: "false" },
            { label: "Option maturity", value: "false" },
            { label: "Discount factor", value: "false" }
        ],
        answer: "true",
        solution: "The adjustment coefficient depends on how much risk is retained versus ceded to reinsurers."
    },
    {
        id: 120,
        question: "Key goal of liability valuation models is to:",
        questionType: "multiple-choice",
        options: [
            { label: "Estimate future claims and probability of ruin", value: "true" },
            { label: "Price options", value: "false" },
            { label: "Calculate portfolio alpha", value: "false" },
            { label: "Estimate CAPM beta", value: "false" }
        ],
        answer: "true",
        solution: "Liability models provide insurers with forecasts of claims and risk of insolvency."
    },
    {
        id: 121,
        question: "Arbitrage in financial markets ensures that:",
        questionType: "multiple-choice",
        options: [
            { label: "No riskless profit opportunities exist", value: "true" },
            { label: "All options are priced above intrinsic value", value: "false" },
            { label: "CAPM always holds", value: "false" },
            { label: "Interest rates are deterministic", value: "false" }
        ],
        answer: "true",
        solution: "Arbitrage-free markets prevent the possibility of riskless profit through mispricing."
    },
    {
        id: 122,
        question: "Factors affecting an option's price include:",
        questionType: "multiple-choice",
        options: [
            { label: "Underlying price, strike price, volatility, time to maturity, interest rate", value: "true" },
            { label: "CAPM beta only", value: "false" },
            { label: "Historical return of the market only", value: "false" },
            { label: "Dividend yield only", value: "false" }
        ],
        answer: "true",
        solution: "Option pricing depends on multiple factors including underlying asset characteristics and market conditions."
    },
    {
        id: 123,
        question: "Put–call parity applies to:",
        questionType: "multiple-choice",
        options: [
            { label: "European options on non-dividend paying assets", value: "true" },
            { label: "American options only", value: "false" },
            { label: "All bonds", value: "false" },
            { label: "Futures contracts only", value: "false" }
        ],
        answer: "true",
        solution: "Put-call parity establishes a relationship between European call and put prices with the same strike and expiry."
    },
    {
        id: 124,
        question: "Upper and lower bounds for European call option price are determined by:",
        questionType: "multiple-choice",
        options: [
            { label: "Maximum of zero and intrinsic value; cannot exceed underlying asset price", value: "true" },
            { label: "CAPM alpha", value: "false" },
            { label: "Bond duration", value: "false" },
            { label: "Option Greeks", value: "false" }
        ],
        answer: "true",
        solution: "European call cannot be worth less than max(0, S-K) or more than the underlying asset price S."
    },
    {
        id: 125,
        question: "A forward contract on an asset has a value of:",
        questionType: "multiple-choice",
        options: [
            { label: "Spot price minus discounted forward price", value: "true" },
            { label: "CAPM beta", value: "false" },
            { label: "Black-Scholes delta", value: "false" },
            { label: "Average claim size", value: "false" }
        ],
        answer: "true",
        solution: "Forward contract value equals current spot value adjusted for the present value of the forward price."
    },
    {
        id: 126,
        question: "Risk-neutral pricing assumes:",
        questionType: "multiple-choice",
        options: [
            { label: "All investors are indifferent to risk for valuation purposes", value: "true" },
            { label: "Market returns follow CAPM exactly", value: "false" },
            { label: "Options are always in-the-money", value: "false" },
            { label: "Interest rates are zero", value: "false" }
        ],
        answer: "true",
        solution: "Risk-neutral measure is a computational tool allowing pricing by discounting expected payoffs at risk-free rate."
    },
    {
        id: 127,
        question: "In a binomial option pricing model, risk-neutral probability is used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Calculate expected option payoff under risk-neutral measure", value: "true" },
            { label: "Estimate historical volatility", value: "false" },
            { label: "Compute CAPM beta", value: "false" },
            { label: "Discount bond cashflows", value: "false" }
        ],
        answer: "true",
        solution: "Risk-neutral probability weights the up and down moves to price options without considering investor risk preferences."
    },
    {
        id: 128,
        question: "The difference between real-world and risk-neutral measure is:",
        questionType: "multiple-choice",
        options: [
            { label: "Real-world includes risk preferences; risk-neutral does not", value: "true" },
            { label: "Real-world ignores stock prices", value: "false" },
            { label: "Risk-neutral uses CAPM beta", value: "false" },
            { label: "Real-world sets interest rates to zero", value: "false" }
        ],
        answer: "true",
        solution: "Risk-neutral pricing is a computational construct, not reflecting actual investor preferences."
    },
    {
        id: 129,
        question: "Black-Scholes PDE is derived using:",
        questionType: "multiple-choice",
        options: [
            { label: "Itô's Lemma and hedging arguments", value: "true" },
            { label: "CAPM formula", value: "false" },
            { label: "Compound Poisson", value: "false" },
            { label: "Expected shortfall", value: "false" }
        ],
        answer: "true",
        solution: "Applying Itô’s Lemma to a delta-hedged portfolio leads to the Black-Scholes partial differential equation."
    },
    {
        id: 130,
        question: "Black-Scholes model assumes:",
        questionType: "multiple-choice",
        options: [
            { label: "Log-normal asset prices, constant volatility and interest rate, no arbitrage", value: "true" },
            { label: "Discrete asset returns", value: "false" },
            { label: "CAPM beta equal to one", value: "false" },
            { label: "Poisson jump process only", value: "false" }
        ],
        answer: "true",
        solution: "These assumptions are fundamental for deriving closed-form Black-Scholes option prices."
    },
    {
        id: 131,
        question: "Martingale approach in option pricing implies:",
        questionType: "multiple-choice",
        options: [
            { label: "Discounted asset prices under risk-neutral measure are martingales", value: "true" },
            { label: "Assets follow CAPM exactly", value: "false" },
            { label: "Options always pay dividends", value: "false" },
            { label: "Interest rates are deterministic", value: "false" }
        ],
        answer: "true",
        solution: "Martingale property ensures no-arbitrage pricing when discounted at the risk-free rate."
    },
    {
        id: 132,
        question: "Garman-Kohlhagen model extends Black-Scholes to:",
        questionType: "multiple-choice",
        options: [
            { label: "Currency options with foreign interest rates", value: "true" },
            { label: "American options only", value: "false" },
            { label: "Commodity forwards", value: "false" },
            { label: "CAPM portfolios", value: "false" }
        ],
        answer: "true",
        solution: "It incorporates both domestic and foreign risk-free rates for currency derivatives."
    },
    {
        id: 133,
        question: "Greeks of an option measure:",
        questionType: "multiple-choice",
        options: [
            { label: "Sensitivity of option price to underlying parameters", value: "true" },
            { label: "Expected claim sizes", value: "false" },
            { label: "CAPM alpha", value: "false" },
            { label: "Probability of ruin", value: "false" }
        ],
        answer: "true",
        solution: "Delta, Gamma, Vega, Theta, Rho describe how option price reacts to price, volatility, time, and rates."
    },
    {
        id: 134,
        question: "Black-Scholes model is valid under:",
        questionType: "multiple-choice",
        options: [
            { label: "Continuous trading and frictionless markets", value: "true" },
            { label: "Discontinuous jump markets only", value: "false" },
            { label: "Illiquid bonds", value: "false" },
            { label: "CAPM beta = 0 only", value: "false" }
        ],
        answer: "true",
        solution: "Continuous hedging and no transaction costs are assumptions for the model’s theoretical validity."
    },
    {
        id: 135,
        question: "State-price deflator approach is equivalent to:",
        questionType: "multiple-choice",
        options: [
            { label: "Risk-neutral pricing approach", value: "true" },
            { label: "CAPM alpha estimation", value: "false" },
            { label: "Poisson claim model", value: "false" },
            { label: "Compound interest formula", value: "false" }
        ],
        answer: "true",
        solution: "Discounting by state-price deflators produces the same prices as under risk-neutral probabilities."
    },
    {
        id: 136,
        question: "A European call option’s value increases when:",
        questionType: "multiple-choice",
        options: [
            { label: "Underlying asset price rises", value: "true" },
            { label: "Strike price rises", value: "false" },
            { label: "Time to maturity decreases", value: "false" },
            { label: "Volatility decreases", value: "false" }
        ],
        answer: "true",
        solution: "Higher underlying price increases the intrinsic value and expected payoff of a call."
    },
    {
        id: 137,
        question: "A European put option’s value increases when:",
        questionType: "multiple-choice",
        options: [
            { label: "Strike price rises", value: "true" },
            { label: "Underlying price rises", value: "false" },
            { label: "Volatility decreases", value: "false" },
            { label: "Interest rates decrease", value: "false" }
        ],
        answer: "true",
        solution: "Higher strike price increases the potential payoff of a put."
    },
    {
        id: 138,
        question: "Time to maturity affects option price because:",
        questionType: "multiple-choice",
        options: [
            { label: "More time allows more chance for profitable moves", value: "true" },
            { label: "Time has no effect under risk-neutral pricing", value: "false" },
            { label: "Time only affects bonds", value: "false" },
            { label: "Time reduces volatility", value: "false" }
        ],
        answer: "true",
        solution: "Longer maturities increase option value due to the greater potential for favorable asset movements."
    },
    {
        id: 139,
        question: "Option delta measures:",
        questionType: "multiple-choice",
        options: [
            { label: "Change in option price per unit change in underlying price", value: "true" },
            { label: "Time decay of option value", value: "false" },
            { label: "Sensitivity to volatility", value: "false" },
            { label: "Discount rate effect", value: "false" }
        ],
        answer: "true",
        solution: "Delta represents the first derivative of the option price with respect to the underlying asset price."
    },
    {
        id: 140,
        question: "Option gamma measures:",
        questionType: "multiple-choice",
        options: [
            { label: "Rate of change of delta with respect to underlying price", value: "true" },
            { label: "Time decay of option value", value: "false" },
            { label: "Sensitivity to interest rates", value: "false" },
            { label: "Expected payoff", value: "false" }
        ],
        answer: "true",
        solution: "Gamma is the second derivative of option price with respect to the underlying, indicating convexity."
    },
    {
        id: 141,
        question: "Vega of an option measures:",
        questionType: "multiple-choice",
        options: [
            { label: "Sensitivity of option price to volatility", value: "true" },
            { label: "Change in option price due to time", value: "false" },
            { label: "Interest rate sensitivity", value: "false" },
            { label: "Underlying asset sensitivity", value: "false" }
        ],
        answer: "true",
        solution: "Vega shows how much the option value changes for a 1% change in volatility."
    },
    {
        id: 142,
        question: "Theta of an option measures:",
        questionType: "multiple-choice",
        options: [
            { label: "Rate of change of option price with respect to time", value: "true" },
            { label: "Change in delta with asset price", value: "false" },
            { label: "Sensitivity to volatility", value: "false" },
            { label: "Risk-free rate effect", value: "false" }
        ],
        answer: "true",
        solution: "Theta represents time decay, the loss in option value as maturity approaches."
    },
    {
        id: 143,
        question: "Rho of an option measures:",
        questionType: "multiple-choice",
        options: [
            { label: "Sensitivity of option price to interest rates", value: "true" },
            { label: "Sensitivity to asset price", value: "false" },
            { label: "Volatility effect", value: "false" },
            { label: "Time decay", value: "false" }
        ],
        answer: "true",
        solution: "Rho shows how the option value changes with a 1% change in the risk-free interest rate."
    },
    {
        id: 144,
        question: "American options differ from European because:",
        questionType: "multiple-choice",
        options: [
            { label: "They can be exercised any time up to expiry", value: "true" },
            { label: "They expire automatically before maturity", value: "false" },
            { label: "They are always more valuable than European calls", value: "false" },
            { label: "They follow risk-neutral pricing only", value: "false" }
        ],
        answer: "true",
        solution: "The early exercise feature differentiates American options and affects their valuation."
    },
    {
        id: 145,
        question: "Binomial model converges to Black-Scholes price as:",
        questionType: "multiple-choice",
        options: [
            { label: "Number of steps increases", value: "true" },
            { label: "Interest rates go to zero", value: "false" },
            { label: "Volatility decreases", value: "false" },
            { label: "Underlying price decreases", value: "false" }
        ],
        answer: "true",
        solution: "With finer time steps, the binomial model approximates continuous-time Black-Scholes results."
    },
    {
        id: 146,
        question: "Risk-neutral pricing simplifies calculations by:",
        questionType: "multiple-choice",
        options: [
            { label: "Ignoring risk preferences of investors", value: "true" },
            { label: "Assuming zero interest rates", value: "false" },
            { label: "Assuming underlying always rises", value: "false" },
            { label: "Only applying to American options", value: "false" }
        ],
        answer: "true",
        solution: "Under risk-neutral measure, expected discounted payoff equals option price, independent of investor risk aversion."
    },
    {
        id: 147,
        question: "Geometric Brownian motion assumes:",
        questionType: "multiple-choice",
        options: [
            { label: "Log-normal distribution of asset prices", value: "true" },
            { label: "Normal distribution of asset prices", value: "false" },
            { label: "Poisson jumps only", value: "false" },
            { label: "Deterministic paths", value: "false" }
        ],
        answer: "true",
        solution: "GBM is the underlying stochastic process assumed in Black-Scholes, giving log-normal asset prices."
    },
    {
        id: 148,
        question: "Ornstein-Uhlenbeck process is used for:",
        questionType: "multiple-choice",
        options: [
            { label: "Mean-reverting processes like interest rates", value: "true" },
            { label: "Option delta hedging", value: "false" },
            { label: "Stock dividends", value: "false" },
            { label: "Black-Scholes PDE", value: "false" }
        ],
        answer: "true",
        solution: "OU process models quantities that tend to revert toward a long-term mean."
    },
    {
        id: 149,
        question: "State-price deflator approach prices options by:",
        questionType: "multiple-choice",
        options: [
            { label: "Multiplying payoffs by deflators and taking expectation", value: "true" },
            { label: "Using CAPM alpha", value: "false" },
            { label: "Discounting only by volatility", value: "false" },
            { label: "Estimating future dividends", value: "false" }
        ],
        answer: "true",
        solution: "State-price deflators adjust payoffs for risk and time, yielding the same result as risk-neutral pricing."
    },
    {
        id: 150,
        question: "Black-Scholes Greeks are useful for:",
        questionType: "multiple-choice",
        options: [
            { label: "Managing and hedging option portfolios", value: "true" },
            { label: "Estimating historical returns", value: "false" },
            { label: "Measuring insurance premiums", value: "false" },
            { label: "Determining bond duration", value: "false" }
        ],
        answer: "true",
        solution: "Greeks quantify sensitivity to underlying, volatility, time, and interest rate, allowing effective hedging."
    }

];
