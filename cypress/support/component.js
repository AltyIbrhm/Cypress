// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import React and ReactDOM for component testing
import React from 'react'
import { mount } from 'cypress/react18'

// Make mount available as a global command
Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(<MyComponent />) 