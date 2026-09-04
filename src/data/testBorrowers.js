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

    // Case Study Question & Answer Metadata (Financial outputs are calculated live by evaluateBorrowerAffordability)
    analysis14Points: {
      questionsAsked: '9 adaptive questionnaire questions covering income type, net monthly earnings, income stability, existing car EMI, requested loan target, loan purpose, credit score, living expenses, and emergency savings.',
      answersSummary: 'Salaried (MNC), ₹1,10,000/mo income, Very Stable, ₹14,000/mo car EMI, ₹8,00,000 loan request, Personal (Wedding), 780 CIBIL score, ₹45,00,00 essential expenses (including ₹28k rent), 6 months emergency savings.',
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
      collateralValue: 4500000,
      knowsCreditScore: 'No',
      creditScore: 'UNKNOWN',
      essentialExpenses: 25000,
      hasEmergencySavings: 'Yes',
      emergencyMonths: 3
    },

    // Case Study Question & Answer Metadata (Financial outputs are calculated live by evaluateBorrowerAffordability)
    analysis14Points: {
      questionsAsked: '9 adaptive questionnaire questions capturing cash business income, income variability, lack of existing EMIs, business expansion loan target, unknown credit score, shop property collateral, and household costs.',
      answersSummary: 'Business owner (Kirana 14 yrs), ₹60,000/mo business income (midpoint), Variable, ₹0 existing EMI, ₹15,00,000 loan request, Business, UNKNOWN credit score, ₹45,00,000 unencumbered shop asset, ₹25,000 essential expenses, 3 months emergency savings.',
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

    // Case Study Question & Answer Metadata (Financial outputs are calculated live by evaluateBorrowerAffordability)
    analysis14Points: {
      questionsAsked: '9 adaptive questionnaire questions capturing informal gig income, high income variability, active high-cost app loan EMIs, recent EMI bounce flag, scooter loan target, unknown credit score, and 0 emergency savings.',
      answersSummary: 'Freelancer/Informal, ₹28,000/mo income, Highly Variable, ₹6,500/mo app loan EMI (30%+ interest, 1 bounce), ₹1,50,000 loan request, Vehicle (EV Scooter), UNKNOWN credit score, ₹18,000 essential family expenses, 0 emergency savings.',
      negotiationCardAvailable: true
    }
  }
];
