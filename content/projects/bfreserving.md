---
title: Bornhuetter-Ferguson Reserving Engine
slug: bfreserving
summary: Build an object-oriented Python engine for Chain Ladder and Bornhuetter-Ferguson reserves, with a Streamlit dashboard comparing the methods by accident year.
area: Reserving
level: Intermediate
stack: [Python, NumPy, pandas, Streamlit, Plotly]
tags: [IBNR, Chain Ladder, Bornhuetter-Ferguson, Loss Triangles, General Insurance]
image: /assets/projects/bfreserving/reserving.png
download: /assets/projects/bfreserving/bfreserving-brief.pdf
order: 1
---

## Overview

Claims reserving is one of the most important jobs a general insurance actuary does. The reserve for claims that have been incurred but not yet fully paid, including incurred but not reported (IBNR) claims, feeds straight into the balance sheet, regulatory capital and pricing feedback loops. Reserving is hard because you have to project the future development of claims from an incomplete history, and you have to defend the result to auditors, regulators and management.

In this project you build a small reserving engine. It takes a cumulative loss triangle and produces Chain Ladder and Bornhuetter-Ferguson (BF) estimates of ultimate claims and reserves for each accident period. An interactive Streamlit dashboard lets you generate or upload a triangle, compare the two methods and inspect the development pattern.

The download is a 15-page project brief in PDF format. It contains the theory, full code listings for the engine and the dashboard, interview questions and CV bullets. You assemble the code into two Python files yourself, as described below.

## What you'll build

- A `LossTriangle` class that stores a triangle and converts between cumulative and incremental form.
- An abstract `ReservingMethod` base class, so every method exposes the same `calculate_reserves` interface.
- A `ChainLadderMethod` that estimates volume-weighted age-to-age factors, fills in the lower triangle and returns ultimates, reserves and the projected triangle.
- A `BornhuetterFergusonMethod` that combines a prior estimate of ultimate claims with the Chain Ladder development pattern.
- A `ReservingAnalyser` that runs the methods and computes an incremental development (emergence) pattern.
- A Streamlit dashboard with:
  - a seeded sample-triangle generator and a CSV upload
  - a heatmap of the input triangle
  - a bar chart of development factors
  - a Chain Ladder against BF comparison by accident period
  - the incremental emergence pattern
  - a results table of latest observed claims, ultimates and reserves

## The theory

### The loss triangle

Let $C_{i,j}$ be the cumulative claims for accident (origin) period $i$ at development period $j$, with $i, j \in \{0, 1, \dots, n\}$. At the valuation date we observe the upper triangle $i + j \le n$. The latest diagonal $C_{i,n-i}$ is the most recent value for each accident period. The task is to estimate the unobserved lower triangle $i + j > n$, and in particular the ultimate claims $C_{i,n}$.

The reserve for accident period $i$ is the difference between estimated ultimate claims and claims to date:

$$
R_i = \hat{C}_{i,n} - C_{i,n-i}, \qquad R = \sum_{i=0}^{n} R_i .
$$

The engine assumes claims are fully developed by the last development period, so it uses no tail factor.

### Chain Ladder

The Chain Ladder assumes every accident period follows the same multiplicative development pattern. The age-to-age (link) factor from period $j$ to $j+1$ is estimated as a volume-weighted average over the accident periods where both cells are observed:

$$
\hat{f}_j = \frac{\sum_{i=0}^{n-j-1} C_{i,j+1}}{\sum_{i=0}^{n-j-1} C_{i,j}}, \qquad j = 0, 1, \dots, n-1 .
$$

This is a weighted average of the individual link ratios $C_{i,j+1}/C_{i,j}$, with weights proportional to $C_{i,j}$. Under Mack's distribution-free model, where $\mathbb{E}[C_{i,j+1} \mid C_{i,0}, \dots, C_{i,j}] = f_j C_{i,j}$ and $\operatorname{Var}(C_{i,j+1} \mid C_{i,0}, \dots, C_{i,j}) = \sigma_j^2 C_{i,j}$, this is the minimum-variance unbiased linear estimator of $f_j$.

