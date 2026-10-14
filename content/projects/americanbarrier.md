---
title: American Barrier Options via Longstaff-Schwartz
slug: americanbarrier
summary: Price American knock-out and knock-in options with least-squares Monte Carlo (Longstaff-Schwartz), Laguerre regression and a Streamlit analysis dashboard.
area: Derivatives Pricing
level: Advanced
stack: [Python, NumPy, scikit-learn, pandas, Streamlit, Plotly]
tags: [Longstaff-Schwartz, American Options, Barrier Options, Least-Squares Monte Carlo, Optimal Stopping]
image: /assets/projects/americanbarrier/american-barrier.png
download: /assets/projects/americanbarrier/americanbarrier-brief.pdf
order: 5
---

## Overview

An American option can be exercised at any time up to maturity, so pricing it means solving an optimal stopping problem: at every date the holder compares the value of exercising now with the value of waiting. Add a barrier and the payoff becomes path-dependent as well. A knock-out option dies the moment the barrier is touched, and a knock-in only comes alive once it is. Lattices and PDEs handle one-factor cases well, but simulation is the method that scales to path dependence and many factors.

The Longstaff-Schwartz least-squares Monte Carlo (LSM) algorithm estimates the continuation value by regressing realised discounted cash flows on functions of the current state, working backwards from maturity. In this project you implement LSM for American calls and puts with up-and-out, down-and-out, up-and-in and down-and-in barriers under geometric Brownian motion. You compare the result with the European barrier price to measure the early-exercise premium, and explore paths, hit rates, sensitivities and convergence in a Streamlit dashboard.

The download is a 16-page project brief (PDF) with the theory, the pricing class, the dashboard, interview questions and CV bullets.

## What you'll build

- An `AmericanBarrierOption` class with:
  - GBM path simulation with a dividend yield, tracking the running maximum or minimum
  - barrier-aware intrinsic values
  - a Laguerre polynomial basis
  - an LSM pricer that returns a price and standard error
  - a Monte Carlo European barrier pricer
- A Streamlit dashboard showing:
  - moneyness, barrier ratio and total-volatility metrics
  - American and European prices, the early-exercise premium and a 95% confidence interval
  - the barrier hit rate and the in-the-money rate at expiry
  - alive and knocked-out path plots
  - histograms of terminal and extreme prices
  - strike and barrier sensitivity curves
  - a convergence study

## The theory

### The optimal stopping problem

The American option value is the supremum over stopping times $\tau$ taking values in $[t, T]$:

$$
V(t, S_t) = \sup_{\tau \in \mathcal{T}_{t,T}} \mathbb{E}^{\mathbb{Q}}\!\left[ e^{-r(\tau - t)}\, h(S_\tau, M_\tau) \,\middle|\, \mathcal{F}_t \right].
$$

Here $h$ is the exercise value and $M_t$ is the running maximum (or minimum) needed to know the barrier status. On a discrete grid $t_0 < t_1 < \dots < t_N = T$ this becomes the dynamic programming recursion

$$
V(t_i) = \max\big( h(t_i),\; C(t_i) \big), \qquad C(t_i) = \mathbb{E}^{\mathbb{Q}}\!\left[ e^{-r\Delta t} V(t_{i+1}) \,\middle|\, \mathcal{F}_{t_i} \right].
$$

### Barrier payoffs

For an up-and-out call with barrier $B$ and $M_T = \max_{0 \le t \le T} S_t$:

$$
h(S_T, M_T) = (S_T - K)^+\, \mathbf{1}\{ M_T < B \}.
$$

Down-and-out options use the running minimum and require $M_T > B$. Knock-ins pay only if the barrier has been reached, which gives the in-out parity for European barriers: knock-in plus knock-out equals the vanilla option. Before exercise, the American holder must check that the option is "alive", meaning not knocked out (for knock-outs) or already knocked in (for knock-ins).

### Least-squares regression of the continuation value

LSM approximates $C(t_i)$ by a regression on basis functions of the state:

$$
C(t_i, S) \approx \sum_{j=0}^{J} \beta_j\, \phi_j(S),
$$

with $\beta$ fitted by ordinary least squares. The fit uses only paths that are both in the money and alive, because only they face an exercise decision. The code uses Laguerre polynomials of the normalised price $x = S/K$:

$$
L_0(x) = 1, \quad L_1(x) = 1 - x, \quad L_2(x) = \tfrac{1}{2}(x^2 - 4x + 2), \quad L_{j}(x) = \frac{(2j - 1 - x)\,L_{j-1}(x) - (j-1)\,L_{j-2}(x)}{j}.
$$

