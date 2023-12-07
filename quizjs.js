const questions = [
    {
        question: "What AWS service is used to deploy and manage containers?",
        answers: [
            { text: "Amazon RDS", correct: false },
            { text: "Amazon ECS", correct: true },
            { text: "Amazon S3", correct: false },
            { text: "Amazon Lambda", correct: false }
        ]
    },

    {
        question: "What AWS service provides scalable computing capacity in the cloud?",
        answers:[
            {text:"Amazon EC2", correct:true},
            {text:"Amazon RDS", correct:false},
            {text:"Amazon DynamoDB", correct:false},
            {text:"Amazon Redshift", correct:false}
        ]
    },

    {
        question: "What AWS service is a fully managed NoSQL database service?",
        answers:[
            {text:"Amazon Aurora", correct:false},
            {text:"Amazon DynamoDB", correct:true},
            {text:"Amazon Redshift", correct:false},
            {text:"Amazon S3", correct:false}
        ]
    },

    {
        question: "What AWS service is used for content delivery and DDoS protection?",
        answers:[
            {text:"Amazon CloudFront", correct:false},
            {text:"Amazon Route 53", correct:false},
            {text:"AWS Shield", correct:true},
            {text:"Amazon Elastic Beanstalk", correct:false}
        ]
    },

    {
        question: "What AWS service provides a fully managed database compatible with MySQL, PostgreSQL, Oracle, and SQL Server?",
        answers:[
            {text:"Amazon RDS", correct:true},
            {text:"Amazon Aurora", correct:false},
            {text:"Amazon DynamoDB", correct:false},
            {text:"Amazon Redshift", correct:false}
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