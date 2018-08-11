const MONGO_URL = process.env.MONGO_URL || 
                  process.env.MONGO_URI ||
                  process.env.MONGODB_URI || 
                  process.env.MONGOLAB_URI ||
                  process.env.MONGOLAB_URL ||
                  'mongodb://localhost/axiona';

module.exports = MONGO_URL;