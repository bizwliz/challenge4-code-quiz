var startBtn = document.getElementById("start-btn")
var IntroSectionEl = document.getElementById("intro-section")
var timerEl = document.getElementById("timer")
var questionSectionEl = document.getElementById("question-section")
var titleEl = document.getElementById("title")
var choicesEl = document.querySelectorAll(".choices")

var questionIndex = 0
var questionsArray = [
    {
        title: "q1",
        choices: ["c1", "c2", "c3", "c4"],
        answer: "c2"
    },
    {
        title: "q2",
        choices: ["c1", "c2", "c3", "c4"],
        answer: "c2"
    },
    {
        title: "q3",
        choices: "c1, c2, c3, c4",
        answer: "c2"
    },
    {
        title: "q4",
        choices: ["c1", "c2", "c3", "c4"],
        answer: "c2"
    },
    {
        title: "q5",
        choices: ["c1", "c2", "c3", "c4"],
        answer: "c2"
    }
]

var timeLeft = questionsArray.length* 15

var setIntervalId = 0;

function startQuiz(){
    IntroSectionEl.classList.add("hide")
    questionSectionEl.removeAttribute("class")
    setIntervalId = setInterval(CountDown, 1000)
    showQuestions()
}

function CountDown(){
    timerEl.textContent = timeLeft--
    if(timeLeft===0){
        clearInterval(setIntervalId)
    }
}

function showQuestions(){
    titleEl.textContent=questionsArray[questionIndex].title
    
    choicesEl[0].textContent=questionsArray[questionIndex].choices[0]

    choicesEl[1].textContent = questionsArray[questionIndex].choices[1]

    choicesEl[2].textContent = questionsArray[questionIndex].choices[2]

    choicesEl[3].textContent = questionsArray[questionIndex].choices[3]
}


function handleAnswer(event){
    console.log(event.target.textContent)
    console.log(questionsArray[questionIndex].answer)
    questionIndex++
    showQuestions()
    
}
for(var i = 0; i < choicesEl.length; i++){
    choicesEl[i].addEventListener("click", handleAnswer)
}

startBtn.addEventListener("click", startQuiz)