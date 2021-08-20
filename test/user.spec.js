/* eslint-disable no-undef */
const chai = require("chai");
const chaiHttp = require('chai-http');
const userData = require('./data.json');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('validatingUserRegistrationDataTestCases', () => {
  it('registering_Data_WithProperInput', (done) => {
    const user = userData.user.register;
    chai.request(server).post('/register').send(user).end((error, res) => {
      if (error) {
        return done(error);
      }
      res.body.should.be.a('object');
      res.body.should.have.property('success').eql(true);
      res.body.should.have.property('message').eql("User has been successfully register");
      done();
    });
  });
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
