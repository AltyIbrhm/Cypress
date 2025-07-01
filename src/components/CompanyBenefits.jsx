import React from 'react';

const CompanyBenefits = ({ benefits }) => {
  return (
    <div className="company-benefits" data-cy="company-benefits">
      <h3>Why QualiTest?</h3>
      <ul>
        {benefits.map((benefit, index) => (
          <li key={index} data-cy={`benefit-${index}`}>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyBenefits; 