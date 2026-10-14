---
title: Finite-Difference Greeks with Richardson Extrapolation
slug: richardsonextrapolation
summary: Compute option Greeks by bump-and-reprice with central differences, Richardson extrapolation and adaptive step sizes, checked against Black-Scholes.
area: Numerical Methods
level: Intermediate
stack: [Python, NumPy, SciPy, Streamlit, Plotly]
tags: [Greeks, Finite Differences, Richardson Extrapolation, Numerical Analysis, Sensitivity Analysis]
image: /assets/projects/richardsonextrapolation/greeks.png
download: /assets/projects/richardsonextrapolation/richardsonextrapolation-brief.pdf
order: 6
---

## Overview

Risk systems need Greeks for every position, but most pricers (PDE solvers, Monte Carlo engines, vendor libraries) only return prices. The universal fallback is bump-and-reprice: perturb an input, reprice, and take a finite difference. The difficulty is the step size $h$. Too large and truncation error dominates; too small and round-off or pricing noise is amplified by $1/h$ (or $1/h^2$ for gamma).

Richardson extrapolation combines differences at two step sizes to cancel the leading error term. This turns a second-order central difference into a fourth-order one at the cost of two extra pricings. In this project you build a pricer-agnostic `FiniteDifferenceGreeks` class that computes delta, gamma, theta, vega and rho with optional Richardson extrapolation and a simple adaptive step size, plus Greeks from a pre-computed price grid. You test it against Black-Scholes in a Streamlit dashboard.

The download is a 16-page project brief (PDF) with the theory, the full module, the dashboard, interview questions and CV bullets.

## What you'll build

- A `FiniteDifferenceGreeks` class that wraps any `pricing_function(params: dict) -> float`. It provides:
  - `compute_delta`, `compute_gamma`, `compute_theta`, `compute_vega` and `compute_rho`, each returning `(estimate, error_estimate)`
  - `compute_all_greeks`, which runs all five
  - an adaptive step-size routine, used for delta and gamma
  - `compute_greeks_from_grid`, which computes delta and gamma (and a theta) directly from prices on a spot grid
- A Streamlit dashboard, priced with Black-Scholes, showing:
  - the five Greeks with their error estimates
  - price and Greek profiles across a range of spot prices
  - a log-log convergence plot of delta error against step size, for plain central differences and Richardson, measured against the analytic $N(d_1)$

## The theory

### Greeks

For a price $V(S, \tau, \sigma, r)$, where $\tau$ is the time to maturity:

$$
\Delta = \frac{\partial V}{\partial S}, \quad \Gamma = \frac{\partial^2 V}{\partial S^2}, \quad \Theta = -\frac{\partial V}{\partial \tau}, \quad \nu = \frac{\partial V}{\partial \sigma}, \quad \rho = \frac{\partial V}{\partial r}.
$$

Theta is defined with a minus sign because time to maturity falls as calendar time passes.

### Finite differences and their errors

Taylor expansion gives the error of each stencil:

$$
\frac{V(x+h) - V(x)}{h} = V'(x) + \frac{h}{2} V''(x) + O(h^2) \qquad \text{(forward, first order)}
$$

$$
D_h = \frac{V(x+h) - V(x-h)}{2h} = V'(x) + \frac{h^2}{6} V'''(x) + \frac{h^4}{120} V^{(5)}(x) + \dots \qquad \text{(central, second order)}
$$

$$
G_h = \frac{V(x+h) - 2V(x) + V(x-h)}{h^2} = V''(x) + \frac{h^2}{12} V^{(4)}(x) + O(h^4).
$$

Central stencils contain only even powers of $h$. That fact is what makes Richardson extrapolation so effective here.

### Truncation against round-off

If each price carries an error of size $\epsilon$ (machine precision, solver tolerance or Monte Carlo noise), the total error of a first-derivative stencil of order $p$ behaves like

$$
\text{error}(h) \approx c\, h^p + \frac{\epsilon}{h}, \qquad h^* \propto \epsilon^{1/(p+1)} .
$$

For the second derivative the noise term is $\epsilon / h^2$, so $h^* \propto \epsilon^{1/(p+2)}$. For example, a central difference ($p = 2$) with $\epsilon \approx 10^{-6}$ suggests $h^* \approx 10^{-2}$ in units of the bumped variable. Below the optimum the error grows again as $h$ shrinks.

### Richardson extrapolation

If $F(h) = F + c\,h^p + O(h^q)$ with $q > p$, then

$$
\frac{2^p F(h/2) - F(h)}{2^p - 1} = F + O(h^q).
$$

For central differences $p = 2$ and $q = 4$, so the combination $\tfrac{1}{3}\big(4F(h/2) - F(h)\big)$ is fourth-order accurate. Expanding it gives the five-point stencils:

$$
\Delta \approx \frac{4 D_{h/2} - D_h}{3} = \frac{-V(S+h) + 8V(S+\tfrac{h}{2}) - 8V(S-\tfrac{h}{2}) + V(S-h)}{6h},
$$

