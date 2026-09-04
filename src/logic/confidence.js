/**
 * Evaluates calculation confidence based on income predictability, credit score availability,
 * and emergency savings buffer.
 *
 * @param {Object} input - Questionnaire form data
 * @returns {Object} Confidence assessment containing level, score, factors, and why description
 */
export function calculateConfidence(input) {
  let score = 0;
  const factors = [];

  // 1. Income Stability & Type (Max 40 pts)
  if (input.incomeType === 'Salaried') {
    score += 15;
    factors.push('Salaried position provides verified payroll records');
  } else if (input.incomeType === 'Business owner') {
    score += 12;
    factors.push('Business ownership with established operations');
  } else if (input.incomeType === 'Self-employed') {
    score += 10;
    factors.push('Self-employed professional income structure');
  } else {
    score += 5;
    factors.push('Freelance or informal income subject to higher variability');
  }

  if (input.incomeStability === 'Very stable') {
    score += 25;
    factors.push('Very stable income with minimal fluctuation');
  } else if (input.incomeStability === 'Mostly stable') {
    score += 20;
    factors.push('Mostly stable income pattern');
  } else if (input.incomeStability === 'Variable') {
    score += 10;
    factors.push('Variable income introduces cash flow uncertainty');
  } else {
    score += 5;
    factors.push('Highly variable income increases monthly risk');
  }

  // 2. Credit Score Availability (Max 30 pts)
  if (input.knowsCreditScore === 'Yes' && input.creditScore && input.creditScore !== 'UNKNOWN') {
    score += 30;
    factors.push(`Self-reported credit score (${input.creditScore}) narrows interest rate estimate`);
  } else {
    score += 10;
    factors.push('Credit score is unknown (widens interest rate range to prevent false precision)');
  }

  // 3. Emergency Savings Buffer (Max 30 pts)
  if (input.hasEmergencySavings === 'Yes' && Number(input.emergencyMonths) >= 3) {
    score += 30;
    factors.push(`${input.emergencyMonths}+ months emergency savings provides strong shock buffer`);
  } else if (input.hasEmergencySavings === 'Yes' && Number(input.emergencyMonths) > 0) {
    score += 15;
    factors.push(`${input.emergencyMonths} month(s) emergency reserve available`);
  } else {
    score += 5;
    factors.push('Zero emergency savings increases risk during unexpected income shocks');
  }

  // 4. Debt & Repayment History Risk Deductions
  if (input.hasRecentEmiBounce) {
    score -= 20;
    factors.push('Recent EMI bounce in past 6 months severely reduces confidence rating');
  }
  if (input.hasHighCostAppLoans) {
    score -= 10;
    factors.push('Active high-cost fintech app loans indicate existing debt stress');
  }

  // Determine Level
  let level = 'MEDIUM';
  if (score >= 70) {
    level = 'HIGH';
  } else if (score < 45) {
    level = 'LOW';
  }

  let why = '';
  if (level === 'HIGH') {
    why = 'High confidence due to stable income, clear credit score, and healthy emergency savings.';
  } else if (level === 'MEDIUM') {
    why = 'Medium confidence. Estimate is reliable for initial planning, but ranges are widened due to variable income or unverified credit score.';
  } else {
    why = 'Low confidence. Wide estimation bands applied due to informal/variable income and lack of emergency reserve.';
  }

  return {
    level,
    score,
    factors,
    why
  };
}
