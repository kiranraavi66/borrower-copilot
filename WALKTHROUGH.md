# Borrower Copilot — 5-Minute Submission Walkthrough

This document provides a spoken-style, approximately 5-minute presentation walkthrough of **Borrower Copilot** designed for the Lokta challenge submission and live demo presentations.

---

## 1. Introduction (20–30 seconds)

"Hello! I’m excited to present **Borrower Copilot**, an independent, privacy-first borrower planning application built for Indian retail borrowers. 

When people walk into a bank or apply for a loan online, there’s a massive information asymmetry. Lenders use complex risk algorithms to determine the maximum debt they can legally collect from a borrower. Too often, borrowers take the maximum sanctioned loan offered by a bank, only to find themselves trapped in monthly cash-flow stress when unexpected living expenses or medical emergencies arise.

Borrower Copilot solves this problem by giving borrowers their own copilot. It introduces a fundamental distinction between two numbers: the **Estimated Lender-Capacity Range**—how much a bank might sanction based on standard debt ratio caps—and the **Borrower-Safe Affordable Amount**—how much a borrower can comfortably borrow while protecting essential household expenses and a 10% safety cushion."

---

## 2. User Flow & Adaptive Questionnaire (45–60 seconds)

"The user journey begins with a clean, adaptive 9-step wizard designed to capture a complete financial snapshot without overwhelming the user. 

We collect essential inputs: income type, net take-home earnings, income stability, existing monthly EMIs, loan purpose, requested loan amount, credit score status, essential living expenses, and emergency savings.

The questionnaire is fully adaptive. For instance, if a user indicates existing debt obligations, the engine dynamically prompts for monthly EMI amounts. If they indicate high-cost fintech app loans or a recent EMI bounce, the engine flags these risk factors immediately.

Crucially, if a user does not know their credit score, we **never assign a fake zero or 300 score**. Instead, we record the score explicitly as `UNKNOWN`. Our decision engine recognizes this pricing uncertainty and widens the interest rate estimation band by ±1.25%, preventing false precision while maintaining complete mathematical transparency."

---

## 3. Decision Engine & Four Outputs (60 seconds)

"Once inputs are submitted, our pure JavaScript decision engine (`src/logic/`) processes the data client-side and outputs four core results:

1. **The Borrow Decision**: A clear classification into **`Borrow`**, **`Borrow Less`**, or **`Don't Borrow`**, accompanied by a concise explanation.
2. **Maximum Borrowing Capacity**: Presenting both the **Estimated Lender-Capacity Range (FOIR-based)** and the **Borrower-Safe Affordable Amount**, with explicit guidance to use the borrower-safe limit for planning.
3. **Fair Interest-Rate Band & All-in Annualized Cost**: A realistic market rate range (`X% - Y%`) and an estimated all-in cost accounting for processing fee assumptions. We never show a misleading single 'guaranteed' interest rate.
4. **EMI Ceiling & Stress Test**: A comfortable monthly EMI ceiling, a tenure trade-off matrix, and a **20% Income-Drop Stress Test** evaluating cash-flow resilience under economic shocks.

Behind the scenes, the engine applies Fixed Obligation to Income Ratio (FOIR) caps ranging from 30% to 50% based on employment stability. It subtracts existing EMIs and essential living costs, protects a 10% safety cushion, and computes a 0-100 confidence score."

---

## 4. Persona Case Study: Priya (approx. 45 seconds)

"Let’s look at our first test borrower, **Priya**. 

Priya is a 29-year-old salaried MNC software engineer in Bengaluru earning ₹1,10,000 net per month. She has a prime 780 CIBIL score, ₹14,000 in existing car EMIs, ₹45,000 in essential expenses including rent, and 6 months of emergency savings. She wants ₹8,00,000 for her wedding.

Our engine applies a standard 50% salaried FOIR cap, giving her a ₹55,000 debt allowance. After deducting her ₹14,000 car EMI and preserving her ₹45,000 living costs plus a 10% safety cushion, her comfortable EMI ceiling is **₹40,000 per month**. 

Because her requested ₹8 Lakh loan requires only ~₹26,846 per month over 3 years, the engine classifies her request as **`Borrow`** with a **100/100 HIGH confidence rating**. Her safe borrowing limit is ₹11.91 Lakhs, so taking ₹8 Lakhs leaves her household budget extremely healthy."

---

## 5. Persona Case Study: Ravi (approx. 45 seconds)

"Our second persona, **Ravi**, presents a nuanced business scenario.