Projected values and the ultimate follow recursively from the latest diagonal:

$$
\hat{C}_{i,k} = C_{i,n-i} \prod_{l=n-i}^{k-1} \hat{f}_l \quad (k > n-i), \qquad \hat{C}^{CL}_{i,n} = C_{i,n-i}\, F_i, \quad F_i = \prod_{l=n-i}^{n-1} \hat{f}_l .
$$

$F_i$ is the cumulative development factor (CDF) to ultimate, and $p_i = 1/F_i$ is the proportion of ultimate claims expected to have emerged so far.

In the code, accident periods with $C_{i,j} \le 0$ are skipped when estimating $\hat{f}_j$, and a factor defaults to $1$ if its denominator is zero.

### Bornhuetter-Ferguson

The BF method starts from a prior (a priori) estimate $\mu_i$ of ultimate claims for each accident period. In practice this is usually earned premium multiplied by an expected loss ratio. Only the unemerged part of the prior is reserved for:

$$
\hat{R}^{BF}_i = \mu_i \left(1 - \frac{C_{i,n-i}}{\hat{C}^{CL}_{i,n}}\right) = \mu_i \left(1 - p_i\right), \qquad \hat{C}^{BF}_{i,n} = C_{i,n-i} + \hat{R}^{BF}_i .
$$

Because $C_{i,n-i} = p_i \hat{C}^{CL}_{i,n}$, the BF ultimate is a credibility-weighted average of the Chain Ladder ultimate and the prior:

$$
\hat{C}^{BF}_{i,n} = p_i\, \hat{C}^{CL}_{i,n} + (1 - p_i)\, \mu_i .
$$

Mature accident periods ($p_i$ close to 1) lean on their own data. Immature periods ($p_i$ small, $F_i$ large) lean on the prior. This is exactly where the Chain Ladder is weakest, because multiplying a small, noisy latest value by a large CDF amplifies the noise.

Two consequences matter when you use the dashboard:

- If the prior equals the Chain Ladder ultimate ($\mu_i = \hat{C}^{CL}_{i,n}$), the BF reserve equals the Chain Ladder reserve. "Chain Ladder Ultimates" is the dashboard's default prior, so the two methods agree by construction until you change it.
- If the prior is a scaled Chain Ladder ultimate ($\mu_i = s\, \hat{C}^{CL}_{i,n}$), every BF reserve is exactly $s$ times the Chain Ladder reserve.

### Incremental emergence pattern

With incremental claims $X_{i,j} = C_{i,j} - C_{i,j-1}$ (and $X_{i,0} = C_{i,0}$), the analyser estimates the share of ultimate claims emerging in development period $j$:

$$
\hat{\lambda}_j = \frac{\sum_{i=0}^{n-j} X_{i,j}}{\sum_{i=0}^{n-j} \hat{C}_{i,n}}, \qquad j = 0, 1, \dots, n .
$$

Each $\hat{\lambda}_j$ uses a different set of accident periods, so the $\hat{\lambda}_j$ will be close to, but not exactly, a set of proportions summing to one. Treat the pattern as a diagnostic of claim emergence speed, not as an input to the reserve.

### Assumptions and uncertainty

The Chain Ladder relies on four assumptions:

- the development pattern is stable across accident periods
- claims handling, case reserving and reporting practices have not changed
- there are no material calendar-year effects such as an inflation shock
- there is enough data to estimate each factor reliably

BF is more robust when these fail for recent years, but it is only as good as its prior.

A point estimate is not enough in practice. Mack's model gives a standard error for Chain Ladder reserves, and bootstrapping (for example, of an over-dispersed Poisson model) gives a full reserve distribution. Neither is implemented in this project, which makes them natural extensions.

## How the code is organised

Everything lives in the project brief (PDF). Copying the listings out of the brief gives you this project. The dashboard imports from `reserving_engine`, which fixes the first file name. The brief doesn't name the dashboard file, so `app.py` is used here.

```text
bf-reserving/
├── reserving_engine.py   # LossTriangle, ReservingMethod, ChainLadderMethod,
│                         # BornhuetterFergusonMethod, ReservingAnalyser
└── app.py                # Streamlit dashboard + generate_sample_triangle()
```

