/**
 * Calculates FOIR-based affordability metrics, comfortable EMI ceiling,
 * dual maximum sanction vs safe borrowing amounts, stress testing, and tenure trade-offs.
 *
 * @param {Object} input - Questionnaire form data
 * @param {Object} rateDetails - Interest rate details from calculateInterestRate
 * @returns {Object} Affordability analysis outputs
 */
export function calculateAffordability(input, rateDetails) {
  const monthlyIncome = Number(input.monthlyIncome) || 0;
  const existingEmi = Number(input.emiAmount) || 0;
  const essentialExpenses = Number(input.essentialExpenses) || 0;
  const requestedLoanAmount = Number(input.loanAmount) || 0;
  const purpose = input.loanPurpose || 'Personal';

  // 1. Determine FOIR (Fixed Obligation to Income Ratio) Cap
  let foirCap = 0.50; // Standard 50% max FOIR for salaried/stable
  if (input.incomeType === 'Freelancer / informal income' || input.incomeStability === 'Highly variable') {
    foirCap = 0.35; // Conservative 35% cap
  } else if (input.incomeType === 'Self-employed' || input.incomeStability === 'Variable') {
    foirCap = 0.40; // 40% cap
  } else if (input.incomeStability === 'Mostly stable') {
    foirCap = 0.45; // 45% cap
  }

  // Reduce FOIR cap if high-cost app loans exist
  if (input.hasHighCostAppLoans) {
    foirCap = Math.max(0.25, foirCap - 0.05);
  }

  // 2. Calculate FOIR-based Max EMI Allowance
  const maxFoirObligation = Math.round(monthlyIncome * foirCap);
  const foirAvailableEmi = Math.max(0, maxFoirObligation - existingEmi);

  // 3. Calculate Borrower-Safe Buffer EMI (protecting essential household expenses + 10% safety cushion)
  const safetyCushion = Math.round(monthlyIncome * 0.10);
  const safeBufferEmi = Math.max(0, monthlyIncome - essentialExpenses - existingEmi - safetyCushion);

  // Comfortable EMI Ceiling is the strict minimum between FOIR cap and Safe Buffer
  const comfortableEmiCeiling = Math.max(0, Math.min(foirAvailableEmi, safeBufferEmi));

  // Current FOIR percentage
  const currentFoirPercent = monthlyIncome > 0 ? Number(((existingEmi / monthlyIncome) * 100).toFixed(1)) : 0;

  // 4. Default Tenure Setup (in years and months)
  const isSecuredLap = rateDetails?.isSecuredLap || (Number(input.collateralValue) >= Number(input.loanAmount)) || (purpose === 'Business' && Number(input.collateralValue) > 0);
  const defaultTenureYears = isSecuredLap ? 10 : (purpose === 'Home' ? 15 : 3);
  const defaultTenureMonths = defaultTenureYears * 12;
  const annualInterestRate = rateDetails.midpointRate || (isSecuredLap ? 10.75 : 12.0);

  // 5. Dual Maximum Borrowing Amounts
  // Calculate principal capacity from EMI: P = EMI * [ (1+r)^n - 1 ] / [ r * (1+r)^n ]
  const lenderLikelyMaxAmount = calculatePrincipalFromEmi(foirAvailableEmi, annualInterestRate, defaultTenureMonths);
  const borrowerSafeMaxAmount = calculatePrincipalFromEmi(comfortableEmiCeiling, annualInterestRate, defaultTenureMonths);

  // DEFENSIVE RANGE VALIDATION: Ensure min <= max always
  const lenderRawMin = Math.round(lenderLikelyMaxAmount * 0.90);
  const lenderRawMax = Math.round(lenderLikelyMaxAmount * 1.05);
  const lenderMinVal = Math.min(lenderRawMin, lenderRawMax);
  const lenderMaxVal = Math.max(lenderRawMin, lenderRawMax);

  const safeRawMin = Math.round(borrowerSafeMaxAmount * 0.85);
  const safeRawMax = Math.round(borrowerSafeMaxAmount);
  const safeMinVal = Math.min(safeRawMin, safeRawMax);
  const safeMaxVal = Math.max(safeRawMin, safeRawMax);

  const lenderSanctionRange = {
    min: lenderMinVal,
    max: lenderMaxVal,
    text: lenderMaxVal > 0 
      ? `₹ ${lenderMinVal.toLocaleString('en-IN')} - ₹ ${lenderMaxVal.toLocaleString('en-IN')}`
      : '₹ 0 (No Lender Capacity)'
  };

  const borrowerSafeRange = {
    min: safeMinVal,
    max: safeMaxVal,
    text: safeMaxVal > 0 
      ? `₹ ${safeMinVal.toLocaleString('en-IN')} - ₹ ${safeMaxVal.toLocaleString('en-IN')}`
      : '₹ 0 (No Borrower-Safe Capacity)'
  };

  // 6. Stress Case: 20% Income Drop Scenario
  const stressedIncome = Math.round(monthlyIncome * 0.80);
  const stressedMaxFoirObligation = Math.round(stressedIncome * foirCap);
  const stressedAvailableEmi = Math.max(0, stressedMaxFoirObligation - existingEmi);
  const stressedNetSurplus = stressedIncome - essentialExpenses - existingEmi;

  const stressCase = {
    incomeFallPercent: 20,
    stressedIncome,
    stressedAvailableEmi,
    stressedNetSurplus,
    isSurplusDeficit: stressedNetSurplus < 0,
    why: stressedNetSurplus < 0 
      ? `A 20% income reduction to ₹${stressedIncome.toLocaleString('en-IN')} would cause a monthly household DEFICIT of -₹${Math.abs(stressedNetSurplus).toLocaleString('en-IN')}/month.`
      : `If income drops 20% to ₹${stressedIncome.toLocaleString('en-IN')}, monthly net surplus narrows to ₹${stressedNetSurplus.toLocaleString('en-IN')}.`
  };

  // 7. Tenure Trade-Off Matrix
  const tenureOptionsList = isSecuredLap ? [7, 10, 15] : (purpose === 'Home' ? [10, 15, 20] : [2, 3, 5]);
  const tenureOptions = tenureOptionsList.map(years => {
    const months = years * 12;
    const calcEmi = calculateEmiFromPrincipal(requestedLoanAmount || borrowerSafeMaxAmount, annualInterestRate, months);
    const totalPayment = calcEmi * months;
    const totalInterest = Math.max(0, totalPayment - (requestedLoanAmount || borrowerSafeMaxAmount));

    return {
      years,
      months,
      monthlyEmi: calcEmi,
      totalInterest,
      isComfortable: comfortableEmiCeiling > 0 && calcEmi <= comfortableEmiCeiling
    };
  });

  const why = [
    `Assumed a FOIR (Fixed Obligation to Income Ratio) cap of ${(foirCap * 100)}% based on your employment type and income stability.`,
    `Current fixed monthly EMIs total ₹${existingEmi.toLocaleString('en-IN')} (${currentFoirPercent}% of monthly take-home income).`,
    `Comfortable EMI ceiling of ₹${comfortableEmiCeiling.toLocaleString('en-IN')}/month preserves essential household expenses (₹${essentialExpenses.toLocaleString('en-IN')}) plus a 10% safety cushion.`
  ];

  return {
    monthlyIncome,
    existingEmi,
    essentialExpenses,
    foirCapPercent: Math.round(foirCap * 100),
    currentFoirPercent,
    foirAvailableEmi,
    safeBufferEmi,
    comfortableEmiCeiling,
    lenderSanctionRange,
    lenderLikelyMaxAmount,
    borrowerSafeRange,
    borrowerSafeMaxAmount,
    stressCase,
    tenureOptions,
    defaultTenureYears,
    why
  };
}

/**
 * EMI formula: P * r * (1+r)^n / [ (1+r)^n - 1 ]
 */
function calculateEmiFromPrincipal(principal, annualRate, months) {
  if (!principal || principal <= 0 || !months || months <= 0) return 0;
  const monthlyRate = (annualRate / 12) / 100;
  if (monthlyRate === 0) return Math.round(principal / months);
  
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
}

/**
 * Reverse EMI formula to find Principal: P = EMI * [ (1+r)^n - 1 ] / [ r * (1+r)^n ]
 */
function calculatePrincipalFromEmi(emi, annualRate, months) {
  if (!emi || emi <= 0 || !months || months <= 0) return 0;
  const monthlyRate = (annualRate / 12) / 100;
  if (monthlyRate === 0) return Math.round(emi * months);
  
  const principal = (emi * (Math.pow(1 + monthlyRate, months) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, months));
  return Math.round(principal);
}
