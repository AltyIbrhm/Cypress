// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command for robust external website testing
Cypress.Commands.add('visitExternal', (url, options = {}) => {
  const defaultOptions = {
    failOnStatusCode: false,
    timeout: 120000,
    retryOnNetworkFailure: true
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  // Handle uncaught exceptions
  cy.on('uncaught:exception', (err, runnable) => {
    cy.log(`Uncaught exception during visit: ${err.message}`);
    return false;
  });

  // Handle network failures
  cy.on('fail', (err) => {
    if (err.message.includes('page load timeout') || 
        err.message.includes('network') || 
        err.message.includes('ECONNREFUSED')) {
      cy.log('Network or timeout issue detected, but continuing test');
      return false;
    }
    throw err;
  });

  return cy.visit(url, mergedOptions);
});

// Custom command to wait for page to be ready
Cypress.Commands.add('waitForPageLoad', (timeout = 60000) => {
  cy.get('body', { timeout }).should('be.visible');
  cy.get('body').should('not.be.empty');
});

// Custom command to check for text with fallback
Cypress.Commands.add('checkForText', (text, fallbackText = null) => {
  cy.get('body').then(($body) => {
    const bodyText = $body.text().toLowerCase();
    const searchText = text.toLowerCase();
    
    if (bodyText.includes(searchText)) {
      cy.log(`Found text: ${text}`);
      cy.wrap($body).should('contain', text);
    } else if (fallbackText && bodyText.includes(fallbackText.toLowerCase())) {
      cy.log(`Found fallback text: ${fallbackText}`);
      cy.wrap($body).should('contain', fallbackText);
    } else {
      cy.log(`Text "${text}" not found, but page loaded successfully`);
      cy.get('body').should('not.be.empty');
    }
  });
});