`reserving_engine.py` holds the following classes:

- `LossTriangle` wraps an $N \times N$ NumPy array. Its `to_cumulative()` and `to_incremental()` methods convert only the observed cells.
- `ReservingMethod` is an abstract base class with one abstract method, `calculate_reserves(triangle) -> Dict`.
- `ChainLadderMethod` has three methods:
  - `calculate_development_factors()` computes the volume-weighted factors.
  - `project_triangle()` fills the lower triangle.
  - `calculate_reserves()` returns `ultimates`, `reserves`, `total_reserve`, `development_factors`, `projected_triangle` and `incremental_projected`.
- `BornhuetterFergusonMethod(prior_ultimates)` runs a Chain Ladder internally, then returns BF `ultimates`, `reserves`, `total_reserve`, the priors, the Chain Ladder ultimates and the `development_ratios` $p_i$.
- `ReservingAnalyser(triangle)` has three methods: `run_chain_ladder()`, `run_bornhuetter_ferguson(prior_ultimates)` and `calculate_incremental_factors(ultimates)`.

`app.py` builds the dashboard:

- **Sidebar.** You choose the data source and the methods to run. The data source is either the sample generator (5 to 15 periods, a base claim amount and a volatility, seeded with 42) or a CSV upload. For BF, the prior can be "Chain Ladder Ultimates", "Scaled Chain Ladder" (a 0.5 to 2.0 slider) or "Manual Input".
- **Main area.** It shows the input heatmap, the Chain Ladder total and factor chart, the BF total, a grouped bar chart comparing reserves, the incremental emergence chart and the detailed results table.

Fix these issues in the listings as you assemble them:

1. **Function order.** `generate_sample_triangle()` is defined at the bottom of the dashboard script but called from the sidebar button. Streamlit runs the script top to bottom, so move the function above the sidebar code or you will get a `NameError`.
2. **Sample generator range.** The generator only develops claims for 11 development periods. With the slider at 12 or more periods, observed cells beyond period 10 stay at zero. That produces a development factor of 0 and nonsense reserves. Either cap the slider at 11 or change the inner loop to run to `n_periods - i`.
3. **Manual prior.** The "Manual Input" text box is never parsed. The code falls back to a flat prior of twice the base claim amount, and that variable only exists in sample-data mode.
4. **CSV format.** `pd.read_csv` treats the first row as a header, and every column becomes part of the triangle. Upload a square cumulative triangle with a header row, no index column and zeros in the unobserved cells.

## Running it

The brief doesn't ship a `requirements.txt`. These are the packages the listings import:

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install numpy pandas streamlit plotly
streamlit run app.py
```

Before you trust the dashboard, sanity-check the engine on its own. With the prior set to the Chain Ladder ultimates, the two methods must agree:

```python
import numpy as np
from reserving_engine import LossTriangle, ReservingAnalyser

data = np.array([
    [1000.0, 1500.0, 1700.0, 1750.0],
    [1100.0, 1650.0, 1870.0,    0.0],
    [1200.0, 1800.0,    0.0,    0.0],
    [1300.0,    0.0,    0.0,    0.0],
])
analyser = ReservingAnalyser(LossTriangle(data, is_cumulative=True))
cl = analyser.run_chain_ladder()
bf = analyser.run_bornhuetter_ferguson(cl["ultimates"])

