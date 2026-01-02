// Risk Modelling Practice Questions Data
const questions = [
    {
        id: 1,
        question: "Which of the following is a property of the Poisson distribution?",
        questionType: "multiple-choice",
        options: [
            { label: "Mean equals variance", value: "true" },
            { label: "Always takes negative values", value: "false" },
            { label: "Defined only for continuous data", value: "false" },
            { label: "Skewness is zero", value: "false" }
        ],
        answer: "true",
        solution: "For a Poisson random variable $X \\sim Poisson(\\lambda)$, $E[X] = Var[X] = \\lambda$. It is discrete and skewed for small $\\lambda$."
    },
    {
        id: 2,
        question: "An insurer has a deductible of $500 on claims. If the claim amount $X$ exceeds $500$, what is the payment $Y$ by the insurer?",
        questionType: "multiple-choice",
        options: [
            { label: "$Y = X$", value: "false" },
            { label: "$Y = X - 500$", value: "true" },
            { label: "$Y = 500$", value: "false" },
            { label: "$Y = X + 500$", value: "false" }
        ],
        answer: "true",
        solution: "For a deductible $d$, the insurer pays $Y = max(0, X - d)$. Here $d = 500$, so $Y = X - 500$ when $X > 500$."
    },
    {
        id: 3,
        question: "Which distribution is commonly used for modelling individual claim severity in insurance?",
        questionType: "multiple-choice",
        options: [
            { label: "Exponential distribution", value: "true" },
            { label: "Binomial distribution", value: "false" },
            { label: "Uniform distribution", value: "false" },
            { label: "Poisson distribution", value: "false" }
        ],
        answer: "true",
        solution: "Exponential distributions are used to model claim sizes with constant hazard rates, suitable for continuous positive losses."
    },
    {
        id: 4,
        question: "In proportional reinsurance, if the reinsurer takes 30% of each claim, what fraction of a $10,000 claim does the reinsurer pay?",
        questionType: "multiple-choice",
        options: [
            { label: "$3,000", value: "true" },
            { label: "$7,000", value: "false" },
            { label: "$10,000", value: "false" },
            { label: "$0", value: "false" }
        ],
        answer: "true",
        solution: "Under proportional reinsurance, the reinsurer pays a fixed proportion of each claim: $0.3 \\times 10,000 = 3,000$."
    },
    {
        id: 5,
        question: "For a compound Poisson distribution, the mean of total claims $S = X_1 + \\dots + X_N$ is given by?",
        questionType: "multiple-choice",
        options: [
            { label: "$E[S] = E[N] \\cdot E[X]$", value: "true" },
            { label: "$E[S] = Var[N] + Var[X]$", value: "false" },
            { label: "$E[S] = E[N] + E[X]$", value: "false" },
            { label: "$E[S] = E[N]/E[X]$", value: "false" }
        ],
        answer: "true",
        solution: "If $N$ is Poisson with mean $\\lambda$ and $X_i$ are independent claim amounts, $E[S] = E[N] \\cdot E[X]$."
    },
    {
        id: 6,
        question: "The variance of a compound Poisson total claim amount $S$ is:",
        questionType: "multiple-choice",
        options: [
            { label: "$Var[S] = E[N] Var[X] + Var[N] (E[X])^2$", value: "true" },
            { label: "$Var[S] = E[X]^2$", value: "false" },
            { label: "$Var[S] = Var[X]$", value: "false" },
            { label: "$Var[S] = Var[N]$", value: "false" }
        ],
        answer: "true",
        solution: "For compound Poisson: $Var[S] = E[N] Var[X] + Var[N] (E[X])^2$. With $N \\sim Poisson(\\lambda)$, $Var[N] = \\lambda$."
    },
    {
        id: 7,
        question: "Which of the following statements about excess-of-loss reinsurance is true?",
        questionType: "multiple-choice",
        options: [
            { label: "The reinsurer pays the portion of the loss exceeding a retention limit", value: "true" },
            { label: "The insurer pays nothing", value: "false" },
            { label: "The reinsurer pays all claims below the retention limit", value: "false" },
            { label: "It is the same as proportional reinsurance", value: "false" }
        ],
        answer: "true",
        solution: "Excess-of-loss reinsurance covers only the amount above a specified retention limit, protecting the insurer from large losses."
    },
    {
        id: 8,
        question: "Which copula is commonly used in finance for modelling dependency with no tail dependence?",
        questionType: "multiple-choice",
        options: [
            { label: "Gaussian copula", value: "true" },
            { label: "Clayton copula", value: "false" },
            { label: "Gumbel copula", value: "false" },
            { label: "Frank copula", value: "false" }
        ],
        answer: "true",
        solution: "The Gaussian copula models dependency without specific upper or lower tail dependence, unlike Clayton or Gumbel."
    },
    {
        id: 9,
        question: "In risk modelling, the coefficient of skewness measures:",
        questionType: "multiple-choice",
        options: [
            { label: "Asymmetry of the distribution", value: "true" },
            { label: "Spread of the distribution", value: "false" },
            { label: "Central tendency", value: "false" },
            { label: "Correlation between two variables", value: "false" }
        ],
        answer: "true",
        solution: "Skewness quantifies asymmetry: positive skew indicates a longer right tail, negative skew a longer left tail."
    },
    {
        id: 10,
        question: "Which distribution is appropriate for modelling the number of claims in a fixed period?",
        questionType: "multiple-choice",
        options: [
            { label: "Poisson distribution", value: "true" },
            { label: "Normal distribution", value: "false" },
            { label: "Exponential distribution", value: "false" },
            { label: "Uniform distribution", value: "false" }
        ],
        answer: "true",
        solution: "The Poisson distribution models the count of events (claims) in a fixed interval, assuming events are independent and occur at a constant rate."
    },
    {
        id: 11,
        question: "The aggregate claims distribution after proportional reinsurance has mean:",
        questionType: "multiple-choice",
        options: [
            { label: "$E[S_R] = c E[S]$", value: "true" },
            { label: "$E[S_R] = E[S]/c$", value: "false" },
            { label: "$E[S_R] = E[S]$", value: "false" },
            { label: "$E[S_R] = c + E[S]$", value: "false" }
        ],
        answer: "true",
        solution: "If the reinsurer covers a proportion $c$ of claims, then $E[S_R] = c E[S]$."
    },
    {
        id: 12,
        question: "Tail dependence in a copula describes:",
        questionType: "multiple-choice",
        options: [
            { label: "Probability of joint extreme outcomes", value: "true" },
            { label: "Mean of marginal distributions", value: "false" },
            { label: "Variance of dependent variable", value: "false" },
            { label: "Expected claim amount", value: "false" }
        ],
        answer: "true",
        solution: "Tail dependence measures how likely extreme values occur simultaneously for dependent variables, important in modelling risk concentration."
    },
    {
        id: 13,
        question: "The Archimedean family of copulas is characterized by:",
        questionType: "multiple-choice",
        options: [
            { label: "A single generator function defining the dependence structure", value: "true" },
            { label: "Exact modeling of marginal distributions only", value: "false" },
            { label: "Independence of all variables", value: "false" },
            { label: "Poisson-distributed marginals", value: "false" }
        ],
        answer: "true",
        solution: "Archimedean copulas use a generator function to model dependence between variables, allowing flexible tail dependence."
    },
    {
        id: 14,
        question: "Extreme value distributions are used to model:",
        questionType: "multiple-choice",
        options: [
            { label: "The severity of very large losses", value: "true" },
            { label: "Average claim amounts", value: "false" },
            { label: "Frequency of small claims", value: "false" },
            { label: "Survival times only", value: "false" }
        ],
        answer: "true",
        solution: "Extreme value theory focuses on modelling the tail of distributions, which is crucial for large insurance losses."
    },
    {
        id: 15,
        question: "A negative binomial distribution can be used to model:",
        questionType: "multiple-choice",
        options: [
            { label: "Overdispersed claim counts", value: "true" },
            { label: "Exactly Poisson-like claim counts", value: "false" },
            { label: "Continuous loss amounts", value: "false" },
            { label: "Uniformly distributed claims", value: "false" }
        ],
        answer: "true",
        solution: "Negative binomial allows variance > mean, modelling overdispersion in claim counts where Poisson is inadequate."
    },
    {
        id: 16,
        question: "For a compound binomial distribution, the mean total claims is given by:",
        questionType: "multiple-choice",
        options: [
            { label: "$E[S] = n p E[X]$", value: "true" },
            { label: "$E[S] = n p + E[X]$", value: "false" },
            { label: "$E[S] = E[X]/(n p)$", value: "false" },
            { label: "$E[S] = n E[X]$", value: "false" }
        ],
        answer: "true",
        solution: "For $N \\sim Binomial(n,p)$ and $X_i$ independent claim sizes, $E[S] = E[N] E[X] = n p E[X]$."
    },
    {
        id: 17,
        question: "The variance of a compound negative binomial total claims amount is:",
        questionType: "multiple-choice",
        options: [
            { label: "$Var[S] = E[N] Var[X] + Var[N] (E[X])^2$", value: "true" },
            { label: "$Var[S] = E[X]^2$", value: "false" },
            { label: "$Var[S] = Var[X]$", value: "false" },
            { label: "$Var[S] = E[N] + Var[X]$", value: "false" }
        ],
        answer: "true",
        solution: "General formula for compound distributions: $Var[S] = E[N] Var[X] + Var[N] (E[X])^2$."
    },
    {
        id: 18,
        question: "A stop-loss reinsurance covers losses above a threshold $M$. If a claim is $X = 20,000$ and $M = 15,000$, the reinsurer pays:",
        questionType: "multiple-choice",
        options: [
            { label: "$5,000$", value: "true" },
            { label: "$15,000$", value: "false" },
            { label: "$20,000$", value: "false" },
            { label: "$0$", value: "false" }
        ],
        answer: "true",
        solution: "Reinsurer pays $max(0, X - M) = 20,000 - 15,000 = 5,000$."
    },
    {
        id: 19,
        question: "Which of the following is a key assumption in a compound Poisson model for insurance claims?",
        questionType: "multiple-choice",
        options: [
            { label: "Number of claims is Poisson-distributed", value: "true" },
            { label: "All claims are deterministic", value: "false" },
            { label: "Claims are dependent on each other", value: "false" },
            { label: "Claim sizes are uniform", value: "false" }
        ],
        answer: "true",
        solution: "Compound Poisson assumes $N \\sim Poisson(\\lambda)$ and independent identically distributed claim sizes."
    },
    {
        id: 20,
        question: "In a loss distribution with deductible $d$, which of the following is true for the expected payment by the insurer $E[Y]$?",
        questionType: "multiple-choice",
        options: [
            { label: "$E[Y] = E[max(0, X - d)]$", value: "true" },
            { label: "$E[Y] = E[X] + d$", value: "false" },
            { label: "$E[Y] = d$", value: "false" },
            { label: "$E[Y] = E[X] - Var[X]$", value: "false" }
        ],
        answer: "true",
        solution: "With deductible $d$, the insurer pays $Y = max(0, X - d)$. Therefore, $E[Y] = E[max(0, X - d)]$."
    },
    {
        id: 21,
        question: "The method of moments is used to estimate parameters by:",
        questionType: "multiple-choice",
        options: [
            { label: "Equating sample moments to theoretical moments", value: "true" },
            { label: "Maximizing the likelihood function", value: "false" },
            { label: "Minimizing the sum of squared residuals", value: "false" },
            { label: "Integrating the PDF over the sample", value: "false" }
        ],
        answer: "true",
        solution: "Method of moments estimates parameters by setting sample moments equal to theoretical moments."
    },
    {
        id: 22,
        question: "Maximum likelihood estimation (MLE) is suitable because it:",
        questionType: "multiple-choice",
        options: [
            { label: "Finds parameters that maximize the probability of observed data", value: "true" },
            { label: "Minimizes the sample variance", value: "false" },
            { label: "Guarantees unbiased estimates", value: "false" },
            { label: "Does not require a likelihood function", value: "false" }
        ],
        answer: "true",
        solution: "MLE chooses parameters that maximize the likelihood function for observed data."
    },
    {
        id: 23,
        question: "In an insurance context, the survival function $S(x)$ represents:",
        questionType: "multiple-choice",
        options: [
            { label: "Probability a loss exceeds $x$", value: "true" },
            { label: "Expected value of loss $X$", value: "false" },
            { label: "Variance of $X$", value: "false" },
            { label: "Density at $x$", value: "false" }
        ],
        answer: "true",
        solution: "$S(x) = P(X > x)$ is the probability that a loss or lifetime exceeds $x$."
    },
    {
        id: 24,
        question: "Which of the following is a property of the Exponential distribution?",
        questionType: "multiple-choice",
        options: [
            { label: "Memoryless property", value: "true" },
            { label: "Mean equals variance only if lambda=1", value: "false" },
            { label: "Always negative values", value: "false" },
            { label: "Defined for discrete counts", value: "false" }
        ],
        answer: "true",
        solution: "The Exponential distribution is continuous, positive, and memoryless: $P(X > s+t | X > s) = P(X > t)$."
    },
    {
        id: 25,
        question: "A claim amount $X$ has mean $E[X] = 10,000$ and variance $Var[X] = 4,000,000$. If a proportional reinsurance cedes 40% of claims, the variance of the reinsurer's payment is:",
        questionType: "multiple-choice",
        options: [
            { label: "$0.4^2 * 4,000,000 = 640,000$", value: "true" },
            { label: "$0.4 * 4,000,000 = 1,600,000$", value: "false" },
            { label: "$4,000,000$", value: "false" },
            { label: "$10,000$", value: "false" }
        ],
        answer: "true",
        solution: "Variance scales by the square of the proportion: $Var[0.4 X] = 0.16 * 4,000,000 = 640,000$."
    },
    {
        id: 26,
        question: "In a compound Poisson model, if individual claim amounts $X_i$ are exponential with mean $1,000$, and $N \\sim Poisson(5)$, the expected total claims $E[S]$ is:",
        questionType: "multiple-choice",
        options: [
            { label: "$5,000$", value: "true" },
            { label: "$1,000$", value: "false" },
            { label: "$5$", value: "false" },
            { label: "$6,000$", value: "false" }
        ],
        answer: "true",
        solution: "E[S] = E[N] * E[X] = 5 * 1,000 = 5,000."
    },
    {
        id: 27,
        question: "Which of the following best describes the Gaussian copula?",
        questionType: "multiple-choice",
        options: [
            { label: "Dependency modeled using a correlation matrix with no tail dependence", value: "true" },
            { label: "Strong lower tail dependence", value: "false" },
            { label: "Strong upper tail dependence", value: "false" },
            { label: "Only for discrete variables", value: "false" }
        ],
        answer: "true",
        solution: "Gaussian copula uses correlation to model dependence, with no specific upper or lower tail dependence."
    },
    {
        id: 28,
        question: "Tail weight of a loss distribution refers to:",
        questionType: "multiple-choice",
        options: [
            { label: "Probability of extremely large claims", value: "true" },
            { label: "Mean claim amount", value: "false" },
            { label: "Median claim amount", value: "false" },
            { label: "Minimum claim amount", value: "false" }
        ],
        answer: "true",
        solution: "Tail weight characterizes the probability of extreme outcomes, crucial for risk management and reinsurance pricing."
    },
    {
        id: 29,
        question: "If $X_i$ are independent and identically distributed and $N$ is independent of $X_i$, the sum $S = \\sum_{i=1}^N X_i$ is:",
        questionType: "multiple-choice",
        options: [
            { label: "A compound distribution", value: "true" },
            { label: "Always normal", value: "false" },
            { label: "Uniform", value: "false" },
            { label: "Deterministic", value: "false" }
        ],
        answer: "true",
        solution: "Sums of a random number of independent identically distributed variables form a compound distribution."
    },
    {
        id: 30,
        question: "Which of the following is NOT a typical simplifying assumption for short-term insurance models?",
        questionType: "multiple-choice",
        options: [
            { label: "Claims occur independently", value: "true" },
            { label: "All claims are homogeneous", value: "false" },
            { label: "Losses are small relative to insurer's capital", value: "false" },
            { label: "Claims follow a known distribution", value: "false" }
        ],
        answer: "true",
        solution: "Independence is assumed, but homogeneity of all claims is not always realistic; this is a simplification sometimes violated in practice."
    },
    {
        id: 31,
        question: "A stationary time series is one whose statistical properties:",
        questionType: "multiple-choice",
        options: [
            { label: "Do not change over time", value: "true" },
            { label: "Depend linearly on time", value: "false" },
            { label: "Are only defined at integer times", value: "false" },
            { label: "Always follow a normal distribution", value: "false" }
        ],
        answer: "true",
        solution: "Stationary series have constant mean, variance, and autocovariance over time."
    },
    {
        id: 32,
        question: "The backwards shift operator B applied to $X_t$ gives:",
        questionType: "multiple-choice",
        options: [
            { label: "$B X_t = X_{t-1}$", value: "true" },
            { label: "$B X_t = X_{t+1}$", value: "false" },
            { label: "$B X_t = X_t + 1$", value: "false" },
            { label: "$B X_t = \\Delta X_t$", value: "false" }
        ],
        answer: "true",
        solution: "By definition, $B X_t = X_{t-1}$."
    },
    {
        id: 33,
        question: "An AR(1) model is defined as:",
        questionType: "multiple-choice",
        options: [
            { label: "$X_t = \\phi X_{t-1} + \\epsilon_t$", value: "true" },
            { label: "$X_t = X_{t-1} + X_{t-2}$", value: "false" },
            { label: "$X_t = \\epsilon_t$", value: "false" },
            { label: "$X_t = \\phi + \\epsilon_t$", value: "false" }
        ],
        answer: "true",
        solution: "An AR(1) model uses the previous value plus a random error."
    },
    {
        id: 34,
        question: "A MA(1) model is given by:",
        questionType: "multiple-choice",
        options: [
            { label: "$X_t = \\epsilon_t + \\theta \\epsilon_{t-1}$", value: "true" },
            { label: "$X_t = X_{t-1} + \\epsilon_t$", value: "false" },
            { label: "$X_t = \\epsilon_{t-1} + \\epsilon_{t-2}$", value: "false" },
            { label: "$X_t = \\phi X_{t-1} + \\theta X_{t-2}$", value: "false" }
        ],
        answer: "true",
        solution: "MA(1) is a moving average of current and previous error terms."
    },
    {
        id: 35,
        question: "An ARMA(p,q) model combines:",
        questionType: "multiple-choice",
        options: [
            { label: "Autoregressive (AR) and Moving Average (MA) components", value: "true" },
            { label: "Only AR components", value: "false" },
            { label: "Only MA components", value: "false" },
            { label: "Seasonal differencing", value: "false" }
        ],
        answer: "true",
        solution: "ARMA models combine AR(p) and MA(q) components for stationary series."
    },
    {
        id: 36,
        question: "A random walk with drift has the form:",
        questionType: "multiple-choice",
        options: [
            { label: "$X_t = \\mu + X_{t-1} + \\epsilon_t$", value: "true" },
            { label: "$X_t = X_{t-1} + \\epsilon_{t-1}$", value: "false" },
            { label: "$X_t = \\epsilon_t$", value: "false" },
            { label: "$X_t = \\phi X_{t-1}$", value: "false" }
        ],
        answer: "true",
        solution: "Drift adds a constant $\\mu$ to the standard random walk."
    },
    {
        id: 37,
        question: "A time series is I(1) if:",
        questionType: "multiple-choice",
        options: [
            { label: "It becomes stationary after first differencing", value: "true" },
            { label: "It is stationary without differencing", value: "false" },
            { label: "It has seasonal fluctuations only", value: "false" },
            { label: "Its autocorrelation is zero at all lags", value: "false" }
        ],
        answer: "true",
        solution: "Integrated of order 1 (I(1)) means first differences are stationary."
    },
    {
        id: 38,
        question: "The autocorrelation function (ACF) of a stationary time series:",
        questionType: "multiple-choice",
        options: [
            { label: "Depends only on lag, not time", value: "true" },
            { label: "Varies with time", value: "false" },
            { label: "Is always zero for AR models", value: "false" },
            { label: "Is always positive", value: "false" }
        ],
        answer: "true",
        solution: "ACF measures correlation at lag k, independent of actual time t for stationary series."
    },
    {
        id: 39,
        question: "Cointegration occurs when:",
        questionType: "multiple-choice",
        options: [
            { label: "Two or more non-stationary series have a stationary linear combination", value: "true" },
            { label: "All series are stationary", value: "false" },
            { label: "Series have no correlation", value: "false" },
            { label: "Series are independent", value: "false" }
        ],
        answer: "true",
        solution: "Cointegration implies a long-term equilibrium relationship between non-stationary series."
    },
    {
        id: 40,
        question: "In time series diagnostics, residuals should ideally be:",
        questionType: "multiple-choice",
        options: [
            { label: "Uncorrelated and mean zero", value: "true" },
            { label: "Increasing over time", value: "false" },
            { label: "Always positive", value: "false" },
            { label: "Deterministic", value: "false" }
        ],
        answer: "true",
        solution: "Good model fit requires residuals to resemble white noise: uncorrelated with zero mean."
    },
    {
        id: 41,
        question: "A multivariate autoregressive (VAR) model allows:",
        questionType: "multiple-choice",
        options: [
            { label: "Multiple time series to influence each other", value: "true" },
            { label: "Only one series at a time", value: "false" },
            { label: "Only stationary series", value: "false" },
            { label: "Only cointegrated series", value: "false" }
        ],
        answer: "true",
        solution: "VAR models capture interdependence between multiple time series."
    },
    {
        id: 42,
        question: "A key step in time series modeling is identification, which involves:",
        questionType: "multiple-choice",
        options: [
            { label: "Determining model order (p, q) and stationarity", value: "true" },
            { label: "Estimating parameters via MLE", value: "false" },
            { label: "Forecasting future values", value: "false" },
            { label: "Checking residuals", value: "false" }
        ],
        answer: "true",
        solution: "Identification chooses model type, order, and checks if series is stationary."
    },
    {
        id: 43,
        question: "Exponential smoothing is primarily used for:",
        questionType: "multiple-choice",
        options: [
            { label: "Generating short-term forecasts", value: "true" },
            { label: "Parameter estimation", value: "false" },
            { label: "Testing stationarity", value: "false" },
            { label: "Identifying cointegration", value: "false" }
        ],
        answer: "true",
        solution: "Exponential smoothing applies weighted averages for short-term forecasting."
    },
    {
        id: 44,
        question: "A deterministic trend in time series refers to:",
        questionType: "multiple-choice",
        options: [
            { label: "A consistent predictable increase or decrease", value: "true" },
            { label: "Random fluctuations around a mean", value: "false" },
            { label: "Seasonal variation only", value: "false" },
            { label: "Noise in the series", value: "false" }
        ],
        answer: "true",
        solution: "Deterministic trend is a predictable pattern in the series, e.g., linear or exponential growth."
    },
    {
        id: 45,
        question: "Random walks are non-stationary because:",
        questionType: "multiple-choice",
        options: [
            { label: "Variance increases with time", value: "true" },
            { label: "Mean is constant", value: "false" },
            { label: "Autocorrelations are zero", value: "false" },
            { label: "They are bounded", value: "false" }
        ],
        answer: "true",
        solution: "Variance grows with time in a random walk, making it non-stationary."
    },
    {
        id: 46,
        question: "The backwards difference operator Δ applied to X_t is defined as:",
        questionType: "multiple-choice",
        options: [
            { label: "ΔX_t = X_t - X_{t-1}", value: "true" },
            { label: "ΔX_t = X_{t+1} - X_t", value: "false" },
            { label: "ΔX_t = X_t + X_{t-1}", value: "false" },
            { label: "ΔX_t = X_t / X_{t-1}", value: "false" }
        ],
        answer: "true",
        solution: "The first difference is the current value minus the previous value."
    },
    {
        id: 47,
        question: "Seasonal adjustment in a time series is used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Remove periodic seasonal effects", value: "true" },
            { label: "Increase variance", value: "false" },
            { label: "Change the AR order", value: "false" },
            { label: "Generate cointegration", value: "false" }
        ],
        answer: "true",
        solution: "Seasonal adjustment isolates trend and irregular components by removing seasonality."
    },
    {
        id: 48,
        question: "A unit root in a time series implies:",
        questionType: "multiple-choice",
        options: [
            { label: "Non-stationarity", value: "true" },
            { label: "Stationarity", value: "false" },
            { label: "Deterministic trend only", value: "false" },
            { label: "White noise behavior", value: "false" }
        ],
        answer: "true",
        solution: "Unit root presence makes variance grow over time, causing non-stationarity."
    },
    {
        id: 49,
        question: "The characteristic equation of an AR(p) process is used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Check stationarity", value: "true" },
            { label: "Estimate residuals", value: "false" },
            { label: "Fit MA components", value: "false" },
            { label: "Compute forecasts directly", value: "false" }
        ],
        answer: "true",
        solution: "Stationarity requires roots of the characteristic equation to lie outside the unit circle."
    },
    {
        id: 50,
        question: "Forecasting with ARIMA models involves:",
        questionType: "multiple-choice",
        options: [
            { label: "Accounting for AR, MA, and integration components", value: "true" },
            { label: "Using only moving averages", value: "false" },
            { label: "Ignoring differencing", value: "false" },
            { label: "Fitting only stationary series", value: "false" }
        ],
        answer: "true",
        solution: "ARIMA models include AR(p), MA(q), and differencing I(d) for forecasting."
    },
    {
        id: 51,
        question: "An ARIMA(1,1,1) model has:",
        questionType: "multiple-choice",
        options: [
            { label: "AR order 1, first difference, MA order 1", value: "true" },
            { label: "AR order 1, MA order 2", value: "false" },
            { label: "No differencing", value: "false" },
            { label: "Only MA(1)", value: "false" }
        ],
        answer: "true",
        solution: "Notation: ARIMA(p,d,q) → AR order p, differencing d, MA order q."
    },
    {
        id: 52,
        question: "Smoothing techniques help in:",
        questionType: "multiple-choice",
        options: [
            { label: "Reducing short-term fluctuations", value: "true" },
            { label: "Increasing noise", value: "false" },
            { label: "Generating unit roots", value: "false" },
            { label: "Fitting Poisson models", value: "false" }
        ],
        answer: "true",
        solution: "Smoothing removes random variation to reveal underlying trends."
    },
    {
        id: 53,
        question: "In an AR(2) model, the partial autocorrelation function (PACF) cuts off after:",
        questionType: "multiple-choice",
        options: [
            { label: "Lag 2", value: "true" },
            { label: "Lag 1", value: "false" },
            { label: "Lag 3", value: "false" },
            { label: "Never", value: "false" }
        ],
        answer: "true",
        solution: "PACF of AR(p) series cuts off after lag p."
    },
    {
        id: 54,
        question: "MA(q) models show ACF cutoff at:",
        questionType: "multiple-choice",
        options: [
            { label: "Lag q", value: "true" },
            { label: "Lag 1", value: "false" },
            { label: "Lag q+1", value: "false" },
            { label: "Lag p", value: "false" }
        ],
        answer: "true",
        solution: "ACF of MA(q) series is zero after lag q."
    },
    {
        id: 55,
        question: "Exponential smoothing with parameter α close to 1:",
        questionType: "multiple-choice",
        options: [
            { label: "Gives more weight to recent observations", value: "true" },
            { label: "Gives more weight to older observations", value: "false" },
            { label: "Removes trend completely", value: "false" },
            { label: "Removes seasonality completely", value: "false" }
        ],
        answer: "true",
        solution: "High α makes the forecast more responsive to recent changes."
    },
    {
        id: 56,
        question: "Seasonal ARIMA models are indicated by:",
        questionType: "multiple-choice",
        options: [
            { label: "Adding seasonal terms (P,D,Q)s", value: "true" },
            { label: "Ignoring seasonal patterns", value: "false" },
            { label: "Using only MA terms", value: "false" },
            { label: "Using only AR terms", value: "false" }
        ],
        answer: "true",
        solution: "Seasonal ARIMA includes additional seasonal AR, MA, and differencing components."
    },
    {
        id: 57,
        question: "A time series is weakly stationary if:",
        questionType: "multiple-choice",
        options: [
            { label: "Mean and autocovariance are constant over time", value: "true" },
            { label: "It has a deterministic trend", value: "false" },
            { label: "Variance changes with time", value: "false" },
            { label: "It is cointegrated", value: "false" }
        ],
        answer: "true",
        solution: "Weak stationarity requires constant mean and autocovariance, but not distribution shape."
    },
    {
        id: 58,
        question: "Forecast accuracy can be evaluated using:",
        questionType: "multiple-choice",
        options: [
            { label: "Mean Squared Error (MSE) or Mean Absolute Error (MAE)", value: "true" },
            { label: "Only R-squared", value: "false" },
            { label: "Unit root tests", value: "false" },
            { label: "Lag plots", value: "false" }
        ],
        answer: "true",
        solution: "MSE and MAE measure average forecast error magnitude."
    },
    {
        id: 59,
        question: "Random walks are characterized by:",
        questionType: "multiple-choice",
        options: [
            { label: "Non-stationarity and unit root", value: "true" },
            { label: "Stationarity", value: "false" },
            { label: "AR(2) structure", value: "false" },
            { label: "Deterministic trend only", value: "false" }
        ],
        answer: "true",
        solution: "Random walk: X_t = X_{t-1} + ε_t, variance increases over time."
    },
    {
        id: 60,
        question: "Backtesting of time series forecasts involves:",
        questionType: "multiple-choice",
        options: [
            { label: "Comparing forecasts with actual outcomes", value: "true" },
            { label: "Fitting ARMA models only", value: "false" },
            { label: "Differencing the series", value: "false" },
            { label: "Testing stationarity", value: "false" }
        ],
        answer: "true",
        solution: "Backtesting validates forecast performance against observed data."
    },
    {
        id: 46,
        question: "The backwards difference operator Δ applied to X_t is defined as:",
        questionType: "multiple-choice",
        options: [
            { label: "ΔX_t = X_t - X_{t-1}", value: "true" },
            { label: "ΔX_t = X_{t+1} - X_t", value: "false" },
            { label: "ΔX_t = X_t + X_{t-1}", value: "false" },
            { label: "ΔX_t = X_t / X_{t-1}", value: "false" }
        ],
        answer: "true",
        solution: "The first difference is the current value minus the previous value."
    },
    {
        id: 47,
        question: "Seasonal adjustment in a time series is used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Remove periodic seasonal effects", value: "true" },
            { label: "Increase variance", value: "false" },
            { label: "Change the AR order", value: "false" },
            { label: "Generate cointegration", value: "false" }
        ],
        answer: "true",
        solution: "Seasonal adjustment isolates trend and irregular components by removing seasonality."
    },
    {
        id: 48,
        question: "A unit root in a time series implies:",
        questionType: "multiple-choice",
        options: [
            { label: "Non-stationarity", value: "true" },
            { label: "Stationarity", value: "false" },
            { label: "Deterministic trend only", value: "false" },
            { label: "White noise behavior", value: "false" }
        ],
        answer: "true",
        solution: "Unit root presence makes variance grow over time, causing non-stationarity."
    },
    {
        id: 49,
        question: "The characteristic equation of an AR(p) process is used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Check stationarity", value: "true" },
            { label: "Estimate residuals", value: "false" },
            { label: "Fit MA components", value: "false" },
            { label: "Compute forecasts directly", value: "false" }
        ],
        answer: "true",
        solution: "Stationarity requires roots of the characteristic equation to lie outside the unit circle."
    },
    {
        id: 50,
        question: "Forecasting with ARIMA models involves:",
        questionType: "multiple-choice",
        options: [
            { label: "Accounting for AR, MA, and integration components", value: "true" },
            { label: "Using only moving averages", value: "false" },
            { label: "Ignoring differencing", value: "false" },
            { label: "Fitting only stationary series", value: "false" }
        ],
        answer: "true",
        solution: "ARIMA models include AR(p), MA(q), and differencing I(d) for forecasting."
    },
    {
        id: 51,
        question: "An ARIMA(1,1,1) model has:",
        questionType: "multiple-choice",
        options: [
            { label: "AR order 1, first difference, MA order 1", value: "true" },
            { label: "AR order 1, MA order 2", value: "false" },
            { label: "No differencing", value: "false" },
            { label: "Only MA(1)", value: "false" }
        ],
        answer: "true",
        solution: "Notation: ARIMA(p,d,q) → AR order p, differencing d, MA order q."
    },
    {
        id: 52,
        question: "Smoothing techniques help in:",
        questionType: "multiple-choice",
        options: [
            { label: "Reducing short-term fluctuations", value: "true" },
            { label: "Increasing noise", value: "false" },
            { label: "Generating unit roots", value: "false" },
            { label: "Fitting Poisson models", value: "false" }
        ],
        answer: "true",
        solution: "Smoothing removes random variation to reveal underlying trends."
    },
    {
        id: 53,
        question: "In an AR(2) model, the partial autocorrelation function (PACF) cuts off after:",
        questionType: "multiple-choice",
        options: [
            { label: "Lag 2", value: "true" },
            { label: "Lag 1", value: "false" },
            { label: "Lag 3", value: "false" },
            { label: "Never", value: "false" }
        ],
        answer: "true",
        solution: "PACF of AR(p) series cuts off after lag p."
    },
    {
        id: 54,
        question: "MA(q) models show ACF cutoff at:",
        questionType: "multiple-choice",
        options: [
            { label: "Lag q", value: "true" },
            { label: "Lag 1", value: "false" },
            { label: "Lag q+1", value: "false" },
            { label: "Lag p", value: "false" }
        ],
        answer: "true",
        solution: "ACF of MA(q) series is zero after lag q."
    },
    {
        id: 55,
        question: "Exponential smoothing with parameter α close to 1:",
        questionType: "multiple-choice",
        options: [
            { label: "Gives more weight to recent observations", value: "true" },
            { label: "Gives more weight to older observations", value: "false" },
            { label: "Removes trend completely", value: "false" },
            { label: "Removes seasonality completely", value: "false" }
        ],
        answer: "true",
        solution: "High α makes the forecast more responsive to recent changes."
    },
    {
        id: 56,
        question: "Seasonal ARIMA models are indicated by:",
        questionType: "multiple-choice",
        options: [
            { label: "Adding seasonal terms (P,D,Q)s", value: "true" },
            { label: "Ignoring seasonal patterns", value: "false" },
            { label: "Using only MA terms", value: "false" },
            { label: "Using only AR terms", value: "false" }
        ],
        answer: "true",
        solution: "Seasonal ARIMA includes additional seasonal AR, MA, and differencing components."
    },
    {
        id: 57,
        question: "A time series is weakly stationary if:",
        questionType: "multiple-choice",
        options: [
            { label: "Mean and autocovariance are constant over time", value: "true" },
            { label: "It has a deterministic trend", value: "false" },
            { label: "Variance changes with time", value: "false" },
            { label: "It is cointegrated", value: "false" }
        ],
        answer: "true",
        solution: "Weak stationarity requires constant mean and autocovariance, but not distribution shape."
    },
    {
        id: 58,
        question: "Forecast accuracy can be evaluated using:",
        questionType: "multiple-choice",
        options: [
            { label: "Mean Squared Error (MSE) or Mean Absolute Error (MAE)", value: "true" },
            { label: "Only R-squared", value: "false" },
            { label: "Unit root tests", value: "false" },
            { label: "Lag plots", value: "false" }
        ],
        answer: "true",
        solution: "MSE and MAE measure average forecast error magnitude."
    },
    {
        id: 59,
        question: "Random walks are characterized by:",
        questionType: "multiple-choice",
        options: [
            { label: "Non-stationarity and unit root", value: "true" },
            { label: "Stationarity", value: "false" },
            { label: "AR(2) structure", value: "false" },
            { label: "Deterministic trend only", value: "false" }
        ],
        answer: "true",
        solution: "Random walk: X_t = X_{t-1} + ε_t, variance increases over time."
    },
    {
        id: 60,
        question: "Backtesting of time series forecasts involves:",
        questionType: "multiple-choice",
        options: [
            { label: "Comparing forecasts with actual outcomes", value: "true" },
            { label: "Fitting ARMA models only", value: "false" },
            { label: "Differencing the series", value: "false" },
            { label: "Testing stationarity", value: "false" }
        ],
        answer: "true",
        solution: "Backtesting validates forecast performance against observed data."
    },
    {
        id: 76,
        question: "In a continuous-time Markov process, the holding time in a state is:",
        questionType: "multiple-choice",
        options: [
            { label: "Exponentially distributed", value: "true" },
            { label: "Uniformly distributed", value: "false" },
            { label: "Deterministic", value: "false" },
            { label: "Normally distributed", value: "false" }
        ],
        answer: "true",
        solution: "Continuous-time Markov processes have memoryless exponential waiting times in each state."
    },
    {
        id: 77,
        question: "The Poisson process is a special case of which stochastic process?",
        questionType: "multiple-choice",
        options: [
            { label: "Continuous-time Markov process", value: "true" },
            { label: "Discrete-time AR(1) process", value: "false" },
            { label: "Gaussian process", value: "false" },
            { label: "Random walk with drift", value: "false" }
        ],
        answer: "true",
        solution: "Poisson process is a continuous-time Markov counting process."
    },
    {
        id: 78,
        question: "The expected number of jumps in a Poisson process over interval [0, t] is:",
        questionType: "multiple-choice",
        options: [
            { label: "λt", value: "true" },
            { label: "t/λ", value: "false" },
            { label: "λ", value: "false" },
            { label: "√(λt)", value: "false" }
        ],
        answer: "true",
        solution: "Poisson process with rate λ has mean number of events λt over interval length t."
    },
    {
        id: 79,
        question: "In a discrete-time Markov chain, the sum of transition probabilities from a state is:",
        questionType: "multiple-choice",
        options: [
            { label: "1", value: "true" },
            { label: "0", value: "false" },
            { label: "Equal to number of states", value: "false" },
            { label: "Depends on time", value: "false" }
        ],
        answer: "true",
        solution: "Transition probabilities from a given state form a probability distribution summing to 1."
    },
    {
        id: 80,
        question: "If a Poisson process has rate λ = 3 per hour, the probability of exactly 2 events in 1 hour is:",
        questionType: "multiple-choice",
        options: [
            { label: "3^2 * e^-3 / 2!", value: "true" },
            { label: "e^-3 / 2", value: "false" },
            { label: "2^3 / 3!", value: "false" },
            { label: "3 / 2!", value: "false" }
        ],
        answer: "true",
        solution: "Poisson pmf: P(N=2) = (λ^k e^-λ)/k! = 3^2 e^-3 / 2!."
    },
    {
        id: 81,
        question: "The variance of the number of events in a Poisson process equals:",
        questionType: "multiple-choice",
        options: [
            { label: "Mean number of events", value: "true" },
            { label: "Square of the mean", value: "false" },
            { label: "Zero", value: "false" },
            { label: "Twice the mean", value: "false" }
        ],
        answer: "true",
        solution: "Poisson property: Var(N(t)) = E[N(t)] = λt."
    },
    {
        id: 82,
        question: "A Markov chain is irreducible if:",
        questionType: "multiple-choice",
        options: [
            { label: "Every state can be reached from every other state", value: "true" },
            { label: "Some states are isolated", value: "false" },
            { label: "It has a stationary distribution", value: "false" },
            { label: "It is continuous-time", value: "false" }
        ],
        answer: "true",
        solution: "Irreducibility requires the ability to move between any pair of states, possibly in multiple steps."
    },
    {
        id: 83,
        question: "For a discrete-time Markov chain, the expected number of steps to return to a state is:",
        questionType: "multiple-choice",
        options: [
            { label: "1 / π_i, where π_i is stationary probability", value: "true" },
            { label: "π_i", value: "false" },
            { label: "0", value: "false" },
            { label: "Depends on variance of chain", value: "false" }
        ],
        answer: "true",
        solution: "Expected recurrence time = reciprocal of stationary probability."
    },
    {
        id: 84,
        question: "In a two-state Markov process, the transition rate matrix Q is:",
        questionType: "multiple-choice",
        options: [
            { label: "[[-λ_01, λ_01], [λ_10, -λ_10]]", value: "true" },
            { label: "[[λ_01, λ_10], [λ_10, λ_01]]", value: "false" },
            { label: "[[0,1],[1,0]]", value: "false" },
            { label: "[[λ, -λ], [-λ, λ]]", value: "false" }
        ],
        answer: "true",
        solution: "Q has negative diagonal = sum of outgoing rates; off-diagonal = transition rates."
    },
    {
        id: 85,
        question: "In a duration-dependent process, the transition intensity from state i to j may depend on:",
        questionType: "multiple-choice",
        options: [
            { label: "Time spent in state i", value: "true" },
            { label: "Initial state only", value: "false" },
            { label: "Future states", value: "false" },
            { label: "Stationary distribution", value: "false" }
        ],
        answer: "true",
        solution: "Duration-dependent processes account for age/duration in current state when computing intensities."
    },
    {
        id: 86,
        question: "Kolmogorov backward equations are used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Compute probabilities backward in time", value: "true" },
            { label: "Fit ARIMA models", value: "false" },
            { label: "Simulate Poisson processes", value: "false" },
            { label: "Calculate survival functions", value: "false" }
        ],
        answer: "true",
        solution: "Backward equations relate derivatives of probabilities to transitions from initial states."
    },
    {
        id: 87,
        question: "A Markov chain is periodic if:",
        questionType: "multiple-choice",
        options: [
            { label: "There exists a gcd of return times > 1", value: "true" },
            { label: "All states are transient", value: "false" },
            { label: "Stationary distribution does not exist", value: "false" },
            { label: "It is continuous-time", value: "false" }
        ],
        answer: "true",
        solution: "Periodicity occurs if returns to a state can only happen at multiples of some integer >1."
    },
    {
        id: 88,
        question: "A Poisson process with rate λ has the property that for small Δt:",
        questionType: "multiple-choice",
        options: [
            { label: "P(event in Δt) ≈ λ Δt", value: "true" },
            { label: "P(event in Δt) ≈ Δt^2", value: "false" },
            { label: "P(event in Δt) = 1", value: "false" },
            { label: "No events can occur", value: "false" }
        ],
        answer: "true",
        solution: "By definition, probability of a single event in a tiny interval is λΔt + o(Δt)."
    },
    {
        id: 89,
        question: "In simulation of a continuous-time Markov chain, the next state is determined by:",
        questionType: "multiple-choice",
        options: [
            { label: "Randomly sampling from exponential waiting time and transition probabilities", value: "true" },
            { label: "Solving linear algebra only", value: "false" },
            { label: "Assuming equal probabilities", value: "false" },
            { label: "Ignoring transition intensities", value: "false" }
        ],
        answer: "true",
        solution: "Simulation uses exponential holding times and discrete transitions based on intensities."
    },
    {
        id: 90,
        question: "In a Markov jump process, the number of jumps in [0,t] is:",
        questionType: "multiple-choice",
        options: [
            { label: "Random and depends on intensity", value: "true" },
            { label: "Deterministic", value: "false" },
            { label: "Always zero", value: "false" },
            { label: "Normally distributed", value: "false" }
        ],
        answer: "true",
        solution: "Jumps occur randomly according to transition intensities; number of jumps is stochastic."
    },
    {
        id: 91,
        question: "The survival function S(t) is defined as:",
        questionType: "multiple-choice",
        options: [
            { label: "P(T > t)", value: "true" },
            { label: "P(T ≤ t)", value: "false" },
            { label: "f(t)", value: "false" },
            { label: "Hazard rate at t", value: "false" }
        ],
        answer: "true",
        solution: "The survival function gives the probability that the lifetime exceeds t."
    },
    {
        id: 92,
        question: "The force of mortality μ(t) is related to S(t) by:",
        questionType: "multiple-choice",
        options: [
            { label: "-d/dt ln S(t)", value: "true" },
            { label: "dS/dt", value: "false" },
            { label: "S(t)/t", value: "false" },
            { label: "Integral of S(t)", value: "false" }
        ],
        answer: "true",
        solution: "μ(t) = -d/dt ln S(t), describing instantaneous hazard rate at time t."
    },
    {
        id: 93,
        question: "The curtate future lifetime K_x is:",
        questionType: "multiple-choice",
        options: [
            { label: "Floor of T_x", value: "true" },
            { label: "T_x itself", value: "false" },
            { label: "Expected T_x", value: "false" },
            { label: "Variance of T_x", value: "false" }
        ],
        answer: "true",
        solution: "K_x = ⌊T_x⌋, number of whole years lived beyond age x."
    },
    {
        id: 94,
        question: "The expected curtate future lifetime is related to probabilities by:",
        questionType: "multiple-choice",
        options: [
            { label: "E[K_x] = Σ n p_x", value: "true" },
            { label: "E[K_x] = ∫ μ(t) dt", value: "false" },
            { label: "E[K_x] = 1/p_x", value: "false" },
            { label: "E[K_x] = S(x)", value: "false" }
        ],
        answer: "true",
        solution: "Expected curtate lifetime = sum of probabilities of surviving n years."
    },
    {
        id: 95,
        question: "In the Gompertz law of mortality, the force of mortality μ(x) is:",
        questionType: "multiple-choice",
        options: [
            { label: "B * c^x", value: "true" },
            { label: "A + Bx", value: "false" },
            { label: "ln(x)", value: "false" },
            { label: "1/x", value: "false" }
        ],
        answer: "true",
        solution: "Gompertz: μ(x) = B * c^x, exponential increase of mortality with age."
    },
    {
        id: 96,
        question: "The Makeham law of mortality adds to Gompertz a constant term to account for:",
        questionType: "multiple-choice",
        options: [
            { label: "Age-independent mortality", value: "true" },
            { label: "Infant mortality only", value: "false" },
            { label: "Random shocks", value: "false" },
            { label: "Population growth", value: "false" }
        ],
        answer: "true",
        solution: "Makeham: μ(x) = A + Bc^x, with A capturing age-independent background risk."
    },
    {
        id: 97,
        question: "Kaplan–Meier estimator is used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Estimate survival function with censored data", value: "true" },
            { label: "Compute hazard rate only", value: "false" },
            { label: "Predict future mortality rates", value: "false" },
            { label: "Fit Gompertz law", value: "false" }
        ],
        answer: "true",
        solution: "Kaplan–Meier estimates survival non-parametrically from censored lifetime data."
    },
    {
        id: 98,
        question: "Nelson–Aalen estimator provides an estimate of:",
        questionType: "multiple-choice",
        options: [
            { label: "Cumulative hazard function", value: "true" },
            { label: "Survival function", value: "false" },
            { label: "Mean lifetime", value: "false" },
            { label: "Mortality table", value: "false" }
        ],
        answer: "true",
        solution: "It sums observed events over risk sets to estimate cumulative hazard."
    },
    {
        id: 99,
        question: "In a proportional hazards model, covariates affect the hazard by:",
        questionType: "multiple-choice",
        options: [
            { label: "Multiplicative factor", value: "true" },
            { label: "Additive factor", value: "false" },
            { label: "Exponential of survival", value: "false" },
            { label: "Not at all", value: "false" }
        ],
        answer: "true",
        solution: "Cox model assumes hazard = baseline hazard * exp(βX)."
    },
    {
        id: 100,
        question: "Censoring occurs when:",
        questionType: "multiple-choice",
        options: [
            { label: "Exact lifetime is unknown for some subjects", value: "true" },
            { label: "All lifetimes are observed exactly", value: "false" },
            { label: "Mortality is zero", value: "false" },
            { label: "Only one state is possible", value: "false" }
        ],
        answer: "true",
        solution: "Censoring happens when subjects leave study, die from other causes, or study ends before event."
    },
    {
        id: 101,
        question: "Central exposed to risk at age x is:",
        questionType: "multiple-choice",
        options: [
            { label: "Sum of fractions of year each person was at risk", value: "true" },
            { label: "Number of deaths", value: "false" },
            { label: "Survival probability", value: "false" },
            { label: "Future lifetime", value: "false" }
        ],
        answer: "true",
        solution: "Exposed to risk accounts for partial-year contributions of each subject."
    },
    {
        id: 102,
        question: "Census approximation assumes:",
        questionType: "multiple-choice",
        options: [
            { label: "Deaths occur uniformly during interval", value: "true" },
            { label: "All deaths at start of year", value: "false" },
            { label: "All deaths at end of year", value: "false" },
            { label: "No deaths occur", value: "false" }
        ],
        answer: "true",
        solution: "Census method approximates waiting time for deaths as uniform within interval."
    },
    {
        id: 103,
        question: "Graduation of mortality rates is performed to:",
        questionType: "multiple-choice",
        options: [
            { label: "Smooth crude estimates", value: "true" },
            { label: "Increase variance", value: "false" },
            { label: "Remove older ages", value: "false" },
            { label: "Only for censored data", value: "false" }
        ],
        answer: "true",
        solution: "Graduation reduces random fluctuation to create a smooth mortality curve."
    },
    {
        id: 104,
        question: "Lee–Carter model is used for:",
        questionType: "multiple-choice",
        options: [
            { label: "Mortality forecasting", value: "true" },
            { label: "Estimating hazard rates from censored data", value: "false" },
            { label: "Simulating Poisson processes", value: "false" },
            { label: "ARIMA fitting", value: "false" }
        ],
        answer: "true",
        solution: "Lee–Carter: ln(m_x,t) = α_x + β_x κ_t + ε_x,t for projecting mortality rates over time."
    },
    {
        id: 105,
        question: "Expected future lifetime e_x is approximated from curtate lifetime °e_x by:",
        questionType: "multiple-choice",
        options: [
            { label: "e_x ≈ °e_x + 0.5", value: "true" },
            { label: "e_x = °e_x", value: "false" },
            { label: "e_x ≈ °e_x - 1", value: "false" },
            { label: "e_x ≈ 2 * °e_x", value: "false" }
        ],
        answer: "true",
        solution: "Approximation assumes uniform distribution of deaths within each year of age."
    },
    {
        id: 106,
        question: "Two-state model of single decrement assumes:",
        questionType: "multiple-choice",
        options: [
            { label: "Individual is either alive or dead", value: "true" },
            { label: "Individual can be in multiple health states", value: "false" },
            { label: "Deaths occur in fixed intervals only", value: "false" },
            { label: "Hazard rate is zero", value: "false" }
        ],
        answer: "true",
        solution: "Single decrement model simplifies life to alive/dead states for actuarial calculations."
    },
    {
        id: 107,
        question: "Maximum likelihood estimation for transition intensities requires:",
        questionType: "multiple-choice",
        options: [
            { label: "Observed waiting times and number of transitions", value: "true" },
            { label: "Only total deaths", value: "false" },
            { label: "Exact future lifetimes", value: "false" },
            { label: "Only exposed to risk", value: "false" }
        ],
        answer: "true",
        solution: "MLE uses observed durations in each state and counts of transitions to estimate rates."
    },
    {
        id: 108,
        question: "Poisson approximation in survival analysis is used when:",
        questionType: "multiple-choice",
        options: [
            { label: "Events are rare and independent", value: "true" },
            { label: "All events occur simultaneously", value: "false" },
            { label: "Exposures are infinite", value: "false" },
            { label: "Censoring is ignored", value: "false" }
        ],
        answer: "true",
        solution: "For rare events, counts of events follow approximately a Poisson distribution."
    },
    {
        id: 109,
        question: "Rate interval in census approximation refers to:",
        questionType: "multiple-choice",
        options: [
            { label: "Length of time over which rates are assumed constant", value: "true" },
            { label: "Exposed to risk for a single person", value: "false" },
            { label: "Observed deaths only", value: "false" },
            { label: "Time until censoring", value: "false" }
        ],
        answer: "true",
        solution: "Within a rate interval, transition intensities are assumed constant for calculation."
    },
    {
        id: 110,
        question: "Graduation by spline functions has the advantage of:",
        questionType: "multiple-choice",
        options: [
            { label: "Flexibly smoothing data while maintaining local shape", value: "true" },
            { label: "Reducing variance to zero", value: "false" },
            { label: "Removing all biases", value: "false" },
            { label: "Eliminating censoring", value: "false" }
        ],
        answer: "true",
        solution: "Splines create smooth curves adapting locally to the data shape."
    },
    {
        id: 111,
        question: "Comparison of crude and graduated mortality rates tests for:",
        questionType: "multiple-choice",
        options: [
            { label: "Overall fit and consistency of shape", value: "true" },
            { label: "Only variance reduction", value: "false" },
            { label: "Survival beyond last age only", value: "false" },
            { label: "Censoring presence only", value: "false" }
        ],
        answer: "true",
        solution: "Tests compare crude and graduated rates for bias and smoothness."
    },
    {
        id: 112,
        question: "In graduation, a parametric formula method:",
        questionType: "multiple-choice",
        options: [
            { label: "Assumes a functional form for mortality rates", value: "true" },
            { label: "Does not assume any form", value: "false" },
            { label: "Is only for censored data", value: "false" },
            { label: "Removes all variance", value: "false" }
        ],
        answer: "true",
        solution: "Parametric graduation fits a chosen mathematical formula to crude rates."
    },
    {
        id: 113,
        question: "Extrapolation approach to mortality forecasting assumes:",
        questionType: "multiple-choice",
        options: [
            { label: "Past trends continue into future", value: "true" },
            { label: "Mortality is constant", value: "false" },
            { label: "Mortality is random only", value: "false" },
            { label: "Covariates are ignored completely", value: "false" }
        ],
        answer: "true",
        solution: "Extrapolation projects historical mortality rates forward."
    },
    {
        id: 114,
        question: "Lee–Carter κ_t parameter represents:",
        questionType: "multiple-choice",
        options: [
            { label: "Time-varying mortality index", value: "true" },
            { label: "Age-specific constant", value: "false" },
            { label: "Cohort effect", value: "false" },
            { label: "Variance of survival", value: "false" }
        ],
        answer: "true",
        solution: "κ_t captures overall level of mortality changes over time in the model."
    },
    {
        id: 115,
        question: "Age-period-cohort models include:",
        questionType: "multiple-choice",
        options: [
            { label: "Effects of age, calendar period, and birth cohort", value: "true" },
            { label: "Only age effect", value: "false" },
            { label: "Only period effect", value: "false" },
            { label: "Only cohort effect", value: "false" }
        ],
        answer: "true",
        solution: "APC models separate trends by age, period, and cohort to capture demographic patterns."
    },
    {
        id: 116,
        question: "In presence of duplicate policies, graduation tests should:",
        questionType: "multiple-choice",
        options: [
            { label: "Adjust for duplicated exposure", value: "true" },
            { label: "Ignore duplicates", value: "false" },
            { label: "Double the rates", value: "false" },
            { label: "Set all duplicates to zero", value: "false" }
        ],
        answer: "true",
        solution: "Duplicate policies affect exposed-to-risk; tests must account for this."
    },
    {
        id: 117,
        question: "Central exposed to risk is needed to:",
        questionType: "multiple-choice",
        options: [
            { label: "Calculate mortality rates", value: "true" },
            { label: "Estimate survival function only", value: "false" },
            { label: "Fit parametric models only", value: "false" },
            { label: "Forecast κ_t", value: "false" }
        ],
        answer: "true",
        solution: "Mortality rates are deaths divided by central exposed to risk."
    },
    {
        id: 118,
        question: "Partial likelihood in Cox model allows estimation of:",
        questionType: "multiple-choice",
        options: [
            { label: "Regression coefficients without baseline hazard", value: "true" },
            { label: "Survival function directly", value: "false" },
            { label: "Exposed-to-risk only", value: "false" },
            { label: "Hazard for censored individuals only", value: "false" }
        ],
        answer: "true",
        solution: "Partial likelihood focuses on ordering of events to estimate β parameters."
    },
    {
        id: 119,
        question: "Cox model assumes proportional hazards, meaning:",
        questionType: "multiple-choice",
        options: [
            { label: "Hazard ratios between individuals are constant over time", value: "true" },
            { label: "Hazard itself is constant", value: "false" },
            { label: "Survival functions are identical", value: "false" },
            { label: "Events occur at fixed intervals", value: "false" }
        ],
        answer: "true",
        solution: "Proportional hazards assumption: ratio of hazards for two covariate sets is constant."
    },
    {
        id: 120,
        question: "Variance of Kaplan–Meier estimator is estimated by:",
        questionType: "multiple-choice",
        options: [
            { label: "Greenwood formula", value: "true" },
            { label: "Cox regression", value: "false" },
            { label: "Poisson approximation", value: "false" },
            { label: "Lee–Carter method", value: "false" }
        ],
        answer: "true",
        solution: "Greenwood’s formula sums contributions from each event time to estimate variance."
    },
    {
        id: 121,
        question: "Bias-variance trade-off occurs because:",
        questionType: "multiple-choice",
        options: [
            { label: "Increasing model complexity reduces bias but increases variance", value: "true" },
            { label: "Increasing model complexity reduces both bias and variance", value: "false" },
            { label: "Simpler models always have lower variance", value: "false" },
            { label: "Bias and variance are unrelated", value: "false" }
        ],
        answer: "true",
        solution: "Complex models fit data better (low bias) but are sensitive to fluctuations (high variance)."
    },
    {
        id: 122,
        question: "Cross-validation is used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Estimate model performance on unseen data", value: "true" },
            { label: "Maximise training set fit", value: "false" },
            { label: "Compute partial derivatives", value: "false" },
            { label: "Regularise coefficients directly", value: "false" }
        ],
        answer: "true",
        solution: "Cross-validation splits data into folds to estimate generalisation performance."
    },
    {
        id: 123,
        question: "Regularisation helps prevent overfitting by:",
        questionType: "multiple-choice",
        options: [
            { label: "Penalising large parameter values", value: "true" },
            { label: "Increasing model complexity", value: "false" },
            { label: "Removing all bias", value: "false" },
            { label: "Ignoring training data", value: "false" }
        ],
        answer: "true",
        solution: "Regularisation (L1/L2) discourages overly complex models that fit noise."
    },
    {
        id: 124,
        question: "Precision measures:",
        questionType: "multiple-choice",
        options: [
            { label: "Proportion of positive predictions that are correct", value: "true" },
            { label: "Proportion of actual positives correctly identified", value: "false" },
            { label: "Overall classification accuracy", value: "false" },
            { label: "Average loss", value: "false" }
        ],
        answer: "true",
        solution: "Precision = TP / (TP + FP), focused on correctness of positive predictions."
    },
    {
        id: 125,
        question: "Recall measures:",
        questionType: "multiple-choice",
        options: [
            { label: "Proportion of actual positives correctly identified", value: "true" },
            { label: "Proportion of positive predictions correct", value: "false" },
            { label: "Model complexity", value: "false" },
            { label: "Total number of predictions", value: "false" }
        ],
        answer: "true",
        solution: "Recall = TP / (TP + FN), focused on capturing all true positives."
    },
    {
        id: 126,
        question: "F1 score is:",
        questionType: "multiple-choice",
        options: [
            { label: "Harmonic mean of precision and recall", value: "true" },
            { label: "Average of accuracy and recall", value: "false" },
            { label: "Difference between precision and recall", value: "false" },
            { label: "Variance of predictions", value: "false" }
        ],
        answer: "true",
        solution: "F1 = 2 * (precision * recall) / (precision + recall) balances precision and recall."
    },
    {
        id: 127,
        question: "ROC curve plots:",
        questionType: "multiple-choice",
        options: [
            { label: "True positive rate vs false positive rate", value: "true" },
            { label: "Precision vs recall", value: "false" },
            { label: "Accuracy vs model complexity", value: "false" },
            { label: "Bias vs variance", value: "false" }
        ],
        answer: "true",
        solution: "ROC curve visualises trade-off between sensitivity (TPR) and specificity (1-FPR)."
    },
    {
        id: 128,
        question: "Unsupervised learning is used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Identify structure in unlabeled data", value: "true" },
            { label: "Predict target values", value: "false" },
            { label: "Compute gradient descent", value: "false" },
            { label: "Perform cross-validation", value: "false" }
        ],
        answer: "true",
        solution: "Unsupervised methods like PCA and K-means explore latent structures without labels."
    },
    {
        id: 129,
        question: "Principal Component Analysis (PCA) is used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Reduce dimensionality while retaining variance", value: "true" },
            { label: "Increase number of features", value: "false" },
            { label: "Supervise classification", value: "false" },
            { label: "Regularise models", value: "false" }
        ],
        answer: "true",
        solution: "PCA projects data onto orthogonal axes capturing maximal variance."
    },
    {
        id: 130,
        question: "K-means clustering aims to:",
        questionType: "multiple-choice",
        options: [
            { label: "Partition data into k clusters minimizing within-cluster distance", value: "true" },
            { label: "Supervise regression tasks", value: "false" },
            { label: "Maximise feature variance", value: "false" },
            { label: "Estimate hazard rates", value: "false" }
        ],
        answer: "true",
        solution: "K-means assigns points to nearest cluster centroid iteratively to minimize variance."
    },
    {
        id: 131,
        question: "Overfitting occurs when:",
        questionType: "multiple-choice",
        options: [
            { label: "Model fits training data well but fails on unseen data", value: "true" },
            { label: "Training error is high", value: "false" },
            { label: "Model has low complexity", value: "false" },
            { label: "Cross-validation error is minimal", value: "false" }
        ],
        answer: "true",
        solution: "Overfitting happens when model captures noise, not underlying pattern."
    },
    {
        id: 132,
        question: "Hyperparameters are:",
        questionType: "multiple-choice",
        options: [
            { label: "Parameters set before training that control model behaviour", value: "true" },
            { label: "Weights learned during training", value: "false" },
            { label: "Outputs of predictions", value: "false" },
            { label: "Censoring adjustments", value: "false" }
        ],
        answer: "true",
        solution: "Hyperparameters like regularisation strength or tree depth are configured before learning."
    },
    {
        id: 133,
        question: "Supervised learning tasks include:",
        questionType: "multiple-choice",
        options: [
            { label: "Regression and classification", value: "true" },
            { label: "Clustering only", value: "false" },
            { label: "PCA only", value: "false" },
            { label: "Data smoothing only", value: "false" }
        ],
        answer: "true",
        solution: "Supervised learning predicts labels or values from input features."
    },
    {
        id: 134,
        question: "Confusion matrix contains:",
        questionType: "multiple-choice",
        options: [
            { label: "TP, FP, TN, FN counts", value: "true" },
            { label: "Means and variances", value: "false" },
            { label: "Hyperparameters", value: "false" },
            { label: "Principal components", value: "false" }
        ],
        answer: "true",
        solution: "Confusion matrix summarises model predictions vs actual outcomes."
    },
    {
        id: 135,
        question: "Regularisation types include:",
        questionType: "multiple-choice",
        options: [
            { label: "L1 (Lasso) and L2 (Ridge)", value: "true" },
            { label: "Only L3", value: "false" },
            { label: "Bootstrap and Jackknife", value: "false" },
            { label: "PCA and ICA", value: "false" }
        ],
        answer: "true",
        solution: "L1 penalises absolute weights, L2 penalises squared weights to control overfitting."
    },
    {
        id: 136,
        question: "L1 regularisation can lead to:",
        questionType: "multiple-choice",
        options: [
            { label: "Sparse solutions (some coefficients exactly zero)", value: "true" },
            { label: "All coefficients increasing", value: "false" },
            { label: "No change in weights", value: "false" },
            { label: "Overfitting always", value: "false" }
        ],
        answer: "true",
        solution: "L1 penalises absolute values, which can shrink some coefficients to zero."
    },
    {
        id: 137,
        question: "L2 regularisation primarily:",
        questionType: "multiple-choice",
        options: [
            { label: "Reduces large coefficients smoothly", value: "true" },
            { label: "Sets coefficients exactly to zero", value: "false" },
            { label: "Removes bias completely", value: "false" },
            { label: "Changes target values", value: "false" }
        ],
        answer: "true",
        solution: "L2 penalises squared weights, shrinking them but rarely to zero."
    },
    {
        id: 138,
        question: "K-fold cross-validation splits data into:",
        questionType: "multiple-choice",
        options: [
            { label: "K subsets, trains on K-1 and validates on 1", value: "true" },
            { label: "Only one training and one test set", value: "false" },
            { label: "K models without validation", value: "false" },
            { label: "Random subsamples with replacement", value: "false" }
        ],
        answer: "true",
        solution: "Each fold is used once for validation, the rest for training, averaged over K folds."
    },
    {
        id: 139,
        question: "Supervised learning requires:",
        questionType: "multiple-choice",
        options: [
            { label: "Input features and labeled outputs", value: "true" },
            { label: "Only input features", value: "false" },
            { label: "Only output labels", value: "false" },
            { label: "No data at all", value: "false" }
        ],
        answer: "true",
        solution: "Supervised learning learns a mapping from inputs to outputs using labeled data."
    },
    {
        id: 140,
        question: "Overfitting can be detected by:",
        questionType: "multiple-choice",
        options: [
            { label: "High training accuracy but low validation accuracy", value: "true" },
            { label: "Low training and validation error", value: "false" },
            { label: "High bias and high variance", value: "false" },
            { label: "Random noise in predictions", value: "false" }
        ],
        answer: "true",
        solution: "Overfitting occurs when the model performs well on training but poorly on new data."
    },
    {
        id: 141,
        question: "Gradient descent is used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Minimise a loss function by iteratively updating parameters", value: "true" },
            { label: "Maximise bias directly", value: "false" },
            { label: "Partition data", value: "false" },
            { label: "Compute precision and recall", value: "false" }
        ],
        answer: "true",
        solution: "Gradient descent updates weights in the direction opposite to the gradient of the loss."
    },
    {
        id: 142,
        question: "Early stopping prevents overfitting by:",
        questionType: "multiple-choice",
        options: [
            { label: "Halting training when validation error increases", value: "true" },
            { label: "Training indefinitely", value: "false" },
            { label: "Increasing model complexity", value: "false" },
            { label: "Adding noise to the inputs", value: "false" }
        ],
        answer: "true",
        solution: "Early stopping stops training once validation performance starts to degrade."
    },
    {
        id: 143,
        question: "Unsupervised learning can be used for:",
        questionType: "multiple-choice",
        options: [
            { label: "Detecting clusters and anomalies", value: "true" },
            { label: "Predicting labels directly", value: "false" },
            { label: "Training neural networks for regression", value: "false" },
            { label: "Hyperparameter tuning", value: "false" }
        ],
        answer: "true",
        solution: "Without labels, unsupervised learning finds patterns or groups in data."
    },
    {
        id: 144,
        question: "PCA transforms data into:",
        questionType: "multiple-choice",
        options: [
            { label: "Orthogonal components that capture maximal variance", value: "true" },
            { label: "Correlated variables with higher dimensionality", value: "false" },
            { label: "Labels for classification", value: "false" },
            { label: "Random features", value: "false" }
        ],
        answer: "true",
        solution: "PCA reduces dimensionality by projecting onto uncorrelated principal components."
    },
    {
        id: 145,
        question: "K-means clustering objective is to:",
        questionType: "multiple-choice",
        options: [
            { label: "Minimise sum of squared distances within clusters", value: "true" },
            { label: "Maximise inter-cluster similarity", value: "false" },
            { label: "Predict regression targets", value: "false" },
            { label: "Compute hazard rates", value: "false" }
        ],
        answer: "true",
        solution: "K-means partitions data to minimise variance within clusters."
    },
    {
        id: 146,
        question: "The curse of dimensionality refers to:",
        questionType: "multiple-choice",
        options: [
            { label: "Problems caused by high-dimensional feature spaces", value: "true" },
            { label: "Overfitting in simple models", value: "false" },
            { label: "Low variance in predictions", value: "false" },
            { label: "Absence of noise in data", value: "false" }
        ],
        answer: "true",
        solution: "High dimensions make distance measures less meaningful and increase model complexity."
    },
    {
        id: 147,
        question: "Regularisation reduces overfitting by:",
        questionType: "multiple-choice",
        options: [
            { label: "Adding a penalty to the loss function", value: "true" },
            { label: "Increasing learning rate", value: "false" },
            { label: "Reducing training data", value: "false" },
            { label: "Ignoring validation error", value: "false" }
        ],
        answer: "true",
        solution: "Penalty discourages extreme parameter values, simplifying the model."
    },
    {
        id: 148,
        question: "Cross-validation can be used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Tune hyperparameters to improve generalisation", value: "true" },
            { label: "Compute exact test error without data", value: "false" },
            { label: "Replace training entirely", value: "false" },
            { label: "Remove bias automatically", value: "false" }
        ],
        answer: "true",
        solution: "Cross-validation helps choose hyperparameters that generalise well."
    },
    {
        id: 149,
        question: "Confusion matrix is used to:",
        questionType: "multiple-choice",
        options: [
            { label: "Visualise classification performance", value: "true" },
            { label: "Reduce dimensionality", value: "false" },
            { label: "Compute PCA components", value: "false" },
            { label: "Regularise models", value: "false" }
        ],
        answer: "true",
        solution: "Shows TP, FP, TN, FN to evaluate classifiers."
    },
    {
        id: 150,
        question: "F1 score is preferred over accuracy when:",
        questionType: "multiple-choice",
        options: [
            { label: "Classes are imbalanced", value: "true" },
            { label: "Data is noise-free", value: "false" },
            { label: "All classes have equal frequency", value: "false" },
            { label: "Hyperparameters are unknown", value: "false" }
        ],
        answer: "true",
        solution: "F1 balances precision and recall, important when positives are rare."
    },
    
];
