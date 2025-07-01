import React from 'react';
import JobDescription from '../../src/components/JobDescription';

describe('JobDescription Component', () => {
  const defaultProps = {
    description: 'Are you interested in working with the World\'s leading AI-powered Quality Engineering Company? Ready to advance your career, team up with global thought leaders across industries and make a difference every day? Join us at Qualitest!',
    responsibilities: [
      'Lead the automation efforts using Cypress and JavaScript, establishing best practices and standards.',
      'Design, implement, and maintain scalable, reusable, and reliable automated test scripts.',
      'Collaborate closely with developers, product owners, and QA teams to ensure test coverage and effective automation strategies.',
      'Contribute to CI/CD pipelines by integrating automation tests.',
      'Perform code reviews, mentor junior engineers, and ensure adherence to QA automation best practices.',
      'Analyze test results and debug failures to identify root causes.',
      'Participate in sprint planning, story grooming, and daily stand-ups.'
    ],
    requirements: [
      '6+ years of experience in test automation, with at least 3+ years in Cypress and JavaScript.',
      'Proven experience leading automation initiatives and mentoring teams.',
      'Strong understanding of REST APIs, web technologies, and modern front-end frameworks.',
      'Hands-on experience with CI/CD tools like Jenkins, GitHub Actions, or GitLab CI.',
      'Solid knowledge of test design techniques and QA methodologies.',
      'Experience working in Agile/Scrum environments.',
      'Excellent communication and problem-solving skills.'
    ],
    niceToHave: [
      'Experience with tools like TestRail, JIRA, Allure Reports, or similar.',
      'Knowledge of performance or API testing tools (Postman, JMeter).',
      'Exposure to Salesforce testing environments is a plus.'
    ]
  };

  beforeEach(() => {
    cy.mount(<JobDescription {...defaultProps} />);
  });

  it('should render job description text', () => {
    cy.get('[data-cy="description-text"]')
      .should('be.visible')
      .and('contain.text', 'AI-powered Quality Engineering Company');
  });

  it('should display all responsibilities', () => {
    cy.get('[data-cy="responsibilities"]').should('be.visible');
    cy.get('[data-cy="responsibility-0"]').should('contain.text', 'Lead the automation efforts using Cypress');
    cy.get('[data-cy="responsibility-1"]').should('contain.text', 'Design, implement, and maintain scalable');
    cy.get('[data-cy="responsibility-6"]').should('contain.text', 'Participate in sprint planning');
  });

  it('should display all requirements', () => {
    cy.get('[data-cy="requirements"]').should('be.visible');
    cy.get('[data-cy="requirement-0"]').should('contain.text', '6+ years of experience in test automation');
    cy.get('[data-cy="requirement-3"]').should('contain.text', 'Hands-on experience with CI/CD tools');
    cy.get('[data-cy="requirement-6"]').should('contain.text', 'Excellent communication and problem-solving skills');
  });

  it('should display nice to have items', () => {
    cy.get('[data-cy="nice-to-have"]').should('be.visible');
    cy.get('[data-cy="nice-to-have-0"]').should('contain.text', 'Experience with tools like TestRail');
    cy.get('[data-cy="nice-to-have-1"]').should('contain.text', 'Knowledge of performance or API testing tools');
    cy.get('[data-cy="nice-to-have-2"]').should('contain.text', 'Exposure to Salesforce testing environments');
  });

  it('should handle missing nice to have section', () => {
    const propsWithoutNiceToHave = { ...defaultProps };
    delete propsWithoutNiceToHave.niceToHave;
    
    cy.mount(<JobDescription {...propsWithoutNiceToHave} />);
    cy.get('[data-cy="nice-to-have"]').should('not.exist');
  });

  it('should have proper heading structure', () => {
    cy.get('[data-cy="responsibilities"] h3').should('contain.text', 'Key Responsibilities:');
    cy.get('[data-cy="requirements"] h3').should('contain.text', 'Required Skills & Qualifications:');
    cy.get('[data-cy="nice-to-have"] h3').should('contain.text', 'Nice to Have:');
  });

  it('should be accessible with proper data attributes', () => {
    cy.get('[data-cy="job-description"]').should('be.visible');
    cy.get('[data-cy="responsibilities"]').should('be.visible');
    cy.get('[data-cy="requirements"]').should('be.visible');
  });
}); 