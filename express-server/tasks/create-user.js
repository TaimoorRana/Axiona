#!/usr/bin/env node
const yargs = require('yargs');
const mongoose = require('mongoose');

const User = require('../models/User');
const MONGO_URL = require('../models/mongo_url');

const argv = yargs
  .usage('$0 [options]')
  .option('name', {
    type: 'string',
    describe: 'user account first name',
    demandOption: true
  })
  .option('email', {
    type: 'string',
    describe: 'user account email',
    demandOption: true
  })
  .option('password', {
    type: 'string',
    describe: 'user account password',
    demandOption: true
  })
  .option('role', {
    describe: 'user account role and priviledges',
    choices: ['user', 'admin', 'board'],
    demandOption: true
  })
  .help()
  .argv;

async function run() {
  try {
    await mongoose.connect(MONGO_URL, {});
  
    let user = await User.findOne({email: argv.email});

    if (user) {
      throw new Error(`User ${user.email} already exists`);
    }

    user = new User({
      name: argv.name,
      email: argv.email,
      password: argv.password,
      role: argv.role
    });
  
    await user.save();

    console.log(`Created ${user.role} ${user.name}`);
    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();