$$
\Gamma \approx \frac{4 G_{h/2} - G_h}{3} = \frac{-V(S+h) + 16V(S+\tfrac{h}{2}) - 30V(S) + 16V(S-\tfrac{h}{2}) - V(S-h)}{3h^2}.
$$

The difference between the two levels gives an error estimate. The code reports $|\hat{G} - G_{h/2}|$, which really measures the error of the unextrapolated $G_{h/2}$, so it is a conservative bound for the extrapolated value. The convergence check is $|G_h - G_{h/2}| \approx 2^p\, |G_{h/2} - G_{h/4}|$. If that ratio breaks down, the step is either too small (noise dominates) or the payoff is not smooth enough.

### Monte Carlo and non-smooth payoffs

With Monte Carlo prices, $\epsilon$ is statistical noise. You must reprice every bump with the same random numbers (common random numbers), or the difference is swamped by noise of order $\epsilon/h$. For payoffs with kinks or discontinuities (digitals, barriers near expiry), the Taylor expansion fails near the discontinuity. Extrapolation can then make things worse, and pathwise or likelihood-ratio estimators, or smoothing, are needed instead.

## How the code is organised

Everything lives in the project brief (PDF). The dashboard imports `from finite_difference_greeks import FiniteDifferenceGreeks`. The brief doesn't name the dashboard file, so `app.py` is used here:

```text
fd-greeks/
├── finite_difference_greeks.py   # FiniteDifferenceGreeks
└── app.py                        # Black-Scholes pricer + Streamlit dashboard
```

`finite_difference_greeks.py` contains `FiniteDifferenceGreeks(pricing_function, base_params, tolerance=1e-4, min_step=1e-6, max_step=0.1)`. Every bump calls `pricing_function({**base_params, key: value})`, so the pricer must read its inputs from a dict with the keys `S`, `t`, `sigma` and `r`. The methods are:

- `compute_delta`, `compute_gamma`, `compute_vega` and `compute_rho`: central differences at $h$ and $h/2$, combined by Richardson extrapolation. With `use_richardson=False` they return a single central difference with a zero error estimate.
- `compute_theta`: the same scheme with a minus sign. Without Richardson extrapolation it uses a one-sided forward difference.
- `_adaptive_step_size`: starts at $h_0 = 0.01|x|$, clipped to `[min_step, max_step]`. For up to 10 iterations it compares the central differences at $h$ and $h/2$. It stops once they agree to within `tolerance`, halves $h$ if they differ by more than 10 times the tolerance, and otherwise shrinks $h$ by 20%. This applies only to delta and gamma; the other Greeks use $h_0$ directly. The step never grows.
- `compute_greeks_from_grid(price_grid, S_grid, t_grid=None)`: delta and gamma from neighbouring grid points, with Richardson extrapolation combining spacings $\Delta S$ and $2\Delta S$ at interior points. It assumes a uniform grid.

`app.py` defines `black_scholes_call` and a `pricing_function(params)` that reads `S`, `K`, `T`, `r` and `sigma` from the dict. It then builds the dashboard:

- **Sidebar.** It collects the option inputs, a Richardson on/off switch, the tolerance and step bounds, and the spot range and number of points for the profiles.
- **Compute Greeks button.** It shows the metric tiles, the six-panel price and Greek profile chart and the delta convergence plot.

With the default inputs ($S = K = 100$, $T = 1$, $r = 5\%$, $\sigma = 20\%$) the adaptive step for delta is $h = 0.1$. At that step the Richardson delta matches $N(d_1)$ to about $10^{-12}$, against about $10^{-6}$ for the plain central difference.

Fix these issues as you assemble the code:

1. **Theta is always zero.** `compute_theta` bumps the key `t`, but the dashboard's pricer reads `T`, so every bumped price is identical. Make the class bump `T`, or have the pricer read `t` as time to maturity.
2. **Flat Greek profiles.** In the profile chart, vega, rho and theta are computed at the sidebar spot for every point on the spot axis, because only delta and gamma receive the loop variable `s`. Their curves are therefore flat. Pass `S = s` through `base_params` for each point.
3. **Grid theta is wrong.** `compute_greeks_from_grid` computes "theta" by differencing neighbouring entries of the one-dimensional price vector along the spot grid and dividing by `dt`. That is not a time derivative. A real grid theta needs a two-dimensional grid $V(S_i, t_k)$.
4. **Unused code.** `pandas`, `minimize_scalar`, `warnings` and several `V0` evaluations are unused, and the adaptive routine catches all exceptions with a bare `except`.

## Running it

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install numpy scipy streamlit plotly
streamlit run app.py
```

To use the module with your own pricer (after fixing the theta key):

```python
import numpy as np
from scipy.stats import norm
from finite_difference_greeks import FiniteDifferenceGreeks

def price(p):
    S, K, T, r, s = p["S"], p["K"], p["T"], p["r"], p["sigma"]
    d1 = (np.log(S / K) + (r + 0.5 * s**2) * T) / (s * np.sqrt(T))
    return S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d1 - s * np.sqrt(T))

