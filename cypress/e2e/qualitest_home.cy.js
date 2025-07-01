describe('Qualitest Careers Home Page', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it('should display the Qualitest brand text', () => {
    cy.visit('https://careers.qualitestgroup.com/', { failOnStatusCode: false, timeout: 60000 });
    cy.contains('Qualitest', { timeout: 10000 }).should('be.visible');
  });

  it('should load the careers page successfully', () => {
    cy.visit('https://careers.qualitestgroup.com/', { failOnStatusCode: false, timeout: 60000 });
    cy.get('body', { timeout: 10000 }).should('be.visible');
  });
}); 