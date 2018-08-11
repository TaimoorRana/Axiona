const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');
const server = require('../server');
const User = require('../models/User');
const fixture = require('./fixture');

let id1 = new mongoose.Types.ObjectId();

chai.use(chaiHttp);

let cookie;
let adminCookie;

before((finished) => {
    fixture.createUser('testing@axiona.ca','test','user','Testing Name');
    chai.request(server)
        .post('/user/login')
        .send({
            'email': 'test2@axiona.ca',
            'password': 'test123'
        })
        .end((err, res) => {
            adminCookie = res.headers['set-cookie'].pop().split(';')[0];
            finished();
        });
});

describe('User Tests', () => {
    describe('Register', () => {
        it('should register a user via a logged in admin', (done) => {
            chai.request(server)
                .post('/user/signup')
                .set('Cookie', adminCookie)
                .send({
                    'name': 'Test',
                    'email': 'testing@axiona.ca',
                    'password': 'hunter1',
                    'confirmPassword': 'hunter1'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('Login', () => {
        it('should login a user', (done) => {
            chai.request(server)
                .post('/user/login')
                .send({ 
                    'email': 'testing@axiona.ca',
                    'password': 'hunter1'
                })
                .end((err, res) => {
                    res.should.have.cookie('connect.sid');
                    cookie = res.headers['set-cookie'].pop().split(';')[0];
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('Delete Account', () => {
        it('should delete a user\'s account', (done) => {
            User.findOne({ email: 'testing@axiona.ca' }).then(user => {
                chai.request(server)
                    .delete('/user/' + user._id)
                    .set('Cookie', cookie)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            })
        });
    });

    describe('GET/all', () => {
        it('should not get all users since user is not admin', (done) => {
            chai.request(server)
                .get('/user/all')
                .set('Cookie', cookie)
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
        it('should get all users for an admin', (done) => {
            chai.request(server)
                .get('/user/all')
                .set('Cookie', adminCookie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/PUT/:id', () => {
        it('should update the user with the given ID', (done) => {
            let name = 'Another Name';
            let email = 'testing2@axiona.ca'
            let role = 'admin';
            chai.request(server)
                .put('/user/' + id1)
                .set('Cookie', adminCookie)
                .send({ name: name, email: email, role: role })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('name').eql(name);
                    res.body.should.have.property('email').eql(email);
                    res.body.should.have.property('role').eql(role);
                    done();
                });
        });
    });

    after(() => {
        fixture.deleteOneUser('testing@axiona.ca')
        User.find({ email: 'testing@axiona.ca' }).remove().then(data => {
            console.log('CLEANUP:');
            console.log('Test user1 successfully removed');
        }, err => {
            console.log(err);
        });
        User.findByIdAndRemove(id1).then(data => {
            console.log('Test user2 successfully removed');
        }, err => {
            console.log(err);
        });
    });
})