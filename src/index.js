
const express = require('express');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const { ensureAuthenticated } = require('./middlewares/auth.middleware');
const authRoutes = require('./routes/auth.routes');
const db = require('./config/db.config'); // Ensure DB is connected

dotenv.config();
const { secret } = require('./config/auth.config');

const app = express();

// const { secret } = require('./config/auth.config');

app.use(session({
    secret,
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
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

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
