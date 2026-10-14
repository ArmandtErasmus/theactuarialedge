---
title: Advanced XVA Framework: FVA, MVA and KVA
slug: xva
summary: Simulate portfolio exposures and compute funding, margin and capital valuation adjustments for a synthetic swap book, with a Streamlit XVA dashboard.
area: Counterparty Risk
level: Advanced
stack: [Python, NumPy, pandas, Streamlit, Plotly]
tags: [XVA, FVA, MVA, KVA, Exposure Simulation, Initial Margin, Central Clearing, Basel III]
image: /assets/projects/xva/xva-engine.png
download: /assets/projects/xva/xva-brief.pdf
order: 3
---

## Overview

Since the financial crisis, the price of an OTC derivative is no longer just its risk-free value. Banks also charge for the cost of funding uncollateralised exposure (FVA), the cost of funding initial margin posted to a CCP or counterparty (MVA), and the cost of the regulatory capital the trade consumes (KVA). Together with CVA and DVA, these are the valuation adjustments known as XVA. Mandatory central clearing, bilateral margin rules and Basel III capital requirements made them material.

In this project you build a compact XVA engine for a synthetic multi-counterparty portfolio of swaps and FX trades. It simulates exposure paths, derives expected positive exposure (EPE), projects a simplified initial-margin profile and a stylised capital profile, and discounts the resulting cost streams into FVA, MVA and KVA. A Streamlit dashboard lets you change funding spreads, regulatory parameters and simulation settings and see how each component responds.

The download is a 27-page project brief (PDF) with the theory, the full engine, the dashboard, interview questions and CV bullets. The models are deliberately simplified so the whole pipeline fits in one file. Read the code notes below so you know exactly what is and isn't modelled.

## What you'll build

- `Trade` and `MarketData` dataclasses with input validation.
- An `ExposureSimulator` that produces exposure paths and computes EE, EPE and effective EPE.
- `FVACalculator`, `MVACalculator` and `KVACalculator` classes behind a common abstract `XVACalculator` interface.
- A `COASimulator` for close-out amounts over the margin period of risk (MPoR).
- An `XVAEngine` that puts all the calculators on a common time grid and aggregates the components.
- A synthetic portfolio generator: by default 50 trades, 250m total notional, 8 counterparties, three currencies and three trade types.
- A Streamlit dashboard showing:
  - the XVA summary and component breakdown
  - an exposure fan chart with EPE
  - the initial-margin and capital profiles
  - portfolio composition by counterparty and currency
  - a CSV export of the results

## The theory

### Exposure

Let $V(t)$ be the portfolio's mark-to-market from the bank's perspective. The positive exposure is $E^+(t) = \max(V(t), 0)$, and the key profiles are:

$$
\mathrm{EE}(t) = \mathbb{E}^{\mathbb{Q}}[V(t)], \qquad \mathrm{EPE}(t) = \mathbb{E}^{\mathbb{Q}}\!\left[\max(V(t),0)\right], \qquad \mathrm{EEPE}(t) = \max_{s \le t} \mathrm{EPE}(s).
$$

With $M$ Monte Carlo paths these are estimated by sample means across paths at each grid date. (The code calls the mean of $V(t)$ "expected exposure"; it is the expected mark-to-market.) The running maximum is "effective" EPE, used in regulatory exposure measures.

### Funding valuation adjustment (FVA)

An uncollateralised positive exposure has to be funded at the bank's funding rate, which exceeds the risk-free rate by a spread $s_F(t)$. The funding cost is

$$
\mathrm{FVA} = \int_0^T \mathbb{E}^{\mathbb{Q}}\!\left[ s_F(t)\, E^+(t)\, e^{-\int_0^t r(u)\,du} \right] dt .
$$

With a constant spread and rate on a grid $0 = t_0 < \dots < t_N = T$ with step $\Delta t$, this becomes the formula the code implements:

$$
\mathrm{FVA} \approx \sum_{i=0}^{N-1} s_F \, \mathrm{EPE}(t_i)\, e^{-r t_i}\, \Delta t .
$$

Only the funding cost of positive exposure is included. There is no funding benefit term on negative exposure.

### Margin valuation adjustment (MVA)

Initial margin (IM) posted must also be funded. With an IM profile $\mathrm{IM}(t)$:

$$
\mathrm{MVA} = \int_0^T \mathbb{E}^{\mathbb{Q}}\!\left[ s_F(t)\, \mathrm{IM}(t)\, e^{-\int_0^t r(u)\,du} \right] dt \;\approx\; \sum_{i=0}^{N} s_F\, \mathrm{IM}(t_i)\, e^{-r t_i}\, \Delta t .
$$

For non-cleared trades IM is typically computed with ISDA SIMM, and for cleared trades with the CCP's own model. Within a SIMM risk class, the delta margin aggregates weighted sensitivities $WS_k = RW_k \, s_k$ with prescribed correlations:

$$
K = \sqrt{ \sum_k WS_k^2 + \sum_{k} \sum_{l \ne k} \rho_{kl}\, WS_k\, WS_l } ,
$$

with further aggregation across buckets and risk classes, plus vega and curvature margins.

The project uses a much simpler proxy, evaluated deterministically on the time grid. For live trades with notional $N_j$, currency volatility $\sigma_j$ and remaining maturity $\tau_j$, it defines a delta term $D = \sum_j N_j \sigma_j \sqrt{\tau_j}$ and a vega term $G = \sum_j N_j \sigma_j \tau_j$. Then

$$
\mathrm{IM}(t) = 1.1 \times RW_{\mathrm{IM}} \times \sqrt{D^2 + G^2 + 2 \cdot 0.5 \cdot D \cdot G}, \qquad RW_{\mathrm{IM}} = 0.02 \text{ by default},
$$

where the factor $1.1$ is a flat allowance for concentration and curvature.

### Capital valuation adjustment (KVA)

KVA charges the cost of holding capital $K(t)$ over the life of the portfolio at a hurdle rate, the cost of capital (CoC):

$$
\mathrm{KVA} = \mathrm{CoC} \int_0^T \mathbb{E}^{\mathbb{Q}}\!\left[ K(t)\, e^{-\int_0^t r(u)\,du} \right] dt \;\approx\; \sum_{i=0}^{N} \mathrm{CoC}\, K(t_i)\, e^{-r t_i}\, \Delta t .
$$

The capital charge is stylised on the structure of the Basel CVA capital formulas: risk-weighted exposures, aggregated across counterparties with a correlation, then scaled by a multiplier.

$$
K(t) = \alpha \sqrt{ \sum_{c} \sum_{d} \rho_{cd}\, (RW \cdot \mathrm{EAD}_c(t))\,(RW \cdot \mathrm{EAD}_d(t)) }, \qquad \rho_{cd} = \begin{cases} 1 & c = d \\ 0.3 & c \ne d \end{cases}
$$

The defaults are $\alpha = 1.25$, $RW = 0.5$ and CoC $= 10\%$. $\mathrm{EAD}_c(t)$ is the portfolio EPE at $t$, allocated to counterparty $c$ in proportion to its share of live notional. This is a teaching formula, not the regulatory BA-CVA or SA-CVA calculation.

### Margin period of risk and close-out amount

When a counterparty defaults, the surviving party is exposed to market moves between the last successful margin call and the close-out of the portfolio. That interval is the MPoR, typically a few days for cleared trades and longer for bilateral ones. The close-out amount is

$$
\mathrm{COA}(t) = \max\!\left( \Delta V_{[t,\,t+\tau_{\mathrm{MPoR}}]} - \mathrm{IM}(t) - \mathrm{VM}(t),\; 0 \right),
$$

which the `COASimulator` estimates by simulating the portfolio value change over a 5-day MPoR (by default).

### Aggregation

The engine reports $\text{Total XVA} = \mathrm{FVA} + \mathrm{MVA} + \mathrm{KVA}$. CVA and DVA are not computed. Counterparty CDS spreads are part of the market data but are not used in any calculation.

## How the code is organised

Everything lives in the project brief (PDF). The dashboard imports from `xva_engine`. The brief doesn't name the dashboard file, so `app.py` is used here:

```text
xva-framework/
├── xva_engine.py   # data model, simulators, calculators, engine, portfolio generator
└── app.py          # Streamlit dashboard
```

`xva_engine.py` contains:

