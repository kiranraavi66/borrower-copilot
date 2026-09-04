# Borrower Copilot — Lokta Challenge Run-Throughs

This document presents the complete, step-by-step financial affordability run-throughs for all three required challenge personas (**Priya**, **Ravi**, and **Anita**). 

All metrics, ranges, decision rationale, interest rates, stress-test outputs, and confidence ratings are generated directly by the live client-side JavaScript decision engine (`src/logic/`).

---

## 1. Persona 1: Priya — Salaried Software Engineer

### Borrower Profile
- **Age / Location**: 29 years old | Bengaluru, Karnataka
- **Employment**: Salaried Software Engineer at a large Multinational Corporation (MNC), 5 years employment tenure.
- **Income**: Net take-home salary of **₹1,10,000 / month**.
- **Existing Obligations**: **₹14,000 / month** car loan EMI (2 years remaining).
- **Credit Score**: **780** (Prime CIBIL Score).
- **Living Costs**: **₹45,000 / month** essential household expenses (including ₹28,000 rent).
- **Emergency Reserve**: 6 months of essential living expenses in liquid savings.

### Loan Request
- **Target Principal**: **₹8,00,000**
- **Loan Purpose**: Personal Loan (Wedding expenses)
- **Requested Tenure**: 3 Years (36 months)

### Questionnaire Flow & Adaptive Questions
1. **Income Type**: Salaried
2. **Monthly Take-home Income**: ₹1,10,000
3. **Income Stability**: Very stable
4. **Existing EMIs**: Yes $\rightarrow$ *Adaptive question triggered*: ₹14,000/month
5. **Loan Request Target**: ₹8,00,000
6. **Loan Purpose**: Personal
7. **Credit Score Status**: Yes, knows credit score $\rightarrow$ *Adaptive question triggered*: 780
8. **Essential Expenses**: ₹45,000/month (including ₹28k rent)
9. **Emergency Savings**: Yes $\rightarrow$ *Adaptive question triggered*: 6 months

---

### Four Core Application Outputs

#### Output 1: Recommendation & Decision
- **Recommendation**: **`Borrow`** (Badge: `emerald`)
- **Title**: **Financially Viable: Safe to Proceed**
- **Summary**: Your requested loan amount of ₹8,00,000 is well within your borrower-safe affordability ceiling of ₹11,91,410.
- **Rationale**:
  - Salaried 50% FOIR cap provides a total debt allowance of ₹55,000/month.
  - Subtracting existing car EMI (₹14,000) leaves an available FOIR EMI of ₹41,000/month.
  - Preserving essential living costs (₹45,000) plus a 10% safety cushion (₹11,000) establishes a comfortable EMI ceiling of ₹40,000/month.
  - Requested loan EMI for ₹8L over 3 years (~₹26,846/month at 12.75% midpoint) consumes only ~67% of her comfortable EMI ceiling.

#### Output 2: Estimated Lender-Capacity Range (FOIR-based)
- **Lender-Likely Sanction Principal**: **₹12,21,195**
- **Estimated Lender-Capacity Range (FOIR-based)**: **₹10,99,076 – ₹12,82,255**
- *Explanation*: Calculated using standard 50% FOIR banking rules on ₹1.1L income. *Note: This is a theoretical capacity estimate based on income rules, NOT a lender loan approval prediction or credit commitment.*

#### Output 3: Borrower-Safe Affordable Range
- **Borrower-Safe Maximum Amount**: **₹11,91,410** (RECOMMENDED FOR PLANNING)
- **Borrower-Safe Affordable Range**: **₹10,12,699 – ₹11,91,410**
- *Explanation*: Protects essential household expenses (₹45,000) and a 10% safety cushion (₹11,000), capping monthly EMI at ₹40,000.

#### Output 4: Fair Interest-Rate Band & All-In Cost
- **Fair Interest-Rate Band**: **11.00% – 14.50%** (Midpoint: **12.75%**)
- **Processing Fee Assumption**: 1.5% of loan principal (**₹12,000**)
- **Estimated All-In Annualized Cost**: **~13.25% APR** (Midpoint rate 12.75% + 0.50%/year linearized fee spread over 3 years).
- *Rate Rationale*: Base personal loan range (11.5%–15.0%) receives a -0.50% prime discount due to her 780 CIBIL score and verified MNC employment.

---

### Additional Decision Engine Metrics

