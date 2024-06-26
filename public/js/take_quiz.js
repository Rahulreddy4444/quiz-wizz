document.addEventListener('DOMContentLoaded', async function () {
        const quizName = window.location.pathname.split('/').pop();
            const response = await fetch(`/quiz/${quizName}`);
            if (response.ok) {
                const quiz = await response.json();
                startQuiz(quiz);
            } else {
                document.getElementById('quizContainer').innerHTML = '<h3>Quiz Not Found!!</h3>';
            }
        });

        let currentQuestionIndex = 0;
        let totalTimeRemaining;
        let totalTimer;
        let quizData;
        let userAnswers = {};

        function startQuiz(quiz) {
            quizData = quiz;
            totalTimeRemaining = quiz.duration * 60; // convert minutes to seconds
            document.getElementById('quizName').textContent = quiz.name;
            displayQuestion(quiz.questions, currentQuestionIndex);

            totalTimer = setInterval(() => {
                if (totalTimeRemaining <= 0) {
                    clearInterval(totalTimer);
                    submitQuiz();
                } else {
                    totalTimeRemaining--;
                    updateTotalTimer();
                }
            }, 1000);
        }

        function updateTotalTimer() {
            const minutes = Math.floor(totalTimeRemaining / 60);
            const seconds = totalTimeRemaining % 60;
            document.getElementById('totalTimer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }

        function displayQuestion(questions, index, totalDuration, totalMinutes) {
            if (index >= questions.length) {
                document.getElementById('quizContent').innerHTML = '<h3>Quiz Completed</h3>';
                return;
            }

            const question = questions[index];
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-div';
            let questionHTML = `<p>${question.content}</p>`;

            switch (question.type) {
                case 'multiple-choice':
                    questionHTML += question.options.map((option, i) => {
                        const isChecked = userAnswers[`question${index}`] === option ? 'checked' : '';
                        return `<label><input type="radio" name="question${index}" value="${option}" ${isChecked} onclick="selectAnswer('${index}', '${option}', this)">${option}</label><br>`;
                    }).join('');
                    break;
                case 'fill-in-the-blanks':
                    const fillInAnswer = userAnswers[`question${index}`] || '';
                    questionHTML += `<input type="text" name="question${index}" value="${fillInAnswer}" placeholder="Type your answer here" oninput="selectAnswer('${index}', this.value)">`;
                    break;
                case 'true-false':
                    const trueChecked = userAnswers[`question${index}`] === 'true' ? 'checked' : '';
                    const falseChecked = userAnswers[`question${index}`] === 'false' ? 'checked' : '';
                    questionHTML += `<label><input type="radio" name="question${index}" value="true" ${trueChecked} onclick="selectAnswer('${index}', 'true', this)">True</label><br>
                                    <label><input type="radio" name="question${index}" value="false" ${falseChecked} onclick="selectAnswer('${index}', 'false', this)">False</label>`;
                    break;
            }

            // questionHTML += `<div id="timerContainer"><i class="fas fa-clock"></i> <span id="timer">${timePerQuestion}</span> sec</div>`;
            questionHTML += `<p>Marks Alloted: <span id="marks">${question.marks}</span> </p>`;
            questionHTML += `<div class="button-container">`;
            questionHTML += `<button onclick="prevQuestion()" ${index === 0 ? 'disabled' : ''}>Back</button>`;
            if (index === questions.length - 1) {
                questionHTML += `<button onclick="submitQuiz()">Submit</button>`;
            } else {
                questionHTML += `<button onclick="nextQuestion()">Next</button>`;
            }
            questionHTML += `</div>`;

            questionDiv.innerHTML = questionHTML;

            const quizContent = document.getElementById('quizContent');
            quizContent.innerHTML = '';
            quizContent.appendChild(questionDiv);
        }
        
        function selectAnswer(questionIndex, answer, inputElement) {
            if (userAnswers[`question${questionIndex}`] === answer) {
                inputElement.checked = false;
                delete userAnswers[`question${questionIndex}`];
            } else {
                userAnswers[`question${questionIndex}`] = answer;
            }
        }

        function prevQuestion() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                displayQuestion(quizData.questions, currentQuestionIndex);
            }
        }

        function nextQuestion() {
            currentQuestionIndex++;
            displayQuestion(quizData.questions, currentQuestionIndex);
        }

        function submitQuiz() {
            clearInterval(totalTimer);
            // document.getElementById('quizContainer').innerHTML = '<h3>Quiz Submitted. Thank you!</h3>';
            const score = calculateScore();
            const totalMarks = calculateTotalMarks();
            const minutesRemaining = Math.floor(totalTimeRemaining / 60);
            const secondsRemaining = totalTimeRemaining % 60;
    
            // Send result data to the server (optional)
            fetch('/submit-quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    score: score,
                    totalMarks: totalMarks,
                    timeRemaining: `${minutesRemaining}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`
                })
            });

            document.getElementById('quizContainer').innerHTML = `<h3>Quiz Submitted. Thank you!</h3>
                <p>Your Score: ${score} / ${totalMarks}</p>`;
                // <p>Time Remaining: ${minutesRemaining}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}</p>
        }
        
        function calculateScore() {
            let score = 0;
            quizData.questions.forEach((question, index) => {
                const userAnswer = userAnswers[`question${index}`];
                if (question.type === "multiple-choice") {
                    if (userAnswer !== undefined && userAnswer === question.options[question.correctOption]) {
                        score += question.marks;
                    }
                } else {
                    if (userAnswer !== undefined && userAnswer === question.answer) {
                        score += question.marks;
                    }
                }
            });
            return score;
        }

        function calculateTotalMarks() {
            return quizData.questions.reduce((total, question) => total + question.marks, 0);
        }