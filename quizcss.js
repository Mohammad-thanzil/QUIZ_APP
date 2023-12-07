const questions = [
    {
        question: "Which SQL keyword is used to retrieve data from a database?",
        answers:[
            {text:"GET", correct:false},
            {text:"SELECT", correct:true},
            {text:"RETRIEVE", correct:false},
            {text:"FETCH", correct:false}
        ]
    },

    {
        question: "Which SQL statement is used to update data in a database?",
        answers:[
            {text:"UPDATE", correct:true},
            {text:"MODIFY", correct:false},
            {text:"CHANGE", correct:false},
            {text:"ALTER", correct:false}
        ]
    },

    {
        question: "Which SQL statement is used to remove data from a database?",
        answers:[
            {text:"DELETE", correct:true},
            {text:"REMOVE", correct:false},
            {text:"ERASE", correct:false},
            {text:"DROP", correct:false}
        ]
    },

    {
        question: "Which SQL clause is used to filter rows?",
        answers:[
            {text:"ORDER BY", correct:false},
            {text:"FILTER", correct:false},
            {text:"GROUP BY", correct:false},
            {text:"WHERE", correct:true}
        ]
    },

    {
        question: "Which SQL statement is used to add a new table in a database?",
        answers:[
            {text:"CREATE TABLE", correct:true},
            {text:"ADD TABLE", correct:false},
            {text:"INSERT TABLE", correct:false},
            {text:"NEW TABLE", correct:false}
        ]
    }


]
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const menuButton = document.getElementById("menu-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex =0;
    score = 0;
    nextButton.innerHTML ="Next"
    showQuestion();
}

function showQuestion(){

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState(){
    nextButton.style.display ="none"
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display = "block";


}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    // menuButton.innerHTML = "go to manu";
    menuButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
})

startQuiz();