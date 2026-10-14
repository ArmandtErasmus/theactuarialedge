---
title: Black-Scholes Option Pricing Engine
slug: bsoptions
summary: Price European calls and puts with an object-oriented Black-Scholes engine in Python and C++, wrapped in a Streamlit dashboard for interactive what-if analysis.
area: Derivatives Pricing
level: Beginner
stack: [Python, NumPy, SciPy, pandas, Streamlit, C++]
tags: [Black-Scholes, European Options, Risk-Neutral Pricing, GBM, Option Pricing]
image: /assets/projects/bsoptions/bsoptions.png
download: /assets/projects/bsoptions/bsoptions-brief.pdf
order: 2
---

## Overview

The Black-Scholes-Merton model is the benchmark every derivatives desk, risk team and model validator measures against. Its assumptions are known to be too simple, but its closed-form prices, its hedging argument and its language (implied volatility, delta, the risk-neutral measure) are the foundation of everything more sophisticated.

This is the entry point to the derivatives projects. You implement the Black-Scholes formulas for European calls and puts as a small Python class, put it behind a Streamlit dashboard so you can see prices respond to spot, strike, maturity, volatility and rates, and write the same calculation in C++.

The download is a 6-page project brief (PDF) with the theory, the Python class, the Streamlit dashboard and a standalone C++ program.

## What you'll build

- A `BlackScholesModel` class that takes spot, strike, rate, maturity and volatility and returns European call and put prices.
- A Streamlit dashboard with sidebar inputs that shows live call and put values and a table of the inputs used.
- A self-contained C++ program that prices the same call and put, using `std::erfc` for the normal CDF.

## The theory

### Asset dynamics

The underlying follows geometric Brownian motion under the real-world measure:

$$
dS_t = \mu S_t \, dt + \sigma S_t \, dW_t ,
$$

so log-returns are normally distributed and prices stay positive. Solving the SDE gives

$$
S_T = S_t \exp\!\left( \left(\mu - \tfrac{1}{2}\sigma^2\right)(T-t) + \sigma (W_T - W_t) \right).
$$

### Risk-neutral valuation

In an arbitrage-free, complete market there is an equivalent martingale measure $\mathbb{Q}$ under which the discounted price $e^{-rt}S_t$ is a martingale. Under $\mathbb{Q}$ the drift becomes the risk-free rate:

$$
dS_t = r S_t \, dt + \sigma S_t \, dW^{\mathbb{Q}}_t ,
$$

and the price of a claim paying $h(S_T)$ is $V_t = e^{-r(T-t)} \, \mathbb{E}^{\mathbb{Q}}\!\left[ h(S_T) \mid \mathcal{F}_t \right]$.

### The Black-Scholes PDE

Apply Itô's lemma to $V(S,t)$ and hold a portfolio that is long the option and short $\partial V / \partial S$ units of stock. The $dW$ terms cancel, so the portfolio is riskless and must earn $r$. This gives

$$
\frac{\partial V}{\partial t} + \tfrac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} + r S \frac{\partial V}{\partial S} - r V = 0 ,
$$

with terminal condition $V(S,T) = \max(S-K, 0)$ for a call and $\max(K-S, 0)$ for a put.

### Closed-form prices

Let $\tau = T - t$. Then

$$
C = S_t N(d_1) - K e^{-r\tau} N(d_2), \qquad P = K e^{-r\tau} N(-d_2) - S_t N(-d_1),
$$

$$
d_1 = \frac{\ln(S_t/K) + \left(r + \tfrac{1}{2}\sigma^2\right)\tau}{\sigma\sqrt{\tau}}, \qquad d_2 = d_1 - \sigma\sqrt{\tau},
$$

where $N(\cdot)$ is the standard normal CDF.

$N(d_2)$ is the risk-neutral probability that the call finishes in the money. $N(d_1)$ is the same probability under the measure that uses the stock as numéraire, and it is also the call's delta.

### Two checks every implementation should pass

Put-call parity holds for any model, not just Black-Scholes:

$$
C - P = S_t - K e^{-r\tau}.
$$

The price must also respect the no-arbitrage bounds $\max(S_t - Ke^{-r\tau}, 0) \le C \le S_t$. Both make good unit tests.

## How the code is organised

Everything lives in the project brief (PDF). The dashboard imports `from black_scholes_model import BlackScholesModel`, which fixes the first file name. The brief doesn't name the other two files, so the names below are suggestions:

```text
bs-pricing/
├── black_scholes_model.py   # BlackScholesModel: _d1_d2(), call_price(), put_price()
├── app.py                   # Streamlit dashboard
└── black_scholes.cpp        # standalone C++ pricer (hard-coded inputs)
```

