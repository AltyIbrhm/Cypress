describe('Qualitest Automation Lead Job Page', () => {
  it('should display the job title', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from failing the test
      return false;
    });
    cy.visit('https://careers.qualitestgroup.com/job/Santa-Clara-Automation-Lead-CA-95054/39414944/', { failOnStatusCode: false });
    cy.contains('Automation Lead', { timeout: 20000 }).should('be.visible');
  });
}); 