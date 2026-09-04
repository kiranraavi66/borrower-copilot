# Borrower Copilot — Official 5-Minute Submission Walkthrough

This document provides the exact spoken presentation script for the **Lokta Borrower Copilot Challenge**. 

Designed for a 5-minute video recording or live jury presentation, it uses a natural, first-person narrative voice to explain the core thesis, adaptive architecture, underwriting mechanics, persona case studies, and engineering trade-offs.

---

## 1. The Core Thesis (0:00 – 0:45)

"Hello everyone! I’m excited to present **Borrower Copilot**—an independent, privacy-first borrower planning application built for Indian retail borrowers.

When individuals apply for a loan in India today, they face a fundamental asymmetry. Lenders use sophisticated risk engines designed to compute **sanction maximization**—the maximum debt they can legally collect from a borrower's paycheck under regulatory limits. Too often, retail borrowers assume that if a bank sanctions ₹12 Lakhs, it must be safe to borrow ₹12 Lakhs. They take the full sanction, only to find themselves trapped in severe cash-flow stress when medical bills, school fees, or inflation hit.

Borrower Copilot flips this dynamic on its head. It introduces **borrower-first underwriting**, drawing a clear line between two numbers: the **Estimated Lender-Capacity Range**—how much a bank might sanction under standard FOIR rules—and the **Borrower-Safe Affordable Amount**—how much a household can comfortably borrow while protecting essential living expenses and preserving a 10% safety cushion."

---

## 2. Adaptive Flow & Unknown Score Handling (0:45 – 1:45)

"The user flow starts with a minimal, non-intrusive 9-step adaptive wizard. We ask only the essential questions required for honest financial modeling: income type, net take-home earnings, stability, existing EMIs, desired loan target, purpose, credit score status, living expenses, and emergency savings.

Our questionnaire adapts dynamically based on user inputs. If a borrower indicates existing debt, adaptive branches trigger to capture exact monthly EMI obligations. If they indicate high-interest fintech app debt or a recent EMI bounce, risk flags are set immediately.

A critical design decision in our engine is how we handle missing credit bureau data. Millions of Indian credit seekers do not know their score or lack a formal bureau history. Most financial calculators assign an arbitrary zero or a penalizing 300 score, which distorts the math. 

In Borrower Copilot, **an unknown score is recorded explicitly as `UNKNOWN`**. We do not penalize the score to zero. Instead, our decision engine acknowledges the pricing uncertainty by widening the interest rate estimation band by $\pm 1.25\%$ and reducing calculation confidence. This avoids false precision while keeping the financial advice completely honest."

---

## 3. Underwriting Rules & Math Engine (1:45 – 2:45)

"Under the hood, all calculations run 100% client-side in pure JavaScript (`src/logic/`). We apply four strict underwriting rules:

First, **FOIR Caps**: We enforce Fixed Obligation to Income Ratio caps ranging from 50% for stable salaried employees, down to 40% for business owners, 35% for informal gig workers, and 30% for borrowers carrying high-cost app debt.

Second, **Safe Surplus Formula**: We compute available FOIR EMI, but we ALSO compute a **Safe Buffer EMI** using the formula:
$$\text{Safe Buffer EMI} = \text{Monthly Income} - \text{Essential Expenses} - \text{Existing EMIs} - (10\% \times \text{Income})$$
The Comfortable EMI Ceiling is the strict minimum of the FOIR cap and the Safe Buffer.

Third, **All-in APR Cost Disclosure**: We display a fair interest rate band (`X% - Y%`) and calculate an Estimated All-in Annualized Cost incorporating processing fees and GST. We *never* show a single guaranteed interest rate.

Fourth, **20% Income Stress Testing**: We simulate a 20% drop in monthly earnings to test whether the household surplus remains positive or falls into a dangerous monthly deficit under economic shocks."

---

## 4. The Three Personas (2:45 – 4:00)

"Let’s see how our engine handles our three Lokta challenge personas:

First, **Priya**—a salaried MNC engineer in Bengaluru earning ₹1.10 Lakhs/month with a 780 CIBIL score and ₹14k car EMI. Her 50% FOIR cap and ₹45k living costs yield a comfortable EMI ceiling of **₹40,000/month**. Since her ₹8 Lakh wedding loan request requires ~₹26,846/month over 3 years, the engine returns a **`Borrow`** decision with **100/100 HIGH confidence**, noting that her safe borrowing limit extends up to ₹11.91 Lakhs.

Second, **Ravi**—a kirana store owner in Mysuru with variable income, an `UNKNOWN` credit score, and a ₹15 Lakh business expansion request. We enforce **Option A**: modeling his cash-flow capacity on **₹60,000/month**—the normalized midpoint of his shop earnings—while noting his wife’s ₹18k teaching income as qualitative context. An unsecured ₹15 Lakh loan requires ~₹52,382/month EMI, which consumes 87% of his income and fails unsecured underwriting (~₹6.87L safe limit). 

However, because Ravi owns an unencumbered shop premises worth **₹45 Lakhs**, the engine routes him to an **MSME Loan Against Property (LAP)** at **33.3% LTV**. LAP lowers rates to 9.5%–12.5% and extends tenures to 10–15 years, bringing the monthly EMI down to ~₹15,670/month. We emphasize our core rule: *collateral opens LAP product routes and longer tenures, but collateral does not automatically make an unaffordable EMI affordable.*

Third, **Anita**—an informal delivery rider in Hubballi earning ₹28,000/month with 2 children, an unemployed husband, zero savings, 3 active fintech app loans totaling ₹35,000 at 30%+ interest, and a recent EMI bounce. Her FOIR cap drops to 30%, leaving only ₹1,900 available FOIR EMI and a comfortable ceiling of **₹700/month**. Taking a ₹1.5 Lakh scooter loan would cause a severe -₹4,489/month deficit. Furthermore, under our 20% stress test, her household faces a **-₹2,100/month deficit** even without a new loan! The engine delivers a **`Don't Borrow`** verdict with **LOW confidence (0/100)**, and our Negotiation Card directs her to PM SVANidhi micro-livelihood schemes and MFI debt consolidation."

---

## 5. What to Build Next (4:00 – 4:35)

"If I were taking Borrower Copilot from challenge MVP to production, my next engineering priorities would be:

1. **Account Aggregator Integration**: Connect to India’s Account Aggregator framework to fetch consent-backed bank statements for instant, automated cash-flow verification.
2. **Live Benchmark Scrapers**: Scrape real-time RBI repo-linked lending rate (RLLR) benchmarks across major Indian banks to dynamically adjust rate estimation bands.
3. **Multilingual Voice UI**: Add Hindi, Kannada, Tamil, and Marathi voice navigation so non-literate informal earners like Anita can complete assessments in their native dialect."

---

## 6. What Was Cut & Why (4:35 – 5:00)

"Finally, let’s talk about what we deliberately cut for this MVP:

We eliminated backend databases and server APIs, keeping 100% of state ephemeral in the browser. This guarantees complete user privacy—no financial or personal data ever leaves the user's device. We also chose not to pull live CIBIL credit reports, ensuring that using Borrower Copilot incurs **zero hard inquiries or credit score impact**.

Thank you! Borrower Copilot proves that transparent, borrower-first financial engineering can protect Indian households from debt traps."