- **`Trade`.** A dataclass holding ID, counterparty, notional, maturity, currency, type (`IRS`, `CCS`, `FX`), an optional fixed rate and a start date. It rejects non-positive notional or maturity.
- **`MarketData`.** Holds the risk-free rate, funding spread, CDS spreads, volatility by currency, a correlation matrix, the IM risk weight (0.02) and the MPoR (5/252 years). It warns on negative rates or spreads. The correlation matrix and the `mpor` field are not used by the calculators.
- **`ExposureSimulator`.** Uses a single-factor model with one standard normal shock per path per time step, scaled by $\sqrt{\Delta t}$ and the currency volatility. Trades are revalued with simple proxies:
  - IRS: $N(K - r - \text{shock})\,\tau$
  - CCS: $N \cdot \text{shock} \cdot \tau$
  - other trades: $N \cdot \text{shock} \cdot \sqrt{\tau}$

  It also computes EE, EPE and effective EPE.
- **`FVACalculator`.** Simulates exposures, takes the EPE and applies the discrete FVA sum.
- **`MVACalculator`.** Evaluates the simplified IM proxy at each grid date and applies the MVA sum.
- **`KVACalculator`.** Computes the stylised capital profile from the simulated exposures and applies the KVA sum.
- **`COASimulator`.** Simulates close-out amounts at a single date for a given IM and VM. It is not called by `XVAEngine` or the dashboard, so use it as a standalone extension.
- **`XVAEngine`.** Builds a grid with `num_steps` points per year to the longest maturity, runs FVA, MVA and KVA (KVA reuses the FVA exposure paths) and returns the components, their total and the detailed profiles.
- **`generate_synthetic_portfolio()`.** Generates the random trades:
  - notional uniform between 0.5x and 1.5x the average trade size
  - maturities uniform between 1 and 30 years
  - random currency, trade type and counterparty
  - IRS fixed rates uniform between 1% and 5%

`app.py` is the dashboard:

- **Sidebar.** It has four groups of controls:
  - portfolio: number of trades and total notional, plus the generate button
  - market: risk-free rate, funding spread and average CDS spread
  - regulatory: CVA multiplier, risk weight and cost of capital
  - simulation: 50 to 500 Monte Carlo paths, and 12 to 52 time steps per year
- **Main area.** It shows the FVA, MVA, KVA and total metrics, a component bar chart, an exposure profile (a 5th to 95th percentile band, five sample paths and EPE), the IM and capital profiles, composition charts, a results table and a CSV download.

Know these modelling simplifications before you present results:

1. **Exposure doesn't grow with the horizon.** Shocks are drawn independently at each date rather than accumulated along a path, so exposure uncertainty doesn't grow with time as it would for a diffusing risk factor. IRS exposure is dominated by the deterministic carry term $(K - r)\tau$.
2. **Fixed spreads and a deterministic IM.** The funding spread is constant (the mean-reverting spread model in the brief is theory only), and IM is deterministic rather than simulated along paths.
3. **Theory without code.** The CCP default waterfall and the stress-testing discussion in the brief are not implemented.
4. **Speed.** The exposure loop is pure Python over paths, dates and trades, which is why the dashboard caps paths at 500. Everything is also recomputed on every widget change.

## Running it

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install numpy pandas scipy streamlit plotly
streamlit run app.py
```

Click **Generate Portfolio** in the sidebar, then adjust the parameters. The engine can also be used without the UI:

```python
import numpy as np
from xva_engine import XVAEngine, MarketData, generate_synthetic_portfolio

