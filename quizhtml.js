const questions = [
    {
        question: "Which keyword is used to define a constant in Java?",
        answers: [
            { text: "final", correct: false },
            { text: "static", correct: true },
            { text: "const", correct: false },
            { text: "constant", correct: false }
        ]
    },

    {
        question: "What does JDBC stand for in Java?",
        answers: [
            { text: "Java Database Connectivity", correct: true },
            { text: "Joint Database Compiler", correct: false },
            { text: "Just Database Control", correct: false },
            { text: "Java Database Control", correct: false }
        ]
    },

    {
        question: "Which keyword in Java is used to explicitly refer to the object's immediate parent class?",
        answers: [
            { text: "parent", correct: false },
            { text: "super", correct: true },
            { text: "this", correct: false },
            { text: "extends", correct: false }
        ]
    },

    {
        question: "In Java, what does the 'super' keyword refer to?",
        answers: [
            { text: "The current instance of the class", correct: false },
            { text: "The base class constructor", correct: false },
            { text: "The subclass constructor;", correct: false },
            { text: "he superclass or parent class", correct: true }
        ]
    },

    {
        question: "In Java, what is a 'constructor'?",
        answers: [
            { text: "A method used to destroy objects", correct: false },
            { text: "A method used to initialize an object", correct: true },
            { text: "A method used to define the properties of a class", correct: false },
            { text: "A method used to access private class members", correct: false }
        ]
    }


]
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const menuButton = document.getElementById("menu-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState() {
    nextButton.style.display = "none"
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";


}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    // menuButton.innerHTML = "go to manu";
    menuButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();