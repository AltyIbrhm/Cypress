describe('Database Testing Suite', () => {
  const testApplication = {
    jobId: '39414944',
    candidateName: 'Test Candidate',
    email: 'test.candidate@example.com',
    phone: '+1234567890',
    status: 'submitted',
    submittedAt: new Date().toISOString()
  };

  beforeEach(() => {
    // Reset test data before each test
    cy.task('resetTestData');
  });

  after(() => {
    // Close database connections after all tests
    cy.task('closeDatabaseConnections');
  });

  describe('MySQL Database Tests', () => {
    it('should insert job application into MySQL', () => {
      cy.task('mysqlInsert', 'applications', testApplication).then((result) => {
        expect(result.success).to.be.true;
        expect(result.data.insertId).to.be.a('number');
        expect(result.data.affectedRows).to.eq(1);
      });
    });

    it('should query job applications from MySQL', () => {
      // First insert test data
      cy.task('mysqlInsert', 'applications', testApplication);
      
      // Then query it
      cy.task('mysqlQuery', 'SELECT * FROM applications WHERE email = ?', [testApplication.email])
        .then((result) => {
          expect(result.success).to.be.true;
          expect(result.data).to.have.length(1);
          expect(result.data[0].candidateName).to.eq(testApplication.candidateName);
          expect(result.data[0].jobId).to.eq(testApplication.jobId);
        });
    });

    it('should update application status in MySQL', () => {
      // Insert test data
      cy.task('mysqlInsert', 'applications', testApplication);
      
      // Update status
      cy.task('mysqlUpdate', 'applications', 
        { status: 'reviewed' }, 
        { email: testApplication.email }
      ).then((result) => {
        expect(result.success).to.be.true;
        expect(result.data.affectedRows).to.eq(1);
      });

      // Verify update
      cy.task('mysqlQuery', 'SELECT status FROM applications WHERE email = ?', [testApplication.email])
        .then((result) => {
          expect(result.data[0].status).to.eq('reviewed');
        });
    });

    it('should delete test application from MySQL', () => {
      // Insert test data
      cy.task('mysqlInsert', 'applications', testApplication);
      
      // Delete it
      cy.task('mysqlDelete', 'applications', { email: testApplication.email })
        .then((result) => {
          expect(result.success).to.be.true;
          expect(result.data.affectedRows).to.eq(1);
        });

      // Verify deletion
      cy.task('mysqlQuery', 'SELECT COUNT(*) as count FROM applications WHERE email = ?', [testApplication.email])
        .then((result) => {
          expect(result.data[0].count).to.eq(0);
        });
    });
  });

  describe('PostgreSQL Database Tests', () => {
    it('should insert job application into PostgreSQL', () => {
      cy.task('pgInsert', 'applications', testApplication).then((result) => {
        expect(result.success).to.be.true;
        expect(result.data).to.have.property('id');
        expect(result.data.candidate_name).to.eq(testApplication.candidateName);
      });
    });

    it('should query job applications from PostgreSQL', () => {
      // Insert test data
      cy.task('pgInsert', 'applications', testApplication);
      
      // Query it
      cy.task('pgQuery', 'SELECT * FROM applications WHERE email = $1', [testApplication.email])
        .then((result) => {
          expect(result.success).to.be.true;
          expect(result.data).to.have.length(1);
          expect(result.data[0].candidate_name).to.eq(testApplication.candidateName);
        });
    });

    it('should update application status in PostgreSQL', () => {
      // Insert test data
      cy.task('pgInsert', 'applications', testApplication);
      
      // Update status
      cy.task('pgUpdate', 'applications', 
        { status: 'approved' }, 
        { email: testApplication.email }
      ).then((result) => {
        expect(result.success).to.be.true;
        expect(result.data).to.have.length(1);
        expect(result.data[0].status).to.eq('approved');
      });
    });
  });

  describe('MongoDB Database Tests', () => {
    it('should insert job application into MongoDB', () => {
      cy.task('mongoInsert', 'applications', testApplication).then((result) => {
        expect(result.success).to.be.true;
        expect(result.data.insertedId).to.exist;
      });
    });

    it('should query job applications from MongoDB', () => {
      // Insert test data
      cy.task('mongoInsert', 'applications', testApplication);
      
      // Query it
      cy.task('mongoFind', 'applications', { email: testApplication.email })
        .then((result) => {
          expect(result.success).to.be.true;
          expect(result.data).to.have.length(1);
          expect(result.data[0].candidateName).to.eq(testApplication.candidateName);
          expect(result.data[0].jobId).to.eq(testApplication.jobId);
        });
    });

    it('should update application status in MongoDB', () => {
      // Insert test data
      cy.task('mongoInsert', 'applications', testApplication);
      
      // Update status
      cy.task('mongoUpdate', 'applications', 
        { email: testApplication.email }, 
        { status: 'interviewed' }
      ).then((result) => {
        expect(result.success).to.be.true;
        expect(result.data.modifiedCount).to.eq(1);
      });

      // Verify update
      cy.task('mongoFind', 'applications', { email: testApplication.email })
        .then((result) => {
          expect(result.data[0].status).to.eq('interviewed');
        });
    });

    it('should delete test application from MongoDB', () => {
      // Insert test data
      cy.task('mongoInsert', 'applications', testApplication);
      
      // Delete it
      cy.task('mongoDelete', 'applications', { email: testApplication.email })
        .then((result) => {
          expect(result.success).to.be.true;
          expect(result.data.deletedCount).to.eq(1);
        });

      // Verify deletion
      cy.task('mongoFind', 'applications', { email: testApplication.email })
        .then((result) => {
          expect(result.data).to.have.length(0);
        });
    });
  });

  describe('Cross-Database Integration Tests', () => {
    it('should maintain data consistency across databases', () => {
      // Insert into all databases
      cy.task('mysqlInsert', 'applications', testApplication);
      cy.task('pgInsert', 'applications', testApplication);
      cy.task('mongoInsert', 'applications', testApplication);

      // Verify data exists in all databases
      cy.task('mysqlQuery', 'SELECT COUNT(*) as count FROM applications WHERE email = ?', [testApplication.email])
        .then((result) => {
          expect(result.data[0].count).to.eq(1);
        });

      cy.task('pgQuery', 'SELECT COUNT(*) as count FROM applications WHERE email = $1', [testApplication.email])
        .then((result) => {
          expect(result.data[0].count).to.eq(1);
        });

      cy.task('mongoFind', 'applications', { email: testApplication.email })
        .then((result) => {
          expect(result.data).to.have.length(1);
        });
    });

    it('should handle database errors gracefully', () => {
      // Try to insert invalid data
      const invalidData = { invalidField: 'test' };
      
      cy.task('mysqlInsert', 'applications', invalidData).then((result) => {
        expect(result.success).to.be.false;
        expect(result.error).to.include('error');
      });
    });
  });

  describe('Data Validation Tests', () => {
    it('should validate required fields in database', () => {
      const incompleteData = {
        jobId: '39414944',
        email: 'test@example.com'
        // Missing required fields
      };

      cy.task('mysqlInsert', 'applications', incompleteData).then((result) => {
        expect(result.success).to.be.false;
        expect(result.error).to.include('error');
      });
    });

    it('should enforce unique constraints', () => {
      // Insert first record
      cy.task('mysqlInsert', 'applications', testApplication);
      
      // Try to insert duplicate
      cy.task('mysqlInsert', 'applications', testApplication).then((result) => {
        expect(result.success).to.be.false;
        expect(result.error).to.include('Duplicate');
      });
    });
  });
}); 