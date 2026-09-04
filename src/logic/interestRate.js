/**
 * Calculates estimated fair interest rate range, processing fee, and all-in APR cost.
 *
 * @param {Object} input - Questionnaire form data
 * @returns {Object} Interest rate details including rateRange, estimatedApr, processingFee, and why explanation
 */
export function calculateInterestRate(input) {
  const purpose = input.loanPurpose || 'Personal';
  
  // 1. Base rate range by loan category (Indian lending benchmark)
  let baseMin = 11.5;
  let baseMax = 14.5;

  switch (purpose) {
    case 'Home':
      baseMin = 8.5;
      baseMax = 9.75;
      break;
    case 'Vehicle':
      baseMin = 8.75;
      baseMax = 11.0;
      break;
    case 'Education':
      baseMin = 9.5;
      baseMax = 12.0;
      break;
    case 'Business':
      baseMin = 12.0;
      baseMax = 16.0;
      break;
    case 'Medical':
      baseMin = 11.5;
      baseMax = 14.5;
      break;
    case 'Personal':
    case 'Other':
    default:
      baseMin = 11.5;
      baseMax = 15.0;
      break;
  }

  // 2. Adjustments based on credit score
  let scoreAdjustment = 0;
  let rangeSpreadModifier = 0; // Widen range for UNKNOWN score
  let scoreExplanation = '';

  if (input.knowsCreditScore === 'Yes' && input.creditScore && input.creditScore !== 'UNKNOWN') {
    const score = Number(input.creditScore);
    if (score >= 780) {
      scoreAdjustment = -0.5;
      scoreExplanation = 'Prime credit score (780+) qualifies for top-tier interest rate discounts.';
    } else if (score >= 720) {
      scoreAdjustment = 0.0;
      scoreExplanation = 'Good credit score (720-779) qualifies for standard lender rates.';
    } else if (score >= 650) {
      scoreAdjustment = 1.25;
      scoreExplanation = 'Fair credit score (650-719) incurs a slight interest rate risk premium.';
    } else {
      scoreAdjustment = 3.0;
      scoreExplanation = 'Below-average credit score (<650) results in higher risk premium rates.';
    }
  } else {
    // UNKNOWN credit score -> Add moderate premium and widen range
    scoreAdjustment = 0.75;
    rangeSpreadModifier = 1.25; // Widen the range spread by ±1.25%
    scoreExplanation = 'Unspecified credit score widens the estimate band to prevent false precision.';
  }

  // 3. Adjustments based on income predictability
  let stabilityAdjustment = 0;
  if (input.incomeStability === 'Variable' || input.incomeType === 'Freelancer / informal income') {
    stabilityAdjustment += 0.75;
  } else if (input.incomeStability === 'Highly variable') {
    stabilityAdjustment += 1.5;
  }

  // Final Interest Rate Range
  const minRate = Math.max(7.5, Number((baseMin + scoreAdjustment + stabilityAdjustment - rangeSpreadModifier).toFixed(2)));
  const maxRate = Math.min(24.0, Number((baseMax + scoreAdjustment + stabilityAdjustment + rangeSpreadModifier).toFixed(2)));
  const midpointRate = Number(((minRate + maxRate) / 2).toFixed(2));

  // 4. Processing Fee Assumption (Standard 1.5% of loan amount, capped)
  const loanAmount = Number(input.loanAmount) || 100000;
  const processingFeePercent = 1.5;
  const estimatedProcessingFee = Math.max(1000, Math.min(25000, Math.round(loanAmount * (processingFeePercent / 100))));

  // 5. Estimated All-in APR Cost
  // APR = Nominal Interest Rate + (Processing Fee % amortized per year over 3-year standard term)
  const defaultTermYears = purpose === 'Home' ? 15 : 3;
  const feeAnnualizedPercent = (processingFeePercent / defaultTermYears);
  const estimatedApr = Number((midpointRate + feeAnnualizedPercent).toFixed(2));

  const why = [
    `Base rate range for ${purpose} loans: ${baseMin}% - ${baseMax}%.`,
    scoreExplanation,
    stabilityAdjustment > 0 ? `Income variability adds a +${stabilityAdjustment}% risk margin.` : 'Stable income helps secure competitive rates.',
    `Estimated processing fee of ${processingFeePercent}% (${estimatedProcessingFee.toLocaleString('en-IN')}) brings total effective APR to ~${estimatedApr}%.`
  ];

  return {
    rateRange: {
      min: minRate,
      max: maxRate,
      text: `${minRate}% - ${maxRate}%`
    },
    midpointRate,
    estimatedApr,
    processingFeePercent,
    estimatedProcessingFee,
    why
  };
}
