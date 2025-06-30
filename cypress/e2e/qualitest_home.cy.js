describe('Qualitest Careers Home Page', () => {
  it('should display the Qualitest logo', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from failing the test
      return false;
    });
    cy.visit('https://careers.qualitestgroup.com/');
    cy.get('header').should('be.visible');
    cy.contains('Qualitest').should('be.visible');
  });
}); 