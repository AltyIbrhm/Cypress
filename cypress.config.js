const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '0514daf3-b043-4cf4-bd32-10912d722591',
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
    supportFile: 'cypress/support/commands.js',
    indexHtmlPath: 'cypress/component/component-index.html',
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}'
  }
});