print(cl["development_factors"])
print(cl["reserves"], cl["total_reserve"])
assert np.allclose(cl["reserves"], bf["reserves"])
```

## Extending the project

- **Tail factor.** Fit an exponential or inverse-power curve to the later development factors and extrapolate a tail to ultimate. The current engine stops at the last development period.
- **Reserve uncertainty.** Add Mack standard errors for each accident period and in total, or an over-dispersed Poisson bootstrap that produces a reserve distribution and percentiles.
- **A proper BF prior.** Parse a premium and expected loss ratio for each accident period (from the text box or a second CSV), and add the Cape Cod and Benktander methods. Benktander applies BF a second time, using the BF ultimate as the new prior.
- **Factor selection.** Let the user choose simple averages, averages over the latest $k$ diagonals, exclusions of outlying link ratios and manual overrides. Show the selected factors next to the raw ones.
- **Validation.** Write unit tests that reproduce a published triangle, such as the RAA data that ships with the open-source `chainladder` Python package, and compare totals.

## Interview questions

**Q:** What are the key assumptions of the Chain Ladder, and how would you check them?

**A:** The method assumes one stable development pattern for all accident periods, independence between accident periods and no calendar-year effects. To check them:
- plot the individual link ratios against accident period and calendar period to look for trends
- look for diagonal effects such as an inflation spike or a change in claims handling
- apply Mack's tests for correlated successive factors and for calendar-year effects

**Q:** When would you prefer Bornhuetter-Ferguson to the Chain Ladder?

**A:** For immature accident periods, a new line of business, or periods where the latest diagonal is distorted (a single large claim, or a change in reporting). The Chain Ladder multiplies the latest value by a large CDF, which amplifies noise. BF uses only the development pattern and a prior, so the reserve doesn't react to claims to date. For mature periods both methods converge, and the Chain Ladder is usually preferred.

**Q:** Show that the BF ultimate is a credibility weighting of the Chain Ladder ultimate and the prior.

**A:** With $p_i = 1/F_i$, $\hat{C}^{BF}_{i,n} = C_{i,n-i} + \mu_i(1-p_i)$. Since $C_{i,n-i} = p_i \hat{C}^{CL}_{i,n}$, this gives $p_i \hat{C}^{CL}_{i,n} + (1-p_i)\mu_i$. The credibility given to the data is the proportion of claims already reported.

**Q:** In this tool, why does BF give the same answer as the Chain Ladder by default?

**A:** The default prior is the Chain Ladder ultimate. Substituting $\mu_i = \hat{C}^{CL}_{i,n}$ into the BF formula returns the Chain Ladder reserve exactly. A scaled prior scales every reserve by the same factor. BF only adds information when the prior is independent of the triangle, for example premium multiplied by an expected loss ratio.

**Q:** How would you quantify the uncertainty in the reserve?

**A:** Mack's model gives an analytic mean squared error of prediction for Chain Ladder reserves. A bootstrap of an over-dispersed Poisson GLM gives a simulated distribution, from which you can read percentiles. Neither captures model or parameter-selection risk, so you would supplement them with scenario and sensitivity testing on factor selections and priors.

**Q:** How does reserving differ for long-tail and short-tail lines?

**A:** Long-tail lines need tail factors, more weight on BF or expected-loss-ratio methods for recent years, and explicit allowance for inflation and calendar-year effects. Uncertainty is also much larger. Short-tail lines develop quickly, so the Chain Ladder stabilises within a few periods and the reserve is dominated by IBNR on the most recent periods.

**Q:** Should you reserve on paid or incurred triangles?

**A:** Ideally on both, and compare the results. Incurred data develops faster because it includes case reserves, but it is distorted by changes in case-reserving practice. Paid data is objective but slower and more volatile for recent years. Large divergence between the two is itself a signal to investigate. The Munich Chain Ladder is one formal way to reconcile them.

**Q:** How would you structure the code to add more methods?

**A:** Keep the abstract base class and make every method return the same result schema (ultimates, reserves, total), so the analyser and dashboard need no changes. Cape Cod, Benktander or a GLM-based method then becomes one new subclass plus a sidebar option.

## CV bullet points

- Built an object-oriented Python reserving engine (Chain Ladder and Bornhuetter-Ferguson) that projects [N] x [N] cumulative loss triangles to ultimate and reports IBNR by accident period.
- Developed an interactive Streamlit and Plotly dashboard for method comparison and sensitivity testing, cutting the time to produce a reserve comparison from [X hours] to [Y minutes].
- Validated the engine against [reference implementation or published triangle], reproducing total reserves to within [X]%, and fixed [N] data-handling defects found during testing.
- Quantified the sensitivity of BF reserves to prior loss-ratio assumptions across [N] accident periods, showing a [X]% change in total reserve per [Y] percentage-point change in the expected loss ratio.
