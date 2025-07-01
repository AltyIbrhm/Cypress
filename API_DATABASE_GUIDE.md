# API and Database Testing Guide

## 🔌 **API Testing in Cypress**

### **Overview**
Cypress provides built-in API testing capabilities using `cy.request()`. This allows you to test REST APIs, validate responses, and perform end-to-end testing that includes both UI and API layers.

### **Key Features**
- ✅ **REST API Testing**: GET, POST, PUT, DELETE requests
- ✅ **Authentication**: Bearer tokens, API keys, cookies
- ✅ **Response Validation**: Status codes, headers, body structure
- ✅ **Error Handling**: 4xx, 5xx status codes
- ✅ **Performance Testing**: Response time validation
- ✅ **Data Validation**: Schema validation, business logic

### **Usage Examples**

#### **Basic GET Request**
```javascript
cy.request({
  method: 'GET',
  url: 'https://api.example.com/jobs',
  headers: {
    'Authorization': 'Bearer your-token',
    'Content-Type': 'application/json'
  }
}).then((response) => {
  expect(response.status).to.eq(200);
  expect(response.body.jobs).to.be.an('array');
});
```

#### **POST Request with Data**
```javascript
cy.request({
  method: 'POST',
  url: 'https://api.example.com/applications',
  headers: {
    'Authorization': 'Bearer your-token',
    'Content-Type': 'application/json'
  },
  body: {
    jobId: '12345',
    candidate: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  }
}).then((response) => {
  expect(response.status).to.eq(201);
  expect(response.body).to.have.property('applicationId');
});
```

#### **Error Handling**
```javascript
cy.request({
  method: 'GET',
  url: 'https://api.example.com/jobs/999999',
  failOnStatusCode: false // Don't fail on 4xx/5xx
}).then((response) => {
  expect(response.status).to.eq(404);
  expect(response.body.error).to.include('Not found');
});
```

### **Environment Variables**
Set your API keys in `cypress.env.json` or environment variables:
```json
{
  "API_KEY": "your-api-key-here",
  "API_BASE_URL": "https://api.qualitestgroup.com"
}
```

---

## 🗄️ **Database Testing in Cypress**

### **Overview**
Cypress can connect to databases using `cy.task()` and custom plugins. This enables you to:
- Validate data persistence
- Test database constraints
- Perform data setup/cleanup
- Test cross-database consistency

### **Supported Databases**
- ✅ **MySQL**: Using `mysql2` package
- ✅ **PostgreSQL**: Using `pg` package  
- ✅ **MongoDB**: Using `mongodb` package

### **Setup**

#### **1. Install Dependencies**
```bash
npm install mysql2 pg mongodb
```

#### **2. Configure Database Connections**
Set environment variables for your databases:
```bash
# MySQL
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=qualitest_careers

# PostgreSQL
PG_HOST=localhost
PG_USER=postgres
PG_PASSWORD=password
PG_DATABASE=qualitest_careers

# MongoDB
MONGODB_URL=mongodb://localhost:27017
MONGODB_DATABASE=qualitest_careers
```

#### **3. Database Plugin**
The `cypress/plugins/database.js` file provides these tasks:

**MySQL Tasks:**
- `mysqlQuery(query, params)` - Execute SELECT queries
- `mysqlInsert(table, data)` - Insert records
- `mysqlUpdate(table, data, where)` - Update records
- `mysqlDelete(table, where)` - Delete records

**PostgreSQL Tasks:**
- `pgQuery(query, params)` - Execute queries
- `pgInsert(table, data)` - Insert records
- `pgUpdate(table, data, where)` - Update records

**MongoDB Tasks:**
- `mongoFind(collection, query)` - Find documents
- `mongoInsert(collection, document)` - Insert documents
- `mongoUpdate(collection, filter, update)` - Update documents
- `mongoDelete(collection, filter)` - Delete documents

### **Usage Examples**

#### **MySQL Testing**
```javascript
// Insert test data
cy.task('mysqlInsert', 'applications', {
  jobId: '12345',
  candidateName: 'Test User',
  email: 'test@example.com',
  status: 'submitted'
}).then((result) => {
  expect(result.success).to.be.true;
  expect(result.data.insertId).to.be.a('number');
});

// Query data
cy.task('mysqlQuery', 'SELECT * FROM applications WHERE email = ?', ['test@example.com'])
  .then((result) => {
    expect(result.data).to.have.length(1);
    expect(result.data[0].candidateName).to.eq('Test User');
  });
```

#### **PostgreSQL Testing**
```javascript
// Insert with returning
cy.task('pgInsert', 'applications', {
  job_id: '12345',
  candidate_name: 'Test User',
  email: 'test@example.com'
}).then((result) => {
  expect(result.data).to.have.property('id');
  expect(result.data.candidate_name).to.eq('Test User');
});
```

