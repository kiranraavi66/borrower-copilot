# Borrower Copilot — Rules & Assumptions

## Purpose

Borrower Copilot is an **educational borrower-planning tool** designed to help individuals evaluate loan affordability, estimate fair interest rate benchmarks, understand tenure trade-offs, and prepare for lender negotiations.

It is **NOT a lender approval system, credit decision engine, or formal financial advice**. All calculations operate 100% client-side in pure JavaScript based on user-provided inputs, with no credit bureau checks or external API integrations.

---

## 1. Affordability Rules

Borrower Copilot uses a Fixed Obligation to Income Ratio (FOIR) model combined with a household essential expense buffer to calculate monthly debt capacity.

| What | Value | Why | Source |
| :--- | :--- | :--- | :--- |
| **FOIR Cap: Salaried / Very Stable** | **50%** of net monthly take-home income | Standard Indian retail banking maximum debt capacity limit for verified salaried applicants. | Indian Retail Banking Standard |
| **FOIR Cap: Mostly Stable / Business** | **45%** of net monthly take-home income | Allows a 5% extra cushion to absorb mild income or business turnover variance. | my judgement |
| **FOIR Cap: Self-Employed / Variable** | **40%** of net monthly take-home income | Provides a 10% safety margin against monthly income fluctuations. | my judgement |
| **FOIR Cap: Freelance / Informal / Highly Variable** | **35%** of net monthly take-home income | Conservative ceiling required for gig workers or informal earners with irregular cash flows. | my judgement |
| **High-Cost App Loans Impact** | Reduces FOIR cap by **5%** (e.g. 35% $\rightarrow$ 30%) | Active high-interest fintech app loans (30%+) indicate existing financial stress and high debt service burden. | my judgement |
| **Treatment of Existing EMIs** | Subtracted directly from Max FOIR Obligation (`Max FOIR - Existing EMIs`) | Existing fixed debt obligations reduce available monthly cash flow for new loan repayment. | Indian Retail Banking Standard |
| **Treatment of Household Expenses** | Subtracted alongside a 10% income cushion (`Income - Essential Expenses - Existing EMIs - 10% Cushion`) | Ensures new loan EMIs do not force the borrower to cut back on essential food, rent, or school fees. | my judgement |
| **Comfortable EMI Ceiling** | `min(FOIR Available EMI, Safe Buffer EMI)` | Strict minimum ensures compliance with banking FOIR caps while protecting household living standards. | my judgement |
| **Variable Income Treatment** | Reduces FOIR cap to 40% (or 35% if highly variable) and adds +0.75% to +1.50% interest rate risk premium | Reflects higher cash flow uncertainty and income volatility. | my judgement |
| **Informal Income Treatment** | Reduces FOIR cap to 35% and lowers calculation confidence rating | Informal earnings lack payroll records and tax returns, creating higher underwriting friction. | my judgement |
| **Minimum Affordability Threshold** | **₹ 0** (If Comfortable EMI $\le$ ₹0, new borrowing is disallowed) | Taking on new loan debt when monthly cash flow surplus is zero or negative leads to immediate default. | my judgement |

---

## 2. Maximum Loan Amount

Borrower Copilot estimates **TWO distinct maximum borrowing amounts** to highlight the difference between lender capacity and borrower safety:

1. **Estimated Lender-Capacity Range (FOIR-based)**:
   - Represents the maximum theoretical principal a bank or NBFC might consider based purely on raw 50% FOIR rules.
   - **Important Disclaimer**: This is a capacity estimate based on income rules, **NOT a lender loan approval prediction** or credit guarantee.
   - Formula: Principal $P$ calculated from `FOIR Available EMI` across default tenure at estimated midpoint interest rate.
   - Range Band: $90\% \text{ to } 105\%$ of calculated principal.

2. **Borrower-Safe Affordable Amount / Range**:
   - Represents the maximum principal supported by the `Comfortable EMI Ceiling` (after protecting essential household expenses and a 10% safety cushion).
   - Formula: Principal $P$ calculated from `Comfortable EMI Ceiling` across default tenure at estimated midpoint interest rate.
   - Range Band: $85\% \text{ to } 100\%$ of calculated principal.

3. **Comparison of Requested Amount**:
   - If Requested Loan $\le$ Borrower-Safe Max $\rightarrow$ **`Borrow`**.
   - If Requested Loan $>$ Borrower-Safe Max AND $\le 1.15 \times$ Lender-Capacity Max $\rightarrow$ **`Borrow Less`**.
   - If Requested Loan $> 1.15 \times$ Lender-Capacity Max OR Comfortable EMI $\le 0 \rightarrow$ **`Don't Borrow`**.

