document.addEventListener("DOMContentLoaded", function() {
    const questionsContainer = document.getElementById("questions-container");
    const addQuestionButton = document.getElementById("add-question");
    const quizForm = document.getElementById("quiz-form");
    const messageDiv = document.getElementById("message");

    let questionCount = 0;

    addQuestionButton.addEventListener("click", function() {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question mb-4";
        questionDiv.dataset.questionIndex = questionCount;

        questionDiv.innerHTML = `
            <label>Question Type:
                <select class="question-type form-select" name="questions[${questionCount}][type]" required>
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="fill-in-the-blanks">Fill in the Blanks</option>
                    <option value="true-false">True/False</option>
                </select>
            </label>
            <div class="question-content mt-3"></div>
            <label class="form-label mt-3">Marks: 
                <input type="number" class="marks form-control" name="questions[${questionCount}][marks]" required>
            </label>
            <button type="button" class="btn btn-danger mt-3 delete-question">Delete Question</button>
        `;

        questionsContainer.appendChild(questionDiv);

        const deleteButton = questionDiv.querySelector(".delete-question");
        deleteButton.addEventListener("click", function() {
            questionsContainer.removeChild(questionDiv);
        });

        const questionTypeSelect = questionDiv.querySelector(".question-type");
        questionTypeSelect.addEventListener("change", function() {
            const questionContent = questionDiv.querySelector(".question-content");
            const index = questionDiv.dataset.questionIndex;
            switch (questionTypeSelect.value) {
                case "multiple-choice":
                    questionContent.innerHTML = `
                        <label>Question: <input type="text" class="form-control" name="questions[${index}][content]" required></label>
                        <div class="multiple-choice-options mt-3">
                            <div class="mb-2">
                                <label>Option 1: <input type="text" class="form-control" name="questions[${index}][options][]" required></label>
                                <label>Option 2: <input type="text" class="form-control" name="questions[${index}][options][]" required></label>
                                <label>Option 3: <input type="text" class="form-control" name="questions[${index}][options][]" required></label>
                                <label>Option 4: <input type="text" class="form-control" name="questions[${index}][options][]" required></label>
                            </div>
                            <label>Correct Options: 
                                <div>
                                    <label class="form-check-label me-2">Option 1
                                        <input type="checkbox" class="form-check-input" name="questions[${index}][correctOptions][]" value="0">
                                    </label>
                                    <label class="form-check-label me-2">Option 2
                                        <input type="checkbox" class="form-check-input" name="questions[${index}][correctOptions][]" value="1">
                                    </label>
                                    <label class="form-check-label me-2">Option 3
                                        <input type="checkbox" class="form-check-input" name="questions[${index}][correctOptions][]" value="2">
                                    </label>
                                    <label class="form-check-label me-2">Option 4
                                        <input type="checkbox" class="form-check-input" name="questions[${index}][correctOptions][]" value="3">
                                    </label>
                                </div>
                            </label>
                        </div>
                    `;
                    break;
                case "fill-in-the-blanks":
                    questionContent.innerHTML = `
                        <label>Question: <input type="text" class="form-control" name="questions[${index}][content]" required></label>
                        <label>Answer: <input type="text" class="form-control" name="questions[${index}][answer]" required></label>
                    `;
                    break;
                case "true-false":
                    questionContent.innerHTML = `
                        <label>Question: <input type="text" class="form-control" name="questions[${index}][content]" required></label>
                        <label>Answer: 
                            <div>
                                <label class="form-check-label me-2">True
                                    <input type="radio" class="form-check-input" name="questions[${index}][answer]" value="true" required>
                                </label>
                                <label class="form-check-label">False
                                    <input type="radio" class="form-check-input" name="questions[${index}][answer]" value="false" required>
                                </label>
                            </div>
                        </label>
                    `;
                    break;
            }
        });

        questionTypeSelect.dispatchEvent(new Event('change'));
        questionCount++;
    });

    quizForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(quizForm);
        const json = { questions: [] };

        formData.forEach((value, key) => {
            if (key.includes('[') && key.includes(']')) {
                const keys = key.split(/\[|\]/).filter(k => k);
                if (!json[keys[0]]) json[keys[0]] = [];
                if (!json[keys[0]][keys[1]]) json[keys[0]][keys[1]] = {};

                if (keys[2] === 'options' || keys[2] === 'correctOptions') {
                    if (!json[keys[0]][keys[1]][keys[2]]) {
                        json[keys[0]][keys[1]][keys[2]] = [];
                    }
                    json[keys[0]][keys[1]][keys[2]].push(value);
                } else {
                    json[keys[0]][keys[1]][keys[2]] = value;
                }
            } else {
                json[key] = value;
            }
        });

        fetch("/quiz/create-quiz", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(json)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                messageDiv.textContent = "Quiz successfully created!";
                messageDiv.className = "alert alert-success";
                quizForm.reset();
                questionsContainer.innerHTML = "";
                questionCount = 0;
            } else {
                throw new Error(data.message || "Error creating quiz");
            }
        })
        .catch(error => {
            messageDiv.textContent = error.message;
            messageDiv.className = "alert alert-danger";
        });
    });
});



document.getElementById('quiz-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const quizName = document.getElementById('quizName').value;
    window.location.href = `/take-quiz/${quizName}`;
    // const response = await fetch(`/quiz/${quizName}`);
    // if (response.ok) {
    //     const quiz = await response.json();
    //     alert(console.log(quiz));
    // } else {
    //     document.getElementById('quizContainer').innerHTML = 'Quiz not found';
    // }
});


// document.getElementById('quiz-form').addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const quizName = document.getElementById('quizName').value;
//   const response = await fetch(`/quiz?name=${quizName}`);
//   const data = await response.json();
//   alert(console.log(data));
// });