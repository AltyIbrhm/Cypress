import React from 'react';
import ApplyButton from '../../src/components/ApplyButton';

describe('ApplyButton Component', () => {
  const defaultProps = {
    jobId: '39414944'
  };

  beforeEach(() => {
    cy.mount(<ApplyButton {...defaultProps} />);
  });

  it('should render apply button with correct text', () => {
    cy.get('[data-cy="apply-button"]')
      .should('be.visible')
      .and('contain.text', 'Apply Now')
      .and('not.be.disabled');
  });

  it('should show loading state when clicked', () => {
    cy.get('[data-cy="apply-button"]').click();
    
    cy.get('[data-cy="apply-button"]')
      .should('contain.text', 'Applying...')
      .and('be.disabled');
  });

  it('should show success state after application', () => {
    cy.get('[data-cy="apply-button"]').click();
    
    // Wait for loading to complete
    cy.get('[data-cy="apply-button"]', { timeout: 3000 })
      .should('contain.text', 'Applied!')
      .and('be.disabled');
    
    cy.get('[data-cy="application-status"]')
      .should('be.visible')
      .and('contain.text', 'Application submitted successfully!');
  });

  it('should handle disabled state', () => {
    cy.mount(<ApplyButton {...defaultProps} disabled={true} />);
    
    cy.get('[data-cy="apply-button"]')
      .should('be.disabled')
      .and('contain.text', 'Apply Now');
  });

  it('should not allow multiple applications', () => {
    cy.get('[data-cy="apply-button"]').click();
    
    // Wait for application to complete
    cy.get('[data-cy="apply-button"]', { timeout: 3000 })
      .should('contain.text', 'Applied!');
    
    // Verify button is disabled and cannot be clicked again
    cy.get('[data-cy="apply-button"]')
      .should('contain.text', 'Applied!')
      .and('be.disabled');
    
    // Try to click again with force to verify it doesn't change state
    cy.get('[data-cy="apply-button"]').click({ force: true });
    
    // Should still show applied state
    cy.get('[data-cy="apply-button"]')
      .should('contain.text', 'Applied!')
      .and('be.disabled');
  });

  it('should have proper accessibility attributes', () => {
    cy.get('[data-cy="apply-button"]').should('exist');
    cy.get('[data-cy="apply-button"]').should('be.visible');
    cy.get('[data-cy="apply-button"]').should('not.be.disabled');
  });

  it('should handle button state transitions correctly', () => {
    // Initial state
    cy.get('[data-cy="apply-button"]')
      .should('contain.text', 'Apply Now')
      .and('not.be.disabled');
    
    // Click to start loading
    cy.get('[data-cy="apply-button"]').click();
    
    // Loading state
    cy.get('[data-cy="apply-button"]')
      .should('contain.text', 'Applying...')
      .and('be.disabled');
    
    // Final state
    cy.get('[data-cy="apply-button"]', { timeout: 3000 })
      .should('contain.text', 'Applied!')
      .and('be.disabled');
  });
}); 