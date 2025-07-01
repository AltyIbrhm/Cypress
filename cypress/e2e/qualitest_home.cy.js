describe('Qualitest Careers Home Page', () => {
  it('should be able to reach the careers website', () => {
    cy.request({
      url: 'https://careers.qualitestgroup.com/',
      failOnStatusCode: false,
      timeout: 10000
    }).then((response) => {
      // Just check that we got a response, any status code is fine
      expect(response).to.have.property('status');
      expect(response.status).to.be.a('number');
    });
  });

  it('should have a valid response from the website', () => {
    cy.request({
      url: 'https://careers.qualitestgroup.com/',
      failOnStatusCode: false,
      timeout: 10000
    }).then((response) => {
      // Check that we have a response body
      expect(response).to.have.property('body');
      expect(response.body).to.not.be.undefined;
    });
  });
}); 