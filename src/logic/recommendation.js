/**
 * Synthesizes affordability, interest rates, and confidence to produce the final Borrow Decision.
 *
 * Decisions:
 * 1. "Borrow" - Requested loan amount is fully supported within safe borrower limits.
 * 2. "Borrow Less" - Requested amount exceeds borrower-safe limits, but sits within lender sanction caps.
 * 3. "Don't Borrow" - Loan causes high financial strain, exceeds lender sanction caps, or comfortable EMI is ₹0.
 *
 * @param {Object} input - Questionnaire form data
 * @param {Object} affordability - Affordability analysis from calculateAffordability
 * @param {Object} confidence - Confidence assessment from calculateConfidence
 * @returns {Object} Final recommendation output
 */
export function calculateRecommendation(input, affordability, confidence) {
  const requestedAmount = Number(input.loanAmount) || 0;
  const safeMax = affordability.borrowerSafeMaxAmount;
  const lenderMax = affordability.lenderLikelyMaxAmount;
  const comfortableEmi = affordability.comfortableEmiCeiling;

  let decision = 'Borrow';
  let badgeColor = 'green';
  let title = '';
  let summary = '';
  const why = [];

  // Decision classification logic
  if (comfortableEmi <= 0 || requestedAmount > lenderMax * 1.15) {
    decision = "Don't Borrow";
    badgeColor = 'red';
    title = "High Financial Risk: Borrowing Not Recommended";
    summary = `Your requested loan amount of ₹${requestedAmount.toLocaleString('en-IN')} exceeds safe affordability limits and would place severe strain on your monthly cash flow.`;
    
    if (comfortableEmi <= 0) {
      why.push(`Your existing monthly EMIs (₹${affordability.existingEmi.toLocaleString('en-IN')}) and essential expenses (₹${affordability.essentialExpenses.toLocaleString('en-IN')}) leave zero comfortable surplus for new loan EMIs.`);
    } else {
      why.push(`Requested loan amount (₹${requestedAmount.toLocaleString('en-IN')}) significantly exceeds maximum estimated lender sanction capacity (₹${lenderMax.toLocaleString('en-IN')}).`);
    }
  } else if (requestedAmount > safeMax) {
    decision = "Borrow Less";
    badgeColor = 'amber';
    title = "Recommended Adjustment: Borrow Less";
    summary = `Lenders may sanction up to ₹${lenderMax.toLocaleString('en-IN')}, but your borrower-safe limit is ₹${safeMax.toLocaleString('en-IN')}. Reducing your loan request will protect your household safety margin.`;
    
    why.push(`Requested amount (₹${requestedAmount.toLocaleString('en-IN')}) is higher than your borrower-safe target of ₹${safeMax.toLocaleString('en-IN')}.`);
    why.push(`Borrowing the full requested amount would push your monthly EMI beyond your comfortable household ceiling of ₹${comfortableEmi.toLocaleString('en-IN')}/month.`);
    why.push(`Lowering your borrowing target to ₹${safeMax.toLocaleString('en-IN')} keeps your monthly EMI manageable even if unexpected expenses arise.`);
  } else {
    decision = "Borrow";
    badgeColor = 'emerald';
    title = "Financially Viable: Safe to Proceed";
    summary = `Your requested loan amount of ₹${requestedAmount.toLocaleString('en-IN')} is well within your borrower-safe affordability ceiling of ₹${safeMax.toLocaleString('en-IN')}.`;
    
    why.push(`Requested loan (₹${requestedAmount.toLocaleString('en-IN')}) is fully supported by your comfortable EMI ceiling of ₹${comfortableEmi.toLocaleString('en-IN')}/month.`);
    why.push(`Preserves your essential household expense budget (₹${affordability.essentialExpenses.toLocaleString('en-IN')}) and 10% safety cushion.`);
    why.push(`Fixed Obligation to Income Ratio (FOIR) remains healthy under ${(affordability.foirCapPercent)}%.`);
  }

  // Guidance on which number to use for planning
  const planningGuidance = {
    recommendedNumber: safeMax,
    recommendedText: `₹${safeMax.toLocaleString('en-IN')}`,
    lenderText: `₹${lenderMax.toLocaleString('en-IN')}`,
    guidanceNote: "Always plan your budget using the Borrower-Safe Amount (₹" + safeMax.toLocaleString('en-IN') + "), NOT the Lender Sanction Amount. Lenders calculate how much they can legally collect, whereas the Borrower-Safe limit ensures you maintain household stability."
  };

  return {
    decision,
    badgeColor,
    title,
    summary,
    requestedAmount,
    safeMax,
    lenderMax,
    planningGuidance,
    why
  };
}
