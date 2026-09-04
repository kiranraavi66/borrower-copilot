import React, { useState } from 'react';
import { TEST_BORROWERS } from '../data/testBorrowers';
import { evaluateBorrowerAffordability } from '../logic/index.js';
import { 
  UserCheck, 
  Briefcase, 
  Laptop, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Play, 
  ShieldCheck, 
  Info, 
  TrendingUp, 
  Percent, 
  Clock, 
  Sparkles, 
  HelpCircle,
  IndianRupee,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { formatINR } from '../utils/formatters';

export default function TestBorrowers({ onLoadProfile, onOpenNegotiationCard }) {
  const [selectedId, setSelectedId] = useState('priya');

  const currentBorrower = TEST_BORROWERS.find(b => b.id === selectedId) || TEST_BORROWERS[0];
  const { profileDetails, analysis14Points, formData } = currentBorrower;

  // DERIVE FINANCIAL OUTPUTS DIRECTLY FROM LIVE ENGINE
  const liveResult = evaluateBorrowerAffordability(formData);
  const { confidence, interestRate, affordability, recommendation } = liveResult;

  const decisionText = recommendation.decision;
  const lenderSanctionRangeText = affordability.lenderSanctionRange.text;
  const borrowerSafeRangeText = affordability.borrowerSafeRange.text;
  const planningRecommendationText = recommendation.planningGuidance.guidanceNote;
  const fairInterestRateBandText = interestRate.rateRange.text;
  const estimatedAprText = `~ ${interestRate.estimatedApr}% APR (Estimated all-in cost with ${interestRate.processingFeePercent}% processing fee)`;
  const emiOutflowCeilingText = `₹ ${affordability.comfortableEmiCeiling.toLocaleString('en-IN')} / month comfortable ceiling`;
  const stressTestText = affordability.stressCase.why;
  const confidenceLevelText = `${confidence.level} (Score ${Math.max(0, confidence.score)}/100)`;
  const keyNumbersWhyText = recommendation.why.join(' ');
  const tenureTradeOffText = affordability.tenureOptions.map(opt => `${opt.years} Yrs: ₹${opt.monthlyEmi.toLocaleString('en-IN')}/mo EMI (Interest ₹${(opt.totalInterest / 100000).toFixed(2)}L)`).join(' | ');

  // Decision styling
  let decisionBadgeClass = 'badge-emerald';
  let DecisionIcon = CheckCircle2;
  if (decisionText.includes('Borrow Less')) {
    decisionBadgeClass = 'badge-amber';
    DecisionIcon = AlertTriangle;
  } else if (decisionText.includes("Don't Borrow")) {
    decisionBadgeClass = 'badge-red';
    DecisionIcon = XCircle;
  }

  return (
    <div className="test-borrowers-container fade-in">
      {/* Header Title */}
      <div className="test-page-header">
        <div className="header-badge">Lokta Challenge Run-throughs</div>
        <h2>Test Borrower Profiles & Decision Scenarios</h2>
        <p>
          Select any of the three official Lokta challenge borrower profiles to review their 14-point financial affordability evaluation, or click <strong>"Load Profile into Live Engine"</strong> to run their data through the interactive dashboard.
        </p>
      </div>

      {/* Borrower Profile Tabs */}
      <div className="borrower-tabs-grid">
        {TEST_BORROWERS.map((borrower) => {
          const isSelected = borrower.id === selectedId;
          return (
            <div 
              key={borrower.id}
              className={`borrower-tab-card theme-${borrower.colorTheme} ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedId(borrower.id)}
            >
              <div className="tab-avatar-box">
                {borrower.avatarTag}
              </div>
              <div className="tab-info">
                <h3>{borrower.name}</h3>
                <span className="tab-role">{borrower.roleTitle}</span>
                <span className="tab-location">{borrower.location}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Borrower Hero Overview */}
      <div className={`borrower-hero-card border-theme-${currentBorrower.colorTheme}`}>
        <div className="hero-top-row">
          <div className="hero-profile-title">
            <div className="profile-badge-icon">
              {currentBorrower.name === 'Priya' && <UserCheck size={28} />}
              {currentBorrower.name === 'Ravi' && <Briefcase size={28} />}
              {currentBorrower.name === 'Anita' && <Laptop size={28} />}
            </div>
            <div>
              <h3>{currentBorrower.name} ({currentBorrower.age} yrs, {currentBorrower.location})</h3>
              <p className="hero-subtitle-text">{currentBorrower.roleTitle}</p>
            </div>
          </div>

          <button 
            type="button" 
            className="btn-primary-gradient btn-run-engine"
            onClick={() => onLoadProfile(formData)}
          >
            <Play size={18} />
            <span>Load {currentBorrower.name}'s Data into Live Engine</span>
          </button>
        </div>

        <p className="hero-summary-paragraph">{currentBorrower.summary}</p>

        {/* Profile Context Parameters Grid */}
        <div className="profile-details-grid">
          <div className="detail-item">
            <span className="detail-label">Employment</span>
            <div className="detail-val">{profileDetails.employment}</div>
          </div>

          <div className="detail-item">
            <span className="detail-label">Net Take-Home Income</span>
            <div className="detail-val text-primary">{profileDetails.income}</div>
          </div>

          <div className="detail-item">
            <span className="detail-label">Existing EMIs</span>
            <div className="detail-val">{profileDetails.existingDebt}</div>
          </div>

          <div className="detail-item">
            <span className="detail-label">Credit Score Status</span>
            <div className="detail-val">{profileDetails.creditScore}</div>
          </div>

          <div className="detail-item">
            <span className="detail-label">Emergency Reserve</span>
            <div className="detail-val">{profileDetails.emergencyBuffer}</div>
          </div>

          <div className="detail-item highlight-detail">
            <span className="detail-label">Requested Loan Target</span>
            <div className="detail-val">{profileDetails.requestedLoan}</div>
          </div>
        </div>
      </div>

      {/* 14-POINT STRUCTURED FINANCIAL RULE BREAKDOWN */}
      <div className="analysis-14-container">
        <h3 className="breakdown-title">
          <Sparkles size={22} className="text-primary" />
          <span>14-Point Planning Evaluation Breakdown: {currentBorrower.name}</span>
        </h3>

        <div className="points-grid">
          {/* Point 1: Questions Asked */}
          <div className="point-card">
            <span className="point-number">1</span>
            <div className="point-content">
              <h4>Questions Asked</h4>
              <p>{analysis14Points.questionsAsked}</p>
            </div>
          </div>

          {/* Point 2: Answers Summary */}
          <div className="point-card">
            <span className="point-number">2</span>
            <div className="point-content">
              <h4>Answers Captured</h4>
              <p>{analysis14Points.answersSummary}</p>
            </div>
          </div>

          {/* Point 3: Borrow Decision */}
          <div className="point-card point-span-2">
            <span className="point-number">3</span>
            <div className="point-content">
              <h4>Borrow Decision</h4>
              <div className="decision-display-row">
                <span className={`decision-pill ${decisionBadgeClass}`}>
                  <DecisionIcon size={18} />
                  <span>{decisionText}</span>
                </span>
                <span className="decision-note-inline">
                  (Planning recommendation derived dynamically from live calculation engine)
                </span>
              </div>
            </div>
          </div>

          {/* Point 4: Lender Sanction Range */}
          <div className="point-card">
            <span className="point-number">4</span>
            <div className="point-content">
              <h4>Estimated Lender-Likely Sanction Range</h4>
              <div className="point-value">{lenderSanctionRangeText}</div>
            </div>
          </div>

          {/* Point 5: Borrower-Safe Affordable Range */}
          <div className="point-card point-highlight">
            <span className="point-number">5</span>
            <div className="point-content">
              <h4>Borrower-Safe Affordable Range</h4>
              <div className="point-value text-primary">{borrowerSafeRangeText}</div>
            </div>
          </div>

          {/* Point 6: Planning Recommendation */}
          <div className="point-card point-span-2">
            <span className="point-number">6</span>
            <div className="point-content">
              <h4>Which Amount Should the Borrower Use for Planning?</h4>
              <p className="planning-callout-text">{planningRecommendationText}</p>
            </div>
          </div>

          {/* Point 7: Fair Interest-Rate Band */}
          <div className="point-card">
            <span className="point-number">7</span>
            <div className="point-content">
              <h4>Fair Interest-Rate Band</h4>
              <div className="point-value">{fairInterestRateBandText}</div>
            </div>
          </div>

          {/* Point 8: Estimated All-In APR/Cost */}
          <div className="point-card">
            <span className="point-number">8</span>
            <div className="point-content">
              <h4>Estimated All-In APR / Effective Cost</h4>
              <div className="point-value text-emerald">{estimatedAprText}</div>
            </div>
          </div>

          {/* Point 9: EMI/Outflow Ceiling */}
          <div className="point-card">
            <span className="point-number">9</span>
            <div className="point-content">
              <h4>Comfortable Monthly EMI Ceiling</h4>
              <div className="point-value">{emiOutflowCeilingText}</div>
            </div>
          </div>

          {/* Point 10: Tenure Trade-Off */}
          <div className="point-card">
            <span className="point-number">10</span>
            <div className="point-content">
              <h4>Tenure Trade-Off Analysis</h4>
              <p>{tenureTradeOffText}</p>
            </div>
          </div>

          {/* Point 11: 20% Stress Test */}
          <div className="point-card point-span-2">
            <span className="point-number">11</span>
            <div className="point-content">
              <h4>20% Income-Drop Stress Test</h4>
              <p>{stressTestText}</p>
            </div>
          </div>

          {/* Point 12: Confidence Level */}
          <div className="point-card">
            <span className="point-number">12</span>
            <div className="point-content">
              <h4>Calculation Confidence Level</h4>
              <div className="point-value">{confidenceLevelText}</div>
            </div>
          </div>

          {/* Point 13: Explanation of Important Numbers */}
          <div className="point-card point-span-2">
            <span className="point-number">13</span>
            <div className="point-content">
              <h4>Explanation of Key Numbers & Financial Rationale</h4>
              <p>{keyNumbersWhyText}</p>
            </div>
          </div>

          {/* Point 14: Negotiation Card Trigger */}
          <div className="point-card point-span-2 card-action-tile">
            <span className="point-number">14</span>
            <div className="point-content card-cta-row">
              <div>
                <h4>Lender Negotiation Card</h4>
                <p>Generate a one-screen card with 5 lender questions tailored for {currentBorrower.name}.</p>
              </div>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => {
                  onLoadProfile(formData);
                }}
              >
                <span>Run Engine & Open Negotiation Card</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
