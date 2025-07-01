import React from 'react';
import CompanyBenefits from '../../src/components/CompanyBenefits';

describe('CompanyBenefits Component', () => {
  const defaultBenefits = [
    'Be a part of a company who strives to support for diversity and inclusion in the workplace',
    'Local and global opportunities – we offer you internal rotation and international mobility opportunities to grow your career',
    'Clear view of your career and progression with the company – Qualitest is growing massively and giving you the opportunity to grow with us',
    'Work hard and play harder with our flexible and casual culture',
    'Save your earnings and prepare for your future by enrolling in our 401k plan where Qualitest will match your contributions',
    'Take care of health with enrollment into one of our competitive healthcare benefits',
    'Never stop experimenting and learning with Qualitest Tech academy: 3000+ training courses, mentorship programs, technical tribes, sponsored certifications, leadership programs and much more',
    'Stay active and get rewarded with our Corporate Wellness Program',
    'Salary of 110,000 - $125,000 USD annually',
    'Earn bonuses via our Client Referral and Employee Referral Program\'s',
    'Planning a vacation? Looking for car insurance? Get access to Qualitest Employee Perks for discounts on anything from travel to electronics'
  ];

  beforeEach(() => {
    cy.mount(<CompanyBenefits benefits={defaultBenefits} />);
  });

  it('should render company benefits section', () => {
    cy.get('[data-cy="company-benefits"]')
      .should('be.visible');
  });

  it('should display the correct heading', () => {
    cy.get('[data-cy="company-benefits"] h3')
      .should('contain.text', 'Why QualiTest?');
  });

  it('should display all benefits', () => {
    cy.get('[data-cy="company-benefits"] ul li').should('have.length', 11);
    
    // Check specific benefits
    cy.get('[data-cy="benefit-0"]')
      .should('contain.text', 'diversity and inclusion');
    
    cy.get('[data-cy="benefit-4"]')
      .should('contain.text', '401k plan');
    
    cy.get('[data-cy="benefit-8"]')
      .should('contain.text', 'Salary of 110,000 - $125,000 USD annually');
  });

  it('should handle empty benefits array', () => {
    cy.mount(<CompanyBenefits benefits={[]} />);
    
    cy.get('[data-cy="company-benefits"] ul li').should('have.length', 0);
  });

  it('should handle single benefit', () => {
    const singleBenefit = ['Single benefit item'];
    cy.mount(<CompanyBenefits benefits={singleBenefit} />);
    
    cy.get('[data-cy="company-benefits"] ul li')
      .should('have.length', 1)
      .and('contain.text', 'Single benefit item');
  });

  it('should be accessible with proper structure', () => {
    cy.get('[data-cy="company-benefits"]')
      .should('be.visible');
    
    cy.get('[data-cy="company-benefits"] h3')
      .should('be.visible');
    
    cy.get('[data-cy="company-benefits"] ul')
      .should('be.visible');
  });

  it('should have proper data attributes for testing', () => {
    cy.get('[data-cy="company-benefits"]').should('exist');
    cy.get('[data-cy="benefit-0"]').should('exist');
    cy.get('[data-cy="benefit-10"]').should('exist');
  });

  it('should display benefits in correct order', () => {
    // Check first benefit
    cy.get('[data-cy="benefit-0"]')
      .should('contain.text', 'diversity and inclusion');
    
    // Check last benefit
    cy.get('[data-cy="benefit-10"]')
      .should('contain.text', 'Qualitest Employee Perks');
  });
}); 