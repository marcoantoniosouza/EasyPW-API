const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;