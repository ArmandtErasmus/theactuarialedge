// Actuarial Statistics Practice Questions Data
const questions = [
    
    {
        "id": 1,
        "question": "Which of the following best describes the primary aim of descriptive data analysis?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "To summarize and present key features of a dataset", "value": "true" },
            { "label": "To estimate unknown population parameters", "value": "false" },
            { "label": "To test a statistical hypothesis", "value": "false" },
            { "label": "To predict future outcomes", "value": "false" }
        ],
        "answer": "true",
        "solution": "Descriptive analysis focuses on summarising and describing the main characteristics of a dataset using statistics and visualisations."
    },
    {
        "id": 2,
        "question": "Which of the following activities is most closely associated with inferential data analysis?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Estimating population parameters from sample data", "value": "true" },
            { "label": "Constructing histograms and boxplots", "value": "false" },
            { "label": "Cleaning missing observations", "value": "false" },
            { "label": "Sorting raw data into ascending order", "value": "false" }
        ],
        "answer": "true",
        "solution": "Inferential analysis draws conclusions about a population based on a sample, such as estimating parameters or testing hypotheses."
    },
    {
        "id": 3,
        "question": "Which of the following is an example of predictive data analysis?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Using past sales data to forecast future revenue", "value": "true" },
            { "label": "Calculating the mean of historical profits", "value": "false" },
            { "label": "Constructing a scatter plot", "value": "false" },
            { "label": "Computing a correlation coefficient", "value": "false" }
        ],
        "answer": "true",
        "solution": "Predictive analysis uses historical data to make predictions about future outcomes."
    },
    {
        "id": 4,
        "question": "Which stage of data analysis primarily focuses on detecting patterns, anomalies and relationships?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Exploratory data analysis", "value": "true" },
            { "label": "Data collection", "value": "false" },
            { "label": "Model deployment", "value": "false" },
            { "label": "Result communication", "value": "false" }
        ],
        "answer": "true",
        "solution": "Exploratory data analysis (EDA) involves visualisations and summary statistics to explore structure and relationships in the data."
    },
    {
        "id": 5,
        "question": "Which of the following tools is most appropriate for visualising the distribution of a single continuous variable?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Histogram", "value": "true" },
            { "label": "Scatter plot", "value": "false" },
            { "label": "Bar chart", "value": "false" },
            { "label": "Line chart", "value": "false" }
        ],
        "answer": "true",
        "solution": "A histogram displays the frequency distribution of a continuous variable."
    },
    {
        "id": 6,
        "question": "Which of the following is a robust measure of central tendency?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Median", "value": "true" },
            { "label": "Mean", "value": "false" },
            { "label": "Variance", "value": "false" },
            { "label": "Range", "value": "false" }
        ],
        "answer": "true",
        "solution": "The median is robust because it is not sensitive to extreme values or outliers."
    },
    {
        "id": 7,
        "question": "Which statistic measures the spread of data around its mean?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Variance", "value": "true" },
            { "label": "Median", "value": "false" },
            { "label": "Skewness", "value": "false" },
            { "label": "Kurtosis", "value": "false" }
        ],
        "answer": "true",
        "solution": "Variance measures the average squared deviation from the mean."
    },
    {
        "id": 8,
        "question": "Which of the following correlation measures assesses linear association between two variables?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Pearson's correlation coefficient", "value": "true" },
            { "label": "Spearman's rank correlation", "value": "false" },
            { "label": "Kendall's tau", "value": "false" },
            { "label": "Chi-square statistic", "value": "false" }
        ],
        "answer": "true",
        "solution": "Pearson’s correlation measures the strength of linear association between two continuous variables."
    },
    {
        "id": 9,
        "question": "Which correlation measure is based on ranked data?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Spearman's rank correlation", "value": "true" },
            { "label": "Pearson's correlation", "value": "false" },
            { "label": "Covariance", "value": "false" },
            { "label": "Regression coefficient", "value": "false" }
        ],
        "answer": "true",
        "solution": "Spearman’s correlation uses the ranks of the data rather than the raw values."
    },
    {
        "id": 10,
        "question": "Which of the following best describes the purpose of principal component analysis (PCA)?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "To reduce dimensionality while retaining most variability", "value": "true" },
            { "label": "To estimate regression coefficients", "value": "false" },
            { "label": "To test model assumptions", "value": "false" },
            { "label": "To compute correlation coefficients", "value": "false" }
        ],
        "answer": "true",
        "solution": "PCA transforms correlated variables into a smaller number of uncorrelated components capturing most of the variance."
    },
    {
        "id": 11,
        "question": "Which of the following best describes the meaning of reproducible research?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Ensuring that the same results can be obtained using the same data and analysis steps", "value": "true" },
            { "label": "Using multiple datasets to confirm conclusions", "value": "false" },
            { "label": "Repeating an experiment many times", "value": "false" },
            { "label": "Collecting data from different sources", "value": "false" }
        ],
        "answer": "true",
        "solution": "Reproducible research ensures that independent analysts can obtain the same results when given the same data and methods."
    },
    {
        "id": 12,
        "question": "Which of the following is an essential element of reproducible data analysis?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Documenting code, data sources and analysis procedures", "value": "true" },
            { "label": "Using proprietary software only", "value": "false" },
            { "label": "Deleting intermediate results", "value": "false" },
            { "label": "Avoiding automation", "value": "false" }
        ],
        "answer": "true",
        "solution": "Clear documentation of data, code and methodology is fundamental to reproducibility."
    },
    {
        "id": 13,
        "question": "Which of the following best describes extremely large data sets?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Datasets whose size or complexity exceeds the capabilities of traditional data-processing tools", "value": "true" },
            { "label": "Any dataset with more than 1,000 observations", "value": "false" },
            { "label": "Only datasets stored in cloud systems", "value": "false" },
            { "label": "Datasets without missing values", "value": "false" }
        ],
        "answer": "true",
        "solution": "Extremely large datasets require specialised storage, processing and analytical techniques."
    },
    {
        "id": 14,
        "question": "Which summary statistic is most appropriate for describing skewed income data?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Median", "value": "true" },
            { "label": "Mean", "value": "false" },
            { "label": "Variance", "value": "false" },
            { "label": "Range", "value": "false" }
        ],
        "answer": "true",
        "solution": "The median is resistant to extreme values and better represents central tendency for skewed distributions."
    },
    {
        "id": 15,
        "question": "Which plot is most useful for identifying potential outliers?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Boxplot", "value": "true" },
            { "label": "Histogram", "value": "false" },
            { "label": "Scatter plot", "value": "false" },
            { "label": "Bar chart", "value": "false" }
        ],
        "answer": "true",
        "solution": "Boxplots display quartiles and highlight potential outliers using fences."
    },
    {
        "id": 16,
        "question": "Which statistic measures monotonic association between two variables?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Spearman's rank correlation", "value": "true" },
            { "label": "Pearson's correlation", "value": "false" },
            { "label": "Variance", "value": "false" },
            { "label": "Standard deviation", "value": "false" }
        ],
        "answer": "true",
        "solution": "Spearman’s correlation captures monotonic relationships even when the relationship is not linear."
    },
    {
        "id": 17,
        "question": "Which statement about Kendall’s tau is correct?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "It measures ordinal association based on concordant and discordant pairs", "value": "true" },
            { "label": "It measures only linear dependence", "value": "false" },
            { "label": "It requires normally distributed variables", "value": "false" },
            { "label": "It is identical to Pearson's correlation", "value": "false" }
        ],
        "answer": "true",
        "solution": "Kendall’s tau quantifies ordinal association using the proportion of concordant and discordant pairs."
    },
    {
        "id": 18,
        "question": "Which of the following is true about the first principal component in PCA?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "It explains the maximum possible variance in the data", "value": "true" },
            { "label": "It is always aligned with the original axes", "value": "false" },
            { "label": "It minimizes the total variance", "value": "false" },
            { "label": "It is chosen arbitrarily", "value": "false" }
        ],
        "answer": "true",
        "solution": "The first principal component is the linear combination of variables capturing the greatest variance."
    },
    {
        "id": 19,
        "question": "Which of the following is an appropriate tool for bivariate data visualisation?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Scatter plot", "value": "true" },
            { "label": "Histogram", "value": "false" },
            { "label": "Boxplot of a single variable", "value": "false" },
            { "label": "Pie chart", "value": "false" }
        ],
        "answer": "true",
        "solution": "Scatter plots visualise relationships between two quantitative variables."
    },
    {
        "id": 20,
        "question": "Which of the following is a key benefit of data visualisation?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "It reveals patterns and relationships not obvious from raw numbers", "value": "true" },
            { "label": "It replaces statistical inference", "value": "false" },
            { "label": "It eliminates the need for models", "value": "false" },
            { "label": "It guarantees causation", "value": "false" }
        ],
        "answer": "true",
        "solution": "Visualisation aids understanding by revealing structure, trends and anomalies."
    },
    {
        "id": 21,
        "question": "Which of the following best describes the role of data cleaning?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Identifying and correcting errors, missing values and inconsistencies", "value": "true" },
            { "label": "Selecting a statistical model", "value": "false" },
            { "label": "Performing hypothesis tests", "value": "false" },
            { "label": "Visualising regression results", "value": "false" }
        ],
        "answer": "true",
        "solution": "Data cleaning improves data quality and reliability of subsequent analysis."
    },
    {
        "id": 22,
        "question": "Which of the following best describes the function of summary statistics?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "To condense large datasets into key numerical descriptors", "value": "true" },
            { "label": "To replace raw data", "value": "false" },
            { "label": "To guarantee accurate predictions", "value": "false" },
            { "label": "To remove variability", "value": "false" }
        ],
        "answer": "true",
        "solution": "Summary statistics provide concise numerical information about location, spread and shape of data."
    },
    {
        "id": 23,
        "question": "Which of the following best describes the interquartile range (IQR)?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "The difference between the third and first quartiles", "value": "true" },
            { "label": "The difference between maximum and minimum values", "value": "false" },
            { "label": "The average of squared deviations from the mean", "value": "false" },
            { "label": "The median of the dataset", "value": "false" }
        ],
        "answer": "true",
        "solution": "The IQR measures the spread of the middle 50% of the data."
    },
    {
        "id": 24,
        "question": "Which of the following is true about correlation?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Correlation does not imply causation", "value": "true" },
            { "label": "Correlation always implies causation", "value": "false" },
            { "label": "Zero correlation means independence", "value": "false" },
            { "label": "Correlation can exceed 1 in magnitude", "value": "false" }
        ],
        "answer": "true",
        "solution": "Correlation measures association, not causality, and lies between -1 and 1."
    },
    {
        "id": 25,
        "question": "Which of the following best summarises the purpose of the entire data analysis process?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "To extract meaningful insights and support decision-making from data", "value": "true" },
            { "label": "To maximise sample size", "value": "false" },
            { "label": "To eliminate uncertainty", "value": "false" },
            { "label": "To replace subject matter expertise", "value": "false" }
        ],
        "answer": "true",
        "solution": "Data analysis transforms raw data into actionable insights for informed decisions."
    },
    {
        "id": 26,
        "question": "Which of the following is a property of a geometric distribution with success probability p?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "It is memoryless", "value": "true" },
            { "label": "Its mean is equal to its variance", "value": "false" },
            { "label": "It is symmetric", "value": "false" },
            { "label": "It is continuous", "value": "false" }
        ],
        "answer": "true",
        "solution": "The geometric distribution satisfies the memoryless property: P(X > m+n | X > m) = P(X > n)."
    },
    {
        "id": 27,
        "question": "Which of the following best describes a binomial random variable?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Number of successes in a fixed number of independent Bernoulli trials", "value": "true" },
            { "label": "Time until the first success", "value": "false" },
            { "label": "Number of failures before the r-th success", "value": "false" },
            { "label": "Number of events occurring in continuous time", "value": "false" }
        ],
        "answer": "true",
        "solution": "A binomial random variable counts the number of successes in n independent trials with success probability p."
    },
    {
        "id": 28,
        "question": "Which of the following is the variance of a Binomial(n, p) distribution?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "np(1 - p)", "value": "true" },
            { "label": "np", "value": "false" },
            { "label": "p(1 - p)", "value": "false" },
            { "label": "n^2p(1 - p)", "value": "false" }
        ],
        "answer": "true",
        "solution": "For X ~ Bin(n, p), E[X] = np and Var(X) = np(1 - p)."
    },
    {
        "id": 29,
        "question": "Which distribution models the number of failures before the r-th success?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Negative binomial distribution", "value": "true" },
            { "label": "Binomial distribution", "value": "false" },
            { "label": "Geometric distribution", "value": "false" },
            { "label": "Hypergeometric distribution", "value": "false" }
        ],
        "answer": "true",
        "solution": "The negative binomial distribution counts the number of failures before achieving a fixed number of successes."
    },
    {
        "id": 30,
        "question": "Which of the following distinguishes the hypergeometric distribution from the binomial distribution?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Sampling is without replacement", "value": "true" },
            { "label": "Trials are independent", "value": "false" },
            { "label": "Population is infinite", "value": "false" },
            { "label": "Number of trials is random", "value": "false" }
        ],
        "answer": "true",
        "solution": "The hypergeometric distribution models sampling without replacement from a finite population."
    },
    {
        "id": 31,
        "question": "Which of the following is a property of the Poisson distribution with parameter λ?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Mean equals variance", "value": "true" },
            { "label": "It is symmetric for all λ", "value": "false" },
            { "label": "It has finite support", "value": "false" },
            { "label": "It is continuous", "value": "false" }
        ],
        "answer": "true",
        "solution": "For X ~ Poisson(λ), E[X] = Var(X) = λ."
    },
    {
        "id": 32,
        "question": "Which continuous distribution is memoryless?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Exponential distribution", "value": "true" },
            { "label": "Gamma distribution", "value": "false" },
            { "label": "Normal distribution", "value": "false" },
            { "label": "Uniform distribution", "value": "false" }
        ],
        "answer": "true",
        "solution": "The exponential distribution satisfies the memoryless property: P(X > s+t | X > s) = P(X > t)."
    },
    {
        "id": 33,
        "question": "Which distribution is the sum of k independent exponential random variables with common rate?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Gamma distribution", "value": "true" },
            { "label": "Normal distribution", "value": "false" },
            { "label": "Chi-square distribution", "value": "false" },
            { "label": "Beta distribution", "value": "false" }
        ],
        "answer": "true",
        "solution": "A gamma distribution arises as the sum of k independent exponential random variables."
    },
    {
        "id": 34,
        "question": "Which of the following is a property of the normal distribution?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "It is symmetric about its mean", "value": "true" },
            { "label": "It has finite support", "value": "false" },
            { "label": "It is skewed for all parameter values", "value": "false" },
            { "label": "Mean equals variance", "value": "false" }
        ],
        "answer": "true",
        "solution": "The normal distribution is symmetric about its mean μ."
    },
    {
        "id": 35,
        "question": "Which distribution has support on the interval (0, 1)?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Beta distribution", "value": "true" },
            { "label": "Gamma distribution", "value": "false" },
            { "label": "Exponential distribution", "value": "false" },
            { "label": "Chi-square distribution", "value": "false" }
        ],
        "answer": "true",
        "solution": "The beta distribution is defined on the interval (0,1)."
    },
    {
        "id": 36,
        "question": "Which distribution describes the waiting time until the k-th event in a Poisson process?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Gamma distribution", "value": "true" },
            { "label": "Exponential distribution", "value": "false" },
            { "label": "Normal distribution", "value": "false" },
            { "label": "Uniform distribution", "value": "false" }
        ],
        "answer": "true",
        "solution": "The waiting time to the k-th arrival in a Poisson process follows a gamma distribution."
    },
    {
        "id": 37,
        "question": "Which of the following best describes a Poisson process?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Events occur independently at a constant average rate", "value": "true" },
            { "label": "Events occur at increasing rates", "value": "false" },
            { "label": "Events occur in fixed batches", "value": "false" },
            { "label": "Events depend on previous occurrences", "value": "false" }
        ],
        "answer": "true",
        "solution": "A Poisson process assumes independent events occurring at a constant rate λ over time."
    },
    {
        "id": 38,
        "question": "Which method can be used to generate random variables from a given distribution using uniform random numbers?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Inverse transform method", "value": "true" },
            { "label": "Least squares method", "value": "false" },
            { "label": "Newton-Raphson method", "value": "false" },
            { "label": "Bootstrap method", "value": "false" }
        ],
        "answer": "true",
        "solution": "The inverse transform method uses the inverse CDF to generate samples from a distribution."
    },
    {
        "id": 39,
        "question": "Which condition is required for two random variables X and Y to be independent?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "The joint distribution equals the product of the marginals", "value": "true" },
            { "label": "Their covariance is zero", "value": "false" },
            { "label": "Their correlation is zero", "value": "false" },
            { "label": "They have the same distribution", "value": "false" }
        ],
        "answer": "true",
        "solution": "Independence requires f_{X,Y}(x,y) = f_X(x) f_Y(y)."
    },
    {
        "id": 40,
        "question": "Which of the following correctly defines covariance?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Cov(X, Y) = E[(X - E[X])(Y - E[Y])]", "value": "true" },
            { "label": "Cov(X, Y) = E[XY] - E[X]E[Y] - 1", "value": "false" },
            { "label": "Cov(X, Y) = E[X + Y]", "value": "false" },
            { "label": "Cov(X, Y) = Var(X)Var(Y)", "value": "false" }
        ],
        "answer": "true",
        "solution": "Covariance measures joint variability around the means of X and Y."
    },
    {
        "id": 41,
        "question": "Which of the following gives the variance of a linear combination aX + bY?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "a^2Var(X) + b^2Var(Y) + 2abCov(X, Y)", "value": "true" },
            { "label": "aVar(X) + bVar(Y)", "value": "false" },
            { "label": "Var(X) + Var(Y)", "value": "false" },
            { "label": "a^2 + b^2", "value": "false" }
        ],
        "answer": "true",
        "solution": "This formula accounts for both individual variances and the covariance between X and Y."
    },
    {
        "id": 42,
        "question": "Which of the following best defines conditional expectation E[X | Y]?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "The expected value of X given a specific value of Y", "value": "true" },
            { "label": "The unconditional mean of X", "value": "false" },
            { "label": "The joint expectation of X and Y", "value": "false" },
            { "label": "The variance of X given Y", "value": "false" }
        ],
        "answer": "true",
        "solution": "Conditional expectation incorporates information about Y when computing the expected value of X."
    },
    {
        "id": 43,
        "question": "Which of the following identities is known as the law of total expectation?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "E[X] = E[E[X | Y]]", "value": "true" },
            { "label": "E[X] = E[X | Y]", "value": "false" },
            { "label": "E[X] = Var(X)", "value": "false" },
            { "label": "E[X] = E[Y | X]", "value": "false" }
        ],
        "answer": "true",
        "solution": "The law of total expectation expresses the mean of X via conditional expectations."
    },
    {
        "id": 44,
        "question": "Which function uniquely determines the distribution of a random variable (when it exists)?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Moment generating function", "value": "true" },
            { "label": "Variance function", "value": "false" },
            { "label": "Regression function", "value": "false" },
            { "label": "Likelihood function", "value": "false" }
        ],
        "answer": "true",
        "solution": "The moment generating function, when it exists in a neighbourhood of zero, uniquely determines the distribution."
    },
    {
        "id": 45,
        "question": "Which theorem explains why the sum of many independent random variables tends toward a normal distribution?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Central Limit Theorem", "value": "true" },
            { "label": "Law of Large Numbers", "value": "false" },
            { "label": "Bayes' Theorem", "value": "false" },
            { "label": "Markov's Inequality", "value": "false" }
        ],
        "answer": "true",
        "solution": "The Central Limit Theorem describes convergence in distribution to the normal distribution."
    },
    {
        "id": 46,
        "question": "Which of the following best describes a sampling distribution?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "The distribution of a statistic over repeated samples", "value": "true" },
            { "label": "The distribution of the raw data", "value": "false" },
            { "label": "The population distribution", "value": "false" },
            { "label": "The joint distribution of all variables", "value": "false" }
        ],
        "answer": "true",
        "solution": "A sampling distribution describes how a statistic varies across repeated samples."
    },
    {
        "id": 47,
        "question": "Which is the distribution of the sample mean from a normal population with known variance?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Normal distribution", "value": "true" },
            { "label": "t distribution", "value": "false" },
            { "label": "Chi-square distribution", "value": "false" },
            { "label": "F distribution", "value": "false" }
        ],
        "answer": "true",
        "solution": "The sample mean from a normal population is normally distributed."
    },
    {
        "id": 48,
        "question": "Which distribution does the sample variance (scaled appropriately) follow for normal data?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Chi-square distribution", "value": "true" },
            { "label": "Normal distribution", "value": "false" },
            { "label": "Gamma distribution", "value": "false" },
            { "label": "F distribution", "value": "false" }
        ],
        "answer": "true",
        "solution": "For normal data, (n−1)S^2/σ^2 follows a chi-square distribution."
    },
    {
        "id": 49,
        "question": "Which distribution describes the ratio of two independent sample variances from normal populations?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "F distribution", "value": "true" },
            { "label": "t distribution", "value": "false" },
            { "label": "Chi-square distribution", "value": "false" },
            { "label": "Normal distribution", "value": "false" }
        ],
        "answer": "true",
        "solution": "The ratio of two scaled chi-square variables follows an F distribution."
    },
    {
        "id": 50,
        "question": "Which statistic follows a t distribution for a normal population with unknown variance?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "The standardized sample mean using the sample variance", "value": "true" },
            { "label": "The sample variance", "value": "false" },
            { "label": "The sample mean", "value": "false" },
            { "label": "The population variance", "value": "false" }
        ],
        "answer": "true",
        "solution": "When σ is unknown, (X̄ − μ)/(S/√n) follows a t distribution."
    },
    {
        "id": 51,
        "question": "Which of the following best describes the method of moments?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Equating sample moments to population moments to estimate parameters", "value": "true" },
            { "label": "Maximising the likelihood function", "value": "false" },
            { "label": "Minimising squared errors", "value": "false" },
            { "label": "Matching quantiles of the sample and population", "value": "false" }
        ],
        "answer": "true",
        "solution": "The method of moments constructs estimators by setting sample moments equal to theoretical moments."
    },
    {
        "id": 52,
        "question": "Which of the following defines the maximum likelihood estimator (MLE)?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "The parameter value that maximises the likelihood function", "value": "true" },
            { "label": "The parameter value that minimises the variance", "value": "false" },
            { "label": "The parameter value that minimises bias", "value": "false" },
            { "label": "The parameter value that maximises the sample mean", "value": "false" }
        ],
        "answer": "true",
        "solution": "MLE chooses the parameter value that makes the observed data most probable."
    },
    {
        "id": 53,
        "question": "Which property of an estimator means that its expected value equals the true parameter?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Unbiasedness", "value": "true" },
            { "label": "Consistency", "value": "false" },
            { "label": "Efficiency", "value": "false" },
            { "label": "Sufficiency", "value": "false" }
        ],
        "answer": "true",
        "solution": "An estimator is unbiased if E[θ̂] = θ."
    },
    {
        "id": 54,
        "question": "Which of the following best describes consistency of an estimator?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "The estimator converges in probability to the true parameter as sample size increases", "value": "true" },
            { "label": "The estimator has minimum variance", "value": "false" },
            { "label": "The estimator is unbiased for all sample sizes", "value": "false" },
            { "label": "The estimator has zero mean square error", "value": "false" }
        ],
        "answer": "true",
        "solution": "Consistency means θ̂ → θ as n → ∞."
    },
    {
        "id": 55,
        "question": "Which of the following correctly defines the mean squared error of an estimator?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Var(θ̂) + Bias(θ̂)^2", "value": "true" },
            { "label": "Var(θ̂) − Bias(θ̂)", "value": "false" },
            { "label": "E[θ̂ − θ]", "value": "false" },
            { "label": "Var(θ̂)/n", "value": "false" }
        ],
        "answer": "true",
        "solution": "MSE combines variance and squared bias of the estimator."
    },
    {
        "id": 56,
        "question": "Which statement about an efficient estimator is correct?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "It has the smallest variance among all unbiased estimators", "value": "true" },
            { "label": "It is always unbiased", "value": "false" },
            { "label": "It has zero bias", "value": "false" },
            { "label": "It has minimum MSE among all estimators", "value": "false" }
        ],
        "answer": "true",
        "solution": "Efficiency compares the variances of unbiased estimators."
    },
    {
        "id": 57,
        "question": "Which of the following is an asymptotic property of MLEs?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "They are asymptotically normally distributed", "value": "true" },
            { "label": "They are exactly unbiased", "value": "false" },
            { "label": "They have finite sample efficiency", "value": "false" },
            { "label": "They require normal data", "value": "false" }
        ],
        "answer": "true",
        "solution": "Under regularity conditions, MLEs are asymptotically normal."
    },
    {
        "id": 58,
        "question": "Which of the following best describes the bootstrap method?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Resampling with replacement from the observed data to estimate properties of an estimator", "value": "true" },
            { "label": "Sampling repeatedly from the population", "value": "false" },
            { "label": "Using asymptotic theory to approximate distributions", "value": "false" },
            { "label": "Generating random numbers from known distributions", "value": "false" }
        ],
        "answer": "true",
        "solution": "The bootstrap approximates the sampling distribution via resampling the observed data."
    },
    {
        "id": 59,
        "question": "Which of the following is the correct interpretation of a 95% confidence interval?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "95% of such intervals constructed from repeated samples will contain the true parameter", "value": "true" },
            { "label": "The probability the true parameter lies in this specific interval is 95%", "value": "false" },
            { "label": "95% of the data lie inside the interval", "value": "false" },
            { "label": "The true parameter equals the midpoint with 95% probability", "value": "false" }
        ],
        "answer": "true",
        "solution": "The confidence level refers to long-run frequency of correct intervals."
    },
    {
        "id": 60,
        "question": "Which interval is used to estimate the range of a future observation?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Prediction interval", "value": "true" },
            { "label": "Confidence interval", "value": "false" },
            { "label": "Credible interval", "value": "false" },
            { "label": "Tolerance interval", "value": "false" }
        ],
        "answer": "true",
        "solution": "Prediction intervals account for both parameter uncertainty and observation variability."
    },
    {
        "id": 61,
        "question": "Which distribution is used for a confidence interval for the mean of a normal population with unknown variance?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "t distribution", "value": "true" },
            { "label": "Normal distribution", "value": "false" },
            { "label": "Chi-square distribution", "value": "false" },
            { "label": "F distribution", "value": "false" }
        ],
        "answer": "true",
        "solution": "The t distribution is used when σ is unknown."
    },
    {
        "id": 62,
        "question": "Which test is appropriate for comparing two population variances from normal samples?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "F test", "value": "true" },
            { "label": "t test", "value": "false" },
            { "label": "Chi-square test", "value": "false" },
            { "label": "Z test", "value": "false" }
        ],
        "answer": "true",
        "solution": "The ratio of sample variances follows an F distribution under normality."
    },
    {
        "id": 63,
        "question": "Which of the following defines a Type I error?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Rejecting a true null hypothesis", "value": "true" },
            { "label": "Failing to reject a false null hypothesis", "value": "false" },
            { "label": "Accepting a true null hypothesis", "value": "false" },
            { "label": "Rejecting a false null hypothesis", "value": "false" }
        ],
        "answer": "true",
        "solution": "Type I error occurs when a true null hypothesis is incorrectly rejected."
    },
    {
        "id": 64,
        "question": "Which quantity represents the probability of a Type I error?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Significance level", "value": "true" },
            { "label": "Power of the test", "value": "false" },
            { "label": "p-value", "value": "false" },
            { "label": "Confidence level", "value": "false" }
        ],
        "answer": "true",
        "solution": "The significance level α is the probability of rejecting H₀ when it is true."
    },
    {
        "id": 65,
        "question": "Which of the following defines the power of a test?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "The probability of rejecting a false null hypothesis", "value": "true" },
            { "label": "The probability of rejecting a true null hypothesis", "value": "false" },
            { "label": "The probability that the null hypothesis is true", "value": "false" },
            { "label": "The probability of a Type II error", "value": "false" }
        ],
        "answer": "true",
        "solution": "Power equals 1 − β, where β is the probability of a Type II error."
    },
    {
        "id": 66,
        "question": "Which of the following best describes the p-value?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "The probability of observing a test statistic as extreme or more extreme under H₀", "value": "true" },
            { "label": "The probability that H₀ is true", "value": "false" },
            { "label": "The probability that H₁ is true", "value": "false" },
            { "label": "The probability of a Type I error", "value": "false" }
        ],
        "answer": "true",
        "solution": "The p-value measures the strength of evidence against the null hypothesis."
    },
    {
        "id": 67,
        "question": "Which test is used to assess whether a sample follows a specified distribution?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Chi-square goodness-of-fit test", "value": "true" },
            { "label": "t test", "value": "false" },
            { "label": "F test", "value": "false" },
            { "label": "Z test", "value": "false" }
        ],
        "answer": "true",
        "solution": "The chi-square goodness-of-fit test compares observed and expected frequencies."
    },
    {
        "id": 68,
        "question": "Which test is used to assess independence in a contingency table?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Chi-square test of independence", "value": "true" },
            { "label": "t test", "value": "false" },
            { "label": "Z test", "value": "false" },
            { "label": "Permutation test", "value": "false" }
        ],
        "answer": "true",
        "solution": "The chi-square test of independence is applied to contingency tables."
    },
    {
        "id": 69,
        "question": "Which non-parametric testing approach is based on rearranging the observed data?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Permutation test", "value": "true" },
            { "label": "t test", "value": "false" },
            { "label": "F test", "value": "false" },
            { "label": "Z test", "value": "false" }
        ],
        "answer": "true",
        "solution": "Permutation tests construct the null distribution by rearranging the observed data."
    },
    {
        "id": 70,
        "question": "Which of the following best describes a simple null hypothesis?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "A hypothesis that completely specifies the distribution", "value": "true" },
            { "label": "A hypothesis that leaves some parameters unspecified", "value": "false" },
            { "label": "A hypothesis involving two populations", "value": "false" },
            { "label": "A hypothesis that can never be tested", "value": "false" }
        ],
        "answer": "true",
        "solution": "A simple hypothesis fully specifies the probability model."
    },
    {
        "id": 71,
        "question": "Which statement about composite hypotheses is correct?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "They leave at least one parameter unspecified", "value": "true" },
            { "label": "They fully specify the model", "value": "false" },
            { "label": "They can never be tested", "value": "false" },
            { "label": "They are always two-sided", "value": "false" }
        ],
        "answer": "true",
        "solution": "Composite hypotheses do not fully specify the distribution."
    },
    {
        "id": 72,
        "question": "Which concept measures the ability of a diagnostic test to correctly identify positives?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Sensitivity", "value": "true" },
            { "label": "Specificity", "value": "false" },
            { "label": "Power", "value": "false" },
            { "label": "Accuracy", "value": "false" }
        ],
        "answer": "true",
        "solution": "Sensitivity measures the true positive rate."
    },
    {
        "id": 73,
        "question": "Which concept measures the ability of a diagnostic test to correctly identify negatives?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Specificity", "value": "true" },
            { "label": "Sensitivity", "value": "false" },
            { "label": "Power", "value": "false" },
            { "label": "Accuracy", "value": "false" }
        ],
        "answer": "true",
        "solution": "Specificity measures the true negative rate."
    },
    {
        "id": 74,
        "question": "Which of the following correctly defines the likelihood ratio test statistic?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "-2 log(L0 / L1)", "value": "true" },
            { "label": "L1 / L0", "value": "false" },
            { "label": "L0 + L1", "value": "false" },
            { "label": "L1 − L0", "value": "false" }
        ],
        "answer": "true",
        "solution": "The likelihood ratio statistic compares the fit of nested models."
    },
    {
        "id": 75,
        "question": "Which of the following best describes a critical region?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "The set of values of the test statistic for which H₀ is rejected", "value": "true" },
            { "label": "The region containing the true parameter", "value": "false" },
            { "label": "The region of highest likelihood", "value": "false" },
            { "label": "The region where p-values are computed", "value": "false" }
        ],
        "answer": "true",
        "solution": "The critical region determines the decision rule of the test."
    },
    {
        "id": 76,
        "question": "Which of the following best defines the response variable in a regression model?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "The variable being explained or predicted", "value": "true" },
            { "label": "The variable used to explain another variable", "value": "false" },
            { "label": "The variable that is fixed by design", "value": "false" },
            { "label": "The variable that has no randomness", "value": "false" }
        ],
        "answer": "true",
        "solution": "The response variable (dependent variable) is the outcome the model aims to explain or predict."
    },
    {
        "id": 77,
        "question": "Which of the following best defines the explanatory variable in regression?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "The variable used to explain variation in the response", "value": "true" },
            { "label": "The variable being predicted", "value": "false" },
            { "label": "The error term", "value": "false" },
            { "label": "The intercept", "value": "false" }
        ],
        "answer": "true",
        "solution": "Explanatory variables (independent variables) explain variation in the response variable."
    },
    {
        "id": 78,
        "question": "Which of the following correctly states the simple linear regression model?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Y = β0 + β1X + ε", "value": "true" },
            { "label": "X = β0 + β1Y + ε", "value": "false" },
            { "label": "Y = β0X + β1 + ε", "value": "false" },
            { "label": "Y = β0 + ε", "value": "false" }
        ],
        "answer": "true",
        "solution": "The simple linear regression model relates the response Y to the explanatory variable X with an error term ε."
    },
    {
        "id": 79,
        "question": "Which method is used to estimate the regression coefficients in ordinary least squares?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Minimising the sum of squared residuals", "value": "true" },
            { "label": "Maximising the likelihood function", "value": "false" },
            { "label": "Matching moments", "value": "false" },
            { "label": "Minimising absolute deviations", "value": "false" }
        ],
        "answer": "true",
        "solution": "Ordinary least squares chooses coefficients that minimise the sum of squared residuals."
    },
    {
        "id": 80,
        "question": "Which of the following is the least squares estimator of the slope β1 in simple linear regression?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Σ(xi − x̄)(yi − ȳ) / Σ(xi − x̄)^2", "value": "true" },
            { "label": "Σ(yi − ȳ) / Σ(xi − x̄)", "value": "false" },
            { "label": "Σxi yi / Σxi^2", "value": "false" },
            { "label": "ȳ / x̄", "value": "false" }
        ],
        "answer": "true",
        "solution": "This formula minimises the sum of squared residuals in simple linear regression."
    },
    {
        "id": 81,
        "question": "Which of the following is a key assumption of the classical linear regression model?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "The errors have mean zero and constant variance", "value": "true" },
            { "label": "The response variable is normally distributed", "value": "false" },
            { "label": "The explanatory variables are random", "value": "false" },
            { "label": "The regression line always passes through the origin", "value": "false" }
        ],
        "answer": "true",
        "solution": "Homoscedasticity and zero-mean errors are core regression assumptions."
    },
    {
        "id": 82,
        "question": "Which of the following measures the proportion of variation in Y explained by the regression model?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Coefficient of determination (R^2)", "value": "true" },
            { "label": "Residual standard error", "value": "false" },
            { "label": "Standard error of β1", "value": "false" },
            { "label": "p-value", "value": "false" }
        ],
        "answer": "true",
        "solution": "R^2 measures goodness of fit."
    },
    {
        "id": 83,
        "question": "Which of the following is used to assess whether the slope coefficient is statistically significant?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "t-test", "value": "true" },
            { "label": "F-test", "value": "false" },
            { "label": "Chi-square test", "value": "false" },
            { "label": "Permutation test", "value": "false" }
        ],
        "answer": "true",
        "solution": "The t-test evaluates the significance of individual regression coefficients."
    },
    {
        "id": 84,
        "question": "Which plot is most useful for checking linearity and homoscedasticity?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Residuals versus fitted values plot", "value": "true" },
            { "label": "Histogram of X", "value": "false" },
            { "label": "Boxplot of Y", "value": "false" },
            { "label": "Scatter plot of X and Y", "value": "false" }
        ],
        "answer": "true",
        "solution": "Residual plots reveal violations of regression assumptions."
    },
    {
        "id": 85,
        "question": "Which of the following best describes multicollinearity?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Strong correlation among explanatory variables", "value": "true" },
            { "label": "Correlation between Y and X", "value": "false" },
            { "label": "Correlation among residuals", "value": "false" },
            { "label": "Nonlinear relationship between X and Y", "value": "false" }
        ],
        "answer": "true",
        "solution": "Multicollinearity occurs when predictors are highly correlated."
    },
    {
        "id": 86,
        "question": "Which of the following is an example of a categorical explanatory variable?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Marital status", "value": "true" },
            { "label": "Age", "value": "false" },
            { "label": "Income", "value": "false" },
            { "label": "Height", "value": "false" }
        ],
        "answer": "true",
        "solution": "Categorical variables take distinct categories rather than numerical values."
    },
    {
        "id": 87,
        "question": "Which model belongs to the exponential family used in GLMs?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Poisson regression", "value": "true" },
            { "label": "Ordinary least squares", "value": "false" },
            { "label": "Ridge regression", "value": "false" },
            { "label": "Lasso regression", "value": "false" }
        ],
        "answer": "true",
        "solution": "Poisson, binomial, gamma, exponential and normal belong to the exponential family."
    },
    {
        "id": 88,
        "question": "Which of the following is the canonical link function for the Poisson distribution?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Log link", "value": "true" },
            { "label": "Identity link", "value": "false" },
            { "label": "Logit link", "value": "false" },
            { "label": "Probit link", "value": "false" }
        ],
        "answer": "true",
        "solution": "The canonical link for Poisson models is the log link."
    },
    {
        "id": 89,
        "question": "Which quantity is minimised when fitting a GLM?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Deviance", "value": "true" },
            { "label": "Sum of squared errors", "value": "false" },
            { "label": "Mean squared error", "value": "false" },
            { "label": "Absolute deviations", "value": "false" }
        ],
        "answer": "true",
        "solution": "GLMs are estimated by minimising deviance."
    },
    {
        "id": 90,
        "question": "Which residual is used to assess overall model adequacy in GLMs?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Deviance residual", "value": "true" },
            { "label": "Ordinary residual", "value": "false" },
            { "label": "Least squares residual", "value": "false" },
            { "label": "Prediction residual", "value": "false" }
        ],
        "answer": "true",
        "solution": "Deviance residuals assess goodness-of-fit in GLMs."
    },
    {
        "id": 91,
        "question": "Which test compares nested GLMs?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Likelihood ratio test", "value": "true" },
            { "label": "t-test", "value": "false" },
            { "label": "F-test", "value": "false" },
            { "label": "Chi-square test", "value": "false" }
        ],
        "answer": "true",
        "solution": "The likelihood ratio test is based on differences in deviance."
    },
    {
        "id": 92,
        "question": "Which of the following best defines the linear predictor in a GLM?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "η = Xβ", "value": "true" },
            { "label": "η = β0", "value": "false" },
            { "label": "η = μ", "value": "false" },
            { "label": "η = ε", "value": "false" }
        ],
        "answer": "true",
        "solution": "The linear predictor combines explanatory variables with coefficients."
    },
    {
        "id": 93,
        "question": "Which plot is useful for detecting non-linearity in regression?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Residual plot", "value": "true" },
            { "label": "Q-Q plot of Y", "value": "false" },
            { "label": "Histogram of X", "value": "false" },
            { "label": "Bar chart of categories", "value": "false" }
        ],
        "answer": "true",
        "solution": "Patterns in residual plots indicate model inadequacy."
    },
    {
        "id": 94,
        "question": "Which of the following is used for model selection in multiple regression?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Adjusted R^2", "value": "true" },
            { "label": "Sample size", "value": "false" },
            { "label": "Mean of Y", "value": "false" },
            { "label": "Variance of X", "value": "false" }
        ],
        "answer": "true",
        "solution": "Adjusted R^2 penalises unnecessary predictors."
    },
    {
        "id": 95,
        "question": "Which of the following statements about interaction terms is correct?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "They allow the effect of one variable to depend on another", "value": "true" },
            { "label": "They always improve model fit", "value": "false" },
            { "label": "They eliminate multicollinearity", "value": "false" },
            { "label": "They replace main effects", "value": "false" }
        ],
        "answer": "true",
        "solution": "Interaction terms capture dependence between predictors."
    },
    {
        "id": 96,
        "question": "Which of the following best describes Pearson residuals?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Standardised difference between observed and fitted values", "value": "true" },
            { "label": "Difference between observed and predicted values", "value": "false" },
            { "label": "Difference between predicted and mean response", "value": "false" },
            { "label": "Difference between fitted and true values", "value": "false" }
        ],
        "answer": "true",
        "solution": "Pearson residuals are scaled by the model variance."
    },
    {
        "id": 97,
        "question": "Which model is appropriate for count data in GLMs?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Poisson regression", "value": "true" },
            { "label": "Linear regression", "value": "false" },
            { "label": "Logistic regression", "value": "false" },
            { "label": "Gamma regression", "value": "false" }
        ],
        "answer": "true",
        "solution": "Poisson regression is designed for modelling counts."
    },
    {
        "id": 98,
        "question": "Which distribution is used in logistic regression?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Binomial distribution", "value": "true" },
            { "label": "Normal distribution", "value": "false" },
            { "label": "Poisson distribution", "value": "false" },
            { "label": "Gamma distribution", "value": "false" }
        ],
        "answer": "true",
        "solution": "Logistic regression models binomial outcomes."
    },
    {
        "id": 99,
        "question": "Which link function is used in logistic regression?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Logit link", "value": "true" },
            { "label": "Identity link", "value": "false" },
            { "label": "Log link", "value": "false" },
            { "label": "Probit link", "value": "false" }
        ],
        "answer": "true",
        "solution": "The logit link relates probabilities to the linear predictor."
    },
    {
        "id": 100,
        "question": "Which of the following best describes overdispersion in a Poisson GLM?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "The observed variance exceeds the model variance", "value": "true" },
            { "label": "The mean exceeds the variance", "value": "false" },
            { "label": "The model has too many predictors", "value": "false" },
            { "label": "The residuals are normally distributed", "value": "false" }
        ],
        "answer": "true",
        "solution": "Overdispersion occurs when data variability is larger than the Poisson assumption allows."
    },
    {
        "id": 101,
        "question": "Which of the following best describes Bayesian inference?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Updating beliefs using observed data", "value": "true" },
            { "label": "Estimating parameters using only sample means", "value": "false" },
            { "label": "Testing hypotheses without prior information", "value": "false" },
            { "label": "Fitting models using least squares", "value": "false" }
        ],
        "answer": "true",
        "solution": "Bayesian inference updates prior beliefs in light of observed data."
    },
    {
        "id": 102,
        "question": "Which components make up Bayes' theorem?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Prior, likelihood and posterior", "value": "true" },
            { "label": "Mean, variance and skewness", "value": "false" },
            { "label": "Estimator, parameter and statistic", "value": "false" },
            { "label": "Bias, error and variance", "value": "false" }
        ],
        "answer": "true",
        "solution": "Bayes’ theorem combines prior beliefs with data through the likelihood to obtain the posterior."
    },
    {
        "id": 103,
        "question": "Which distribution represents knowledge about a parameter before observing data?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Prior distribution", "value": "true" },
            { "label": "Posterior distribution", "value": "false" },
            { "label": "Sampling distribution", "value": "false" },
            { "label": "Predictive distribution", "value": "false" }
        ],
        "answer": "true",
        "solution": "The prior reflects beliefs about the parameter before seeing data."
    },
    {
        "id": 104,
        "question": "Which distribution represents updated beliefs after observing data?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Posterior distribution", "value": "true" },
            { "label": "Prior distribution", "value": "false" },
            { "label": "Likelihood function", "value": "false" },
            { "label": "Sampling distribution", "value": "false" }
        ],
        "answer": "true",
        "solution": "The posterior combines the prior and the likelihood."
    },
    {
        "id": 105,
        "question": "Which term in Bayes' theorem ensures the posterior integrates to one?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Marginal likelihood (evidence)", "value": "true" },
            { "label": "Prior", "value": "false" },
            { "label": "Likelihood", "value": "false" },
            { "label": "Posterior mean", "value": "false" }
        ],
        "answer": "true",
        "solution": "The marginal likelihood acts as the normalising constant."
    },
    {
        "id": 106,
        "question": "Which type of prior contains no subjective information?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Non-informative prior", "value": "true" },
            { "label": "Conjugate prior", "value": "false" },
            { "label": "Empirical prior", "value": "false" },
            { "label": "Subjective prior", "value": "false" }
        ],
        "answer": "true",
        "solution": "Non-informative priors aim to have minimal influence on the posterior."
    },
    {
        "id": 107,
        "question": "Which prior leads to a posterior of the same functional form?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Conjugate prior", "value": "true" },
            { "label": "Improper prior", "value": "false" },
            { "label": "Non-informative prior", "value": "false" },
            { "label": "Empirical prior", "value": "false" }
        ],
        "answer": "true",
        "solution": "Conjugate priors simplify Bayesian updating."
    },
    {
        "id": 108,
        "question": "Which distribution is conjugate to the binomial likelihood?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Beta distribution", "value": "true" },
            { "label": "Gamma distribution", "value": "false" },
            { "label": "Normal distribution", "value": "false" },
            { "label": "Poisson distribution", "value": "false" }
        ],
        "answer": "true",
        "solution": "The Beta distribution is conjugate to the Binomial."
    },
    {
        "id": 109,
        "question": "Which distribution is conjugate to the Poisson likelihood?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Gamma distribution", "value": "true" },
            { "label": "Beta distribution", "value": "false" },
            { "label": "Normal distribution", "value": "false" },
            { "label": "Inverse-Gamma distribution", "value": "false" }
        ],
        "answer": "true",
        "solution": "The Gamma distribution is conjugate to the Poisson likelihood."
    },
    {
        "id": 110,
        "question": "Which Bayesian estimator minimises expected squared error loss?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Posterior mean", "value": "true" },
            { "label": "Posterior mode", "value": "false" },
            { "label": "Posterior median", "value": "false" },
            { "label": "Maximum likelihood estimate", "value": "false" }
        ],
        "answer": "true",
        "solution": "The posterior mean minimises quadratic loss."
    },
    {
        "id": 111,
        "question": "Which Bayesian estimator minimises absolute error loss?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Posterior median", "value": "true" },
            { "label": "Posterior mean", "value": "false" },
            { "label": "Posterior mode", "value": "false" },
            { "label": "Maximum likelihood estimate", "value": "false" }
        ],
        "answer": "true",
        "solution": "The posterior median minimises absolute loss."
    },
    {
        "id": 112,
        "question": "Which Bayesian estimator minimises 0–1 loss?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Posterior mode (MAP)", "value": "true" },
            { "label": "Posterior mean", "value": "false" },
            { "label": "Posterior median", "value": "false" },
            { "label": "Sample mean", "value": "false" }
        ],
        "answer": "true",
        "solution": "The MAP estimate minimises 0–1 loss."
    },
    {
        "id": 113,
        "question": "Which distribution describes future observations given current data?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Posterior predictive distribution", "value": "true" },
            { "label": "Prior distribution", "value": "false" },
            { "label": "Likelihood function", "value": "false" },
            { "label": "Sampling distribution", "value": "false" }
        ],
        "answer": "true",
        "solution": "The posterior predictive combines uncertainty in parameters and new data."
    },
    {
        "id": 114,
        "question": "Which quantity summarises the central tendency of the posterior distribution?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Posterior mean", "value": "true" },
            { "label": "Likelihood", "value": "false" },
            { "label": "Prior", "value": "false" },
            { "label": "Marginal likelihood", "value": "false" }
        ],
        "answer": "true",
        "solution": "The posterior mean is a key summary statistic."
    },
    {
        "id": 115,
        "question": "Which interval contains a fixed proportion of posterior probability?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Credible interval", "value": "true" },
            { "label": "Confidence interval", "value": "false" },
            { "label": "Prediction interval", "value": "false" },
            { "label": "Tolerance interval", "value": "false" }
        ],
        "answer": "true",
        "solution": "Credible intervals are Bayesian probability statements."
    },
    {
        "id": 116,
        "question": "Which algorithm is commonly used for approximating complex posteriors?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Markov Chain Monte Carlo (MCMC)", "value": "true" },
            { "label": "Ordinary least squares", "value": "false" },
            { "label": "Newton-Raphson", "value": "false" },
            { "label": "Gradient descent", "value": "false" }
        ],
        "answer": "true",
        "solution": "MCMC methods sample from complex posterior distributions."
    },
    {
        "id": 117,
        "question": "Which MCMC method uses proposal distributions and acceptance probabilities?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Metropolis-Hastings algorithm", "value": "true" },
            { "label": "Gibbs sampler", "value": "false" },
            { "label": "Bootstrap", "value": "false" },
            { "label": "EM algorithm", "value": "false" }
        ],
        "answer": "true",
        "solution": "Metropolis-Hastings generates samples using acceptance-rejection."
    },
    {
        "id": 118,
        "question": "Which MCMC method samples directly from conditional distributions?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Gibbs sampler", "value": "true" },
            { "label": "Metropolis-Hastings", "value": "false" },
            { "label": "Importance sampling", "value": "false" },
            { "label": "Rejection sampling", "value": "false" }
        ],
        "answer": "true",
        "solution": "Gibbs sampling draws from full conditional distributions."
    },
    {
        "id": 119,
        "question": "Which concept measures how much data influences the posterior relative to the prior?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Likelihood", "value": "true" },
            { "label": "Prior variance", "value": "false" },
            { "label": "Posterior mean", "value": "false" },
            { "label": "Credible interval width", "value": "false" }
        ],
        "answer": "true",
        "solution": "The likelihood reflects information from the data."
    },
    {
        "id": 120,
        "question": "Which prior distribution is improper?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Uniform distribution on the real line", "value": "true" },
            { "label": "Beta(1,1)", "value": "false" },
            { "label": "Gamma(1,1)", "value": "false" },
            { "label": "Normal(0,1)", "value": "false" }
        ],
        "answer": "true",
        "solution": "A uniform prior over the real line does not integrate to one."
    },
    {
        "id": 121,
        "question": "Which quantity is maximised in maximum a posteriori estimation?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Posterior distribution", "value": "true" },
            { "label": "Likelihood function", "value": "false" },
            { "label": "Prior distribution", "value": "false" },
            { "label": "Sampling distribution", "value": "false" }
        ],
        "answer": "true",
        "solution": "MAP estimation maximises the posterior."
    },
    {
        "id": 122,
        "question": "Which Bayesian concept corresponds most closely to a frequentist confidence interval?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Credible interval", "value": "true" },
            { "label": "Prediction interval", "value": "false" },
            { "label": "Posterior mode", "value": "false" },
            { "label": "Likelihood region", "value": "false" }
        ],
        "answer": "true",
        "solution": "Credible intervals represent probability statements about parameters."
    },
    {
        "id": 123,
        "question": "Which method combines prior and likelihood information numerically?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Bayesian updating", "value": "true" },
            { "label": "Bootstrapping", "value": "false" },
            { "label": "Cross-validation", "value": "false" },
            { "label": "Jackknife resampling", "value": "false" }
        ],
        "answer": "true",
        "solution": "Bayesian updating applies Bayes' theorem."
    },
    {
        "id": 124,
        "question": "Which type of prior is estimated from the data?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Empirical Bayes prior", "value": "true" },
            { "label": "Conjugate prior", "value": "false" },
            { "label": "Non-informative prior", "value": "false" },
            { "label": "Subjective prior", "value": "false" }
        ],
        "answer": "true",
        "solution": "Empirical Bayes methods estimate priors from data."
    },
    {
        "id": 125,
        "question": "Which statement best summarises the Bayesian approach?",
        "questionType": "multiple-choice",
        "options": [
            { "label": "Probability is used to quantify uncertainty in parameters", "value": "true" },
            { "label": "Parameters are fixed but unknown constants", "value": "false" },
            { "label": "Only data randomness is modelled", "value": "false" },
            { "label": "Prior information is ignored", "value": "false" }
        ],
        "answer": "true",
        "solution": "Bayesian statistics treats parameters as random variables with probability distributions."
    },

];
