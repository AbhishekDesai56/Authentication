/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
const chai = require("chai");
const chaiHttp = require('chai-http');
const userData = require('./data.json');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe("UserRegistration", () => {
  beforeEach((done) => {
    const user = userData.user.register;
    chai.request(server).post('/register').send(user).end((error, res) => {
      if (error) {
        res.body.should.have.property('message').eql(error);
        return done();
      }
      res.body.should.be.a('object');
      res.body.should.have.property('success').eql(true);
      res.body.should.have.property('message').eql("User has been successfully register");
      done();
    });
  });
});

describe('validatingUserRegistrationDataTestCases', () => {
  // it('registering_Data_WithProperInput', (done) => {
  //   const user = userData.user.register;
  //   chai.request(server).post('/register').send(user).end((error, res) => {
  //     if (error) {
  //       return done(error);
  //     }
  //     res.body.should.be.a('object');
  //     res.body.should.have.property('success').eql(true);
  //     res.body.should.have.property('message').eql("User has been successfully register");
  //     done();
  //   });
  // });

  it('registerUser_Without_Firstname', (done) => {
    const user = userData.user.registerUserWithoutFirstname;
    chai.request(server).post('/register').send(user).end((error, res) => {
      if (error) {
        return done(error);
      }
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql("Error in User Data");
      done();
    });
  });
  it('registerUser_Without_Lastname', (done) => {
    const user = userData.user.registerUserWithoutLastname;
    chai.request(server).post('/register').send(user).end((error, res) => {
      if (error) {
        return done(error);
      }
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql("Error in User Data");
      done();
    });
  });
  it('registerUser_Without_Email', (done) => {
    const user = userData.user.registerUserWithoutEmail;
    chai.request(server).post('/register').send(user).end((error, res) => {
      if (error) {
        return done(error);
      }
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql("Error in User Data");
      done();
    });
  });
  it('registerUser_Without_Password', (done) => {
    const user = userData.user.registerUserWithoutPassword;
    chai.request(server).post('/register').send(user).end((error, res) => {
      if (error) {
        return done(error);
      }
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql("Error in User Data");
      done();
    });
  });
  it('registerUser_Without_ConfirmPassword', (done) => {
    const user = userData.user.registerUserWithoutConfirmPassword;
    chai.request(server).post('/register').send(user).end((error, res) => {
      if (error) {
        return done(error);
      }
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql("Error in User Data");
      done();
    });
  });
});

/* Login user test cases */

describe('validatingUserLoginDataTestCases', () => {
  it('loginUser_With_ValidLoginCredentials', (done) => {
    const user = userData.user.login.loginUserWithValidCredentials;
    chai.request(server).post('/login').send(user).end((error, res) => {
      if (error) {
        return done(error);
      }
      res.body.should.be.a('object');
      res.body.should.have.property('success').eql(true);
      res.body.should.have.property('message').eql("User logged in successfully");
      done();
    });
  });
  it('loginUser_With_IncorrectPassword', (done) => {
    const user = userData.user.login.loginUserWithIncorrectPassword;
    chai.request(server).post('/login').send(user).end((error, res) => {
      if (error) {
        return done(error);
      }
      res.body.should.be.a('object');
      res.body.should.have.property('success').eql(false);
      res.body.should.have.property('message').eql("Password doesn't match!");
      done();
    });
  });

  it('loginUser_With_InvalidCredentials', (done) => {
    const user = userData.user.login.loginUserWithInvalidCredentials;
    chai.request(server).post('/login').send(user).end((error, res) => {
      if (error) {
        return done(error);
      }
      res.body.should.be.a('object');
      res.body.should.have.property('success').eql(false);
      res.body.should.have.property('message').eql("Invalid User Credentials");
      done();
    });
  });
});

/**
 * name: Employee Testcase
 */
