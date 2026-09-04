import React, { useState } from 'react';
import Header from './components/Header';
import Questionnaire from './components/Questionnaire';
import ReviewAnswers from './components/ReviewAnswers';
import ResultsDashboard from './components/ResultsDashboard';
import NegotiationCard from './components/NegotiationCard';
import TestBorrowers from './components/TestBorrowers';
import { evaluateBorrowerAffordability } from './logic/index.js';
import { 
  TrendingUp, 
  FileText, 
  Sliders, 
  Sparkles, 
  ArrowRight,
  Lock,
  Users
} from 'lucide-react';

const INITIAL_FORM_DATA = {
  incomeType: '',
  monthlyIncome: '',
  incomeStability: '',
  hasEmi: '',
  emiAmount: 0,
  loanAmount: '',
  loanPurpose: '',
  knowsCreditScore: '',
  creditScore: 'UNKNOWN',
  essentialExpenses: '',
  hasEmergencySavings: '',
  emergencyMonths: 0
};

export default function App() {
  const [appMode, setAppMode] = useState('landing'); // 'landing' | 'questionnaire' | 'review' | 'results' | 'negotiation' | 'test_borrowers'
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [resultsData, setResultsData] = useState(null);

  const startQuestionnaire = () => {
    setAppMode('questionnaire');
    setCurrentStep(1);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setResultsData(null);
    setAppMode('landing');
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditStep = (stepNumber) => {
    setCurrentStep(stepNumber);
    setAppMode('questionnaire');
  };

  // Run the financial decision engine
  const handleCalculateAffordability = () => {
    const analysis = evaluateBorrowerAffordability(formData);
    setResultsData(analysis);
    setAppMode('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load a pre-configured test borrower profile (Priya, Ravi, Anita) directly into engine
  const handleLoadProfile = (profileFormData) => {
    setFormData(profileFormData);
    const analysis = evaluateBorrowerAffordability(profileFormData);
    setResultsData(analysis);
    setAppMode('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-wrapper">
      {/* Sticky Header with Progress Bar */}
      <Header 
        currentStep={currentStep}
        totalSteps={9}
        onReset={handleReset}
        onOpenTestBorrowers={() => {
          setAppMode('test_borrowers');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        appMode={appMode}
      />

      <main className="main-content">
        {/* MODE 1: LANDING PAGE HERO */}
        {appMode === 'landing' && (
          <section className="hero-section">
            <div className="hero-pill">
              <span className="pill-dot"></span>
              <span>Financial Affordability & Loan Copilot</span>
            </div>

            <h1 className="hero-title">
              Borrower <span className="highlight">Copilot</span>
            </h1>

            <p className="hero-subtitle">
              Empowering borrowers with instant affordability estimates, risk insights, and lender negotiation tactics.
            </p>

            <div className="action-buttons-hero">
              <button className="btn-hero-primary" onClick={startQuestionnaire}>
                <span>Start Affordability Assessment</span>
                <ArrowRight size={20} />
              </button>

              <button className="btn-hero-secondary" onClick={() => setAppMode('test_borrowers')}>
                <Users size={18} />
                <span>Try Test Borrowers (Priya, Ravi, Anita)</span>
              </button>
            </div>

            <div className="disclaimer-callout">
              <Lock size={16} />
              <span>100% Private & Client-Side. No credit bureau checks or personal data sharing.</span>
            </div>

            {/* Feature Modules Overview */}
            <div className="feature-grid">
              <div className="feature-card highlighted-card">
                <div className="card-badge">Active</div>
                <div className="card-icon-wrapper">
                  <FileText size={24} />
                </div>
                <h3>1. Adaptive Questionnaire</h3>
                <p>
                  Quick 9-question assessment collecting income, expenses, current EMIs, and savings.
                </p>
              </div>

              <div className="feature-card highlighted-card">
                <div className="card-badge">Active</div>
                <div className="card-icon-wrapper">
                  <Sliders size={24} />
                </div>
                <h3>2. Rule Engine</h3>
                <p>
                  Affordability calculation evaluating DTI ratios, FOIR limits, and loan eligibility.
                </p>
              </div>

              <div className="feature-card highlighted-card">
                <div className="card-badge">Active</div>
                <div className="card-icon-wrapper">
                  <TrendingUp size={24} />
                </div>
                <h3>3. Results Dashboard</h3>
                <p>
                  Visual health metrics, borrowing capacity caps, and interest savings projections.
                </p>
              </div>

              <div className="feature-card highlighted-card">
                <div className="card-badge">Active</div>
                <div className="card-icon-wrapper">
                  <Sparkles size={24} />
                </div>
                <h3>4. Negotiation Card</h3>
                <p>
                  Tailored scripts and tactics to negotiate lower interest rates with loan officers.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* MODE 2: QUESTIONNAIRE WIZARD */}
        {appMode === 'questionnaire' && (
          <section className="wizard-section">
            <Questionnaire
              formData={formData}
              setFormData={setFormData}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              onComplete={() => setAppMode('review')}
            />
          </section>
        )}

        {/* MODE 3: REVIEW ANSWERS SCREEN */}
        {appMode === 'review' && (
          <section className="review-section">
            <ReviewAnswers
              formData={formData}
              onEditStep={handleEditStep}
              onBack={() => {
                setCurrentStep(9);
                setAppMode('questionnaire');
              }}
              onComplete={handleCalculateAffordability}
            />
          </section>
        )}

        {/* MODE 4: RESULTS DASHBOARD */}
        {appMode === 'results' && (
          <section className="results-section">
            <ResultsDashboard
              formData={formData}
              results={resultsData}
              onRecalculate={() => setAppMode('questionnaire')}
              onOpenNegotiationCard={() => {
                setAppMode('negotiation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </section>
        )}

        {/* MODE 5: NEGOTIATION CARD */}
        {appMode === 'negotiation' && (
          <section className="negotiation-section">
            <NegotiationCard
              formData={formData}
              results={resultsData}
              onBack={() => {
                setAppMode('results');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </section>
        )}

        {/* MODE 6: TEST BORROWERS RUN-THROUGHS */}
        {appMode === 'test_borrowers' && (
          <section className="test-borrowers-section">
            <TestBorrowers
              onLoadProfile={handleLoadProfile}
              onOpenNegotiationCard={() => {
                setAppMode('negotiation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>Borrower Copilot &copy; {new Date().getFullYear()} &bull; Client-Side Affordability Platform</p>
      </footer>
    </div>
  );
}