base = {"S": 100.0, "K": 100.0, "T": 1.0, "r": 0.05, "sigma": 0.2}
fd = FiniteDifferenceGreeks(price, base)
print(fd.compute_delta(100.0))          # (estimate, error estimate)
print(fd.compute_gamma(100.0))
print(fd.compute_vega(0.2), fd.compute_rho(0.05))
```

## Extending the project

- **Monte Carlo Greeks.** Plug in a Monte Carlo pricer with a fixed seed (common random numbers) and without one. Plot the Greek error against $h$ in both cases and show where the optimum moves. Add Monte Carlo standard errors to the error estimate.
- **A PDE grid source.** Write a Crank-Nicolson Black-Scholes solver that returns $V(S_i, t_k)$, and fix `compute_greeks_from_grid` to give delta, gamma and theta from the two-dimensional grid, including non-uniform grids.
- **Cross-Greeks and higher orders.** Add vanna ($\partial^2 V / \partial S \partial \sigma$), volga and speed using mixed central stencils and Richardson extrapolation. Count the pricings each needs.
- **Better step control.** Let the adaptive routine also coarsen $h$, estimate $\epsilon$ from repeated pricings, apply it to every Greek, and use relative tolerances. Show the empirical error curve with the chosen $h$ marked.
- **Non-smooth payoffs.** Test a digital or barrier option and compare finite differences with and without extrapolation against the analytic Greeks. Then implement a pathwise or likelihood-ratio estimator.

## Interview questions

**Q:** Explain the truncation against round-off trade-off.

**A:** Truncation error comes from the Taylor remainder and shrinks like $h^p$. Round-off or pricing-noise error is roughly $\epsilon/h$ for a first derivative, and grows as $h$ shrinks. The total is minimised at an interior $h^* \propto \epsilon^{1/(p+1)}$. Richardson extrapolation raises the order $p$, which allows a larger, safer $h$ for the same accuracy, but it cannot remove the noise term.

**Q:** Derive Richardson extrapolation for a central difference.

**A:** $D_h = V' + c h^2 + O(h^4)$ and $D_{h/2} = V' + c h^2/4 + O(h^4)$. Multiply the second by 4 and subtract the first to get $3V' + O(h^4)$. So $V' \approx (4D_{h/2} - D_h)/3$, which is fourth-order accurate. The $h^3$ terms are absent because the central stencil is symmetric.

**Q:** Why prefer central to one-sided differences?

**A:** They are second-order rather than first-order for the same number of extra pricings. One-sided differences are needed at boundaries: theta at expiry, volatility or rates close to zero, or a spot next to a barrier where you must not bump across.

**Q:** How would you compute Greeks from a Monte Carlo pricer?

**A:** Reprice the bumped scenarios with common random numbers, so that the noise largely cancels in the difference, and choose $h$ larger than you would for an analytic pricer. Report a standard error for the Greek itself. For discontinuous payoffs, prefer pathwise derivatives (for Lipschitz payoffs) or the likelihood-ratio method, or smooth the payoff.

**Q:** How would you make the adaptive scheme robust for barrier or digital options?

**A:** Detect non-smoothness by checking that successive refinements shrink at the expected rate $2^p$. If they don't, stop refining, fall back to the lower-order estimate, or switch to a larger smoothing step. Never let a bump cross the barrier, and use one-sided stencils near it.

**Q:** How would you validate a finite-difference Greek engine?

**A:** Use four checks:
- Benchmark against closed-form Black-Scholes Greeks across moneyness and maturity.
- Check identities, for example that the Black-Scholes PDE is satisfied: $\Theta = r V - rS\Delta - \tfrac{1}{2}\sigma^2 S^2 \Gamma$, with $\Theta = -\partial V / \partial \tau$.
- Plot error against $h$ on log-log axes and confirm the slopes are 2 and 4.
- Compare with an independent method such as pathwise Monte Carlo or a PDE grid.

**Q:** What do the two error estimates in the dashboard actually measure?

**A:** The code reports $|\hat G - G_{h/2}|$, the change from extrapolating. It is a reasonable estimate of the error in $G_{h/2}$, and therefore an upper-bound proxy for the extrapolated value, which is usually far more accurate. It says nothing about systematic errors in the pricer itself, and here theta's zero error estimate is a symptom of the key bug, not of accuracy.

## CV bullet points

- Built a pricer-agnostic Python library for bump-and-reprice Greeks (delta, gamma, theta, vega, rho) using central differences, Richardson extrapolation and adaptive step selection.
- Demonstrated fourth-order convergence against analytic Black-Scholes Greeks, reducing delta error from [X] to [Y] at a step of [h], and documented the optimal-step trade-off on log-log error plots.
- Identified and fixed [N] defects in the reference implementation (including a parameter-key mismatch that zeroed theta), adding [N] regression tests against closed-form Greeks.
- Extended the framework to [Monte Carlo pricers with common random numbers / PDE price grids], producing Greeks with [X]% lower standard error than independent-seed bumping.