Normalising by $K$ keeps the basis well scaled. The degree $J$ trades bias (too few terms underfit $C$) against variance (too many fit Monte Carlo noise and make poor exercise decisions).

### The algorithm

1. Simulate $M$ GBM paths exactly on the grid, with $S_{t_{i+1}} = S_{t_i} \exp\!\big( (r - q - \tfrac{1}{2}\sigma^2)\Delta t + \sigma\sqrt{\Delta t}\, Z_i \big)$, and accumulate the running maximum or minimum.
2. Set the cash flow at maturity to the barrier-adjusted payoff.
3. For $i = N-1, \dots, 0$:
   - Select the paths that are in the money and alive.
   - For each selected path, set $Y$ to its next future cash flow, discounted back to $t_i$.
   - Regress $Y$ on $L_0(S/K), \dots, L_J(S/K)$.
   - Exercise wherever $h(t_i) > \hat{C}(t_i)$, then record the cash flow at $t_i$ and zero all later cash flows on that path.
4. Price the option as the average of the discounted cash flows at each path's exercise date, with standard error $s/\sqrt{M}$.

The regression is used only to decide when to exercise. The value is then computed from the realised cash flows, which avoids compounding the regression error. Because the same paths are used for the regression and the valuation, the estimate has a small foresight bias. Any sub-optimal exercise rule biases the estimate downwards, so a fresh set of paths for valuation gives a lower bound.

### Error and convergence

The estimator converges to the true price as $M \to \infty$ and $N \to \infty$, provided the basis can represent the continuation value. The Monte Carlo error falls as $O(M^{-1/2})$. The barrier is monitored only at grid dates, so for a fixed number of steps the price is that of a discretely monitored barrier.

## How the code is organised

Everything lives in the project brief (PDF). The dashboard imports `from american_barrier_option import AmericanBarrierOption`. The brief doesn't name the dashboard file, so `app.py` is used here:

```text
american-barrier-lsm/
├── american_barrier_option.py   # AmericanBarrierOption
└── app.py                       # Streamlit dashboard
```

`american_barrier_option.py` contains `AmericanBarrierOption(S0, K, T, r, sigma, barrier, barrier_type='up-and-out', option_type='call', dividend=0.0)`. The constructor warns if a knock-out starts already knocked out. Its methods are:

- `simulate_paths(num_paths, num_steps, seed)`: exact GBM steps with dividend yield. Returns prices `S` and the running extreme `M` (a maximum for "up" barriers, a minimum for "down" barriers).
- `intrinsic_value(S, M, time_idx)`: the call or put payoff, set to zero where the barrier status rules out exercise.
- `laguerre_polynomials(x, degree)`: the basis by the recurrence above.
- `price_lsm(num_paths=10000, num_steps=252, basis_degree=3, seed=None)`: the backward induction above. It uses scikit-learn's `LinearRegression`, and falls back to the raw cash flows when there are too few candidate paths for the regression.
- `price_european_barrier(num_paths=100000, seed=None)`: the Monte Carlo price of the same barrier option without early exercise.

`app.py` is the dashboard:

- **Sidebar.** It collects the market inputs ($S_0$, $r$, $\sigma$, dividend yield), the option inputs ($K$, $T$, call or put), the barrier type and level, and the simulation settings: 1,000 to 50,000 paths, 50 to 500 steps, basis degree 1 to 5, and a seed (0 means random).
- **Run Pricing Simulation button.** It shows the American and European prices, the early-exercise premium, the confidence interval, the hit and in-the-money rates, path and histogram plots, strike and barrier sensitivity curves (20 points each at 5,000 paths) and the convergence plot.

Know these issues before you interpret the results:

1. **Mismatched grids.** `price_european_barrier` always uses 252 steps. If you choose a different number of steps for the LSM price, the "early-exercise premium" also contains the difference in barrier-monitoring frequency between the two prices. Add a `num_steps` argument to the European pricer, or use 252 steps for both.
2. **Wasted work.** `intrinsic_value` recomputes the payoff for the whole path matrix at every backward step and ignores `time_idx`. The continuation-value search is also a Python loop over paths. Both are correct but slow, and the sensitivity and convergence sections re-run the full LSM about 50 times.
3. **Mislabelled scheme.** The brief calls the GBM step "Euler-Maruyama". The log-space update is actually the exact GBM transition, so there is no time-discretisation error in $S$ at the grid dates; the only grid effect is barrier monitoring.

## Running it

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install numpy pandas scikit-learn streamlit plotly
streamlit run app.py
```

For a quick check outside the UI, the American price must be at least the European price on the same grid, allowing for Monte Carlo error. This uses 252 steps to match the European pricer, and the per-path loops make it take a while:

```python
from american_barrier_option import AmericanBarrierOption