- **`black_scholes_model.py`.** `BlackScholesModel(spot, strike, rate, maturity, volatility)` stores the inputs. `_d1_d2()` computes both $d$ terms, and `call_price()` and `put_price()` apply the closed-form formulas using `scipy.stats.norm.cdf`. Time is measured as time to maturity in years. There is no dividend yield and there are no Greeks.
- **`app.py`.** The sidebar collects:
  - spot and strike (default 100)
  - maturity in years (default 1)
  - volatility, on a slider from 0.01 to 1.0 (default 0.2)
  - risk-free rate, on a slider from 0 to 0.2 (default 0.05)

  The main area shows the call and put values as `st.metric` tiles and the inputs as a table. Prices update on every widget change.
- **`black_scholes.cpp`.** This is a `main()` with hard-coded $S=K=100$, $r=0.05$, $T=1$, $\sigma=0.2$. It defines `normalCDF(x)` as $\tfrac{1}{2}\operatorname{erfc}(-x/\sqrt{2})$ and prints both prices.

## Running it

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install numpy scipy pandas streamlit
streamlit run app.py
```

Compile and run the C++ version with any C++11 compiler (`std::erfc` is in `<cmath>`):

```bash
g++ -O2 -std=c++17 black_scholes.cpp -o black_scholes
./black_scholes
```

The Python and C++ prices should agree for the same inputs. Put-call parity makes a quick self-test:

```python
import numpy as np
from black_scholes_model import BlackScholesModel

m = BlackScholesModel(spot=100, strike=100, rate=0.05, maturity=1.0, volatility=0.2)
c, p = m.call_price(), m.put_price()
assert np.isclose(c - p, 100 - 100 * np.exp(-0.05 * 1.0))
print(c, p)
```

## Extending the project

- **Greeks.** Add analytic delta, gamma, vega, theta and rho, and plot them against spot. Check them against finite differences; the Richardson extrapolation project does exactly this.
- **Dividends.** Add a continuous dividend yield $q$ (the Merton model) by replacing $S_t$ with $S_t e^{-q\tau}$ and $r$ with $r - q$ in $d_1$.
- **Implied volatility.** Write a solver using Newton-Raphson on vega with a bisection fallback, and plot an implied-volatility smile from a set of market quotes.
- **Sensitivity charts.** Add price against volatility and price against maturity charts to the dashboard, which makes convexity and time value visible.
- **Validation.** Write `pytest` tests for parity, the price bounds and limiting cases ($\sigma \to 0$, $\tau \to 0$, deep in or out of the money), and handle invalid inputs such as $\tau = 0$ explicitly.

## Interview questions

**Q:** What are the main assumptions of Black-Scholes, and where do they fail?

**A:** The model assumes:
- constant volatility and interest rates
- lognormal prices with continuous paths (no jumps)
- frictionless, continuous trading with no transaction costs
- no arbitrage, and unlimited borrowing and short selling

In practice volatility is stochastic and has a smile or skew, returns have fat tails and jumps, and hedging is discrete and costly.

**Q:** Why doesn't the real-world drift $\mu$ appear in the price?

**A:** The option can be replicated by dynamically trading the stock and a bond. The replicating portfolio's cost depends only on volatility, because the drift risk is hedged away. Equivalently, under the risk-neutral measure every traded asset grows at $r$.

**Q:** Interpret $N(d_1)$ and $N(d_2)$.

**A:** $N(d_2)$ is the risk-neutral probability that the call is exercised. $N(d_1)$ is the call delta, which is also the exercise probability under the stock measure. $S N(d_1)$ is the present value of receiving the stock if exercised, and $K e^{-r\tau} N(d_2)$ is the present value of paying the strike.

**Q:** How would you add dividends or stochastic volatility?

**A:** For a continuous yield $q$, discount the spot by $e^{-q\tau}$ and use $r - q$ in the drift. Discrete dividends can be handled with an escrowed-dividend adjustment. For stochastic volatility you move to a model such as Heston, priced by Fourier methods or Monte Carlo; the Heston project covers this.

**Q:** How would you validate the pricing engine?

**A:** Check put-call parity, the arbitrage bounds and limiting cases. Compare against an independent implementation (here, the C++ version) and against Monte Carlo simulation of $S_T$. Back out implied volatilities from market prices to see where the constant-volatility assumption breaks down.

**Q:** What is implied volatility, and why is there a smile?

**A:** It is the $\sigma$ that makes the Black-Scholes price equal the market price. If Black-Scholes were correct, it would be the same for every strike and maturity. In equity markets it is higher for low strikes (the skew), which reflects crash risk, fat tails and the leverage effect.

## CV bullet points

- Built an object-oriented Black-Scholes pricing engine in Python, with an interactive Streamlit dashboard for real-time valuation of European calls and puts across [N] input parameters.
- Reimplemented the pricer in C++ and cross-validated it against the Python version, agreeing to [X] decimal places across [N] test cases.
- Wrote [N] automated tests covering put-call parity, no-arbitrage bounds and limiting cases, catching [N] edge-case defects such as zero time to maturity.
- Extended the engine with [analytic Greeks / implied-volatility solver], computing implied volatilities for [N] market quotes in under [X] ms each.
