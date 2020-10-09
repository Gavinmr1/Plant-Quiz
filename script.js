//variables 
var score = 0;
var currentQuestion = -1;
var timeRemain = 0;
var timer;

//starts timer when 'start' button is clicked
function start() {
    timeRemain = 75;
    document.getElementById("timeRemain").innerHTML = timeRemain;

    timer = setInterval(function() {
        timeRemain--;
        document.getElementById("timeRemain").innerHTML = timeRemain;
        //if timer is below 0 then end quiz
        if (timeRemain <= 0) {
            clearInterval(timer);
            endQuiz(); 
        }
    }, 1000);
    next();
}

//stop timer and end quiz 
function endQuiz() {
    clearInterval(timer);

    var quizContent = `
     <div id="container">
        <row><div id="end">Time is up!</div></row>
        <row><div id="score">You got a ` + score +  ` /100! </div></row>
        <row><div id="total">You got ` + score / 20 +  ` correct!</div></row>
        <row><input type="text" id="name" placeholder="Initials"> 
        <button onclick="setHighScore()">Enter your score!</button></row>`;
     document.getElementById("home").innerHTML = quizContent;
}

//store the scores in local storage
function setHighScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}

//clears local storage score and name
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName", "");
    resetQuiz();
}
//display score and name
function getScore() {
    var quizContent = (`
    <div id="container">
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is: ` + localStorage.getItem("highscore") + `</h2>
    <row><button onclick="clearScore()">Clear Score!</button>
    <button onclick="resetQuiz()"> Play Again!</button></row>
    `);
document.getElementById("home").innerHTML = quizContent;
}
//return to home page
var goHome = `
<div class="container" id="home">
        <div id="home" class="flex-column flex-center">
            <h1>Plant Quiz!</h1>
            <h3 id="timeRemain">Time: <span>0</span></h3> 
            <a onclick="start()" href="#" class="btn">Start<i class="fab fa-pagelines"></i></a>
            <a onclick="getScore()" href="#" id="highscore-btn" class="btn">High Score<i class="fas fa-crown"></i></a>
        </div>
    </div>`;
//reset the quiz 
function resetQuiz() {
    clearInterval(timer);
    timeRemain = 0;
    timer = null;
    score = 0;
    currentQuestion = -1;
    document.getElementById("timeRemain").innerHTML = timeRemain;
    document.getElementById("home").innerHTML = goHome;
}

//-15 seconds if answer is incorrect
function incorrect() {
    timeRemain -= 15; 
    next();
}
//+15 points if answer is correct
function correct() {
    score += 20;
    next();
}
//questions loop
function next() {
    currentQuestion++;
    if (currentQuestion > questions.length - 1) {
        endQuiz();
        return;
    }
    var quizContent = "<h3>" + questions[currentQuestion].title + "</h3>"
    "<h4>" + questions[currentQuestion].answer + "</h4>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\'[ANS]\'>[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }
        document.getElementById("home").innerHTML = quizContent;
}
//quiz question
var questions = [{
    title: "How can you tell how old a tree is?",
    choices: ["Counting the number of branches", "Measuring the height", "Counting the number of rings in its trunk", "Measuring how large the leaves are"],
    answer: "Counting the number of rings in its trunk"
},
{
    title: "What does is mean if a plant is a perennial?",
    choices: ["It will die in the winter", "It will grow and survive year to year", "It only polinates in the winter", "It doesn't seed through the year"],
    answer: "It will grow and survive year to year"
},
{
    title: "What is the process called by which a plant makes its own food?",
    choices: ["Chemosynthesis", "Fermentation", "Metabolism", "Photosynthesis"],
    answer: "Photosynthesis"
},
{
    title: "How do seedless plants reproduce?",
    choices: ["Roots", "Spores", "Leaves", "Flowers"],
    answer: "Spores"
},
{
    title: "The wind plays an integral part in spreading the seeds of which plant?",
    choices: ["Dandelion", "Dracena", "Tulip", "Crab grass"],
    answer: "Dandelion"
}];