4. **Why Borrower-Safe Amount is Recommended for Planning**:
   - Lenders calculate the maximum debt they can legally collect from your income.
   - The **Borrower-Safe Amount** ensures you retain sufficient monthly surplus to handle medical emergencies, inflation, or temporary income drops.

---

## 3. Interest Rate Rules

Borrower Copilot calculates a **fair expected interest-rate band** rather than a single guaranteed rate, recognizing that actual lender pricing depends on credit risk assessment.

### Base Rate Bands by Loan Category

- **Home Loan**: 8.50% - 9.75%
- **Vehicle Loan**: 8.75% - 11.00%
- **Education Loan**: 9.50% - 12.00%
- **Medical Loan**: 11.50% - 14.50%
- **Personal / Other Loan**: 11.50% - 15.00%
- **Business Loan**: 12.00% - 16.00%

### Credit Score Adjustments

- **Prime (780+)**: -0.50% interest rate discount.
- **Good (720-779)**: Standard base rate band (0.00% adjustment).
- **Fair (650-719)**: +1.25% risk premium.
- **Needs Work (<650)**: +3.00% risk premium.
- **Unknown Credit Score (`UNKNOWN`)**:
  - Credit score is **NEVER set to 0 or 300**.
  - Adds a +0.75% risk premium and **widens the min-max estimation band by $\pm 1.25\%$** to reflect pricing uncertainty.

### Borrower Risk Adjustments

- Variable Income / Freelancer: +0.75% risk premium.
- Highly Variable Income: +1.50% risk premium.
- High-Cost Fintech App Loans (30%+): +1.50% risk premium.
- Recent EMI Bounce (past 6 months): +2.00% risk premium.

### Processing Fee & Estimated All-in Annualized Cost

- **Processing Fee Assumption**: 1.5% of loan principal (minimum ₹1,000, maximum ₹25,000).
- **Estimated All-in Annualized Cost**:
  $$\text{Estimated All-in Annualized Cost} = \text{Midpoint Interest Rate} + \left( \frac{\text{Processing Fee \%}}{\text{Tenure Years}} \right)$$
  *(Note: This is a simplified linear approximation of effective borrowing cost, NOT a cash-flow XIRR/IRR calculation).*

> **Note**: No interest rate displayed by Borrower Copilot is guaranteed. Actual rates depend on lender underwriting and credit bureau verification.

---

## 4. EMI & Tenure Rules

1. **EMI Ceiling**: The maximum monthly outflow allowed, defined by `Comfortable EMI Ceiling = min(FOIR Available EMI, Safe Buffer EMI)`.
2. **EMI Calculation Method**: Standard reducing-balance loan amortization formula:
   $$\text{EMI} = P \cdot r \cdot \frac{(1+r)^n}{(1+r)^n - 1}$$
   *(where $P$ = principal, $r$ = monthly interest rate, $n$ = total tenure in months)*.
3. **Tenure Assumptions**:
   - Default Tenure: **3 Years (36 months)** for Personal, Business, Vehicle, Medical, and Education loans.
   - Default Home Loan Tenure: **15 Years (180 months)**.
4. **Tenure Trade-Off Rule**:
   - **Shorter Tenure** (e.g. 2-3 years): Higher monthly EMI, but significantly lower total interest paid over the loan life.
   - **Longer Tenure** (e.g. 5-7 years): Lower monthly EMI, but substantially higher total interest paid.
5. **Stress-Test Assumption (20% Income Drop)**:
   - Evaluates monthly cash flow resilience if net take-home income drops by **20%** ($\text{Stressed Income} = \text{Income} \times 0.80$).
   - Calculates $\text{Stressed Surplus} = \text{Stressed Income} - \text{Essential Expenses} - \text{Existing EMIs}$.
   - If Stressed Surplus $< 0$, the stress test flags a high-risk warning.

---

## 5. Confidence Rules

Borrower Copilot calculates a 0-100 confidence score to indicate calculation certainty:

- **High Confidence ($\ge 70$ points)**:
  - Verified salaried employment, stable income pattern, self-reported prime credit score (720+), and $\ge 3$ months emergency savings.
- **Medium Confidence (45-69 points)**:
  - Self-employed or business income, variable income stability, or **unknown credit score** with 1-2 months emergency savings.