- **Comfortable Monthly EMI Ceiling**: **₹40,000 / month**
- **20% Income-Drop Stress Test**: **PASSES STRESS TEST**
  - Stressed Income (20% drop): **₹88,000 / month**
  - Stressed Available Cash Flow: `₹88,000 - ₹45,000 (expenses) - ₹14,000 (existing EMI) = +₹29,000 / month surplus`.
  - Even after paying the proposed ₹8L loan EMI (~₹26,846), Priya retains a positive net monthly cash buffer of +₹2,154/month under a 20% income reduction.
- **Calculation Confidence**: **HIGH (Score: 100 / 100)**
  - *Factors*: Verified salaried payroll (+15), Very stable income pattern (+25), Known 780 prime score (+30), 6+ months emergency reserve (+30).

---

### Negotiation Card Strategy: Priya

- **Recommended Opening Position**: Present her comfortable EMI ceiling (₹40,000/mo) and state that she is requesting only ₹8,00,000 (well below her safe limit of ₹11.91L).
- **Key Numbers to Verify**:
  - Processing fee cap (target 0.5%–1.0% instead of standard 1.5%).
  - Prepayment / foreclosure penalty clause (must be 0% for floating rate personal loans under RBI rules).
- **Questions to Ask Loan Officer**:
  1. What is the exact all-in APR including processing, documentation, and mandatory insurance fees?
  2. Can you match top-tier 11.0% interest pricing given my 780 CIBIL score and 5-year MNC tenure?
  3. Are there any hidden pre-closure fees or lock-in restrictions if I clear the loan early?
- **What Priya Should Negotiate**: Ask the lender to waive or reduce the ₹12,000 processing fee and request interest pricing at the lower boundary of the 11.0%–14.5% band.

---

---

## 2. Persona 2: Ravi — Self-Employed Kirana Store Owner

### Borrower Profile
- **Age / Location**: 42 years old | Mysuru, Karnataka
- **Employment**: Self-employed Kirana store owner, 14 years business operating history.
- **Income**: Business cash earnings fluctuate between **₹40,000 – ₹80,000 / month**. Reported ITR is **₹4,20,000 / year**.
- **Household Context**: Wife earns **₹18,000 / month** from school teaching.
- **Assets**: Owns unencumbered shop premises worth approximately **₹45,00,000**.
- **Existing Obligations**: **₹0 / month** (never taken a formal bank loan).
- **Credit Score**: **UNKNOWN** (No formal credit history / CIBIL score).
- **Living Costs**: **₹25,000 / month** essential household expenses.
- **Emergency Reserve**: 3 months of essential expenses in savings.

### Loan Request
- **Target Principal**: **₹15,00,000**
- **Loan Purpose**: Business Expansion (Second stock line + delivery vehicle)
- **Requested Tenure**: 3 Years (36 months)

### Income & Asset Nuances (Option A Enforcement)
1. **Primary Business Income Used**: **₹60,000 / month** — Defined strictly as the normalized midpoint of Ravi's ₹40,000–₹80,000/month shop cash earnings.
2. **Wife's Income**: Wife's ₹18,000/month teaching income is noted as qualitative household context, but is **NOT** included in the primary uncollateralized loan affordability calculation engine.
3. **Property Asset**: Owns unencumbered shop premises worth **₹45,00,000**. While this opens a secured financing route (Secured Business Loan / LAP), it is **NOT** treated as increasing uncollateralized cash-flow capacity.

### Questionnaire Flow & Adaptive Questions
1. **Income Type**: Business owner
2. **Monthly Take-home Income**: ₹60,000 (Primary business midpoint)
3. **Income Stability**: Variable
4. **Existing EMIs**: No $\rightarrow$ ₹0/month
5. **Loan Request Target**: ₹15,00,000
6. **Loan Purpose**: Business
7. **Credit Score Status**: No, credit score unknown $\rightarrow$ Recorded as `UNKNOWN`
8. **Essential Expenses**: ₹25,000/month
9. **Emergency Savings**: Yes $\rightarrow$ 3 months

---

### Four Core Application Outputs

#### Output 1: Recommendation & Decision
- **Recommendation**: **`Don't Borrow`** (Badge: `red`)
- **Title**: **High Financial Risk: Borrowing Not Recommended**
- **Summary**: Your requested loan amount of ₹15,00,000 exceeds safe affordability limits and would place severe strain on your monthly cash flow.
- **Rationale**:
  - Business owner FOIR cap of 40% limits maximum monthly debt obligations to ₹24,000/month on ₹60,000 business cash income.
  - Servicing an uncollateralized ₹15,00,000 loan over 3 years requires ~₹52,382/month EMI at 15.5% midpoint rate, which consumes **87% of net business cash income** and causes immediate household default.

