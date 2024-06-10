// controllers/quiz.controller.js
const Quiz = require('../models/quiz.model');

exports.createQuiz = async (req, res) => {
    const { name, duration, questions } = req.body;
    console.log('Request body:', req.body);

    const questionsArray = questions.map((question) => {
        let questionData = {
            type: question.type,
            content: question.content,
            marks: question.marks
        };

        if (question.type === 'multiple-choice') {
            questionData.options = question.options;
            questionData.correctOption = question.correctOption;
        } else {
            questionData.answer = question.answer;
        }

        return questionData;
    });

    const newQuiz = new Quiz({
        name,
        duration,
        questions: questionsArray
    });

    try {
        await newQuiz.save();
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ success: false, message: 'Error creating quiz', error: error.message });
    }
};
