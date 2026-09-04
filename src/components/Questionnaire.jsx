import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  AlertCircle, 
  Briefcase, 
  UserCheck, 
  Building2, 
  Laptop, 
  IndianRupee, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  Home, 
  User, 
  GraduationCap, 
  Car, 
  HeartPulse, 
  HelpCircle, 
  CheckCircle,
  PiggyBank
} from 'lucide-react';
import { formatINR, parseCleanNumber } from '../utils/formatters';

export default function Questionnaire({ formData, setFormData, currentStep, setCurrentStep, onComplete }) {
  const [errorMsg, setErrorMsg] = useState('');

  // Update specific field in formData
  const updateField = (field, val) => {
    setErrorMsg('');
    setFormData(prev => ({
      ...prev,
      [field]: val
    }));
  };

  // Helper for numeric inputs
  const handleNumericChange = (field, rawVal) => {
    const clean = parseCleanNumber(rawVal);
    updateField(field, clean);
  };

  // Step Validation logic before proceeding
  const validateCurrentStep = () => {
    setErrorMsg('');

    switch (currentStep) {
      case 1:
        if (!formData.incomeType) {
          setErrorMsg('Please select your employment or income type.');
          return false;
        }
        break;
      case 2:
        if (!formData.monthlyIncome || Number(formData.monthlyIncome) <= 0) {
          setErrorMsg('Please enter a valid monthly take-home income greater than ₹0.');
          return false;
        }
        break;
      case 3:
        if (!formData.incomeStability) {
          setErrorMsg('Please select how stable your income is.');
          return false;
        }
        break;
      case 4:
        if (!formData.hasEmi) {
          setErrorMsg('Please specify if you currently have loan EMIs.');
          return false;
        }
        if (formData.hasEmi === 'Yes' && (!formData.emiAmount || Number(formData.emiAmount) <= 0)) {
          setErrorMsg('Please enter your total monthly EMI amount.');
          return false;
        }
        break;
      case 5:
        if (!formData.loanAmount || Number(formData.loanAmount) <= 0) {
          setErrorMsg('Please enter the loan amount you wish to borrow.');
          return false;
        }
        break;
      case 6:
        if (!formData.loanPurpose) {
          setErrorMsg('Please select the purpose of your loan.');
          return false;
        }
        break;
      case 7:
        if (!formData.knowsCreditScore) {
          setErrorMsg('Please indicate whether you know your credit score.');
          return false;
        }
        if (formData.knowsCreditScore === 'Yes') {
          const score = Number(formData.creditScore);
          if (!formData.creditScore || isNaN(score) || score < 300 || score > 900) {
            setErrorMsg('Please enter a valid credit score between 300 and 900.');
            return false;
          }
        }
        break;
      case 8:
        if (formData.essentialExpenses === '' || formData.essentialExpenses === null || Number(formData.essentialExpenses) < 0) {
          setErrorMsg('Please enter your monthly essential household expenses.');
          return false;
        }
        break;
      case 9:
        if (!formData.hasEmergencySavings) {
          setErrorMsg('Please select if you have emergency savings.');
          return false;
        }
        if (formData.hasEmergencySavings === 'Yes' && (!formData.emergencyMonths || Number(formData.emergencyMonths) < 0)) {
          setErrorMsg('Please select how many months of expenses your emergency savings cover.');
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    
    if (currentStep < 9) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    setErrorMsg('');
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="wizard-card">
      <div className="step-header">
        <span className="step-badge">Question {currentStep} of 9</span>
        <h2 className="step-title">{getStepTitle(currentStep)}</h2>
        <p className="step-description">{getStepDescription(currentStep)}</p>
      </div>

      {errorMsg && (
        <div className="error-banner">
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="step-content">
        {/* STEP 1: Income Type */}
        {currentStep === 1 && (
          <div className="options-grid">
            {[
              { id: 'Salaried', label: 'Salaried', desc: 'Regular monthly paycheck from an employer', icon: UserCheck },
              { id: 'Self-employed', label: 'Self-employed', desc: 'Individual consultant, professional, or sole proprietor', icon: Briefcase },
              { id: 'Business owner', label: 'Business owner', desc: 'Owner of registered business or enterprise', icon: Building2 },
              { id: 'Freelancer / informal income', label: 'Freelancer / Informal Income', desc: 'Gig worker, contract worker, or informal earnings', icon: Laptop },
            ].map(opt => {
              const IconComp = opt.icon;
              const isSelected = formData.incomeType === opt.id;
              return (
                <div 
                  key={opt.id} 
                  className={`option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => updateField('incomeType', opt.id)}
                >
                  <div className="option-icon-box">
                    <IconComp size={22} />
                  </div>
                  <div className="option-text">
                    <h4>{opt.label}</h4>
                    <p>{opt.desc}</p>
                  </div>
                  {isSelected && <CheckCircle size={20} className="check-icon" />}
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 2: Monthly Income */}
        {currentStep === 2 && (
          <div className="input-group-wrapper">
            <label htmlFor="monthlyIncome" className="field-label">
              Average Monthly Take-Home Income (in ₹)
            </label>
            <div className="currency-input-box">
              <span className="currency-symbol">₹</span>
              <input
                id="monthlyIncome"
                type="text"
                className="form-input"
                placeholder="e.g. 75,000"
                value={formData.monthlyIncome ? formData.monthlyIncome.toLocaleString('en-IN') : ''}
                onChange={(e) => handleNumericChange('monthlyIncome', e.target.value)}
                autoFocus
              />
            </div>

            {formData.monthlyIncome > 0 && (
              <div className="formatted-preview">
                Equivalent to: <strong>{formatINR(formData.monthlyIncome)} / month</strong>
              </div>
            )}

            <div className="preset-container">
              <span className="preset-label">Quick select:</span>
              {[30000, 50000, 75000, 100000, 200000].map(amt => (
                <button
                  key={amt}
                  type="button"
                  className={`preset-btn ${formData.monthlyIncome === amt ? 'active' : ''}`}
                  onClick={() => updateField('monthlyIncome', amt)}
                >
                  {formatINR(amt)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Income Stability */}
        {currentStep === 3 && (
          <div className="options-grid">
            {[
              { id: 'Very stable', label: 'Very Stable', desc: 'Guaranteed monthly income with virtually no fluctuation', icon: ShieldCheck },
              { id: 'Mostly stable', label: 'Mostly Stable', desc: 'Predictable income with minor seasonal or performance variance', icon: Clock },
              { id: 'Variable', label: 'Variable', desc: 'Income varies month-to-month based on projects, sales, or commissions', icon: TrendingUp },
              { id: 'Highly variable', label: 'Highly Variable', desc: 'Unpredictable cash flows or irregular quarterly/project payouts', icon: AlertCircle },
            ].map(opt => {
              const IconComp = opt.icon;
              const isSelected = formData.incomeStability === opt.id;
              return (
                <div 
                  key={opt.id} 
                  className={`option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => updateField('incomeStability', opt.id)}
                >
                  <div className="option-icon-box">
                    <IconComp size={22} />
                  </div>
                  <div className="option-text">
                    <h4>{opt.label}</h4>
                    <p>{opt.desc}</p>
                  </div>
                  {isSelected && <CheckCircle size={20} className="check-icon" />}
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 4: Current EMIs (Adaptive) */}
        {currentStep === 4 && (
          <div className="adaptive-step-wrapper">
            <label className="field-label">Do you currently pay any existing loan EMIs?</label>
            <div className="binary-toggle-grid">
              <div 
                className={`toggle-card ${formData.hasEmi === 'Yes' ? 'selected' : ''}`}
                onClick={() => {
                  updateField('hasEmi', 'Yes');
                }}
              >
                <h4>Yes</h4>
                <p>I pay existing monthly EMIs (home, car, personal, credit card, etc.)</p>
              </div>

              <div 
                className={`toggle-card ${formData.hasEmi === 'No' ? 'selected' : ''}`}
                onClick={() => {
                  updateField('hasEmi', 'No');
                  updateField('emiAmount', 0); // Automatically clear EMI amount
                }}
              >
                <h4>No</h4>
                <p>I have zero active loans or monthly EMI obligations</p>
              </div>
            </div>

            {/* ADAPTIVE FOLLOW-UP QUESTION */}
            {formData.hasEmi === 'Yes' && (
              <div className="followup-box fade-in">
                <label htmlFor="emiAmount" className="field-label">
                  Total Monthly EMI Amount (in ₹)
                </label>
                <div className="currency-input-box">
                  <span className="currency-symbol">₹</span>
                  <input
                    id="emiAmount"
                    type="text"
                    className="form-input"
                    placeholder="e.g. 15,000"
                    value={formData.emiAmount ? formData.emiAmount.toLocaleString('en-IN') : ''}
                    onChange={(e) => handleNumericChange('emiAmount', e.target.value)}
                    autoFocus
                  />
                </div>
                {formData.emiAmount > 0 && (
                  <div className="formatted-preview">
                    Total current obligations: <strong>{formatINR(formData.emiAmount)} / month</strong>
                  </div>
                )}

                {/* Additional Risk Attributes for Existing Debt */}
                <div className="debt-risk-flags" style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <label className="field-label" style={{ fontSize: '0.95rem' }}>Existing Debt Context (Optional Risk Factors)</label>
                  
                  <div className="checkbox-toggle-row" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                      <input 
                        type="checkbox" 
                        checked={!!formData.hasHighCostAppLoans} 
                        onChange={(e) => updateField('hasHighCostAppLoans', e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: '#38bdf8' }}
                      />
                      <span>Includes high-cost fintech app loans (30%+ interest)</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                      <input 
                        type="checkbox" 
                        checked={!!formData.hasRecentEmiBounce} 
                        onChange={(e) => updateField('hasRecentEmiBounce', e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: '#f43f5e' }}
                      />
                      <span>Had an EMI bounce in the past 6 months</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Desired Loan Amount */}
        {currentStep === 5 && (
          <div className="input-group-wrapper">
            <label htmlFor="loanAmount" className="field-label">
              How much would you like to borrow? (in ₹)
            </label>
            <div className="currency-input-box">
              <span className="currency-symbol">₹</span>
              <input
                id="loanAmount"
                type="text"
                className="form-input"
                placeholder="e.g. 5,00,000"
                value={formData.loanAmount ? formData.loanAmount.toLocaleString('en-IN') : ''}
                onChange={(e) => handleNumericChange('loanAmount', e.target.value)}
                autoFocus
              />
            </div>

            {formData.loanAmount > 0 && (
              <div className="formatted-preview">
                Target Loan Requested: <strong>{formatINR(formData.loanAmount)}</strong>
              </div>
            )}

            <div className="preset-container">
              <span className="preset-label">Common loan targets:</span>
              {[100000, 300000, 500000, 1000000, 2500000].map(amt => (
                <button
                  key={amt}
                  type="button"
                  className={`preset-btn ${formData.loanAmount === amt ? 'active' : ''}`}
                  onClick={() => updateField('loanAmount', amt)}
                >
                  {formatINR(amt)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: Loan Purpose */}
        {currentStep === 6 && (
          <div className="purpose-grid">
            {[
              { id: 'Home', label: 'Home Loan', desc: 'Purchase, construction, or home improvement', icon: Home },
              { id: 'Personal', label: 'Personal Loan', desc: 'Travel, wedding, or general personal needs', icon: User },
              { id: 'Business', label: 'Business Expansion', desc: 'Working capital, inventory, or machinery', icon: Building2 },
              { id: 'Education', label: 'Education', desc: 'Higher studies, courses, or college tuition', icon: GraduationCap },
              { id: 'Vehicle', label: 'Vehicle Loan', desc: 'Car, bike, or commercial transport', icon: Car },
              { id: 'Medical', label: 'Medical Emergency', desc: 'Healthcare treatment or hospital expenses', icon: HeartPulse },
              { id: 'Other', label: 'Other Purpose', desc: 'Other custom financial requirements', icon: HelpCircle },
            ].map(opt => {
              const IconComp = opt.icon;
              const isSelected = formData.loanPurpose === opt.id;
              return (
                <div 
                  key={opt.id} 
                  className={`purpose-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => updateField('loanPurpose', opt.id)}
                >
                  <div className="purpose-icon">
                    <IconComp size={24} />
                  </div>
                  <h4>{opt.label}</h4>
                  <p>{opt.desc}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 7: Credit Score (Adaptive) */}
        {currentStep === 7 && (
          <div className="adaptive-step-wrapper">
            <label className="field-label">Do you know your current credit score (CIBIL / Experian)?</label>
            <div className="binary-toggle-grid">
              <div 
                className={`toggle-card ${formData.knowsCreditScore === 'Yes' ? 'selected' : ''}`}
                onClick={() => {
                  updateField('knowsCreditScore', 'Yes');
                  if (formData.creditScore === 'UNKNOWN') updateField('creditScore', '');
                }}
              >
                <h4>Yes</h4>
                <p>I know my credit score range</p>
              </div>

              <div 
                className={`toggle-card ${formData.knowsCreditScore === 'No' ? 'selected' : ''}`}
                onClick={() => {
                  updateField('knowsCreditScore', 'No');
                  updateField('creditScore', 'UNKNOWN'); // EXPLICIT UNKNOWN - NEVER ZERO
                }}
              >
                <h4>No / Unsure</h4>
                <p>I haven't checked or don't know my score</p>
              </div>
            </div>

            {/* ADAPTIVE FOLLOW-UP QUESTION */}
            {formData.knowsCreditScore === 'Yes' && (
              <div className="followup-box fade-in">
                <label htmlFor="creditScore" className="field-label">
                  Your Credit Score (300 to 900)
                </label>
                <input
                  id="creditScore"
                  type="number"
                  min="300"
                  max="900"
                  className="form-input"
                  placeholder="e.g. 750"
                  value={formData.creditScore === 'UNKNOWN' ? '' : formData.creditScore}
                  onChange={(e) => updateField('creditScore', e.target.value)}
                  autoFocus
                />
                <div className="input-hint">
                  Typical score range: Excellent (780+), Good (700-779), Fair (650-699), Needs Work (&lt;650).
                </div>
              </div>
            )}

            {formData.knowsCreditScore === 'No' && (
              <div className="info-callout fade-in">
                <ShieldCheck size={18} />
                <span>
                  No worries! We will treat your credit score as <strong>Unknown</strong>. We never perform bureau checks or impact your credit score.
                </span>
              </div>
            )}
          </div>
        )}

        {/* STEP 8: Essential Household Expenses */}
        {currentStep === 8 && (
          <div className="input-group-wrapper">
            <label htmlFor="essentialExpenses" className="field-label">
              Monthly Essential Household Expenses (in ₹)
            </label>
            <p className="field-sublabel">
              Includes rent/maintenance, food & groceries, utilities, children's school fees, insurance, and medical basics.
            </p>
            <div className="currency-input-box">
              <span className="currency-symbol">₹</span>
              <input
                id="essentialExpenses"
                type="text"
                className="form-input"
                placeholder="e.g. 25,000"
                value={formData.essentialExpenses !== '' && formData.essentialExpenses !== null ? formData.essentialExpenses.toLocaleString('en-IN') : ''}
                onChange={(e) => handleNumericChange('essentialExpenses', e.target.value)}
                autoFocus
              />
            </div>

            {formData.essentialExpenses > 0 && (
              <div className="formatted-preview">
                Estimated household commitment: <strong>{formatINR(formData.essentialExpenses)} / month</strong>
              </div>
            )}

            <div className="preset-container">
              <span className="preset-label">Quick presets:</span>
              {[15000, 25000, 40000, 60000].map(amt => (
                <button
                  key={amt}
                  type="button"
                  className={`preset-btn ${formData.essentialExpenses === amt ? 'active' : ''}`}
                  onClick={() => updateField('essentialExpenses', amt)}
                >
                  {formatINR(amt)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 9: Emergency Savings (Adaptive) */}
        {currentStep === 9 && (
          <div className="adaptive-step-wrapper">
            <label className="field-label">Do you currently have emergency liquid savings?</label>
            <div className="binary-toggle-grid">
              <div 
                className={`toggle-card ${formData.hasEmergencySavings === 'Yes' ? 'selected' : ''}`}
                onClick={() => {
                  updateField('hasEmergencySavings', 'Yes');
                  if (!formData.emergencyMonths) updateField('emergencyMonths', 3);
                }}
              >
                <h4>Yes</h4>
                <p>I have cash, savings account funds, or liquid deposits reserved for emergencies</p>
              </div>

              <div 
                className={`toggle-card ${formData.hasEmergencySavings === 'No' ? 'selected' : ''}`}
                onClick={() => {
                  updateField('hasEmergencySavings', 'No');
                  updateField('emergencyMonths', 0); // Reset to 0 months
                }}
              >
                <h4>No</h4>
                <p>I do not currently have dedicated emergency funds</p>
              </div>
            </div>

            {/* ADAPTIVE FOLLOW-UP QUESTION */}
            {formData.hasEmergencySavings === 'Yes' && (
              <div className="followup-box fade-in">
                <label className="field-label">
                  Approximately how many months of essential expenses does your emergency savings cover?
                </label>
                <div className="preset-container" style={{ marginTop: '0.75rem' }}>
                  {[
                    { months: 1, label: '1 Month' },
                    { months: 2, label: '2 Months' },
                    { months: 3, label: '3-5 Months' },
                    { months: 6, label: '6+ Months' }
                  ].map(opt => (
                    <button
                      key={opt.months}
                      type="button"
                      className={`preset-btn ${Number(formData.emergencyMonths) === opt.months ? 'active' : ''}`}
                      onClick={() => updateField('emergencyMonths', opt.months)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="wizard-actions">
        {currentStep > 1 ? (
          <button type="button" className="btn-secondary" onClick={handleBack}>
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        ) : (
          <div /> // Spacer
        )}

        <button type="button" className="btn-primary" onClick={handleNext}>
          <span>{currentStep === 9 ? 'Review Answers' : 'Continue'}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

// Helper titles
function getStepTitle(step) {
  switch (step) {
    case 1: return 'Employment & Income Type';
    case 2: return 'Monthly Take-Home Income';
    case 3: return 'Income Stability';
    case 4: return 'Existing Loan EMIs';
    case 5: return 'Desired Loan Amount';
    case 6: return 'Loan Purpose';
    case 7: return 'Credit Score Status';
    case 8: return 'Essential Monthly Expenses';
    case 9: return 'Emergency Savings Reserve';
    default: return '';
  }
}

function getStepDescription(step) {
  switch (step) {
    case 1: return 'Select the primary source of your monthly earnings.';
    case 2: return 'Enter your net take-home pay after taxes and deductions.';
    case 3: return 'How predictable or variable is your monthly cash inflow?';
    case 4: return 'Tell us if you pay active EMIs for home, car, or personal loans.';
    case 5: return 'What is the principal amount you are looking to borrow?';
    case 6: return 'Help us understand what you intend to finance.';
    case 7: return 'Knowing your score helps assess potential lender interest rates.';
    case 8: return 'Required living costs like rent, utilities, food, and education.';
    case 9: return 'Liquid buffer available to absorb financial shocks.';
    default: return '';
  }
}
