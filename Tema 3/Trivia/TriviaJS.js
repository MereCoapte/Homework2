const triviaQuestions = [
    {
        question: "Care este cel mai lung fluviu din Europa ?",
        options: ["Dunarea", "Tamisa", "Volga", "Rin"],
        correctAnswer: "Volga"
    },
    {
        question: "Ce tara din America de Sud are cea mai mare suprafata ?",
        options: ["Brazilia", "Argentina", "Columbia", "Venezuela"],
        correctAnswer: "Brazilia"
    },
    {
        question: "Cate continente exista pe Pamant ?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "7"
    },
    {
        question: "Din ce tara izvoreste Dunarea ?",
        options: ["Germania", "Austria", "Elvetia", "Republica Ceha"],
        correctAnswer: "Germania"
    },
    {
        question: "Cate state are Statele Unite ale Americii ?",
        options: ["48", "50", "52", "54"],
        correctAnswer: "50"
    },
    {
        question: "Care este cel mai estic oras al Romaniei ?",
        options: ["Constanta", "Iasi", "Sulina", "Braila"],
        correctAnswer: "Sulina"
    },
    {
        question: "In ce capitala europeana poti vizita Colosseum ?",
        options: ["Roma", "Atena", "Madrid", "Paris"],
        correctAnswer: "Roma"
    },
    {
        question: "Ce tip de lac este Lacul Iezer ?",
        options: ["Lac glaciar", "Lac de acumulare", "Lac vulcanic", "Lac salin"],
        correctAnswer: "Lac glaciar"
    },
    {
        question: "Care este cel mai inalt munte de pe Glob ?",
        options: ["Mont Blanc", "Muntele Everest", "Kilimanjaro", "Aconcagua"],
        correctAnswer: "Muntele Everest"
    },
    {
        question: "Spune doua orase din regiunea Dobrogea ?",
        options: ["Timisoara si Cluj-Napoca", "Constanta si Tulcea", "Iasi si Suceava", "Brasov si Sibiu"],
        correctAnswer: "Constanta si Tulcea"
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

function startTrivia(){
    document.getElementById("start-button").style.display = "none";
    displayQuestion();
    startTimer();
}

function displayQuestion(){
    const currentQuestion = triviaQuestions[currentQuestionIndex];
    const questionText = document.getElementById("question-text");
    const answerButtons = document.getElementById("answer-buttons");

    questionText.innerHTML = "";
    answerButtons.innerHTML = "";

    questionText.innerHTML = currentQuestion.question;

    currentQuestion.options.forEach(option  =>{
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("answer-button");
        answerButtons.appendChild(button);

        button.addEventListener("click", function() {
            checkAnswer(option);
        });
    });
}

function checkAnswer(selectedOption){
    const currentQuestion = triviaQuestions[currentQuestionIndex];
    
    if (selectedOption === currentQuestion.correctAnswer){
        score++;
    }

    currentQuestionIndex++;

    if(currentQuestionIndex < triviaQuestions.length){
        displayQuestion();
    } else{
        endTrivia();
    }
}

function startTimer(){
    timerInterval = setInterval(function(){
        timeLeft--;

        document.getElementById("timer").textContent = timeLeft;

        if(timeLeft <= 0){
            endTrivia();
        }
    }, 2000)
}

function endTrivia(){
    clearInterval(timerInterval);

    const scorePercentage = (score / triviaQuestions.length) * 100;

    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `
    <h2>Trivia Completed !</h2>
    <p>Scorul tau: ${score} din ${triviaQuestions.length}</p>
    <p>Procentajul scorului: ${scorePercentage}%</p>`;
}

document.getElementById("start-button").addEventListener("click", startTrivia);