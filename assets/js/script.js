var startBtn = document.getElementById("start-btn")
var IntroSectionEl = document.getElementById("intro-section")
var timerEl = document.getElementById("timer")
var questionSectionEl = document.getElementById("question-section")
var titleEl = document.getElementById("title")
var choicesEl = document.querySelectorAll(".choices")
var saveBtn = document.getElementById("save-btn");

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
        choices: ["c1", "c2", "c3", "c4"],
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

function CountDown() {
    timerEl.textContent = timeLeft--;

    if (timeLeft < 0) {
        clearInterval(setIntervalId);

        // Hide the question section
        questionSectionEl.classList.add("hide");

        // Show the next section
        var initialSectionEl = document.getElementById("initial-section");
        initialSectionEl.classList.remove("hide");
    }
}

function showQuestions(){
    titleEl.textContent=questionsArray[questionIndex].title
    
    choicesEl[0].textContent=questionsArray[questionIndex].choices[0]

    choicesEl[1].textContent = questionsArray[questionIndex].choices[1]

    choicesEl[2].textContent = questionsArray[questionIndex].choices[2]

    choicesEl[3].textContent = questionsArray[questionIndex].choices[3]
}


function nextQuestion(event){
    var currentElement = event.target;
    if (currentElement.matches("button")) {
        var selectedChoice = currentElement.textContent;
        var correctAnswer = questionsArray[questionIndex].answer;

        if (selectedChoice === correctAnswer) {
            // User selected the correct answer
            questionIndex++;

            // Remove the "Wrong!" message if it exists
            var wrongMessage = document.querySelector(".wrong-message");
            if (wrongMessage) {
                wrongMessage.remove();
            }

            if (questionIndex < questionsArray.length) {
                // Display the next question
                showQuestions();
            } else {
                // All questions have been answered
                clearInterval(setIntervalId);

                // Hide the question section
                questionSectionEl.classList.add("hide");

                // Show the next section
                var initialSectionEl = document.getElementById("initial-section");
                initialSectionEl.classList.remove("hide");
            }
        } else {
            // User selected the wrong answer
            // Display a "Wrong!" message
            var wrongMessage = document.createElement("p");
            wrongMessage.textContent = "Wrong!";
            wrongMessage.classList.add("wrong-message");
            questionSectionEl.appendChild(wrongMessage);

            // Deduct 15 seconds from the timer
            timeLeft -= 15;
            if (timeLeft < 0) {
                timeLeft = 0;
            }

            // Update the timer display immediately
            timerEl.textContent = timeLeft;

        }
    }
}



function saveInformation() {
    var userInput = document.getElementById("initial-input").value;
    var timerScore = timeLeft;
  
    // Store the saved information (initials and timer score) in variables or data structures
    var savedInitials = userInput;
    var savedScore = timerScore;
  
    // Hide the initial section
    var initialSectionEl = document.getElementById("initial-section");
    initialSectionEl.classList.add("hide");
  
    // Show the highscore section
    var highscoreSectionEl = document.getElementById("highscore-section");
    highscoreSectionEl.classList.remove("hide");
  
    // Display the saved initials and timer score
    var initialsScoreTextbox = document.getElementById("saved-initials-score");
    initialsScoreTextbox.value = savedInitials + " - " + savedScore;
}

function clearHighScores() {
    var initialsScoreTextbox = document.getElementById("saved-initials-score");
    initialsScoreTextbox.value = "";
}
  
  function goBack() {
    location.reload();
}  

startBtn.addEventListener("click", startQuiz)
questionSectionEl.addEventListener("click", nextQuestion)
saveBtn.addEventListener("click", saveInformation);
document.getElementById("clear-btn").addEventListener("click", clearHighScores);
document.getElementById("go-back-btn").addEventListener("click", goBack);