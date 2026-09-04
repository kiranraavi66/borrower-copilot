import React from 'react';
import { 
  CheckCircle2, 
  Edit2, 
  ArrowLeft, 
  ArrowRight, 
  ShieldAlert, 
  Briefcase, 
  IndianRupee, 
  TrendingUp, 
  CreditCard, 
  Target, 
  Award, 
  Home, 
  PiggyBank 
} from 'lucide-react';
import { formatINR, formatCreditScore } from '../utils/formatters';

export default function ReviewAnswers({ formData, onEditStep, onBack, onComplete }) {
  const summaryItems = [
    {
      id: 1,
      step: 1,
      icon: Briefcase,
      label: 'Employment / Income Type',
      value: formData.incomeType || 'Not specified',
    },
    {
      id: 2,
      step: 2,
      icon: IndianRupee,
      label: 'Monthly Take-Home Income',
      value: formatINR(formData.monthlyIncome) || '₹ 0',
    },
    {
      id: 3,
      step: 3,
      icon: TrendingUp,
      label: 'Income Stability',
      value: formData.incomeStability || 'Not specified',
    },
    {
      id: 4,
      step: 4,
      icon: CreditCard,
      label: 'Existing Monthly EMIs',
      value: formData.hasEmi === 'Yes' 
        ? `${formatINR(formData.emiAmount)} / month`
        : 'No existing EMIs (₹ 0)',
    },
    {
      id: 5,
      step: 5,
      icon: Target,
      label: 'Desired Loan Amount',
      value: formatINR(formData.loanAmount) || '₹ 0',
    },
    {
      id: 6,
      step: 6,
      icon: Target,
      label: 'Loan Purpose',
      value: formData.loanPurpose || 'Not specified',
    },
    {
      id: 7,
      step: 7,
      icon: Award,
      label: 'Credit Score Status',
      value: formData.knowsCreditScore === 'Yes' 
        ? `Score: ${formatCreditScore(formData.creditScore)}`
        : 'Unknown (No bureau check performed)',
    },
    {
      id: 8,
      step: 8,
      icon: Home,
      label: 'Essential Monthly Household Expenses',
      value: formatINR(formData.essentialExpenses) || '₹ 0',
    },
    {
      id: 9,
      step: 9,
      icon: PiggyBank,
      label: 'Emergency Savings Reserve',
      value: formData.hasEmergencySavings === 'Yes'
        ? `${formData.emergencyMonths} month(s) of essential expenses`
        : 'No emergency savings',
    },
  ];

  return (
    <div className="review-container">
      <div className="review-header">
        <div className="review-icon-badge">
          <CheckCircle2 size={32} />
        </div>
        <h2>Review Your Financial Assessment Profile</h2>
        <p>Please double-check your responses before proceeding to the affordability analysis.</p>
      </div>

      {/* Bureau Disclaimer Banner */}
      <div className="disclaimer-banner">
        <ShieldAlert size={22} className="disclaimer-icon" />
        <div className="disclaimer-text">
          <strong>Affordability Estimate Disclaimer:</strong>
          <p>
            The information you provided is used solely for estimating borrowing affordability and risk parameters. 
            Borrower Copilot <strong>does not perform hard or soft credit bureau queries</strong>, nor does it share data with external financial institutions.
          </p>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="summary-grid">
        {summaryItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.id} className="summary-card">
              <div className="card-top">
                <div className="summary-icon-box">
                  <IconComponent size={18} />
                </div>
                <span className="summary-label">{item.label}</span>
                <button 
                  type="button" 
                  className="edit-step-btn"
                  onClick={() => onEditStep(item.step)}
                  title={`Edit Question ${item.step}`}
                >
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>
              </div>
              <div className="summary-val">{item.value}</div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="wizard-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Back to Question 9</span>
        </button>

        <button type="button" className="btn-primary" onClick={onComplete}>
          <span>Confirm & View Affordability</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
