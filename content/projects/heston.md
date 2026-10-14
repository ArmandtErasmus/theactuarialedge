---
title: Heston Stochastic Volatility with Monte Carlo
slug: heston
summary: Simulate the Heston model with exact non-central chi-squared variance sampling and price European, Asian and up-and-out barrier calls by Monte Carlo.
area: Derivatives Pricing
level: Advanced
stack: [Python, NumPy, SciPy, pandas, Streamlit, Plotly]
tags: [Heston, Stochastic Volatility, Monte Carlo, CIR Process, Exotic Options, Characteristic Function]
image: /assets/projects/heston/heston.png
download: /assets/projects/heston/heston-brief.pdf
order: 4
---

## Overview

Black-Scholes assumes volatility is constant. Real volatility clusters, mean-reverts and tends to rise when prices fall. The Heston model captures these effects by giving the variance its own mean-reverting square-root process, correlated with the asset. It produces a volatility smile and skew, and it still has a semi-closed-form characteristic function, which is why it is the workhorse stochastic volatility model in equity and FX.

Simulating Heston needs care. A naive Euler step on the variance can go negative. In this project the variance is sampled exactly from its non-central chi-squared transition law, so it can never go negative, and the log-price is advanced with a scheme that couples it to the variance increment. You then price a European call, an arithmetic Asian call and an up-and-out barrier call by Monte Carlo, and explore paths, distributions and convergence in a Streamlit dashboard.

The download is a 13-page project brief (PDF) with the theory, the model and pricer classes, the dashboard, interview questions and CV bullets.

## What you'll build

- A `HestonModel` class with:
  - a Feller-condition check
  - exact CIR variance sampling
  - path simulation
  - Monte Carlo pricing of a European call, with a standard error
  - the Heston characteristic function
- A `HestonOptionPricer` for path-dependent payoffs: an arithmetic-average Asian call and a discretely monitored up-and-out call.
- A Streamlit dashboard that shows:
  - sliders for the model, market, simulation and option parameters
  - the price, standard error and 95% confidence interval
  - fan charts of price and variance paths
  - histograms of terminal price and variance
  - a price and standard-error convergence plot

## The theory

### Model dynamics

Under the risk-neutral measure, the asset $S_t$ and its instantaneous variance $v_t$ follow

$$
dS_t = r S_t\, dt + \sqrt{v_t}\, S_t\, dW^S_t, \qquad dv_t = \kappa(\theta - v_t)\, dt + \sigma_v \sqrt{v_t}\, dW^v_t, \qquad d\langle W^S, W^v\rangle_t = \rho\, dt .
$$

The parameters are:

- $\kappa$: the speed of mean reversion
- $\theta$: the long-run variance
- $\sigma_v$: the volatility of variance ("vol of vol")
- $\rho$: the spot-volatility correlation, usually negative for equities (the leverage effect)

The Feller condition $2\kappa\theta \ge \sigma_v^2$ keeps $v_t$ strictly positive. When it fails, zero is accessible but reflecting. The code warns when the condition is violated.

### Exact variance transition

The variance is a CIR process. Its transition law over a step $\Delta t$ is a scaled non-central chi-squared distribution:

$$
v_{t+\Delta t} = c\, \chi'^2_{d}(\lambda), \qquad c = \frac{\sigma_v^2 (1 - e^{-\kappa \Delta t})}{4\kappa}, \quad d = \frac{4\kappa\theta}{\sigma_v^2}, \quad \lambda = \frac{4\kappa e^{-\kappa\Delta t}}{\sigma_v^2 (1 - e^{-\kappa\Delta t})}\, v_t .
$$

Sampling from this law (with `scipy.stats.ncx2`) is exact at the grid dates. There is no discretisation bias in $v$ and no negative variance, whether or not Feller holds.

### Advancing the log-price

Write $x_t = \ln S_t$ and decompose $W^S = \rho W^v + \sqrt{1-\rho^2}\, W^\perp$. Integrating over $[t, t+\Delta t]$ gives

