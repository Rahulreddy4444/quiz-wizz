// models/quiz.model.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    type: { type: String, required: true },
    content: { type: String, required: true },
    options: [String], // Only for multiple-choice questions
    // correctOptions: [Number], // Only for multiple-choice questions
    correctOption: Number,  // for single-correct questions
    answer: String, // For fill-in-the-blanks and true/false questions
    marks: { type: Number, required: true }
});

const quizSchema = new mongoose.Schema({
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    questions: [questionSchema]
});

module.exports = mongoose.model('Quiz', quizSchema);
