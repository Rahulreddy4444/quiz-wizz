const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/quiz_app';

mongoose.connect(dbURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.error('DB connection failed', err));

module.exports = mongoose;