#### **MongoDB Testing**
```javascript
// Insert document
cy.task('mongoInsert', 'applications', {
  jobId: '12345',
  candidateName: 'Test User',
  email: 'test@example.com',
  status: 'submitted'
}).then((result) => {
  expect(result.data.insertedId).to.exist;
});

// Find documents
cy.task('mongoFind', 'applications', { email: 'test@example.com' })
  .then((result) => {
    expect(result.data).to.have.length(1);
    expect(result.data[0].candidateName).to.eq('Test User');
  });
```

---

## 🔄 **Integration Testing**

### **API + Database Integration**
```javascript
describe('End-to-End Application Flow', () => {
  it('should create application via API and verify in database', () => {
    const applicationData = {
      jobId: '12345',
      candidate: {
        name: 'John Doe',
        email: 'john@example.com'
      }
    };

    // 1. Submit application via API
    cy.request({
      method: 'POST',
      url: 'https://api.example.com/applications',
      body: applicationData
    }).then((apiResponse) => {
      expect(apiResponse.status).to.eq(201);
      const applicationId = apiResponse.body.applicationId;

      // 2. Verify in database
      cy.task('mysqlQuery', 'SELECT * FROM applications WHERE id = ?', [applicationId])
        .then((dbResult) => {
          expect(dbResult.data).to.have.length(1);
          expect(dbResult.data[0].candidate_name).to.eq('John Doe');
        });
    });
  });
});
```

### **Cross-Database Consistency**
```javascript
it('should maintain consistency across databases', () => {
  const testData = { email: 'test@example.com', status: 'submitted' };

  // Insert into all databases
  cy.task('mysqlInsert', 'applications', testData);
  cy.task('pgInsert', 'applications', testData);
  cy.task('mongoInsert', 'applications', testData);

  // Verify in all databases
  cy.task('mysqlQuery', 'SELECT COUNT(*) as count FROM applications WHERE email = ?', [testData.email])
    .then((result) => expect(result.data[0].count).to.eq(1));

  cy.task('pgQuery', 'SELECT COUNT(*) as count FROM applications WHERE email = $1', [testData.email])
    .then((result) => expect(result.data[0].count).to.eq(1));

  cy.task('mongoFind', 'applications', { email: testData.email })
    .then((result) => expect(result.data).to.have.length(1));
});
```

---

## 🛠️ **Best Practices**

### **API Testing Best Practices**
1. **Use Environment Variables** for API keys and base URLs
2. **Validate Response Structure** before checking data
3. **Test Error Scenarios** (4xx, 5xx status codes)
4. **Check Response Times** for performance validation
5. **Use Descriptive Test Names** that explain the scenario
6. **Clean Up Test Data** after tests

### **Database Testing Best Practices**
1. **Reset Test Data** before each test
2. **Use Transactions** when possible for rollback
3. **Test Data Isolation** between tests
4. **Validate Constraints** (unique, required fields)
5. **Close Connections** after tests
6. **Use Parameterized Queries** to prevent SQL injection

### **Security Considerations**
1. **Never Commit Credentials** to version control
2. **Use Environment Variables** for sensitive data
3. **Validate Input Data** to prevent injection attacks
4. **Use Read-Only Connections** when possible
5. **Limit Database Permissions** for test users

---

## 🚀 **Running Tests**

### **Run API Tests Only**
```bash
npx cypress run --spec "cypress/e2e/api_test.cy.js"
```

### **Run Database Tests Only**
```bash
npx cypress run --spec "cypress/e2e/database_test.cy.js"
```

### **Run All Tests**
```bash
npx cypress run
```

### **Run with Specific Environment**
```bash
npx cypress run --env API_KEY=your-key,DB_HOST=localhost
```

---

## 📊 **Test Reports**

All API and database tests will be included in:
- **Mochawesome HTML Reports**: Detailed test results
- **Cypress Cloud**: Test recordings and analytics
- **GitHub Actions**: CI/CD pipeline integration

---

## 🔧 **Troubleshooting**

### **Common Issues**

1. **Database Connection Failed**
   - Check environment variables
   - Verify database is running
   - Check network connectivity

2. **API Authentication Failed**
   - Verify API key is correct
   - Check token expiration
   - Validate request headers

3. **Test Data Conflicts**
   - Use unique test data
   - Reset data before tests
   - Use transactions for cleanup

### **Debug Commands**
```javascript
// Log API response
cy.request({...}).then((response) => {
  cy.log('API Response:', JSON.stringify(response.body, null, 2));
});

// Log database result
cy.task('mysqlQuery', 'SELECT * FROM applications').then((result) => {
  cy.log('DB Result:', JSON.stringify(result.data, null, 2));
});
``` 