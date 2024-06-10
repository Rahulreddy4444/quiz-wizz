// routes/quiz.routes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');
const { validateQuiz } = require('../middlewares/quiz.middleware');

router.post('/create-quiz', validateQuiz, quizController.createQuiz);

module.exports = router;
