const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'orudxm',
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'https://careers.qualitestgroup.com',
    supportFile: 'cypress/support/commands.js',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      reportPageTitle: 'Cypress Test Results',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack'
    },
    supportFile: 'cypress/support/component.js',
    indexHtmlPath: 'cypress/support/component-index.html',
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      reportPageTitle: 'Cypress Component Test Results',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false
    }
  }
});