#### Output 2: Estimated Lender-Capacity Range (FOIR-based)
- **Lender-Likely Sanction Principal**: **₹6,87,469**
- **Estimated Lender-Capacity Range (FOIR-based)**: **₹6,18,722 – ₹7,21,842**
- *Explanation*: Calculated using 40% FOIR rule on ₹60k business income. *Note: Uncollateralized capacity estimate based on cash flows, NOT a loan approval prediction.*

#### Output 3: Borrower-Safe Affordable Range
- **Borrower-Safe Maximum Amount**: **₹6,87,469** (RECOMMENDED FOR PLANNING)
- **Borrower-Safe Affordable Range**: **₹5,84,349 – ₹6,87,469**
- *Explanation*: Capped at ₹24,000/month comfortable EMI ceiling to preserve essential living costs (₹25,000) and a 10% safety cushion (₹6,000).

#### Output 4: Fair Interest-Rate Band & All-In Cost
- **Fair Interest-Rate Band**: **12.25% – 18.75%** (Midpoint: **15.50%**)
- **Processing Fee Assumption**: 1.5% of loan principal (**₹22,500**)
- **Estimated All-In Annualized Cost**: **~16.00% APR** (Midpoint rate 15.50% + 0.50%/year linearized fee spread).
- *Rate Rationale*: Base business loan range (12.0%–16.0%) widens spread by ±1.25% and adds +0.75% risk premium due to `UNKNOWN` credit score and variable cash income.

---

### Secured Business Loan / Loan Against Property (LAP) Recommendation

- **Alternative Product Structure**: Because Ravi operates an established 14-year business and owns unencumbered shop premises worth **₹45,00,000**, the engine recommends evaluating a **Secured Business Loan** or **Loan Against Property (LAP)**.
- **Product Benefits**: LAP structures offer lower interest rates (typically 9.5%–12.5%) and longer tenures (10–15 years), which reduces the monthly EMI requirement for a ₹15L loan from ~₹52,382/mo (3-yr unsecured) to ~₹15,670/mo (15-yr LAP).
- **Crucial Collateral Nuance**: 
  > ⚠️ **Collateral vs. Cash Flow Principle**: Pledging collateral opens secured loan products and longer tenures, but **collateral does NOT automatically make an unaffordable EMI affordable**. Underwriting and household safety still require verifiable monthly cash flow to meet EMI obligations without risking property foreclosure.

---

### Additional Decision Engine Metrics

- **Comfortable Monthly EMI Ceiling**: **₹24,000 / month**
- **20% Income-Drop Stress Test**: **PASSES MILD STRESS TEST (BEFORE NEW LOAN)**
  - Stressed Income (20% drop): **₹48,000 / month**
  - Stressed Available Cash Flow: `₹48,000 - ₹25,000 (expenses) = +₹23,000 / month surplus`.
  - *Warning*: If he took the requested ₹15L unsecured loan (~₹52,382 EMI), a 20% income fall would cause a massive monthly deficit of **-₹29,382 / month**.
- **Calculation Confidence**: **MEDIUM (Score: 62 / 100)**
  - *Factors*: Business ownership (+12), Variable cash income (+10), `UNKNOWN` credit score (+10), 3+ months emergency reserve (+30).

---

### Negotiation Card Strategy: Ravi

- **Recommended Opening Position**: Pivot the lender conversation from high-cost unsecured business loans (15.5%+) to a **Loan Against Property (LAP)** secured by his ₹45L shop premises.
- **Key Numbers to Verify**:
  - Property legal valuation and title search fees.
  - LAP interest rate band (target 9.5%–11.5%) and 10–15 year repayment schedule.
- **Questions to Ask Loan Officer**:
  1. Can this expansion loan be structured as a Loan Against Property (LAP) backed by my shop premises to access 10–15 year tenures?
  2. What is the exact interest rate differential between an unsecured business loan and a secured LAP?
  3. If structured as LAP, what is the exact LTV (Loan-to-Value) ratio applied against my ₹45L shop premises?
- **What Ravi Should Negotiate**: Negotiate for a 10–12 year LAP tenure to bring the monthly EMI for ₹15L down to ~₹16,000/month, well within his ₹24,000/month comfortable ceiling.

---

---

## 3. Persona 3: Anita — Informal Delivery Rider & Home Tailor

