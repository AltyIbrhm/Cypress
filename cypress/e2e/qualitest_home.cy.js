describe('Qualitest Careers Home Page', () => {
  it('should display the Qualitest brand text', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from failing the test
      return false;
    });
    cy.visit('https://careers.qualitestgroup.com/');
    cy.contains('Qualitest', { timeout: 10000 }).should('be.visible');
  });
}); 