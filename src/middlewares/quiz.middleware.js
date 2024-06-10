// const { check, validationResult } = require('express-validator');

// exports.validateQuiz = [
//     check('name').not().isEmpty().withMessage('Quiz name is required'),
//     check('duration').isNumeric().withMessage('Quiz duration must be a number'),
//     check('questions').isArray().withMessage('Questions must be an array'),
//     check('questions.*.type').not().isEmpty().withMessage('Question type is required'),
//     check('questions.*.content').not().isEmpty().withMessage('Question content is required'),
//     check('questions.*.marks').isNumeric().withMessage('Marks must be a number'),
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         next();
//     }
// ];



// middlewares/quiz.middleware.js
const { check, validationResult } = require('express-validator');

exports.validateQuiz = [
    check('name').not().isEmpty().withMessage('Quiz name is required'),
    check('duration').isNumeric().withMessage('Quiz duration must be a number'),
    check('questions').isArray().withMessage('Questions must be an array'),
    check('questions.*.type').not().isEmpty().withMessage('Question type is required'),
    check('questions.*.content').not().isEmpty().withMessage('Question content is required'),
    check('questions.*.marks').isNumeric().withMessage('Marks must be a number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
