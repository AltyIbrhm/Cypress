# Cypress E2E Testing Project

This project demonstrates end-to-end testing with Cypress, focusing on testing the Qualitest Automation Lead job page.

## 🚀 Features

- **E2E Testing**: Automated testing of web applications
- **CI/CD Integration**: GitHub Actions workflow for automated testing
- **Cross-browser Support**: Tests run on Chrome in CI environment
- **Artifact Upload**: Screenshots and videos are uploaded on test failures

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/AltyIbrhm/Cypress.git
cd Cypress
```

2. Install dependencies:
```bash
npm install
```

## 🧪 Running Tests

### Local Development

Open Cypress Test Runner:
```bash
npx cypress open
```

Run tests headlessly:
```bash
npx cypress run
```

Run specific test:
```bash
npx cypress run --spec cypress/e2e/qualitest_job.cy.js
```

### CI/CD Pipeline

The project includes a GitHub Actions workflow that automatically runs tests on:
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch

## 📁 Project Structure

```
cypress/
├── e2e/
│   └── qualitest_job.cy.js    # E2E test for Qualitest job page
├── fixtures/                  # Test data files
├── support/                   # Support files and custom commands
└── screenshots/              # Screenshots from failed tests
```

## 🔧 Configuration

The project uses `cypress.config.js` for configuration:

- **Base URL**: Set to Qualitest careers page
- **Spec Pattern**: Looks for `.cy.js` files in `e2e` directory
- **Support File**: Custom commands and utilities

## 🎯 Test Coverage

### Current Tests

1. **Qualitest Job Page Test** (`qualitest_job.cy.js`)
   - Visits the Automation Lead job page
   - Verifies job title is visible
   - Handles JavaScript errors gracefully

### Test Features

- **Error Handling**: Ignores uncaught exceptions from the target page
- **Timeout Management**: Uses extended timeouts for dynamic content
- **Cross-browser Compatibility**: Works with Chrome and Electron

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The `.github/workflows/cypress.yml` file defines:

1. **Triggers**: Push and pull request events
2. **Environment**: Ubuntu latest with Node.js 18
3. **Steps**:
   - Checkout code
   - Setup Node.js with npm caching
   - Install dependencies
   - Run Cypress tests in Chrome
   - Upload artifacts (screenshots/videos) on failure

### Artifacts

- **Screenshots**: Uploaded when tests fail
- **Videos**: Uploaded for all test runs
- **Location**: Available in GitHub Actions run details

## 🛠️ Best Practices Implemented

1. **Custom Commands**: Reusable test actions
2. **Error Handling**: Graceful handling of page errors
3. **CI/CD Integration**: Automated testing pipeline
4. **Artifact Management**: Screenshots and videos for debugging
5. **Cross-browser Testing**: Chrome in CI, Electron locally

## 📊 Test Results

View test results and artifacts in:
- GitHub Actions tab in your repository
- Local Cypress Test Runner
- Command line output

## 🔍 Debugging

### Local Debugging

1. Use `npx cypress open` for interactive debugging
2. Check `cypress/screenshots/` for failure screenshots
3. Check `cypress/videos/` for test recordings

### CI Debugging

1. Check GitHub Actions run logs
2. Download artifacts (screenshots/videos) from failed runs
3. Review test output in the Actions tab

## 🚀 Next Steps

Potential enhancements:
- Add more test scenarios
- Implement API testing
- Add database validation
- Set up Cypress Cloud for advanced features
- Add component testing

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your tests
4. Ensure CI passes
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE). 