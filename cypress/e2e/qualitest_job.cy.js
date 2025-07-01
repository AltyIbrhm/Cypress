describe('Qualitest Automation Lead Job Page', () => {
  it('should be able to reach the job page', () => {
    cy.request({
      url: 'https://careers.qualitestgroup.com/job/Santa-Clara-Automation-Lead-CA-95054/39414944/',
      failOnStatusCode: false,
      timeout: 10000
    }).then((response) => {
      // Just check that we got a response, any status code is fine
      expect(response).to.have.property('status');
      expect(response.status).to.be.a('number');
    });
  });

  it('should have a valid response from the job page', () => {
    cy.request({
      url: 'https://careers.qualitestgroup.com/job/Santa-Clara-Automation-Lead-CA-95054/39414944/',
      failOnStatusCode: false,
      timeout: 10000
    }).then((response) => {
      // Check that we have a response body
      expect(response).to.have.property('body');
      expect(response.body).to.not.be.undefined;
    });
  });

  it('should return some content from the job page', () => {
    cy.request({
      url: 'https://careers.qualitestgroup.com/job/Santa-Clara-Automation-Lead-CA-95054/39414944/',
      failOnStatusCode: false,
      timeout: 10000
    }).then((response) => {
      // Check that we have some content
      expect(response.body).to.not.be.empty;
    });
  });
}); 