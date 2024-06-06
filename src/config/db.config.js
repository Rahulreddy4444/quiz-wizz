const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.error('DB connection failed', err));

module.exports = mongoose;