portfolio = generate_synthetic_portfolio(num_trades=20, total_notional=100e6)
md = MarketData(
    risk_free_rate=0.025,
    funding_spread=0.005,
    cds_spread={},
    volatility={"USD": 0.12, "EUR": 0.15, "GBP": 0.13},
    correlations=np.eye(3),
)
res = XVAEngine(num_paths=200, num_steps=12).calculate_all_xva(portfolio, md)
print({k: res[k] for k in ("FVA", "MVA", "KVA", "Total XVA")})
```

## Extending the project

- **Proper risk-factor simulation.** Replace the independent shocks with cumulative paths: a Hull-White or Vasicek short rate for each currency, lognormal FX, and correlated drivers using the `correlations` matrix through a Cholesky factor. Revalue the swaps from simulated discount curves.
- **CVA, DVA and a funding benefit.** Use the CDS spreads already in `MarketData` to bootstrap default probabilities, compute $\mathrm{CVA} = (1-R)\sum_i \mathrm{EPE}(t_i)\, \mathrm{PD}(t_{i-1}, t_i)\, D(t_i)$, and add a funding benefit on negative exposure. Then discuss the FVA and DVA overlap.
- **Dynamic initial margin (DIM).** Compute IM on each path, for example by regressing the simulated MPoR P&L on risk factors, so MVA reflects the stochastic IM. Wire `COASimulator` into the engine to produce a COA profile.
- **Performance.** Vectorise the exposure simulation across paths and trades with NumPy and cache results with `st.cache_data`. Benchmark the speed-up and raise the path limit accordingly.
- **Netting sets and CSAs.** Group trades into netting sets with variation-margin thresholds and minimum transfer amounts, and compare collateralised and uncollateralised XVA.

## Interview questions

**Q:** What does each of FVA, MVA and KVA represent?

**A:** FVA is the cost (or benefit) of funding uncollateralised derivative positions at a spread over the risk-free rate. MVA is the cost of funding the initial margin you must post over the trade's life. KVA is the cost of the regulatory capital the trade consumes, charged at the shareholders' required return.

**Q:** How does central clearing change the XVA picture?

**A:** Clearing largely removes bilateral counterparty credit risk, so CVA falls, and daily variation margin removes most of the funding need, so FVA falls. In exchange you post initial margin and contribute to the CCP default fund. That creates MVA and some capital for CCP exposure. In other words, clearing turns credit and funding cost into margin cost.

**Q:** What is the margin period of risk, and why is it shorter for cleared trades?

**A:** It is the time between the last successful margin exchange and the point at which a defaulted counterparty's portfolio is closed out or re-hedged. CCPs have operational default-management processes and daily (or intraday) margining, so a few days is typical. Bilateral trades need longer to detect the default, dispute and close out. A longer MPoR increases the close-out amount and therefore IM and exposure.

**Q:** Why is FVA controversial?

**A:** One school (Hull and White) argues that funding costs shouldn't affect a derivative's value, because they reflect the bank's own credit risk and are offset by a DVA-like benefit to creditors. Practitioners argue the treasury cost is real and must be charged to desks. There is also a double-counting risk between DVA and the funding benefit, so most banks define a consistent FVA and DVA split.

**Q:** Why is the portfolio KVA smaller than the sum of the trade KVAs?

**A:** Netting reduces exposure within a netting set. The capital formula also aggregates counterparties with a correlation below one, so the square root of a sum of correlated terms is less than the sum of the terms. That makes KVA non-additive, so incremental KVA (with and without the trade) is what you should charge to a new trade.

**Q:** In this code, what drives MVA, and why might it be unrealistic?

**A:** The IM proxy depends only on notionals, currency volatilities and remaining maturities, so MVA is driven by portfolio size and run-off. It ignores market moves, netting of offsetting trades and SIMM's bucket structure. A real implementation would compute sensitivities along each simulated path and apply SIMM or the CCP's methodology.

**Q:** How would you validate an XVA engine?

**A:** Check simple cases analytically (for example, the EPE of a forward under a Gaussian model). Test convergence in paths and time steps. Reconcile exposures with the front-office pricers at time zero. Backtest simulated risk-factor distributions against history, and compare IM against actual CCP or SIMM calls. Finally, have an independent validation team challenge the assumptions.

## CV bullet points

- Built a Python XVA engine computing FVA, MVA and KVA for a synthetic [N]-trade, [X]m-notional multi-counterparty portfolio, using Monte Carlo exposure simulation on a [N]-step time grid.
- Developed a Streamlit dashboard showing exposure fan charts, initial-margin and capital profiles, enabling sensitivity analysis of total XVA to funding spreads and cost-of-capital assumptions ([X]% change in XVA per [Y] bp of spread).
- Vectorised the exposure simulation with NumPy, cutting runtime from [X] s to [Y] s and raising the feasible path count from [N] to [M].
- Extended the framework with [CVA from CDS-implied default probabilities / dynamic initial margin / close-out amount profiles], quantifying [X]% of total XVA attributable to [component].