Ravi is a 42-year-old kirana store owner in Mysuru with 14 years of operating history. His cash earnings fluctuate between ₹40,000 and ₹80,000 per month, and his wife earns ₹18,000 per month teaching. He has an `UNKNOWN` credit score, owns an unencumbered shop premises worth ₹45 Lakhs, and wants ₹15,00,000 for business expansion.

Here we enforce a strict, consistent income rule: we model Ravi’s uncollateralized cash-flow capacity using **₹60,000 per month**—the normalized midpoint of his primary business cash earnings. His wife’s ₹18,000 income is noted as qualitative household context but excluded from his business loan calculation.

Applying a 40% business FOIR cap limits his comfortable monthly EMI to **₹24,000 per month**, supporting an uncollateralized safe principal of **₹6.87 Lakhs**. Because requesting ₹15 Lakhs unsecured would require ~₹52,382 per month (consuming 87% of his income), the engine recommends **`Don't Borrow`** for unsecured debt.

However, because Ravi owns a ₹45 Lakh unencumbered shop property, the app adds a dedicated recommendation to explore a **Secured Business Loan or Loan Against Property (LAP)**. LAP structures extend tenures to 10–15 years and lower rates to 9.5%–12.5%, bringing the monthly EMI down to ~₹16,000 per month. Crucially, we highlight our core product principle: **collateral opens secured loan routes and longer tenures, but collateral does not automatically make an unaffordable EMI affordable**—monthly cash flow is still required to service the loan."

---

## 6. Persona Case Study: Anita (approx. 45 seconds)

"Our third persona, **Anita**, highlights debt stress in the informal economy.

Anita is a 35-year-old informal delivery rider in Hubballi earning ₹28,000 per month. Her husband has been unemployed for 8 months, she has 2 children, zero emergency savings, and an `UNKNOWN` credit score. She currently pays ₹6,500 per month across 3 high-cost fintech app loans at 30%+ interest and had 1 recent EMI bounce. She wants ₹1,50,000 for an electric delivery scooter.

Anita’s profile triggers multiple risk deductions. Her active high-cost app debt reduces her FOIR cap from 35% to 30%, giving her a max debt allowance of ₹8,400. After subtracting her existing ₹6,500 app EMIs and ₹18,000 family living costs, her comfortable EMI ceiling is only **₹700 per month**.

Taking a new ₹1.5 Lakh loan would force an immediate monthly household deficit of over ₹4,400. Furthermore, under our **20% Income-Drop Stress Test**, Anita’s household already faces a **-₹2,100 per month deficit** even without taking a new loan. 

The engine delivers a **`Don't Borrow`** recommendation with a **LOW confidence rating (0/100)**. Our Negotiation Card advises Anita to focus 100% of her cash flow on clearing her 30%+ app debt before attempting vehicle financing."

---

## 7. Explainability & Design Decisions (30 seconds)

"Throughout Borrower Copilot, explainability is our top priority. 

We separated all financial calculation logic into pure JavaScript modules (`src/logic/`) and documented every threshold, FOIR cap, interest rate benchmark, and confidence weight in a dedicated **`RULES.md`** file. 

Every output on the dashboard includes a *'Why this number?'* explanation so borrowers understand the mathematical rationale. By treating unknown information as uncertainty that widens estimation bands rather than imposing arbitrary penalties, we build trust with users."

---

## 8. What I Would Build Next (30 seconds)

"If I had more time to expand this platform beyond the challenge MVP, my next steps would be:

1. **Lender-Specific Rule Profiles**: Allow users to select specific banks or NBFCs to test against their exact underwriting policies.
2. **Account Aggregator Integration**: Integrate consent-based Account Aggregator APIs to automatically verify cash flows from bank statements.
3. **Consent-Based Bureau API**: Enable instant credit score fetching via CIBIL or Experian APIs with user consent.
4. **True Cash-Flow APR Engine**: Build a full cash-flow IRR calculator that incorporates exact processing fee schedules, GST, stamp duty, and insurance premiums.
5. **Property LTV Analyzer**: Expand the LAP module to evaluate Loan-to-Value (LTV) limits and legal documentation readiness for real estate collateral."

---

## 9. What I Would Cut or Simplify (15–20 seconds)

"To maintain a streamlined MVP, I deliberately kept the architecture 100% client-side with no backend servers or database overhead. 

In a further simplified product version, I would condense the questionnaire wizard into 5 essential screens and replace granular expense inputs with regional living cost benchmarks, while keeping the core Borrower-Safe target and Negotiation Card front and center.

Thank you! Borrower Copilot demonstrates how transparent financial modeling can empower borrowers to make safe, confident financial decisions."