$$
x_{t+\Delta t} = x_t + r\Delta t - \tfrac{1}{2}\int_t^{t+\Delta t} v_s\, ds + \rho \int_t^{t+\Delta t} \sqrt{v_s}\, dW^v_s + \sqrt{1-\rho^2} \int_t^{t+\Delta t} \sqrt{v_s}\, dW^\perp_s .
$$

The variance SDE lets you eliminate the correlated stochastic integral exactly:

$$
\int_t^{t+\Delta t} \sqrt{v_s}\, dW^v_s = \frac{1}{\sigma_v}\left( v_{t+\Delta t} - v_t - \kappa\theta\Delta t + \kappa \int_t^{t+\Delta t} v_s\, ds \right).
$$

Conditional on the variance path, the last term is normal with variance $(1-\rho^2)\int v_s\, ds$. The code approximates $\int v_s\, ds$ by $v_t \Delta t$ in the drift and by $\bar{v}\,\Delta t$ (with $\bar v = \tfrac{1}{2}(v_t + v_{t+\Delta t})$) in the diffusion. This gives the update it implements:

$$
x_{t+\Delta t} = x_t + r\Delta t + K_0 + K_1 v_t + K_2 v_{t+\Delta t} + \sqrt{K_3\, \bar v}\; Z, \qquad Z \sim N(0,1),
$$

$$
K_0 = -\frac{\rho\kappa\theta}{\sigma_v}\Delta t, \quad K_1 = \left(\frac{\rho\kappa}{\sigma_v} - \frac{1}{2}\right)\Delta t - \frac{\rho}{\sigma_v}, \quad K_2 = \frac{\rho}{\sigma_v}, \quad K_3 = (1-\rho^2)\Delta t .
$$

This is the structure of the Broadie-Kaya and Andersen schemes. The variance step is exact, and the integrated variance is approximated, so the scheme as a whole is not bias-free.

### Monte Carlo pricing

With $M$ simulated paths, the discounted payoff $Y^{(m)} = e^{-rT} h(S^{(m)})$ gives

$$
\hat{V} = \frac{1}{M}\sum_{m=1}^{M} Y^{(m)}, \qquad \mathrm{SE} = \frac{s_Y}{\sqrt{M}}, \qquad \text{95\% CI} = \hat V \pm 1.96\, \mathrm{SE},
$$

where $s_Y$ is the sample standard deviation of the discounted payoffs. The code uses three payoffs:

- European call: $(S_T - K)^+$
- arithmetic Asian call: $\left(\frac{1}{N+1}\sum_{i=0}^{N} S_{t_i} - K\right)^+$, where the average includes $S_0$
- up-and-out call: $(S_T - K)^+ \mathbf{1}\{\max_i S_{t_i} < B\}$, monitored only at the grid dates

### The characteristic function

The characteristic function of $X_T = \ln S_T$ is known in closed form:

$$
\varphi(u) = \exp\!\big( C(u,T) + D(u,T)\, v_0 + iu X_0 \big),
$$

$$
C = r iu T + \frac{\kappa\theta}{\sigma_v^2}\left[ (\kappa - \rho\sigma_v iu - d)T - 2\ln\frac{1 - g e^{-dT}}{1-g} \right], \qquad D = \frac{\kappa - \rho\sigma_v iu - d}{\sigma_v^2}\cdot\frac{1 - e^{-dT}}{1 - g e^{-dT}},
$$

$$
d = \sqrt{(\rho\sigma_v iu - \kappa)^2 + \sigma_v^2 (iu + u^2)}, \qquad g = \frac{\kappa - \rho\sigma_v iu - d}{\kappa - \rho\sigma_v iu + d}.
$$

Fourier inversion of $\varphi$, for example with the Carr-Madan damped transform, gives European prices to high accuracy. It is the natural benchmark for the Monte Carlo engine, and it is what calibration to an implied-volatility surface uses in practice.

## How the code is organised

Everything lives in the project brief (PDF). The dashboard imports `from heston_model import HestonModel, HestonOptionPricer`. The brief doesn't name the dashboard file, so `app.py` is used here:

```text
heston-mc/
├── heston_model.py   # HestonModel, HestonOptionPricer
└── app.py            # Streamlit dashboard
```

`heston_model.py` contains two classes.

`HestonModel(kappa, theta, sigma_v, rho, v0, r=0.05)` has these methods:

- `exact_variance_step(v_t, dt, ...)`: draws $v_{t+\Delta t}$ from the scaled non-central chi-squared law.
- `simulate_path_exact(S0, T, n_steps, num_paths, seed)`: returns `(S, v)` arrays of shape `(num_paths, n_steps + 1)` using the log-price update above. It is vectorised across paths and loops over time steps.
- `price_european_call_mc(...)`: returns `(price, std_error)`.
- `characteristic_function(u, T, S0)`: implements $\varphi(u)$.
- `price_european_call_fft(...)`: an attempted Carr-Madan pricer, which you need to repair (see below).

`HestonOptionPricer(model)` has two methods:

- `price_asian_call(...)`: arithmetic average over all grid dates, including $S_0$.
- `price_barrier_up_and_out_call(...)`: knocks out if the path maximum on the grid reaches $B$.

`app.py` has a sidebar and a **Run Simulation** button:

- **Sidebar.** It has four groups of sliders:
  - model: $\kappa$, $\theta$, $\sigma_v$, $\rho$ and $v_0$
  - market: $S_0$ and $r$
  - simulation: 1,000 to 50,000 paths and 50 to 500 steps, plus the horizon $T$
  - option: strike, payoff type and barrier level
- **Run Simulation button.** It shows the price, standard error and 95% CI, then plots up to 100 price and variance paths with mean and band, histograms of $S_T$ and $v_T$, and a convergence study over 1,000 to 50,000 paths.

Know these issues before you rely on the results:

1. **The Fourier pricer is broken as written.** It refers to an undefined name `r` (use `self.r`). Even after that fix, it returns $S_0 - Ke^{-rT}\times(\text{integral})$, but the damped integral already is the call price. The quadrature also starts at $u = \Delta u$ rather than $0$. Treat it as an exercise: rebuild it from the Carr-Madan formula and test it against an independent numerical integration. The dashboard doesn't call it.
2. **Unused random draws.** `exact_variance_step` ignores the normal draws passed to it, because `ncx2.rvs` draws its own randomness, and the correlated normal `Z_corr` is computed but never used. Correlation enters only through the $K$ coefficients, which is correct for this scheme.
3. **Separate simulations.** The dashboard simulates one set of paths for the charts and separate sets inside each pricing call, so the plotted paths are not the ones that were priced.
4. **Discrete monitoring.** The barrier is monitored only at grid dates, so the up-and-out price rises as you reduce the number of steps.

## Running it

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install numpy scipy pandas streamlit plotly
streamlit run app.py
```

Set the parameters in the sidebar and click **Run Simulation**. To check the engine outside the UI:

```python
from heston_model import HestonModel, HestonOptionPricer

model = HestonModel(kappa=2.0, theta=0.04, sigma_v=0.3, rho=-0.7, v0=0.04, r=0.05)
price, se = model.price_european_call_mc(S0=100, K=100, T=1.0, num_paths=50000, n_steps=100)
print(price, se)

