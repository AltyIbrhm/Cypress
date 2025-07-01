describe('Qualitest Careers Home Page', () => {
  it('should display the Qualitest brand text', () => {
    // Use custom command for robust external website testing
    cy.visitExternal('https://careers.qualitestgroup.com/');
    
    // Wait for page to be ready
    cy.waitForPageLoad();
    
    // Check for Qualitest text with fallback
    cy.checkForText('Qualitest', 'careers');
  });

  it('should load the careers page successfully', () => {
    // Use custom command for robust external website testing
    cy.visitExternal('https://careers.qualitestgroup.com/');
    
    // Wait for page to be ready
    cy.waitForPageLoad();
    
    // Log page title for debugging
    cy.title().then((title) => {
      cy.log(`Page title: ${title}`);
    });
  });
}); 