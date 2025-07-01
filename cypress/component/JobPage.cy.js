import React from 'react';
import JobHeader from '../../src/components/JobHeader';
import JobDescription from '../../src/components/JobDescription';
import ApplyButton from '../../src/components/ApplyButton';
import CompanyBenefits from '../../src/components/CompanyBenefits';

describe('Complete Job Page Components', () => {
  const jobData = {
    title: 'Automation Lead',
    company: 'Qualitest Group',
    location: 'US (remote from anywhere in the US - EST)',
    date: '4 Jun 2025',
    salary: '$110,000 - $125,000 USD annually',
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
    ],
    benefits: [
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
    ]
  };

  beforeEach(() => {
    cy.mount(
      <div className="job-page">
        <JobHeader 
          title={jobData.title}
          company={jobData.company}
          location={jobData.location}
          date={jobData.date}
          salary={jobData.salary}
        />
        <JobDescription 
          description={jobData.description}
          responsibilities={jobData.responsibilities}
          requirements={jobData.requirements}
          niceToHave={jobData.niceToHave}
        />
        <ApplyButton jobId="39414944" />
        <CompanyBenefits benefits={jobData.benefits} />
      </div>
    );
  });

  it('should render complete job page with all components', () => {
    // Check JobHeader
    cy.get('[data-cy="job-title"]').should('contain.text', 'Automation Lead');
    cy.get('[data-cy="job-company"]').should('contain.text', 'Qualitest Group');
    cy.get('[data-cy="job-salary"]').should('contain.text', '$110,000 - $125,000 USD annually');
    
    // Check JobDescription
    cy.get('[data-cy="description-text"]').should('contain.text', 'AI-powered Quality Engineering Company');
    cy.get('[data-cy="responsibilities"]').should('be.visible');
    cy.get('[data-cy="requirements"]').should('be.visible');
    cy.get('[data-cy="nice-to-have"]').should('be.visible');
    
    // Check ApplyButton
    cy.get('[data-cy="apply-button"]').should('contain.text', 'Apply Now');
    
    // Check CompanyBenefits
    cy.get('[data-cy="company-benefits"] h3').should('contain.text', 'Why QualiTest?');
    cy.get('[data-cy="company-benefits"] ul li').should('have.length', 11);
  });

  it('should allow complete job application flow', () => {
    // Verify initial state
    cy.get('[data-cy="apply-button"]')
      .should('contain.text', 'Apply Now')
      .and('not.be.disabled');
    
    // Start application
    cy.get('[data-cy="apply-button"]').click();
    
    // Check loading state
    cy.get('[data-cy="apply-button"]')
      .should('contain.text', 'Applying...')
      .and('be.disabled');
    
    // Check success state
    cy.get('[data-cy="apply-button"]', { timeout: 3000 })
      .should('contain.text', 'Applied!')
      .and('be.disabled');
    
    cy.get('[data-cy="application-status"]')
      .should('contain.text', 'Application submitted successfully!');
  });

  it('should display all job requirements correctly', () => {
    // Check responsibilities
    cy.get('[data-cy="responsibility-0"]').should('contain.text', 'Lead the automation efforts using Cypress');
    cy.get('[data-cy="responsibility-3"]').should('contain.text', 'Contribute to CI/CD pipelines');
    cy.get('[data-cy="responsibility-6"]').should('contain.text', 'Participate in sprint planning');
    
    // Check requirements
    cy.get('[data-cy="requirement-0"]').should('contain.text', '6+ years of experience in test automation');
    cy.get('[data-cy="requirement-3"]').should('contain.text', 'Hands-on experience with CI/CD tools');
    cy.get('[data-cy="requirement-6"]').should('contain.text', 'Excellent communication and problem-solving skills');
    
    // Check nice to have
    cy.get('[data-cy="nice-to-have-0"]').should('contain.text', 'Experience with tools like TestRail');
    cy.get('[data-cy="nice-to-have-2"]').should('contain.text', 'Exposure to Salesforce testing environments');
  });

  it('should display all company benefits', () => {
    // Check specific benefits
    cy.get('[data-cy="benefit-0"]').should('contain.text', 'diversity and inclusion');
    cy.get('[data-cy="benefit-4"]').should('contain.text', '401k plan');
    cy.get('[data-cy="benefit-6"]').should('contain.text', 'Qualitest Tech academy');
    cy.get('[data-cy="benefit-8"]').should('contain.text', 'Salary of 110,000 - $125,000 USD annually');
    cy.get('[data-cy="benefit-10"]').should('contain.text', 'Qualitest Employee Perks');
  });

  it('should have proper page structure and accessibility', () => {
    // Check all main sections are present
    cy.get('[data-cy="job-header"]').should('be.visible');
    cy.get('[data-cy="job-description"]').should('be.visible');
    cy.get('[data-cy="apply-section"]').should('be.visible');
    cy.get('[data-cy="company-benefits"]').should('be.visible');
    
    // Check proper heading hierarchy
    cy.get('[data-cy="job-title"]').should('have.prop', 'tagName', 'H1');
    cy.get('[data-cy="responsibilities"] h3').should('be.visible');
    cy.get('[data-cy="requirements"] h3').should('be.visible');
    cy.get('[data-cy="nice-to-have"] h3').should('be.visible');
    cy.get('[data-cy="company-benefits"] h3').should('be.visible');
  });

  it('should handle component interactions without conflicts', () => {
    // Apply for the job
    cy.get('[data-cy="apply-button"]').click();
    cy.get('[data-cy="apply-button"]', { timeout: 3000 })
      .should('contain.text', 'Applied!');
    
    // Verify other components are still functional
    cy.get('[data-cy="job-title"]').should('contain.text', 'Automation Lead');
    cy.get('[data-cy="company-benefits"]').should('be.visible');
    cy.get('[data-cy="responsibilities"]').should('be.visible');
  });
}); 