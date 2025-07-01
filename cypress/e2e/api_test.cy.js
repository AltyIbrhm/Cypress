describe('API Testing Suite', () => {
  const baseUrl = 'https://api.qualitestgroup.com'; // Example API base URL
  const apiKey = Cypress.env('API_KEY') || 'your-api-key-here';
  
  // Test data
  const testJobData = {
    title: 'Automation Lead',
    company: 'Qualitest Group',
    location: 'US (remote)',
    salary: '$110,000 - $125,000 USD annually'
  };

  describe('REST API Tests', () => {
    it('should GET jobs list successfully', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/api/jobs`,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        // Assert response status
        expect(response.status).to.eq(200);
        
        // Assert response structure
        expect(response.body).to.have.property('jobs');
        expect(response.body.jobs).to.be.an('array');
        
        // Assert response data
        expect(response.body.jobs).to.have.length.greaterThan(0);
        
        // Check if our test job exists
        const automationJob = response.body.jobs.find(job => 
          job.title.includes('Automation')
        );
        expect(automationJob).to.exist;
        expect(automationJob.company).to.eq('Qualitest Group');
      });
    });

    it('should GET specific job by ID', () => {
      const jobId = '39414944'; // From your E2E tests
      
      cy.request({
        method: 'GET',
        url: `${baseUrl}/api/jobs/${jobId}`,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', jobId);
        expect(response.body).to.have.property('title');
        expect(response.body).to.have.property('company');
        expect(response.body.company).to.eq('Qualitest Group');
      });
    });

    it('should POST new job application', () => {
      const applicationData = {
        jobId: '39414944',
        candidate: {
          name: 'Test Candidate',
          email: 'test@example.com',
          phone: '+1234567890',
          resume: 'base64-encoded-resume-data'
        },
        coverLetter: 'I am interested in this position...'
      };

      cy.request({
        method: 'POST',
        url: `${baseUrl}/api/applications`,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: applicationData
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('applicationId');
        expect(response.body).to.have.property('status', 'submitted');
        expect(response.body).to.have.property('submittedAt');
      });
    });

    it('should handle 404 for non-existent job', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/api/jobs/99999999`,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.include('Job not found');
      });
    });
  });

  describe('Authentication & Authorization Tests', () => {
    it('should reject requests without API key', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/api/jobs`,
        headers: {
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.include('Unauthorized');
      });
    });

    it('should reject invalid API key', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/api/jobs`,
        headers: {
          'Authorization': 'Bearer invalid-key',
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('error');
      });
    });
  });

  describe('Data Validation Tests', () => {
    it('should validate required fields in job application', () => {
      const invalidApplication = {
        jobId: '39414944',
        // Missing required candidate data
        coverLetter: 'Test cover letter'
      };

      cy.request({
        method: 'POST',
        url: `${baseUrl}/api/applications`,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: invalidApplication,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.be.an('array');
        expect(response.body.errors).to.include('candidate is required');
      });
    });

    it('should validate email format', () => {
      const applicationWithInvalidEmail = {
        jobId: '39414944',
        candidate: {
          name: 'Test Candidate',
          email: 'invalid-email',
          phone: '+1234567890'
        },
        coverLetter: 'Test cover letter'
      };

      cy.request({
        method: 'POST',
        url: `${baseUrl}/api/applications`,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: applicationWithInvalidEmail,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.errors).to.include('Invalid email format');
      });
    });
  });

  describe('Performance & Load Tests', () => {
    it('should respond within acceptable time', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/api/jobs`,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        // Assert response time is under 2 seconds
        expect(response.duration).to.be.lessThan(2000);
      });
    });

    it('should handle concurrent requests', () => {
      // Make multiple concurrent requests
      const requests = [];
      for (let i = 0; i < 5; i++) {
        requests.push(
          cy.request({
            method: 'GET',
            url: `${baseUrl}/api/jobs`,
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            }
          })
        );
      }

      // All requests should succeed
      cy.wrap(requests).each((request) => {
        request.then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });
}); 