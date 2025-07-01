import React from 'react';
import JobHeader from '../../src/components/JobHeader';

describe('JobHeader Component', () => {
  const defaultProps = {
    title: 'Automation Lead',
    company: 'Qualitest Group',
    location: 'US (remote from anywhere in the US - EST)',
    date: '4 Jun 2025',
    salary: '$110,000 - $125,000 USD annually'
  };

  beforeEach(() => {
    cy.mount(<JobHeader {...defaultProps} />);
  });

  it('should render job title correctly', () => {
    cy.get('[data-cy="job-title"]')
      .should('be.visible')
      .and('contain.text', 'Automation Lead');
  });

  it('should display all job metadata', () => {
    cy.get('[data-cy="job-date"]').should('contain.text', '4 Jun 2025');
    cy.get('[data-cy="job-company"]').should('contain.text', 'Qualitest Group');
    cy.get('[data-cy="job-location"]').should('contain.text', 'US (remote from anywhere in the US - EST)');
    cy.get('[data-cy="job-salary"]').should('contain.text', '$110,000 - $125,000 USD annually');
  });

  it('should handle missing salary gracefully', () => {
    const propsWithoutSalary = { ...defaultProps };
    delete propsWithoutSalary.salary;
    
    cy.mount(<JobHeader {...propsWithoutSalary} />);
    cy.get('[data-cy="job-salary"]').should('not.exist');
  });

  it('should have proper heading structure', () => {
    cy.get('[data-cy="job-title"]').should('have.prop', 'tagName', 'H1');
  });

  it('should be accessible', () => {
    cy.get('[data-cy="job-header"]').should('be.visible');
    cy.get('[data-cy="job-title"]').should('have.attr', 'data-cy');
  });
}); 