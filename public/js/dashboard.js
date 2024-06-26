document.getElementById('build-test-button').addEventListener('click', function() {
  var quizCreationSection = document.getElementById('quiz-creation-section');
  if (quizCreationSection.style.display === 'none') {
    quizCreationSection.style.display = 'block';
  } else {
    quizCreationSection.style.display = 'none';
  }
});