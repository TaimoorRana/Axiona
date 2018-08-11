const MONGO_URL = process.env.MONGO_URL || 
                  process.env.MONGOLAB_URI ||
                  process.env.MONGOLAB_URL ||
                  'mongodb://localhost/axiona';

module.exports = MONGO_URL;