### Borrower Profile
- **Age / Location**: 35 years old | Hubballi, Karnataka
- **Employment**: Informal Gig Worker (Delivery platform rider + home tailoring).
- **Income**: Net monthly earnings fluctuate between **₹26,000 – ₹30,000 / month** (Average: **₹28,000 / month**).
- **Family Status**: 2 children; husband unemployed for the past 8 months.
- **Existing Debt**: **₹6,500 / month** across 3 active high-cost fintech app loans (30%+ interest; outstanding principal ~₹35,000).
- **Repayment History**: **1 EMI bounce** in the past 6 months due to cash crunch.
- **Credit Score**: **UNKNOWN** (No formal credit bureau history / high credit risk flags).
- **Living Costs**: **₹18,000 / month** essential family living expenses.
- **Emergency Reserve**: **0 Months** (Zero liquid savings).

### Loan Request
- **Target Principal**: **₹1,50,000**
- **Loan Purpose**: Vehicle Loan (Electric scooter for delivery runs)
- **Requested Tenure**: 3 Years (36 months)

### Questionnaire Flow & Adaptive Questions
1. **Income Type**: Freelancer / informal income
2. **Monthly Take-home Income**: ₹28,000
3. **Income Stability**: Highly variable
4. **Existing EMIs**: Yes $\rightarrow$ *Adaptive question triggered*: ₹6,500/month
5. **High-Cost Fintech App Loans**: Yes $\rightarrow$ *Adaptive trigger flag*: 30%+ interest app loans active
6. **Recent EMI Bounce**: Yes $\rightarrow$ *Adaptive trigger flag*: 1 EMI bounce in past 6 months
7. **Loan Request Target**: ₹1,50,000
8. **Loan Purpose**: Vehicle
9. **Credit Score Status**: No, credit score unknown $\rightarrow$ Recorded as `UNKNOWN`
10. **Essential Expenses**: ₹18,000/month
11. **Emergency Savings**: No $\rightarrow$ 0 months

---

### Four Core Application Outputs

#### Output 1: Recommendation & Decision
- **Recommendation**: **`Don't Borrow`** (Badge: `red`)
- **Title**: **High Financial Risk: Borrowing Not Recommended**
- **Summary**: Your requested loan amount of ₹1,50,000 exceeds safe affordability limits and would place severe strain on your monthly cash flow.
- **Rationale**:
  - Informal gig worker FOIR cap is reduced from 35% to 30% due to active high-cost fintech app debt.
  - 30% FOIR cap provides a maximum monthly debt allowance of ₹8,400. Subtracting existing app EMIs (₹6,500) leaves only ₹1,900/month FOIR capacity.
  - Essential family living expenses (₹18,000) and existing app EMIs (₹6,500) consume ₹24,500 out of ₹28,000 income, leaving only ₹700/month buffer before safety cushions.
  - Taking a new ₹1.5L loan over 3 years (~₹5,189/month EMI at 14.88% midpoint) would force an immediate monthly household deficit of **-₹4,489 / month**.

#### Output 2: Estimated Lender-Capacity Range (FOIR-based)
- **Lender-Likely Sanction Principal**: **₹54,903**
- **Estimated Lender-Capacity Range (FOIR-based)**: **₹49,413 – ₹57,648**
- *Explanation*: Calculated using 30% reduced FOIR cap on ₹28k informal income. *Note: Uncollateralized capacity estimate based on income rules, NOT a lender loan approval prediction. High rejection probability due to recent EMI bounce.*

#### Output 3: Borrower-Safe Affordable Range
- **Borrower-Safe Maximum Amount**: **₹20,227** (RECOMMENDED FOR PLANNING)
- **Borrower-Safe Affordable Range**: **₹17,193 – ₹20,227**
- *Explanation*: Based on a comfortable EMI ceiling of ₹700/month. Safe borrowing target is effectively **₹0** until existing high-cost app debt is cleared.

#### Output 4: Fair Interest-Rate Band & All-In Cost
- **Fair Interest-Rate Band**: **12.50% – 17.25%** (Midpoint: **14.88%**)
- **Processing Fee Assumption**: 1.5% of loan principal (**₹2,250**)
- **Estimated All-In Annualized Cost**: **~15.38% APR** (Midpoint rate 14.88% + 0.50%/year linearized fee spread).
- *Rate Rationale*: Base vehicle loan range (8.75%–11.0%) incurs risk premiums: +0.75% for unknown credit score, +0.75% for highly variable income, +1.50% for high-cost app debt, and +2.00% for recent EMI bounce.

---

### High-Cost App Debt & EMI Bounce Impact Analysis

