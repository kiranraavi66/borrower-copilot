import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info, 
  TrendingUp, 
  Percent, 
  Clock, 
  RotateCcw, 
  Sparkles,
  ShieldAlert,
  HelpCircle,
  Award,
  ArrowRight,
  FileCheck,
  Zap
} from 'lucide-react';
import { formatINR, formatCreditScore } from '../utils/formatters';

export default function ResultsDashboard({ formData, results, onRecalculate, onOpenNegotiationCard }) {
  if (!results) return null;

  const { confidence, interestRate, affordability, recommendation, disclaimer } = results;
  const { decision, badgeColor, title, summary, planningGuidance, why: recWhy } = recommendation;
  const { comfortableEmiCeiling, lenderSanctionRange, borrowerSafeRange, stressCase, tenureOptions, defaultTenureYears } = affordability;

  // Decision badge styling
  let decisionBadgeClass = 'badge-emerald';
  let DecisionIcon = CheckCircle2;
  if (decision === 'Borrow Less') {
    decisionBadgeClass = 'badge-amber';
    DecisionIcon = AlertTriangle;
  } else if (decision === "Don't Borrow") {
    decisionBadgeClass = 'badge-red';
    DecisionIcon = XCircle;
  }

  return (
    <div className="dashboard-container fade-in">
      {/* Top Bar with Confidence & Actions */}
      <div className="dashboard-top-bar">
        <div className="results-badge-group">
          <span className={`decision-pill ${decisionBadgeClass}`}>
            <DecisionIcon size={18} />
            <span>{decision}</span>
          </span>

          <span className={`confidence-pill confidence-${confidence.level.toLowerCase()}`}>
            <ShieldCheck size={16} />
            <span>Confidence: {confidence.level}</span>
          </span>
        </div>

        <div className="top-actions-group">
          <button type="button" className="btn-secondary text-sm" onClick={onRecalculate}>
            <RotateCcw size={16} />
            <span>Modify Answers</span>
          </button>
          
          <button type="button" className="btn-primary-gradient text-sm" onClick={onOpenNegotiationCard}>
            <Sparkles size={16} />
            <span>View Negotiation Card</span>
          </button>
        </div>
      </div>

      {/* 1. BORROW DECISION SECTION */}
      <section className={`decision-card border-${badgeColor}`}>
        <div className="decision-header">
          <div className={`decision-icon-box bg-${badgeColor}`}>
            <DecisionIcon size={36} />
          </div>
          <div className="decision-text">
            <span className="decision-subtitle">Planning Recommendation</span>
            <h2>{title}</h2>
            <p className="decision-main-summary">{summary}</p>
          </div>
        </div>

        <div className="planning-notice-banner">
          <Info size={18} className="notice-icon" />
          <span>
            <strong>Important Planning Note:</strong> This is an independent affordability estimate to guide your financial planning. It is <strong>NOT a lender loan approval</strong> or credit commitment.
          </span>
        </div>

        <div className="decision-why-box">
          <h4>Why this recommendation?</h4>
          <ul>
            {recWhy.map((reason, idx) => (
              <li key={idx}>
                <CheckCircle2 size={16} className="bullet-icon" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONFIDENCE & UNCERTAINTY EXPLANATION BLOCK */}
      <section className="confidence-explanation-card">
        <div className="confidence-card-header">
          <ShieldCheck size={22} className="text-primary" />
          <div>
            <h3>Calculation Confidence: <span className={`text-${confidence.level.toLowerCase()}`}>{confidence.level}</span></h3>
            <p>{confidence.why}</p>
          </div>
        </div>

        {confidence.factors && confidence.factors.length > 0 && (
          <div className="confidence-factors-list">
            <strong>Key Data Factors & Uncertainties:</strong>
            <ul>
              {confidence.factors.map((factor, idx) => (
                <li key={idx}>
                  <Zap size={14} className="factor-icon" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 2. MAXIMUM AMOUNT SECTION */}
      <section className="dashboard-section">
        <div className="section-header-box">
          <TrendingUp size={24} className="section-icon text-primary" />
          <div>
            <h3 className="section-title">2. Maximum Borrowing Capacity</h3>
            <p className="section-subtitle">Comparing lender sanction limits vs borrower-safe affordability</p>
          </div>
        </div>

        <div className="dual-amounts-grid">
          {/* Card A: Lender Capacity Range */}
          <div className="amount-card lender-card">
            <div className="amount-card-header">
              <span className="card-tag tag-lender">Lender FOIR Capacity</span>
              <h4>Estimated Lender-Capacity Range (FOIR-based)</h4>
            </div>
            <div className="amount-value">{lenderSanctionRange.text}</div>
            <div className="why-callout">
              <strong>Why this number?</strong>
              <p>
                Calculated using maximum bank FOIR (Fixed Obligation to Income Ratio) caps of up to 50% of monthly take-home pay. <em>Note: This is a capacity estimate based on income rules, NOT a lender loan approval prediction.</em>
              </p>
            </div>
          </div>

          {/* Card B: Borrower-Safe Affordable Range (RECOMMENDED) */}
          <div className="amount-card safe-card highlighted-amount">
            <div className="amount-card-header">
              <span className="card-tag tag-recommended">Use For Your Planning</span>
              <h4>Borrower-Safe Affordable Amount</h4>
            </div>
            <div className="amount-value safe-value">{borrowerSafeRange.text}</div>
            <div className="why-callout safe-why">
              <strong>Why this number?</strong>
              <p>
                Based on your comfortable EMI ceiling after fully protecting essential household expenses (₹{affordability.essentialExpenses.toLocaleString('en-IN')}) plus a 10% safety cushion.
              </p>
            </div>
          </div>
        </div>

        {/* Planning Guidance Callout */}
        <div className="guidance-box">
          <Info size={22} className="guidance-icon text-indigo" />
          <div className="guidance-content">
            <strong>Borrower Copilot Advice:</strong>
            <p>
              <strong>Use the borrower-safe amount ({borrowerSafeRange.text}) for your loan planning.</strong> While banks may offer up to {lenderSanctionRange.text}, taking the maximum lender limit leaves zero room for medical or household emergencies.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FAIR INTEREST RATE SECTION */}
      <section className="dashboard-section">
        <div className="section-header-box">
          <Percent size={24} className="section-icon text-primary" />
          <div>
            <h3 className="section-title">3. Fair Interest Rate & All-in APR</h3>
            <p className="section-subtitle">Estimated rate range and cost assumptions (No single "guaranteed" rate)</p>
          </div>
        </div>

        <div className="rates-grid">
          <div className="rate-stat-card">
            <span className="stat-label">Fair Interest-Rate Band</span>
            <div className="stat-value text-primary">{interestRate.rateRange.text}</div>
            <p className="stat-sub">Expected market band for {formData.loanPurpose || 'Personal'} loan</p>
          </div>

          <div className="rate-stat-card">
            <span className="stat-label">Processing Fee Assumption</span>
            <div className="stat-value">
              {interestRate.processingFeePercent}% 
              <span className="stat-fee-amount"> ({formatINR(interestRate.estimatedProcessingFee)})</span>
            </div>
            <p className="stat-sub">Estimated upfront administrative fee</p>
          </div>

          <div className="rate-stat-card apr-card">
            <span className="stat-label">Estimated All-in Annualized Cost</span>
            <div className="stat-value apr-value">~ {interestRate.estimatedApr}% / yr</div>
            <p className="stat-sub">Linear approx: Rate midpoint + fee % / tenure</p>
          </div>
        </div>

        {/* Why Rate Band Explanation */}
        <div className="why-box-light">
          <strong>Why was this interest rate band chosen?</strong>
          <ul>
            {interestRate.why.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. EMI / MONTHLY OUTFLOW & STRESS TEST SECTION */}
      <section className="dashboard-section">
        <div className="section-header-box">
          <Clock size={24} className="section-icon text-primary" />
          <div>
            <h3 className="section-title">4. EMI & Monthly Outflow Ceiling</h3>
            <p className="section-subtitle">Comfortable EMI cap, recommended tenure, and stress testing</p>
          </div>
        </div>

        <div className="emi-summary-box">
          <div className="emi-card-main">
            <span className="ceiling-label">Comfortable Monthly EMI Ceiling</span>
            <div className="ceiling-value">{formatINR(comfortableEmiCeiling)} <span className="per-month">/ month</span></div>
            <div className="why-callout">
              <strong>Why this ceiling?</strong>
              <p>
                Calculated after deducting existing EMIs (₹{affordability.existingEmi.toLocaleString('en-IN')}) and essential living expenses (₹{affordability.essentialExpenses.toLocaleString('en-IN')}) from monthly income.
              </p>
            </div>
          </div>

          {/* 20% Income Fall Stress Case */}
          <div className={`stress-case-card ${stressCase.isSurplusDeficit ? 'stress-danger' : 'stress-warning'}`}>
            <div className="stress-card-header">
              <ShieldAlert size={22} />
              <h4>20% Income-Drop Stress Test</h4>
            </div>
            <p className="stress-main-text">{stressCase.why}</p>
            <div className="stress-outcome-badge">
              {stressCase.isSurplusDeficit ? (
                <span className="badge-danger-fill">
                  <XCircle size={14} /> High Risk under 20% stress
                </span>
              ) : (
                <span className="badge-success-fill">
                  <CheckCircle2 size={14} /> Remains Affordable under stress
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Recommended Tenure & Trade-Off Matrix */}
        <div className="tenure-section-box">
          <div className="tenure-header">
            <h4>Recommended Tenure & Trade-Off Matrix</h4>
            <span className="tenure-badge">Recommended: {defaultTenureYears} Years</span>
          </div>

          <p className="tenure-explanation-text">
            <strong>Tenure Trade-off Rule:</strong> A <em>shorter tenure</em> results in higher monthly EMIs but significantly lower total interest cost. A <em>longer tenure</em> lowers monthly EMIs but increases total interest paid over time.
          </p>

          <div className="table-responsive">
            <table className="tenure-table">
              <thead>
                <tr>
                  <th>Tenure</th>
                  <th>Monthly EMI</th>
                  <th>Total Interest Payable</th>
                  <th>Affordability Assessment</th>
                </tr>
              </thead>
              <tbody>
                {tenureOptions.map((opt, idx) => (
                  <tr key={idx} className={opt.isComfortable ? 'row-pass' : 'row-fail'}>
                    <td className="tenure-cell">
                      <strong>{opt.years} Years</strong> ({opt.months} mos)
                      {opt.years === defaultTenureYears && <span className="recommended-dot" title="Recommended">★</span>}
                    </td>
                    <td className="emi-cell">{formatINR(opt.monthlyEmi)} / mo</td>
                    <td className="interest-cell">{formatINR(opt.totalInterest)}</td>
                    <td>
                      {opt.isComfortable ? (
                        <span className="status-pill status-pass">
                          <CheckCircle2 size={14} /> Comfortable
                        </span>
                      ) : (
                        <span className="status-pill status-fail">
                          <AlertTriangle size={14} /> Exceeds EMI Ceiling
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA to Negotiation Card */}
      <section className="negotiation-banner-cta">
        <div className="cta-left">
          <Sparkles size={32} className="cta-icon text-indigo" />
          <div>
            <h3>Ready to Talk to Lenders?</h3>
            <p>Generate a one-screen Negotiation Card with 5 critical questions to ask your loan officer.</p>
          </div>
        </div>
        <button type="button" className="btn-primary-gradient btn-lg" onClick={onOpenNegotiationCard}>
          <span>Open Negotiation Card</span>
          <ArrowRight size={20} />
        </button>
      </section>

      {/* Footer Disclaimer */}
      <div className="final-disclaimer-box">
        <Info size={18} />
        <span><strong>Disclaimer:</strong> {disclaimer}</span>
      </div>
    </div>
  );
}
