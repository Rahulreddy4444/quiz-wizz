const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { ensureAuthenticated } = require('./middlewares/auth.middleware');
const authRoutes = require('./routes/auth.routes');
const quizRoutes = require('./routes/quiz.routes');
const db = require('./config/db.config'); // Ensure DB is connected
const Quiz = require('./models/quiz.model');

dotenv.config();
const { secret } = require('./config/auth.config');

const app = express();

app.use(session({
    secret,
    resave: false,
    saveUninitialized: true
}));

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));

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

// Endpoint to fetch a quiz by name
app.get('/quiz/:name', async (req, res) => {
    try {
        const quizName = req.params.name;
        const quiz = await Quiz.findOne({ name: quizName });
        if (!quiz) {
            return res.status(404).send('Quiz Not Found');
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Endpoint to serve the quiz page
app.get('/take-quiz/:name', (req, res) => {
    res.render("take_quiz");
    // res.sendFile(path.join(__dirname, '../public/quiz.html'));
});


app.use(authRoutes);
app.use('/quiz', quizRoutes);

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ success: false, message: 'Something broke!', error: err.message });
// });

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