opt = AmericanBarrierOption(S0=100, K=100, T=1.0, r=0.05, sigma=0.2,
                            barrier=70, barrier_type="down-and-out", option_type="put")
am, am_se = opt.price_lsm(num_paths=10000, num_steps=252, basis_degree=3, seed=42)
eu, eu_se = opt.price_european_barrier(num_paths=10000, seed=42)
print(am, am_se, eu, eu_se)
```

## Extending the project

- **Benchmark against a lattice.** Price the same options on a binomial or trinomial tree with the barrier on a node layer, or with a finite-difference PDE solver. Show LSM convergence towards the benchmark as paths, steps and basis degree increase.
- **Lower and upper bounds.** Estimate the exercise rule on one set of paths and value it on an independent set (a lower bound). Then implement the Andersen-Broadie duality upper bound and report the gap.
- **Continuous monitoring.** Add a Brownian-bridge correction: on each step, kill the path with the probability that it crossed the barrier between grid dates. Compare with the discrete-monitoring price.
- **Vectorise.** Compute intrinsic values once, track exercise times as an index array, and replace the per-path loops with NumPy operations. Measure the speed-up.
- **Richer dynamics or more assets.** Swap GBM for Heston paths (see the Heston project) or for a two-asset basket with a barrier on one asset, and add the barrier status or the other asset to the regression state.

## Interview questions

**Q:** Explain the Longstaff-Schwartz algorithm in one minute.

**A:** Simulate paths forward, then work backwards from maturity. At each exercise date, take the in-the-money paths and regress their realised discounted future cash flows on basis functions of the current state. The fitted value estimates the continuation value. Exercise where the intrinsic value exceeds it, update the cash flows, and keep stepping back. The price is the average discounted cash flow under that exercise rule.

**Q:** Why regress only on in-the-money paths?

**A:** Only those paths face an exercise decision, and the continuation function behaves differently far out of the money. Including those paths wastes basis flexibility and degrades the fit where it matters. For barrier options you also exclude dead paths (knocked out, or not yet knocked in), because they cannot be exercised.

**Q:** How do you choose the basis functions?

**A:** Use a small number of smooth functions of the state. Weighted Laguerre or Hermite polynomials and plain monomials of the normalised price are standard, and orthogonal families are better conditioned. Increase the degree until the price stops moving relative to its standard error. With more state variables, add cross terms or the payoff itself as a regressor.

**Q:** Is the LSM price biased?

**A:** Two effects pull in opposite directions. Any estimated exercise rule is sub-optimal, which biases the price down. Using the same paths for the regression and the valuation gives foresight, which biases it up. Valuing out of sample gives a true lower bound, and duality methods give an upper bound.

**Q:** When is early exercise valuable for a barrier option?

**A:** For puts, deep in the money with high rates. For a vanilla call on a non-dividend stock, early exercise is never optimal. An up-and-out call is different: as the price nears the barrier, waiting risks losing everything, so exercising just below the barrier can be optimal. That produces a large early-exercise premium even without dividends.

**Q:** How do the barrier level and volatility affect the price of an up-and-out call?

**A:** A barrier closer to spot raises the knock-out probability and lowers the price. Higher volatility increases the upside of a vanilla call but also the probability of knock-out, so the up-and-out price can fall as volatility rises. That makes vega ambiguous in sign and the Greeks unstable near the barrier.

**Q:** Why does the price depend on the number of time steps here?

**A:** The barrier is checked only on the grid, so more steps catch more crossings and lower the knock-out price, converging to the continuous-monitoring price roughly as $O(\sqrt{\Delta t})$. Exercise opportunities also depend on the grid, since the option is effectively Bermudan with $N$ exercise dates.

**Q:** How would you validate the engine?

**A:** Use five checks:
- Compare the European barrier price with the closed-form Black-Scholes barrier formulas, adjusted for discrete monitoring.
- Test in-out parity.
- Check that American is at least European, and at least the intrinsic value.
- Compare the vanilla limit (barrier far away) with binomial American prices.
- Run convergence studies in paths, steps and basis degree.

## CV bullet points

- Implemented a Longstaff-Schwartz least-squares Monte Carlo engine in Python to price American options with four barrier types, using Laguerre regression of continuation values over [N] paths and [M] exercise dates.
- Quantified early-exercise premia against European barrier prices, finding [X]% premia for [option type] when [condition], with standard errors below [X].
- Validated LSM prices against [binomial tree / PDE] benchmarks to within [X] bp, and reduced runtime by [X]x by vectorising the backward induction.
- Built a Streamlit dashboard with path, hit-rate, sensitivity and convergence diagnostics, used to explain barrier and early-exercise risk to [audience].
