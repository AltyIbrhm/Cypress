# Cypress E2E Testing Project

This project demonstrates end-to-end testing with Cypress, focusing on testing the Qualitest Automation Lead job page.

## 🚀 Features

- **E2E Testing**: Automated testing of web applications
- **CI/CD Integration**: GitHub Actions workflow for automated testing
- **Cross-browser Support**: Tests run on Chrome in CI environment
- **Artifact Upload**: Screenshots and videos are uploaded on test failures
- **Comprehensive Reporting**: Mochawesome HTML reports with charts and analytics

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
npm run test:open
```

Run tests headlessly:
```bash
npm run test
```

Run tests in Chrome:
```bash
npm run test:chrome
```

### Reporting

Run tests with Mochawesome reporting:
```bash
npm run test:report
```

Generate consolidated HTML report:
```bash
npm run report:full
```

Clean report files:
```bash
npm run clean:reports
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests headlessly |
| `npm run test:open` | Open Cypress Test Runner |
| `npm run test:headless` | Run tests in headless mode |
| `npm run test:chrome` | Run tests in Chrome browser |
| `npm run test:report` | Run tests with Mochawesome reporter |
| `npm run report:merge` | Merge individual JSON reports |
| `npm run report:generate` | Generate HTML report from merged JSON |
| `npm run report:full` | Run tests + merge + generate HTML report |
| `npm run clean:reports` | Clean all report files |

## 📁 Project Structure

```
cypress/
├── e2e/
│   └── qualitest_job.cy.js    # E2E test for Qualitest job page
├── fixtures/                  # Test data files
├── support/                   # Support files and custom commands
├── reports/                   # Test reports (HTML, JSON)
├── screenshots/              # Screenshots from failed tests
└── videos/                   # Test recordings
```

## 🔧 Configuration

The project uses `cypress.config.js` for configuration:

- **Base URL**: Set to Qualitest careers page
- **Spec Pattern**: Looks for `.cy.js` files in `e2e` directory
- **Support File**: Custom commands and utilities
- **Reporter**: Mochawesome with HTML and JSON output

## 📊 Reporting Features

### Mochawesome Reports

- **HTML Reports**: Beautiful, interactive HTML reports
- **Charts & Analytics**: Visual representation of test results
- **Screenshots**: Embedded screenshots for failed tests
- **Test Details**: Detailed test execution information
- **Trends**: Track test performance over time

### Report Location

- **Local**: `cypress/reports/` directory
- **CI/CD**: Available as artifacts in GitHub Actions

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
- **Reporting**: Detailed reports with screenshots and analytics

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The `.github/workflows/cypress.yml` file defines:

1. **Triggers**: Push and pull request events
2. **Environment**: Ubuntu latest with Node.js 18
3. **Steps**:
   - Checkout code
   - Setup Node.js with npm caching
   - Install dependencies
   - Run Cypress tests with reporting
   - Generate HTML reports
   - Upload artifacts (screenshots/videos/reports)

### Artifacts

- **Screenshots**: Uploaded when tests fail
- **Videos**: Uploaded for all test runs
- **HTML Reports**: Comprehensive test reports with analytics
- **Location**: Available in GitHub Actions run details

## 🛠️ Best Practices Implemented

1. **Custom Commands**: Reusable test actions
2. **Error Handling**: Graceful handling of page errors
3. **CI/CD Integration**: Automated testing pipeline
4. **Artifact Management**: Screenshots, videos, and reports
5. **Cross-browser Testing**: Chrome in CI, Electron locally
6. **Comprehensive Reporting**: Mochawesome HTML reports

## 📊 Test Results

View test results and artifacts in:
- **Local Reports**: `cypress/reports/` directory
- **GitHub Actions**: Actions tab in your repository
- **Local Cypress Test Runner**: Interactive debugging
- **Command Line**: Detailed console output

## 🔍 Debugging

### Local Debugging

1. Use `npm run test:open` for interactive debugging
2. Check `cypress/screenshots/` for failure screenshots
3. Check `cypress/videos/` for test recordings
4. View HTML reports in `cypress/reports/`

### CI Debugging

1. Check GitHub Actions run logs
2. Download artifacts (screenshots/videos/reports) from failed runs
3. Review test output in the Actions tab
4. Analyze HTML reports for detailed insights

## 🚀 Next Steps

Potential enhancements:
- Add more test scenarios
- Implement API testing
- Add database validation
- Set up Cypress Cloud for advanced features
- Add component testing
- Configure Slack/email notifications for test results

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your tests
4. Ensure CI passes
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE). 