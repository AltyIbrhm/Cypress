describe('Qualitest Careers Home Page', () => {
  it('should display the Qualitest logo', () => {
    cy.visit('https://careers.qualitestgroup.com/');
    cy.get('header').should('be.visible');
    cy.contains('Qualitest').should('be.visible');
  });
}); 