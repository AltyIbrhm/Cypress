describe('API Testing Suite', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com'; // Real test API
  const apiKey = Cypress.env('API_KEY') || 'your-api-key-here';
  
  // Test data
  const testJobData = {
    title: 'Automation Lead',
    company: 'Qualitest Group',
    location: 'US (remote)',
    salary: '$110,000 - $125,000 USD annually'
  };

  describe('REST API Tests', () => {
    it('should GET posts list successfully', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/posts`,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        // Assert response status
        expect(response.status).to.eq(200);
        
        // Assert response structure
        expect(response.body).to.be.an('array');
        
        // Assert response data
        expect(response.body).to.have.length.greaterThan(0);
        
        // Check if posts have required properties
        expect(response.body[0]).to.have.property('id');
        expect(response.body[0]).to.have.property('title');
        expect(response.body[0]).to.have.property('body');
        expect(response.body[0]).to.have.property('userId');
      });
    });

    it('should GET specific post by ID', () => {
      const postId = '1';
      
      cy.request({
        method: 'GET',
        url: `${baseUrl}/posts/${postId}`,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 1);
        expect(response.body).to.have.property('title');
        expect(response.body).to.have.property('body');
        expect(response.body).to.have.property('userId');
      });
    });

    it('should POST new post', () => {
      const postData = {
        title: 'Test Post Title',
        body: 'This is a test post body for API testing',
        userId: 1
      };

      cy.request({
        method: 'POST',
        url: `${baseUrl}/posts`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: postData
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('title', postData.title);
        expect(response.body).to.have.property('body', postData.body);
        expect(response.body).to.have.property('userId', postData.userId);
      });
    });

    it('should handle 404 for non-existent post', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/posts/99999999`,
        headers: {
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.be.empty;
      });
    });
  });

  describe('Authentication & Authorization Tests', () => {
    it('should handle requests without authentication (public API)', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/posts`,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });

    it('should handle requests with custom headers', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/posts/1`,
        headers: {
          'Content-Type': 'application/json',
          'X-Custom-Header': 'test-value'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 1);
      });
    });
  });

  describe('Data Validation Tests', () => {
    it('should validate post data structure', () => {
      const validPost = {
        title: 'Valid Post Title',
        body: 'Valid post body content',
        userId: 1
      };

      cy.request({
        method: 'POST',
        url: `${baseUrl}/posts`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: validPost
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.title).to.eq(validPost.title);
        expect(response.body.body).to.eq(validPost.body);
        expect(response.body.userId).to.eq(validPost.userId);
      });
    });

    it('should handle missing required fields gracefully', () => {
      const incompletePost = {
        title: 'Incomplete Post'
        // Missing body and userId
      };

      cy.request({
        method: 'POST',
        url: `${baseUrl}/posts`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: incompletePost
      }).then((response) => {
        // JSONPlaceholder doesn't validate, so it returns 201
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
      });
    });
  });

  describe('Performance & Load Tests', () => {
    it('should respond within acceptable time', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/posts`,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        // Assert response time is under 5 seconds
        expect(response.duration).to.be.lessThan(5000);
      });
    });

    it('should handle concurrent requests', () => {
      // Make multiple concurrent requests
      const requests = [];
      for (let i = 0; i < 3; i++) {
        requests.push(
          cy.request({
            method: 'GET',
            url: `${baseUrl}/posts/${i + 1}`,
            headers: {
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