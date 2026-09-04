# Borrower Copilot — Rules & Assumptions

## Purpose

Borrower Copilot is an **educational borrower-planning tool** designed to help individuals evaluate loan affordability, estimate fair interest rate benchmarks, understand tenure trade-offs, and prepare for lender negotiations.

It is **NOT a lender approval system, credit decision engine, or formal financial advice**. All calculations operate 100% client-side in pure JavaScript based on user-provided inputs, with no credit bureau checks or external API integrations.

---

## 1. Complete Underwriting & Affordability Rules Summary

The table below documents every numeric rule and assumption built into the `src/logic/` financial decision engine.

| What | Value | Why | Source |
| :--- | :--- | :--- | :--- |
| **FOIR Cap: Salaried (Very Stable)** | **50%** of net monthly take-home income | Maximum debt capacity limit for verified salaried applicants with very stable income. | my judgement |
| **FOIR Cap: Mostly Stable Income** | **45%** of net monthly take-home income | Allows a 5% extra cushion to absorb mild income variance when income is mostly stable. | my judgement |
| **FOIR Cap: Self-Employed / Variable Income** | **40%** of net monthly take-home income | Applies to self-employed individuals, business owners, or variable income earners (e.g. Ravi's 40% FOIR cap). | my judgement |
| **FOIR Cap: Freelancer / Informal / Highly Variable** | **35%** of net monthly take-home income | Conservative ceiling required for gig workers or informal earners with irregular cash flows. | my judgement |
| **High-Cost App Loans Impact** | Reduces FOIR cap by **5%** (e.g. 35% $\rightarrow$ 30%) | Active high-interest fintech app loans (30%+) indicate existing financial stress and high debt service burden. | my judgement |
| **Treatment of Existing EMIs** | Subtracted directly from Max FOIR Obligation (`Max FOIR - Existing EMIs`) | Existing fixed debt obligations reduce available monthly cash flow for new loan repayment. | my judgement |
| **Household Safety Cushion** | **10%** of net monthly take-home income | Ensures a 10% cash buffer is reserved for unexpected emergency needs before allocating debt. | my judgement |
| **Comfortable EMI Ceiling** | `min(FOIR Available EMI, Safe Buffer EMI)` | Strict minimum ensures compliance with banking FOIR caps while protecting household living standards. | my judgement |
| **Lender Capacity Range Multiplier** | **90% to 105%** of calculated FOIR principal | Reflects normal underwriting variance across different bank risk policies. | my judgement |
| **Borrower-Safe Range Multiplier** | **85% to 100%** of calculated safe principal | Provides a realistic conservative planning band for household budgeting. | my judgement |
| **Base Rate: Home Loan** | **8.50% – 9.75%** | Standard market range for secured residential mortgage loans. | my judgement |
| **Base Rate: Vehicle Loan** | **8.75% – 11.00%** | Standard market range for secured auto/two-wheeler loans. | my judgement |
| **Base Rate: Education Loan** | **9.50% – 12.00%** | Standard market range for student/higher education loans. | my judgement |
| **Base Rate: Medical Loan** | **11.50% – 14.50%** | Standard market range for unsecured emergency medical financing. | my judgement |
| **Base Rate: Personal Loan** | **11.50% – 15.00%** | Standard market range for unsecured personal loans. | my judgement |
| **Base Rate: Business Loan (Unsecured)** | **12.00% – 16.00%** | Standard market range for unsecured MSME business expansion loans. | my judgement |
| **Base Rate: MSME LAP (Secured)** | **9.50% – 12.00%** | Secured rate benchmark for MSME Loan Against Property backed by real estate collateral. | my judgement |
| **Credit Score Premium: Prime (780+)** | **-0.50%** rate discount | Rewards top-tier credit histories with lower interest pricing. | my judgement |
| **Credit Score Premium: Good (720-779)** | **0.00%** adjustment | Standard base rate pricing for healthy credit scores. | my judgement |
| **Credit Score Premium: Fair (650-719)** | **+1.25%** risk premium | Compensates lenders for moderate credit risk. | my judgement |
| **Credit Score Premium: Needs Work (<650)** | **+3.00%** risk premium | Substantial risk margin for impaired credit histories. | my judgement |
| **Credit Score Premium: Unknown (`UNKNOWN`)** | **+0.75%** margin & **$\pm 1.25\%$** band widening | Kept as `UNKNOWN` (never 0 or 300); rate band widens to reflect estimation uncertainty. | my judgement |
| **Income Volatility Premium: Variable** | **+0.75%** risk premium | Risk adjustment for self-employed/business cash flows. | my judgement |
| **Income Volatility Premium: Highly Variable** | **+1.50%** risk premium | Risk adjustment for informal gig or freelance earnings. | my judgement |
| **High-Cost App Debt Premium** | **+1.50%** risk premium | Additional margin when active 30%+ app loans are present. | my judgement |
| **Recent EMI Bounce Premium** | **+2.00%** risk premium & **-20 pts** confidence | Severe risk margin for default/late-payment history in the past 6 months. | my judgement |
| **Processing Fee Assumption** | **1.5%** of principal (min ₹1,000, max ₹25,000) | Standard administrative fee assumption across all loan types (including LAP), subject to ₹25,000 cap. | my judgement |
| **Estimated All-in Annualized Cost** | `Midpoint Rate + (Processing Fee % / Tenure)` | Simplified linear fee-spread approximation of effective borrowing cost (incorporating assumed processing fee, NOT a cash-flow XIRR). | my judgement |
| **Default Tenure: Standard Loans** | **3 Years (36 months)** | Standard planning duration for personal, business, vehicle, medical, and education loans. | my judgement |
| **Default Tenure: Home Loans** | **15 Years (180 months)** | Standard long-term mortgage loan repayment duration. | my judgement |
| **Default Tenure: Secured MSME LAP** | **10 Years (120 months)** | Extended tenure permitted for property-collateralized business financing. | my judgement |
| **Stress Test Income Reduction** | **20%** income reduction (`0.80 * Income`) | Tests household cash flow resilience under acute economic shocks or business downturns. | my judgement |
| **Stress Test Affordability Rule** | `Stressed Income - Expenses - Existing EMIs - Proposed EMI >= 0` | `remainsAffordable` is true ONLY when post-borrowing stressed surplus is $\ge 0$. | my judgement |
| **Decision Threshold: Borrow** | `Requested <= Safe Max` AND `Comfortable EMI > 0` | Loan request is fully affordable under household cash flow safety limits. | my judgement |
| **Decision Threshold: Borrow Less** | `Safe Max < Requested <= 1.15 * Lender Max` | Banks may sanction requested amount under raw FOIR, but safe limit is lower. | my judgement |
| **Decision Threshold: Don't Borrow** | `Requested > 1.15 * Lender Max` OR `Comfortable EMI <= 0` | Loan request creates high financial distress or immediate household cash flow deficit. | my judgement |

---

## 2. Maximum Loan Amount Mechanics

Borrower Copilot estimates **TWO distinct maximum borrowing amounts** to highlight the difference between lender capacity and borrower safety:

1. **Estimated Lender-Capacity Range (FOIR-based)**:
   - Represents the maximum theoretical principal a bank or NBFC might consider based purely on raw FOIR rules.
   - **Important Disclaimer**: This is a capacity estimate based on income rules, **NOT a lender loan approval prediction** or credit guarantee.
   - Formula: Principal $P$ calculated from `FOIR Available EMI` across default tenure at estimated midpoint interest rate.
   - Range Band: $90\% \text{ to } 105\%$ of calculated principal.

2. **Borrower-Safe Affordable Amount / Range**:
   - Represents the maximum principal supported by the `Comfortable EMI Ceiling` (after protecting essential household expenses and a 10% safety cushion).
   - Formula: Principal $P$ calculated from `Comfortable EMI Ceiling` across default tenure at estimated midpoint interest rate.
   - Range Band: $85\% \text{ to } 100\%$ of calculated principal.

3. **Secured Business Loans & Loan Against Property (LAP) Recommendation**:
   - For borrowers who operate an established business and own unencumbered property assets (e.g., commercial shop premises worth ₹45 Lakhs), Borrower Copilot recommends exploring **Secured Business Loans** or **Loan Against Property (LAP)** as an alternative product structure.
   - LAP structures offer lower interest rates (typically 9.5%–12.0%) and significantly longer tenures (10–15 years), which lowers the required monthly EMI for a given loan amount.
   - **Crucial Rule on Collateral vs. Cash Flow**: Pledging collateral opens secured loan products and longer tenures, but **collateral does NOT automatically make an unaffordable monthly EMI affordable**. Underwriting and borrower safety still require verifiable monthly cash flow to meet EMI obligations without risking asset loss.

---

## 3. Interest Rate & All-in Cost Calculation

Borrower Copilot calculates a **fair expected interest-rate band** rather than a single guaranteed rate:

$$\text{Estimated All-in Annualized Cost} = \text{Midpoint Interest Rate} + \left( \frac{\text{Processing Fee \%}}{\text{Tenure Years}} \right)$$

> **Note**: This is a simplified linear fee-spread approximation of effective borrowing cost (incorporating the assumed 1.5% processing fee), NOT an effective APR/XIRR calculated from actual lender cash flows.

---

## 4. 20% Income-Drop Stress Test Formula

The 20% income-drop stress test evaluates household financial resilience under economic shocks:

1. $\text{Stressed Income} = \text{Monthly Take-Home Income} \times 0.80$
2. $\text{Essential Expenses} = \text{Monthly Living Costs}$
3. $\text{Existing Debt} = \text{Current Monthly EMIs}$
4. $\text{Proposed New Loan EMI} = \text{Monthly EMI for requested loan at midpoint rate and default tenure}$
5. $\text{Stressed Net Surplus / Deficit} = \text{Stressed Income} - \text{Essential Expenses} - \text{Existing EMIs} - \text{Proposed New EMI}$

`remainsAffordable` is set to `true` **ONLY when Stressed Net Surplus $\ge 0$**.

---

## 5. Confidence Score Weights

Confidence is calculated on a 0–100 scale:

- **Employment Type**: Salaried (+15), Business owner (+12), Self-employed (+10), Other/freelance/informal (+5).
- **Income Stability**: Very stable (+25), Mostly stable (+20), Variable (+10), Highly variable (+5).
- **Credit Score Status**: Any known credit score (+30), `UNKNOWN` credit score (+10).
- **Emergency Reserve**: 3+ months (+30), > 0 but < 3 months (+15), 0 months (+5).
- **Deductions**: Active high-cost app debt (-10 pts), Recent EMI bounce in past 6 months (-20 pts).
- **Score Clamping**: Final score is clamped to the 0–100 range (`Math.max(0, Math.min(100, score))`).

---

## 6. Three Test Borrower Case Studies Summary

1. **Priya (Salaried MNC Engineer, 780 Score, ₹1.1L Income, ₹8L Request)**:
   - **Output**: **`Borrow`** | **`HIGH Confidence`** (100/100).
   - **Safe Range**: ₹10,12,699 – ₹11,91,410 | **Rate Band**: 11.00% – 14.50% (Cost ~13.25%).
   - **Stress Test**: **PASS** (`+₹2,141 / month` post-borrowing surplus under 20% income drop).

2. **Ravi (Kirana Store Owner, Variable Income, Unknown Credit Score, ₹15L Request)**:
   - **Output**: **`Borrow via MSME Loan Against Property (LAP)`** | **`MEDIUM Confidence`** (62/100).
   - **Safe Range (10-Yr LAP)**: ₹14,96,274 – ₹17,60,322 | **LAP Rate Band**: 9.50% – 12.00% (Cost ~10.90%).
   - **Underwriting**: Unsecured personal loan rejected (EMI would exceed 85% of income). Viable exclusively via MSME Loan Against Property (LAP) by pledging his ₹45L unencumbered commercial shop (33.3% LTV) over a 10-year tenure (~₹20,451/mo EMI, 34.1% FOIR).
   - **Stress Test**: **PASS** (`+₹2,549 / month` post-borrowing LAP surplus under 20% income drop).

3. **Anita (Informal Delivery Rider, ₹28k Income, ₹6.5k App EMIs, 1 Bounce, ₹1.5L Request)**:
   - **Output**: **`Don't Borrow`** | **`LOW Confidence`** (0/100).
   - **Safe Range**: ₹17,193 – ₹20,227 | **Rate Band**: 12.50% – 17.25% (Cost ~15.38%).
   - **Underwriting**: 3 active 30%+ app loans reduce FOIR cap to 30% (₹8.4k max debt cap). Available FOIR capacity is only ₹1,900/mo. Taking ₹1.5L loan (~₹5,191 EMI) creates immediate monthly household deficit.
   - **Stress Test**: **FAIL** (`-₹7,291 / month` post-borrowing deficit under 20% income drop).