describe('Employee_Token_Generation', () => {
  let token = "";

  beforeEach((done) => {
    const user = userData.user.login.loginUserWithValidCredentials;
    chai.request(server).post('/login').send(user).end((error, res) => {
      token = res.body.token;
      res.should.have.status(200);
      if (error) return done(error);
      done();
    });
  });

  describe('Employee_Testcase', () => {
    it('employee_Data_WithProperInput', (done) => {
      const empData = userData.user.employee.employeeDetails;
      chai.request(server).post('/createEmployee').send(empData).set('token', token)
        .end((error, res) => {
          res.should.have.status(201);
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('Employee Data has been save successfully');
          done();
        });
    });

    it('employee_Without_Name', (done) => {
      const empData = userData.user.employee.employeeDetailsWithNoName;
      chai.request(server).post('/createEmployee').send(empData).set('token', token)
        .end((error, res) => {
          res.should.have.status(406);
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('Error in User Data');
          done();
        });
    });

    it('employee_Without_Gender', (done) => {
      const empData = userData.user.employee.employeeDetailsWithNoGender;
      chai.request(server).post('/createEmployee').send(empData).set('token', token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Error Occured');
          done();
        });
    });

    it('employee_Inorrect_Format_Of_Gender', (done) => {
      const empData = userData.user.employee.employeeDetailsWithNoGender;
      chai.request(server).post('/createEmployee').send(empData).set('token', token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Error Occured');
          done();
        });
    });

    it('employee_Without_Department', (done) => {
      const empData = userData.user.employee.employeeDetailsWithNoDepartment;
      chai.request(server).post('/createEmployee').send(empData).set('token', token)
        .end((error, res) => {
          res.should.have.status(406);
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('Error in User Data');
          done();
        });
    });

    it('employee_Without_Salary', (done) => {
      const empData = userData.user.employee.employeeDetailsWithNoSalary;
      chai.request(server).post('/createEmployee').send(empData).set('token', token)
        .end((error, res) => {
          res.should.have.status(406);
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('Error in User Data');
          done();
        });
    });

    it('employee_Without_StartDate', (done) => {
      const empData = userData.user.employee.employeeDetailsWithNoStartDate;
      chai.request(server).post('/createEmployee').send(empData).set('token', token)
        .end((error, res) => {
          res.should.have.status(406);
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('Error in User Data');
          done();
        });
    });

    it('fetch_employees_data', (done) => {
      chai.request(server).get('/getEmployees').set('token', token)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('Fetch all Employees Details');
          done();
        });
    });

    it('fetch_employee_with_validEmployeeId', (done) => {
      const employeeId = userData.user.employee.employeeId.id;
      chai.request(server).get(`/getEmployeeById/${employeeId}`).set('token', token)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('Record found successfully');
          res.body.should.have.property('data');
          done();
        });
    });

    it('fetch_employee_with_invalidEmployeeId', (done) => {
      const employeeId = userData.user.employee.incorrectEmployeeId.id;
      chai.request(server).get(`/getEmployeeById/${employeeId}`).set('token', token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Record not found');
          done();
        });
    });

    it('update_employee_details', (done) => {
      const employeeId = userData.user.employee.employeeId.id;
      const { updateEmployeeDetails } = userData.user.employee;
      chai.request(server).put(`/updateEmployeeDetail/${employeeId}`).set('token', token).send(updateEmployeeDetails)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('Employee record updated successfully');
          res.body.should.have.property('data');
          done();
        });
    });

    it('update_employee_details_incorrectId', (done) => {
      const employeeId = userData.user.employee.incorrectEmployeeId.id;
      const updateEmployeeDetails = userData.user.employee.updateEmployeeDetails;
      chai.request(server).put(`/updateEmployeeDetail/${employeeId}`).set('token', token).send(updateEmployeeDetails)
        .end((error, res) => {
          res.should.have.status(500);
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Record not found');
          res.body.should.have.property('data');
          done();
        });
    });

    it("delete_employee_details_with_validinput", (done) => {
      const employeeId = userData.user.employee.employeeId.id;
      chai.request(server).delete(`/deleteEmployeeById/${employeeId}`).set('token', token)
        .end((error, res) => {
          res.should.have.status(204);
          done();
        });
    });

    it("delete_employee_details_with_invalidinput", (done) => {
      const employeeId = userData.user.employee.incorrectEmployeeId.id;
      chai.request(server).delete(`/deleteEmployeeById/${employeeId}`).set('token', token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Please check for valid employee id');
          done();
        });
    });
  });
});