S, v = model.simulate_path_exact(100, 1.0, 100, 50000, seed=1)
print(S[:, -1].mean())   # should be close to the forward 100 * exp(0.05)
```

## Extending the project

- **A working Fourier pricer.** Implement Carr-Madan (or the Gil-Pelaez two-probability form) properly and use it to measure the Monte Carlo bias as a function of time step. Plot price error against $\Delta t$ for fixed $M$.
- **Calibration.** Generate or source a grid of implied volatilities, then calibrate $(\kappa, \theta, \sigma_v, \rho, v_0)$ by minimising squared vol errors with `scipy.optimize`, using the Fourier pricer inside the loop. Discuss parameter identifiability, for example the trade-off between $\kappa$ and $\sigma_v$.
- **Scheme comparison.** Add a full-truncation Euler scheme and Andersen's QE scheme. Compare bias, runtime and behaviour when the Feller condition fails. (The brief lists this comparison as an expected output, but the code doesn't include it.)
- **Variance reduction.** Add antithetic variates and a control variate (the Fourier European price for the European payoff, or a geometric Asian for the Asian), and report the variance-reduction factor.
- **Better barriers.** Apply a Brownian-bridge correction or the Broadie-Glasserman-Kou shift for continuous monitoring, and add down-and-out and knock-in variants.

## Interview questions

**Q:** Why sample the variance exactly rather than with Euler-Maruyama?

**A:** An Euler step $v + \kappa(\theta - v)\Delta t + \sigma_v\sqrt{v\Delta t}\,Z$ can go negative, which forces ad hoc fixes (absorption, reflection, truncation), and each fix adds bias. This is worst when the Feller condition fails, which is common for calibrated equity parameters. Sampling the non-central chi-squared law is exact at grid dates and always non-negative.

**Q:** How does $\rho$ affect option prices?

**A:** Negative $\rho$ means volatility rises as the price falls. That fattens the left tail of the return distribution and thins the right tail, which creates a downward-sloping implied-volatility skew: it raises out-of-the-money put prices and lowers out-of-the-money call prices. Positive $\rho$ does the opposite, as in some commodity markets. $\sigma_v$ mainly controls the curvature of the smile.

**Q:** What is the Feller condition, and does it matter here?

**A:** $2\kappa\theta \ge \sigma_v^2$ ensures the variance never reaches zero. With exact sampling the simulation stays valid either way. The condition matters more for discretisation schemes and for the economic plausibility of the parameters.

**Q:** Monte Carlo or Fourier for European options?

**A:** Fourier methods are much faster and more accurate for European payoffs, so they are used for calibration. Monte Carlo is slower, with error falling only as $O(M^{-1/2})$, but it handles path dependence (Asians, barriers, early exercise with regression) and is easy to extend. A common workflow is to calibrate with Fourier and price exotics with Monte Carlo, using the Fourier price as a control variate.

**Q:** How would you calibrate the model, and what goes wrong?

**A:** Minimise weighted squared differences between market and model implied volatilities across strikes and maturities, with local optimisers started from a sensible guess or a global search. The common problems are:
- the objective is non-convex, with several local minima
- parameters are only weakly identified, for example $\kappa$ against $\sigma_v$
- calibrated parameters jump from day to day
- the model may simply be unable to fit very short-dated skews, which motivates adding jumps (Bates)

**Q:** How does $\kappa$ relate to volatility clustering?

**A:** $\kappa$ sets the half-life of variance shocks, $\ln 2 / \kappa$. Low $\kappa$ means shocks persist, giving long volatile spells and a term structure of implied volatility that flattens slowly. High $\kappa$ pulls variance back to $\theta$ quickly, so long-dated options behave almost as if volatility were constant at $\sqrt{\theta}$.

**Q:** Why does the up-and-out price depend on the number of time steps?

**A:** The barrier is checked only at grid dates, so a path can cross $B$ between dates without being knocked out. Fewer steps mean fewer knock-outs and a higher price. A Brownian-bridge crossing probability or a barrier shift corrects for this.

## CV bullet points

- Implemented a Heston stochastic volatility Monte Carlo engine in Python with exact non-central chi-squared variance sampling, pricing European, Asian and barrier calls across [N] paths with reported standard errors.
- Built a Streamlit dashboard to visualise price and variance paths, terminal distributions and Monte Carlo convergence, used to study the effect of [rho / vol-of-vol] on prices ([X]% change in the price of a [Y]-delta option).
- Validated Monte Carlo prices against a Fourier (characteristic-function) benchmark, achieving [X] bp agreement at [N] paths and [M] time steps.
- Calibrated the model to [N] implied-volatility quotes, reaching an RMSE of [X] vol points, and reduced pricing variance by [X]x with [antithetic / control variate] techniques.
