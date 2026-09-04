/**
 * Lokta Challenge Test Borrower Profiles & Assessment Data
 */

export const TEST_BORROWERS = [
  {
    id: 'priya',
    name: 'Priya',
    age: 29,
    location: 'Bengaluru, Karnataka',
    avatarTag: 'P',
    colorTheme: 'emerald',
    roleTitle: 'Salaried Software Engineer (Large MNC)',
    summary: '29-year-old MNC software engineer with 5 years tenure, stable ₹1.1L take-home income, 780 CIBIL score, and 6 months emergency buffer seeking ₹8L wedding loan.',
    
    // Background Details
    profileDetails: {
      employment: 'Salaried (MNC, 5 years tenure)',
      income: '₹ 1,10,000 / month (Net Take-home)',
      rentExpenses: '₹ 28,000 / month rent (Essential household total: ₹45,000)',
      existingDebt: '₹ 14,000 / month car EMI (2 years remaining)',
      creditScore: '780 (Prime CIBIL Score)',
      emergencyBuffer: '6 Months of essential expenses in liquid savings',
      requestedLoan: '₹ 8,00,000 (Personal Loan for Wedding)'
    },

    // Form Data payload for live engine execution
    formData: {
      incomeType: 'Salaried',
      monthlyIncome: 110000,
      incomeStability: 'Very stable',
      hasEmi: 'Yes',
      emiAmount: 14000,
      loanAmount: 800000,
      loanPurpose: 'Personal',
      knowsCreditScore: 'Yes',
      creditScore: 780,
      essentialExpenses: 45000,
      hasEmergencySavings: 'Yes',
      emergencyMonths: 6
    },

    // 14-Point Structured Case Study Analysis
    analysis14Points: {
      questionsAsked: '9 adaptive questionnaire questions covering income type, net monthly earnings, income stability, existing car EMI, requested loan target, loan purpose, credit score, living expenses, and emergency savings.',
      answersSummary: 'Salaried (MNC), ₹1,10,000/mo income, Very Stable, ₹14,000/mo car EMI, ₹8,00,000 loan request, Personal (Wedding), 780 CIBIL score, ₹45,000 essential expenses (including ₹28k rent), 6 months emergency savings.',
      decision: 'Borrow',
      lenderSanctionRange: '₹ 11,00,000 - ₹ 12,80,000',
      borrowerSafeRange: '₹ 11,50,000 - ₹ 12,20,000',
      planningRecommendation: 'Use the Borrower-Safe Amount (₹12.2L). Since requested loan (₹8L) is lower than ₹12.2L, borrowing ₹8L is fully sustainable.',
      fairInterestRateBand: '10.5% - 13.5%',
      estimatedApr: '~ 11.5% APR (including 1.5% processing fee)',
      emiOutflowCeiling: '₹ 40,000 / month comfortable ceiling',
      tenureTradeOff: '3 Years: ₹26,180/mo EMI (Total Interest ₹1.42L) | 5 Years: ₹17,390/mo EMI (Total Interest ₹2.43L). 3-year term is recommended to save ₹1.01L in interest.',
      stressTest20Percent: 'Passes Stress Test. If income drops 20% to ₹88,000/mo, net monthly surplus remains positive at ₹15,000/mo.',
      confidenceLevel: 'HIGH (Score 85/100). Verifiable salaried payslips, known prime 780 score, and 6 months emergency buffer.',
      importantNumbersWhy: 'Salaried 50% FOIR cap gives ₹55k max debt capacity. Subtracting ₹14k car EMI and preserving ₹45k household costs + ₹11k safety cushion leaves a ₹40,000/mo comfortable ceiling supporting up to ₹12.2L safe principal.',
      negotiationCardAvailable: true
    }
  },
  {
    id: 'ravi',
    name: 'Ravi',
    age: 42,
    location: 'Mysuru, Karnataka',
    avatarTag: 'R',
    colorTheme: 'amber',
    roleTitle: 'Self-Employed Kirana Store Owner (14 Years)',
    summary: '42-year-old kirana store owner with 14-year business history, cash income ₹40k-₹80k/mo, wife earning ₹18k/mo, unencumbered shop property worth ₹45L, but no credit score or formal credit history seeking ₹15L loan.',
    
    // Background Details
    profileDetails: {
      employment: 'Self-employed Business Owner (14 years kirana shop)',
      income: '₹ 60,000 / month (Normalized midpoint of ₹40k-₹80k shop cash earnings; wife\'s ₹18k teaching income is secondary context)',
      taxReturn: '₹ 4,20,000 / year reported ITR',
      assets: 'Owns unencumbered shop premises worth ~₹ 45,00,000',
      existingDebt: '₹ 0 (Never taken a formal bank loan)',
      creditScore: 'UNKNOWN (No formal credit history / CIBIL score)',
      emergencyBuffer: '3 Months in savings',
      requestedLoan: '₹ 15,00,000 (Business expansion: second stock line + delivery vehicle)'
    },

    // Form Data payload for live engine execution
    formData: {
      incomeType: 'Business owner',
      monthlyIncome: 60000,
      incomeStability: 'Variable',
      hasEmi: 'No',
      emiAmount: 0,
      loanAmount: 1500000,
      loanPurpose: 'Business',
      knowsCreditScore: 'No',
      creditScore: 'UNKNOWN',
      essentialExpenses: 25000,
      hasEmergencySavings: 'Yes',
      emergencyMonths: 3
    },

    // 14-Point Structured Case Study Analysis
    analysis14Points: {
      questionsAsked: '9 adaptive questionnaire questions capturing cash business income, income variability, lack of existing EMIs, business expansion loan target, unknown credit score, and household costs.',
      answersSummary: 'Business owner (Kirana 14 yrs), ₹60,000/mo business income (midpoint), Variable, ₹0 existing EMI, ₹15,00,000 loan request, Business, UNKNOWN credit score (no credit history), ₹45,00,000 unencumbered shop asset, ₹25,000 essential expenses, 3 months emergency savings.',
      decision: "Don't Borrow (or Borrow Less)",
      lenderSanctionRange: '₹ 7,40,000 - ₹ 8,60,000',
      borrowerSafeRange: '₹ 7,00,000 - ₹ 8,20,000',
      planningRecommendation: 'Use the Borrower-Safe Amount (₹8.2L). Do NOT attempt to borrow ₹15L uncollateralized, as repayment would consume over 60% of net monthly cash income.',
      fairInterestRateBand: '13.25% - 17.25%',
      estimatedApr: '~ 15.75% APR (includes 1.5% fee + unhedged variable income risk premium)',
      emiOutflowCeiling: '₹ 24,000 / month comfortable ceiling',
      tenureTradeOff: '3 Years: ₹28,800/mo EMI (exceeds ceiling) | 5 Years: ₹19,800/mo EMI (Total Interest ₹3.88L). 5-year tenure recommended if loan is reduced to ₹7L-₹8L.',
      stressTest20Percent: 'Passes mild stress test. If cash income falls 20% to ₹48,000/mo, net monthly surplus narrows to ₹23,000/mo.',
      confidenceLevel: 'MEDIUM (Score 55/100). Unknown credit score and variable cash income widen the interest rate band.',
      importantNumbersWhy: 'Business owner FOIR cap of 40% limits max monthly debt obligations to ₹24,000/mo on ₹60k income. While shop asset worth ₹45L is strong collateral, uncollateralized cash flow only supports a maximum principal of ~₹8.2L.',
      negotiationCardAvailable: true
    }
  },
  {
    id: 'anita',
    name: 'Anita',
    age: 35,
    location: 'Hubballi, Karnataka',
    avatarTag: 'A',
    colorTheme: 'rose',
    roleTitle: 'Informal Delivery Rider & Home Tailor',
    summary: '35-year-old informal delivery rider with 2 children, husband unemployed 8 months, ₹28k income, ₹35k high-cost app loan debt (30%+ interest) with 1 recent EMI bounce seeking ₹1.5L for electric scooter.',
    
    // Background Details
    profileDetails: {
      employment: 'Informal Gig Worker (Delivery rider + home tailoring)',
      income: '₹ 28,000 / month (Fluctuates between ₹26k-₹30k)',
      familyStatus: 'Two children; husband unemployed for past 8 months',
      existingDebt: '₹ 6,500 / month (₹35,000 outstanding across 3 high-cost fintech app loans at 30%+ interest)',
      repaymentHistory: '1 EMI bounced last month due to cash crunch',
      creditScore: 'UNKNOWN (No formal bureau score / high risk flag)',
      emergencyBuffer: '0 Months (Zero liquid savings)',
      requestedLoan: '₹ 1,50,000 (Vehicle: Electric scooter for delivery runs)'
    },

    // Form Data payload for live engine execution
    formData: {
      incomeType: 'Freelancer / informal income',
      monthlyIncome: 28000,
      incomeStability: 'Highly variable',
      hasEmi: 'Yes',
      emiAmount: 6500,
      hasHighCostAppLoans: true,
      hasRecentEmiBounce: true,
      loanAmount: 150000,
      loanPurpose: 'Vehicle',
      knowsCreditScore: 'No',
      creditScore: 'UNKNOWN',
      essentialExpenses: 18000,
      hasEmergencySavings: 'No',
      emergencyMonths: 0
    },

    // 14-Point Structured Case Study Analysis
    analysis14Points: {
      questionsAsked: '9 adaptive questionnaire questions capturing informal gig income, high income variability, active high-cost app loan EMIs, recent EMI bounce flag, scooter loan target, unknown credit score, and 0 emergency savings.',
      answersSummary: 'Freelancer/Informal, ₹28,000/mo income, Highly Variable, ₹6,500/mo app loan EMI (30%+ interest, 1 bounce), ₹1,50,000 loan request, Vehicle (EV Scooter), UNKNOWN credit score, ₹18,000 essential family expenses, 0 emergency savings.',
      decision: "Don't Borrow",
      lenderSanctionRange: '₹ 25,000 - ₹ 55,000 (High rejection probability)',
      borrowerSafeRange: '₹ 0 - ₹ 15,000',
      planningRecommendation: 'Do NOT take on new loan debt. Focus immediately on paying off existing 30%+ app loans before attempting vehicle financing.',
      fairInterestRateBand: '18.0% - 24.0%',
      estimatedApr: '~ 22.25% (Estimated all-in annualized cost including high-risk app debt & EMI bounce premium)',
      emiOutflowCeiling: '₹ 0 / month comfortable ceiling',
      tenureTradeOff: '2 Years: ₹7,500/mo EMI (immediate default risk!) | 3 Years: ₹5,400/mo EMI. Taking new loan would cause severe household deficit.',
      stressTest20Percent: 'FAILS STRESS TEST. A 20% income fall to ₹22,400/mo results in a monthly household DEFICIT of -₹2,100/mo.',
      confidenceLevel: 'LOW (Score 5/100). Informal income, high-cost app loans, recent EMI bounce, zero emergency savings, and unknown credit history.',
      importantNumbersWhy: 'Informal income FOIR cap is 35%, reduced to 30% due to high-cost app loan stress (₹8,400 max debt allowance). Existing app loan EMIs (₹6,500) and household expenses (₹18,000) consume ₹24,500 out of ₹28,000 income, leaving zero surplus after a 10% safety cushion.',
      negotiationCardAvailable: true
    }
  }
];
