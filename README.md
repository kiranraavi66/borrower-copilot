# Borrower Copilot

**Borrower Copilot** is a client-side, privacy-first web application designed to empower Indian borrowers with instant financial affordability estimates, risk insights, fair interest rate benchmarks, and lender negotiation tactics.

Built for the **Lokta Borrower Copilot Challenge**, the platform operates 100% locally in the browser with zero backend servers or credit bureau queries.

---

## What It Does

Borrower Copilot guides users through an adaptive 9-step financial assessment and produces **4 Core Outputs**:

1. **BORROW DECISION**:
   - Classifies borrowing requests into **`Borrow`**, **`Borrow Less`**, or **`Don't Borrow`**.
   - Provides clear rationale explaining monthly cash flow strain and risk factors.
2. **MAXIMUM BORROWING AMOUNT**:
   - Displays **TWO separate figures**:
     - *Estimated Lender-Capacity Range (FOIR-based)* (maximum bank debt capacity under 50% FOIR rules; capacity estimate, NOT a loan approval prediction).
     - *Borrower-Safe Affordable Amount* (maximum loan supported while protecting essential household expenses and a 10% safety cushion).
   - Prominently instructs borrowers to plan using the **Borrower-Safe Amount**.
3. **FAIR INTEREST RATE & ESTIMATED ALL-IN ANNUALIZED COST**:
   - Calculates a fair expected market rate band (`X% - Y%`) based on loan purpose, income stability, credit score risk tiers, high-cost app debt, and EMI bounce history.
   - Computes an **Estimated All-In Annualized Cost** using a linear approximation formula (midpoint rate + fee % / tenure).
   - *Never displays a single "guaranteed" interest rate.*
4. **EMI / MONTHLY OUTFLOW CEILING & STRESS TEST**:
   - Calculates a **Comfortable Monthly EMI Ceiling**.
   - Evaluates a **20% Income-Drop Stress Test** to check household surplus resilience under economic shocks.
   - Displays a **Tenure Trade-Off Matrix** comparing monthly EMIs vs total interest payable across durations.

Additionally, the app generates a one-screen, printable/copyable **Lender Negotiation Card** containing 5 mandatory questions to ask bank loan officers.

---

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 6
- **Language**: JavaScript (ES6+ / JSX)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid, Glassmorphism, Mobile Responsive)
- **Icons**: Lucide React
- **Backend**: None (100% Client-Side React State)
- **Database**: None

---

## Run Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Setup & Run Commands

```bash
# 1. Clone or navigate into the project root directory
cd borrower-copilot

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

The application will run locally in your web browser (typically at `http://localhost:5173`).

---

## How to Use

1. **Start Assessment**: Click *"Start Affordability Assessment"* on the home page.
2. **Answer Adaptive Questions**: Progress through the 9-step wizard (Income type, take-home pay, stability, existing EMIs, desired loan, purpose, credit score status, living expenses, emergency savings).
3. **Review Answers**: Verify your financial inputs on the review screen; click "Edit" on any step if needed.
4. **View Results Dashboard**: Analyze your Borrow Decision, Dual Maximum Amounts, Fair Interest Rate Band, and EMI Stress Test.
5. **Open Lender Negotiation Card**: Click *"View Negotiation Card"* to view, copy, or print a single-page summary card with 5 questions for loan officers.
6. **Try Test Borrowers**: Select *"Test Borrowers"* from the top navigation bar to explore the 3 challenge personas (Priya, Ravi, Anita).

---

## Test Borrowers (Lokta Challenge Run-Throughs)

The app includes three pre-configured test borrower personas:

- **Priya (29, Bengaluru)**: Salaried MNC Engineer (₹1.1L income, ₹14k EMI, 780 CIBIL score, ₹8L wedding loan) $\rightarrow$ **`Borrow`** | **`HIGH Confidence`**.
- **Ravi (42, Mysuru)**: Self-Employed Kirana Store Owner (₹60k/mo business cash income midpoint, ₹45L unencumbered shop asset, unknown credit score, ₹15L business loan) $\rightarrow$ **`Borrow via MSME Loan Against Property (LAP)`** | **`MEDIUM Confidence`**.
- **Anita (35, Hubballi)**: Informal Delivery Rider (₹28k income, ₹6.5k high-cost app loan EMIs with 1 recent bounce, ₹1.5L scooter loan) $\rightarrow$ **`Don't Borrow`** | **`LOW Confidence`**.

Click **"Load Profile into Live Engine"** on any test borrower card to immediately run their parameters through the live decision engine.

---

## Financial Rules Documentation

All financial formulas, FOIR caps, interest rate benchmarks, APR calculations, and confidence weights are documented in:
- **[`RULES.md`](file:///c:/Users/LENOVO/OneDrive/Desktop/borrower-copilot/RULES.md)**

---

## Limitations & Disclaimer

- **Educational Tool Only**: Borrower Copilot is an educational planning and negotiation support tool. It is **NOT** a lender loan approval, credit bureau pull, financial advice, or formal credit decision.
- **No Bureau Integration**: Does not query CIBIL, Experian, or credit registries.
- **Lender Variance**: Actual bank underwriting policies, FOIR limits, interest rates, and processing fees vary across financial institutions.
