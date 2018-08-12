const mongoose = require('mongoose');
const server = require('../server');
const User = require('../models/User');

module.exports = {
    'createTestUsers': createTestUsers,
    'deleteTestUsers': deleteTestUsers,
    'createUser': createUser,
    'deleteOneUser': deleteOneUser,
    'before': before,
    'after': after
};

before((done) => {
    createTestUsers();
    done();
});

function createUser(email, password, role, name) {
    deleteOneUser(email);
    let user = new User({
        name: name,
        email: email,
        password: password,
        role: role
    });
    user.save().then(data => { }, err => {
        console.log(err);
    });
    return user;
}

function deleteOneUser(email) {
    User.find({ email: email }).remove().then(data => {
        console.log('CLEANUP:');
        console.log('Test user' + email + 'successfully removed');
    }, err => {
        console.log(err);
    });
}

function createTestUsers() {
    createUser("test2@axiona.ca", "test123", "admin", "TestUser");
    createUser("test1@axiona.ca", "test", "user", "TestUser");
}

function deleteTestUsers() {
    deleteOneUser("test1@axiona.ca");
    deleteOneUser("test2@axiona.ca");
}

after((done) => {
    deleteTestUsers();
    done();
});