1. **High-Cost Fintech App Loans (30%+ Interest)**:
   - Reduces maximum FOIR cap by **5%** (from 35% to 30%), shrinking monthly debt allowance to ₹8,400.
   - Adds a **+1.50% risk premium** to the interest rate estimate.
   - Deducts **10 points** from the calculation confidence rating.
2. **Recent EMI Bounce (Past 6 Months)**:
   - Adds a **+2.00% credit risk margin** to interest rates.
   - Deducts **20 points** from the calculation confidence rating.
   - Triggers a high rejection warning for formal banking channels.
3. **Existing ₹6,500 EMI Impact**:
   - Consumes **77%** of her total FOIR debt allowance (₹6,500 out of ₹8,400), leaving zero room for new vehicle loan servicing.

---

### Additional Decision Engine Metrics

- **Comfortable Monthly EMI Ceiling**: **₹700 / month**
- **20% Income-Drop Stress Test**: **FAILS STRESS TEST SEVERELY**
  - Stressed Income (20% drop): **₹22,400 / month**
  - Stressed Expenses & Debt: `₹18,000 (living expenses) + ₹6,500 (app EMIs) = ₹24,500 / month`.
  - **Monthly Household Deficit**: **-₹2,100 / month DEFICIT** under a 20% income fall, even *without* taking any new loan!
- **Calculation Confidence**: **LOW (Score: -5 clamped to 0 / 100)**
  - *Factors*: Informal income (+5), Highly variable (+5), `UNKNOWN` credit score (+10), Zero emergency reserve (+5), Recent EMI bounce (-20), High-cost app debt (-10).

---

### Negotiation Card Strategy: Anita

- **Recommended Opening Position**: **Do NOT apply for new loan debt**. Focus 100% of available cash flow on paying off existing 30%+ fintech app loans.
- **Key Numbers to Verify**:
  - Foreclosure terms and exact payoff amounts for the 3 active fintech app loans.
- **Questions to Ask Loan Officer / Debt Counselor**:
  1. What is the total settlement or payoff amount to close my 3 high-cost app loans immediately?
  2. Are there microfinance (MFI) or government scheme loans (e.g. PM SVANidhi) available at subsidized rates (<8%–10%) once my app loans are cleared?
  3. Can I get a 3-month EMI moratorium or debt consolidation plan to stabilize my household budget?
- **What Anita Should Negotiate**: Work on debt consolidation to replace 30%+ app loans with a single lower-cost credit facility, rather than taking a new ₹1.5L vehicle loan.

---

## Comparative QA Summary Matrix

| Metric / Output | Priya | Ravi | Anita |
| :--- | :--- | :--- | :--- |
| **Net Monthly Income** | ₹1,10,000 (Salaried) | ₹60,000 (Business Midpoint) | ₹28,000 (Informal Gig) |
| **Existing EMIs** | ₹14,000 / month | ₹0 / month | ₹6,500 / month (App Loans) |
| **Living Expenses** | ₹45,00,00 | ₹25,000 / month | ₹18,000 / month |
| **FOIR Cap Applied** | 50% | 40% | 30% (5% App Penalty) |
| **Comfortable EMI Ceiling** | **₹40,000 / month** | **₹24,000 / month** | **₹700 / month** |
| **Requested Loan** | ₹8,00,000 (Personal) | ₹15,00,000 (Business) | ₹1,50,000 (Vehicle) |
| **Decision Recommendation** | **`Borrow`** | **`Don't Borrow`** | **`Don't Borrow`** |
| **Lender-Capacity Range** | ₹10,99,076 – ₹12,82,255 | ₹6,18,722 – ₹7,21,842 | ₹49,413 – ₹57,648 |
| **Borrower-Safe Range** | **₹10,12,699 – ₹11,91,410** | **₹5,84,349 – ₹6,87,469** | **₹17,193 – ₹20,227** |
| **Fair Interest Rate Band** | 11.00% – 14.50% | 12.25% – 18.75% | 12.50% – 17.25% |
| **Estimated All-In APR** | ~13.25% APR | ~16.00% APR | ~15.38% APR |
| **20% Income Stress Test** | **PASS** (+₹29,000 surplus) | **PASS** (+₹23,000 surplus) | **FAIL** (-₹2,100 deficit) |
| **Confidence Level** | **HIGH (100/100)** | **MEDIUM (62/100)** | **LOW (0/100)** |
| **Secured / LAP Advice** | N/A | **Explore LAP (Shop ₹45L)** | N/A (Clear App Debt First) |
