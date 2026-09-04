import { evaluateBorrowerAffordability } from '../src/logic/index.js';
import { TEST_BORROWERS } from '../src/data/testBorrowers.js';

console.log("=== ENGINE NUMERICAL VERIFICATION ===");

TEST_BORROWERS.forEach(b => {
  console.log(`\n---------------- ${b.name.toUpperCase()} ----------------`);
  const res = evaluateBorrowerAffordability(b.formData);
  console.log("FormData:", b.formData);
  console.log("Recommendation:", {
    decision: res.recommendation.decision,
    badgeColor: res.recommendation.badgeColor,
    title: res.recommendation.title,
    summary: res.recommendation.summary,
    securedLoanAdvice: res.recommendation.securedLoanAdvice
  });
  console.log("Affordability:", {
    monthlyIncome: res.affordability.monthlyIncome,
    existingEmi: res.affordability.existingEmi,
    essentialExpenses: res.affordability.essentialExpenses,
    foirCapPercent: res.affordability.foirCapPercent,
    currentFoirPercent: res.affordability.currentFoirPercent,
    foirAvailableEmi: res.affordability.foirAvailableEmi,
    safeBufferEmi: res.affordability.safeBufferEmi,
    comfortableEmiCeiling: res.affordability.comfortableEmiCeiling,
    lenderSanctionRange: res.affordability.lenderSanctionRange,
    lenderLikelyMaxAmount: res.affordability.lenderLikelyMaxAmount,
    borrowerSafeRange: res.affordability.borrowerSafeRange,
    borrowerSafeMaxAmount: res.affordability.borrowerSafeMaxAmount,
    stressCase: res.affordability.stressCase
  });
  console.log("Interest Rate:", {
    rateRange: res.interestRate.rateRange,
    midpointRate: res.interestRate.midpointRate,
    estimatedApr: res.interestRate.estimatedApr,
    processingFeePercent: res.interestRate.processingFeePercent,
    estimatedProcessingFee: res.interestRate.estimatedProcessingFee,
    why: res.interestRate.why
  });
  console.log("Confidence:", {
    level: res.confidence.level,
    score: res.confidence.score,
    why: res.confidence.why,
    factors: res.confidence.factors
  });
});
