
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const should = chai.should();

var server = require('../app');
var db = require('../models');
let passwordHash = require('password-hash');

describe('Auth Sequelize', () => {

  beforeEach( (done) => {
    // const newUser = {
    //   firstname: 'rudy',
    //   lastname: 'w',
    //   email: 'rudy@haha.com',
    //   password: 'sha1$6f85ce31$1$7936552d15684ac319e4d222a99f1ab871174db0',
    // };

    const newUser = {
      firstname: 'Rudy',
      lastname: 'W',
      email: 'rudy@haha.com',
      password: passwordHash.generate('haha'),
      address: 'bro st',
      city: 'san jose',
      state: 'CA',
      zipcode: '95112',
      phone: '+1 222 222 2222',
      profileImage: 'profileImage',
      creditCardNum: '1234567890123456',
      creditCardFullName: 'Rudy W',
    };


    db.User.create(newUser)
      .then((user) => {
        newUser_id = user.id;
        done();
      });
  });

  afterEach((done) => {
    db.User.destroy({where: {}})
      .then(() => {
        done();
      });
  });

  it('POST - /auth/signup - should create a new user', (done) => {
    chai.request(server)
      .post('/auth/signup')
      .send({
        firstname: 'Gordon',
        lastname: 'Hayward',
        email: 'gordon@haha.com',
        password: 'haha',
        address: 'bro st',
        city: 'san jose',
        state: 'CA',
        zipcode: '95112',
        phone: '+1 222 222 2222',
        profileImage: 'profileImage',
        creditCardNum: '1234567890123456',
        creditCardFullName: 'Gordon Hayward',
      }).end((err, result) => {
        result.should.have.status(200);

        done();
      });
  });

  it('POST - /auth/signin - correct credential should let the user sign in', (done) => {
    chai.request(server)
      .post('/auth/signin')
      .send({
        email: 'rudy@haha.com',
        password: 'haha',
      })
      .end((err, result) => {
        // console.log("***** signin", result)
        result.should.have.status(200);
        result.should.be.an('object');
        result.body.should.be.an('object');

        result.body.should.have.property('token');
        result.body.should.have.property('email');
        result.body.email.should.equal('rudy@haha.com');
        done();
      });
  });
}); // end of describe('Auth Sequelize')
