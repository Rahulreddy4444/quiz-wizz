
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { ensureAuthenticated } = require('./middlewares/auth.middleware');
const authRoutes = require('./routes/auth.routes');
const quizRoutes = require('./routes/quiz.routes');
const db = require('./config/db.config'); // Ensure DB is connected

dotenv.config();
const { secret } = require('./config/auth.config');

const app = express();


app.use(session({
    secret,
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.render("dashboard", { userType: req.session.user.userType });
});

app.use(authRoutes);
app.use('/quiz', quizRoutes);

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ success: false, message: 'Something broke!', error: err.message });
// });

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
