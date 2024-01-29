document.addEventListener('DOMContentLoaded', function() {
    var quizData = [
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
          options: ['Bill Clinton', 'Barak Obama', 'Joe', 'Kennedy'],
          answer: 'Joe',
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

    var quizContainer = document.getElementById('ques');
    var resultContainer = document.getElementById('solution');
    var submitButton = document.getElementById('submit');
    var retryButton = document.getElementById('retry');
    var showAnswerButton = document.getElementById('showAnswer');

    let currentQuestion = 0;
    let score = 0;
    let incorrectAnswers = [];

    function customShuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function displayQuestion() {
        if (currentQuestion < quizData.length) {
            const questionData = quizData[currentQuestion];
            const questionElement = document.createElement('div');
            questionElement.className = 'question';
            questionElement.innerHTML = questionData.question;

            const optionsElement = document.createElement('div');
            optionsElement.className = 'options';

            const shuffledOptions = [...questionData.options];
            customShuffle(shuffledOptions);

            shuffledOptions.forEach(optionText => {
                const option = document.createElement('label');
                option.className = 'option';

                const radio = document.createElement('input');
                radio.type = 'checkbox';
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
        const selectedOption = document.querySelector('input[name="quiz"]:checked');
        if (selectedOption) {
            const answer = selectedOption.value;
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
        resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
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

    submitButton.addEventListener('click', checkAnswer);
    retryButton.addEventListener('click', retryQuiz);
    showAnswerButton.addEventListener('click', showAnswer);

    displayQuestion();
});
