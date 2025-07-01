import React, { useState } from 'react';

const ApplyButton = ({ jobId, disabled = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const handleApply = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setHasApplied(true);
    }, 2000);
  };

  return (
    <div className="apply-section" data-cy="apply-section">
      <button
        className={`apply-button ${isLoading ? 'loading' : ''} ${hasApplied ? 'applied' : ''}`}
        onClick={handleApply}
        disabled={disabled || isLoading || hasApplied}
        data-cy="apply-button"
      >
        {isLoading ? 'Applying...' : hasApplied ? 'Applied!' : 'Apply Now'}
      </button>
      
      {hasApplied && (
        <div className="application-status" data-cy="application-status">
          Application submitted successfully!
        </div>
      )}
    </div>
  );
};

export default ApplyButton; 