- **Low Confidence ($< 45$ points)**:
  - Informal/freelance income, highly variable income, zero emergency savings, unknown credit score, active high-cost app debt (-10 pts), or recent EMI bounce (-20 pts).

### Missing & Optional Information Treatment

- **Unknown Credit Score**: Kept explicitly as `"UNKNOWN"`. Widens the rate estimation band rather than penalizing the score to zero.
- **Missing Optional Inputs**: Defaults gracefully (e.g. EMI set to ₹0 if "No" selected for existing loans) without causing application errors.

---

## 6. Borrow / Borrow Less / Don't Borrow Decision Logic

The primary recommendation classification is derived from three checks:

1. **`Borrow`**:
   - Triggered when: `Requested Amount <= Borrower-Safe Max` AND `Comfortable EMI Ceiling > 0`.
   - Meaning: Requested loan is fully supported by household cash flow without risking essential living expenses.

2. **`Borrow Less`**:
   - Triggered when: `Requested Amount > Borrower-Safe Max` AND `Requested Amount <= 1.15 * Lender-Capacity Max`.
   - Meaning: Banks may offer higher limits under raw FOIR, but borrowing the full amount will push monthly EMIs beyond your comfortable household ceiling. Reducing the loan amount to the Borrower-Safe target is recommended.

3. **`Don't Borrow`**:
   - Triggered when: `Requested Amount > 1.15 * Lender-Capacity Max` OR `Comfortable EMI Ceiling <= 0`.
   - Meaning: Taking on the requested loan presents high financial risk and will cause cash flow deficits or immediate default.

---

## 7. Limitations

- **No Credit Bureau Pull**: Does not access CIBIL, Experian, Equifax, or CRIF High Mark databases.
- **No Lender Underwriting**: Does not represent an official credit policy from any bank or NBFC.
- **No Guarantee of Approval**: Results are educational planning estimates, not pre-approved loan offers.
- **Lender Policy Variance**: Actual lender FOIR caps, interest rates, and loan-to-value (LTV) limits vary across institutions.
- **Rate & Fee Variation**: Final APRs depend on GST, stamp duty, insurance premiums, and risk pricing.
- **User Input Dependence**: Estimates depend entirely on the accuracy of user-provided income, EMI, and expense data.

---

## 8. Three Test Borrower Case Studies

The documented rules produce distinct, explainable results for the three Lokta challenge test personas:

1. **Priya (Salaried MNC Engineer, 780 Score, ₹1.1L Income)**:
   - **Output**: **`Borrow`** | **`HIGH Confidence`** (85/100).
   - **Why**: Salaried 50% FOIR cap gives ₹55k debt allowance. After ₹14k car EMI and ₹45k living costs, her ₹40k/mo safe ceiling easily supports her ₹8L wedding loan request (requires ~₹26.2k EMI).

2. **Ravi (Kirana Store Owner, Variable Income, Unknown Credit Score, ₹15L Request)**:
   - **Output**: **`Don't Borrow`** (or Borrow Less) | **`MEDIUM Confidence`** (55/100).
   - **Context & Household Income**: Modeled using net household take-home cash income of **₹60,000/month** (midpoint of his ₹40k-₹80k business cash earnings + wife's ₹18k teaching income). Reported ITR is ₹4.2L/year.
   - **Property Asset Note**: Owns unencumbered shop premises worth **₹45,00,000**. While this provides real estate asset collateral for secured bank loans, our cash-flow FOIR engine evaluates uncollateralized borrowing capacity based strictly on monthly cash flows, which caps his safe principal at ~₹8.2L.
   - **Credit Score**: Remains explicitly **`UNKNOWN`** (no formal credit history), which widens his interest rate band (13.25%-17.25%) without treating score as 0 or 300.

3. **Anita (Informal Delivery Rider, ₹28k Income, ₹6.5k High-Cost App Loans, 1 Bounce)**:
   - **Output**: **`Don't Borrow`** | **`LOW Confidence`** (5/100).
   - **High-Cost Debt & EMI Bounce Rules**: Her 3 fintech app loans (30%+ interest) reduce her FOIR cap from 35% to 30% (₹8.4k max debt cap) and add a +1.5% rate premium. Her recent EMI bounce adds a +2.0% rate risk margin and deducts 20 points from her confidence score.
   - **Why**: Existing app loan EMIs (₹6.5k) and living costs (₹18k) consume ₹24.5k of her ₹28k income, leaving zero surplus after a 10% safety cushion. Fails 20% stress test with a -₹2.1k/mo deficit.
