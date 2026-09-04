import React from 'react';
import { TrendingUp, ShieldCheck, RotateCcw, Users, PlusCircle } from 'lucide-react';

export default function Header({ 
  currentStep, 
  totalSteps, 
  onReset, 
  onOpenTestBorrowers, 
  appMode 
}) {
  const progressPercent = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <header className="app-header">
      <div className="header-container">
        <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); onReset(); }}>
          <div className="brand-icon">
            <TrendingUp size={22} />
          </div>
          <span>Borrower Copilot</span>
        </a>

        <div className="header-right">
          <button 
            type="button" 
            className={`nav-link-btn ${appMode === 'test_borrowers' ? 'active-link' : ''}`}
            onClick={onOpenTestBorrowers}
          >
            <Users size={16} />
            <span>Test Borrowers</span>
          </button>

          <div className="privacy-badge no-mobile">
            <ShieldCheck size={16} />
            <span>No Bureau Check</span>
          </div>

          <button className="reset-btn" onClick={onReset} title="Start Blank Assessment">
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Step Progress Bar */}
      {currentStep > 0 && appMode === 'questionnaire' && (
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </header>
  );
}
