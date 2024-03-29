document.addEventListener('DOMContentLoaded', function() {
    let quizData = [
        {
          question: 'Which famous river runs through Dublin?',
          options: ['Thames', 'Liffey', 'Shannon', 'Nile'],
          answer: 'Liffey',
        },
        {
          question: 'What is the largest county in Ireland?',
          options: ['Dublin', 'Donegal', 'Cork', 'Ulster'],
          answer: 'Cork',
        },
        {
          question: 'Which county is Brunratty Castle in Ireland?',
          options: ['Laois', 'Clare', 'Leinster', 'Kerry'],
          answer: 'Clare',
        },
        {
          question: 'Who is the Current president of United States of America?',
          options: ['Bill Clinton', 'Barak Obama', 'Joe Biden', 'Kennedy'],
          answer: 'Joe Biden',
        },
        {
          question: 'What is the currency of Denmark?',
          options: [
            'Dollar',
            'Rupees',
            'Euro',
            'Krone',
        ],
          answer: 'Krone',
        },
        {
          question: 'What is the Capital of Finland?',
          options: ['London', 'Paris', 'Helsinki', 'Oslo'],
          answer: 'Helsinki',
        },
        {
          question: 'In What US state is the city Nashville?',
          options: [
            'Toronto', 'New York', 'Tennessee', 'Texas',
        ],
          answer: 'Tennessee',
        },
        {
          question: 'Which actor played the Ninth Doctor in Doctor Who?',
          options: ['Christopher Eccleston', 'Gareth Keenan', 'Cillian Murphy', 'Rob Delaney'],
          answer: 'Christopher Eccleston',
        },
        {
          question: 'How many permanent teeth does a dog have?',
          options: [
            '15', '25', '32', '42',
        ],
          answer: '42',
        },
        {
          question: 'From what grain is the Japanese spirit Sake made??',
          options: ['Barley', 'Rice', 'Potatoes', 'maize'],
          answer: 'Rice',
        },
    ];

    let quizContainer = document.getElementById('ques');
    let resultContainer = document.getElementById('solution');
    let submitButton = document.getElementById('submit');
    let retryButton = document.getElementById('retry');
    let showAnswerButton = document.getElementById('showAnswer');
    let usernameInput = document.getElementById('username'); // Username input field
    let startQuizButton = document.getElementById('startQuiz'); // Button to start the quiz

    let currentQuestion = 0;
    let score = 0;
    let incorrectAnswers = [];
    let username = '';


    function startQuiz() {
      username = usernameInput.value.trim();
      if (username === '') {
          alert('Please enter a username to start the quiz.');
          return;
      }
      document.querySelector('.username-container').style.display = 'none';
      displayQuestion();
  }

    function customShuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function displayQuestion() {
        if (currentQuestion < quizData.length) {
            let questionData = quizData[currentQuestion];
            let questionElement = document.createElement('div');
            questionElement.className = 'question';
            questionElement.innerHTML = questionData.question;

            let optionsElement = document.createElement('div');
            optionsElement.className = 'options';

            let shuffledOptions = [...questionData.options];
            customShuffle(shuffledOptions);

            shuffledOptions.forEach(optionText => {
                let option = document.createElement('label');
                option.className = 'option';

                let radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'quiz';
                radio.value = optionText;

                option.appendChild(radio);
                option.appendChild(document.createTextNode(optionText));
                optionsElement.appendChild(option);
            });

            quizContainer.innerHTML = '';
            quizContainer.appendChild(questionElement);
            quizContainer.appendChild(optionsElement);
        } else {
            // Handle the case where currentQuestion is out of bounds
            displayResult();
        }
    }

    function checkAnswer() {
        let selectedOption = document.querySelector('input[name="quiz"]:checked');
        if (selectedOption) {
            let answer = selectedOption.value;
            if (answer === quizData[currentQuestion].answer) {
                score++;
            } else {
                incorrectAnswers.push({
                    question: quizData[currentQuestion].question,
                    incorrectAnswer: answer,
                    correctAnswer: quizData[currentQuestion].answer,
                });
            }
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                displayQuestion();
            } else {
                displayResult();
            }
        }
    }

    function displayResult() {
        quizContainer.style.display = 'none';
        submitButton.style.display = 'none';
        retryButton.style.display = 'inline-block';
        showAnswerButton.style.display = 'inline-block';
        resultContainer.innerHTML = `${username}You scored ${score} out of ${quizData.length}!`;
    }

    function retryQuiz() {
        currentQuestion = 0;
        score = 0;
        incorrectAnswers = [];
        quizContainer.style.display = 'block';
        submitButton.style.display = 'inline-block';
        retryButton.style.display = 'none';
        showAnswerButton.style.display = 'none';
        resultContainer.innerHTML = '';
        displayQuestion();
    }

    function showAnswer() {
        quizContainer.style.display = 'none';
        submitButton.style.display = 'none';
        retryButton.style.display = 'inline-block';
        showAnswerButton.style.display = 'none';

        let incorrectAnswersHtml = incorrectAnswers.map(answer => `
            <p>
                <strong>Question:</strong> ${answer.question}<br>
                <strong>Your Answer:</strong> ${answer.incorrectAnswer}<br>
                <strong>Correct Answer:</strong> ${answer.correctAnswer}
            </p>
        `).join('');

        resultContainer.innerHTML = `
            <p>You scored ${score} out of ${quizData.length}!</p>
            <p>Incorrect Answers:</p>
            ${incorrectAnswersHtml}
        `;
    }

    startQuizButton.addEventListener('click', startQuiz);
    submitButton.addEventListener('click', checkAnswer);
    retryButton.addEventListener('click', retryQuiz);
    showAnswerButton.addEventListener('click', showAnswer);

    displayQuestion();
});
