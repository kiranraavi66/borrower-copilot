import { calculateConfidence } from './confidence.js';
import { calculateInterestRate } from './interestRate.js';
import { calculateAffordability } from './affordability.js';
import { calculateRecommendation } from './recommendation.js';

/**
 * Central evaluation engine function for Borrower Copilot.
 * Accepts questionnaire form data and returns the complete 4-output decision support result:
 * 1. BORROW DECISION ("Borrow", "Borrow Less", "Don't Borrow")
 * 2. MAXIMUM AMOUNT (Lender-Likely Sanction vs Borrower-Safe Range)
 * 3. FAIR INTEREST RATE (Rate Range, Processing Fee & All-in APR)
 * 4. EMI / MONTHLY OUTFLOW CEILING (Comfortable EMI, Stress Test & Tenure Trade-Offs)
 *
 * @param {Object} formData - Full questionnaire answers object
 * @returns {Object} Complete 4-output decision engine report
 */
export function evaluateBorrowerAffordability(formData) {
  // 1. Calculate Confidence Level & Factors
  const confidence = calculateConfidence(formData);

  // 2. Calculate Interest Rate Range & All-In APR
  const interestRate = calculateInterestRate(formData);

  // 3. Calculate FOIR Affordability, EMI Ceilings, Dual Max Amounts & Stress Case
  const affordability = calculateAffordability(formData, interestRate);

  // 4. Synthesize Final Recommendation & Decision Classification
  const recommendation = calculateRecommendation(formData, affordability, confidence);

  return {
    timestamp: new Date().toISOString(),
    confidence,
    interestRate,
    affordability,
    recommendation,
    disclaimer: "Decision-support estimate only. Not a formal credit guarantee or loan approval promise."
  };
}
