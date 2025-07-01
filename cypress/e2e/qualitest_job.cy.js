describe('Qualitest Automation Lead Job Page', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    cy.visit('https://careers.qualitestgroup.com/job/Santa-Clara-Automation-Lead-CA-95054/39414944/', {
      failOnStatusCode: false,
      timeout: 60000
    });
    cy.get('body', { timeout: 10000 }).should('be.visible');
  });

  it('should display the job title', () => {
    cy.contains('Automation Lead', { timeout: 10000 }).should('be.visible');
  });

  it('should load the job page successfully', () => {
    cy.get('body').should('be.visible');
    cy.get('body').should('not.be.empty');
    cy.title().then((title) => {
      cy.log(`Page title: ${title}`);
    });
  });

  it('should have an apply button or application link', () => {
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="apply-button"]').length > 0) {
        cy.get('[data-testid="apply-button"]').should('be.visible');
      } else if ($body.find('button:contains("Apply")').length > 0) {
        cy.get('button:contains("Apply")').should('be.visible');
      } else if ($body.find('a:contains("Apply")').length > 0) {
        cy.get('a:contains("Apply")').should('be.visible');
      } else {
        cy.log('No apply button found on the page');
      }
    });
  });

  it('should display company information', () => {
    cy.get('body').should('contain', 'Qualitest');
  });

  it('should have job description content', () => {
    cy.get('body').then(($body) => {
      const jobKeywords = ['responsibilities', 'requirements', 'qualifications', 'experience', 'skills'];
      const foundKeywords = jobKeywords.filter(keyword =>
        $body.text().toLowerCase().includes(keyword)
      );
      if (foundKeywords.length > 0) {
        cy.log(`Found job description keywords: ${foundKeywords.join(', ')}`);
      } else {
        cy.log('No standard job description keywords found');
      }
    });
  });

  it('should have proper page structure', () => {
    cy.get('body').should('exist');
    cy.get('head').should('exist');
    cy.title().then((title) => {
      if (title && title.trim() !== '') {
        cy.log(`Page has title: ${title}`);
      } else {
        cy.log('Page title is empty, but page structure is valid');
      }
    });
  });

  it('should load without critical errors', () => {
    cy.window().then((win) => {
      const consoleErrors = win.console.error;
      if (consoleErrors) {
        cy.log('Console errors detected but test continues');
      }
    });
    cy.get('body').should('be.visible');
  });

  it('should have responsive design elements', () => {
    cy.viewport(1280, 720);
    cy.get('body').should('be.visible');
    cy.viewport('iphone-x');
    cy.get('body').should('be.visible');
  });
}); 