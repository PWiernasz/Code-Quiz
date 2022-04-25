//global variables
var scoreTimer = 75; //sets the initial value of the timer
var currentQuestionIndex = 0; //sets the initial question
var timeInterval = 0; //used for the countdown timer
var headerWrapperEl = document.querySelector("#header-wrapper");
var mainEl = document.querySelector("#main");
var questionWrapperEl = document.querySelector("#question-wrapper");

//create an array of questions and answers
var questionArray = [
    {
        text: "Which of the following function of String object combines the text of two strings and returns a new string?",
        choice1: "add( )",
        choice2: "concat( )",
        choice3: "merge( )",
        choice4: "append( )",
        answer: "2"
    },
    {
        text: "Commonly used data types DO NOT include:",
        choice1: "strings",
        choice2: "booleans",
        choice3: "alerts",
        choice4: "numbers",
        answer: "3"
    },
    {
        text: "What operator is used to compare a value or variable?",
        choice1: "=",
        choice2: "===",
        choice3: "#",
        choice4: "<<",
        answer: "2"
    },
    {
        text: '"Arrays in Javascript can be used to store?',
        choice1: "numbers and strings",
        choice2: "arrays",
        choice3: "booleans",
        choice4: "all of the above",
        answer: "4"
    },
    {
        text: "What operator is the AND operator?",
        choice1: "+",
        choice2: "&",
        choice3: "&&",
        choice4: "||",
        answer: "3"
    },
    {
        text: "What type of event occurs when an HTML element is clicked on?",
        choice1: "onchange",
        choice2: "onmouseclick",
        choice3: "onmouseover",
        choice4: "onclick",
        answer: "4"
    },
    {
        text: "String values must be enclosed within ____ when being assigned to variables.",
        choice1: "commas",
        choice2: "curly brackets",
        choice3: "quotes",
        choice4: "parenthesis",
        answer: "3"
    },
    {
        text: "Which of the following function of an array object adds and/or removes elements from an array?",
        choice1: "toSource( )",
        choice2: "sort( )",
        choice3: "unshift( )",
        choice4: "splice( )",
        answer: "4"
    },
    {
        text: "What Operator is used to assign a value to a variable",
        choice1: "=",
        choice2: "===",
        choice3: "#",
        choice4: "<<",
        answer: "1"
    },
];

//dynamically create the view high scores link and timer in the header section
var highScoreLinkEl = document.createElement("a");
highScoreLinkEl.href = "./scores.html";
highScoreLinkEl.innerHTML = "View High Scores";
headerWrapperEl.appendChild(highScoreLinkEl);

var timerEl = document.createElement("p");
timerEl.textContent = "Time: " + scoreTimer;
headerWrapperEl.appendChild(timerEl);

//create the quiz title. The element the title is written to in the HTML will also server as where the questions will go
var questionTextEl = document.createElement("h2");
questionTextEl.textContent = "Coding Quiz Challenge";
questionWrapperEl.appendChild(questionTextEl);

//create the quiz instructions. These will be removed once the start button is clicked.
var instructionsEl = document.createElement("p");
instructionsEl.innerHTML = "Try to answer the following code-related questions within the time limit.<br> Keep in mind that incorrect answers will penalize your score/time by 10 seconds."
instructionsEl.id = "instructions";
questionWrapperEl.appendChild(instructionsEl);

//the button wrapper is needed to get the style the start button correctly
var startBtnWrapperEl = document.createElement("div");
startBtnWrapperEl.id = "startBtn-wrapper";

//the start button calls initializeQuiz function when clicked, it is removed once the quiz starts
var startBtnEl = document.createElement("button");
startBtnEl.className = "btn";
startBtnEl.id = "startBtn";
startBtnEl.innerHTML = "Start Quiz";
startBtnWrapperEl.appendChild(startBtnEl);
questionWrapperEl.appendChild(startBtnWrapperEl);


//this function prepares the quiz for running by removing the unneeded start button and instructions and loading the first question
var initializeQuiz = function () {
    questionWrapperEl.removeChild(instructionsEl);
    questionWrapperEl.removeChild(startBtnWrapperEl);

    questionTextEl.textContent = questionArray[currentQuestionIndex].text;

    var choiceOlEl = document.createElement("ol");
    choiceOlEl.id = "choice-ol";
    questionWrapperEl.appendChild(choiceOlEl);

    //sets the values for the question answer choices
    var choice1El = document.createElement("li");
    choice1El.setAttribute("choice-number", "1");
    choice1El.id = "choice1";
    choice1El.className = "choice";
    choice1El.textContent = questionArray[currentQuestionIndex].choice1;
    choiceOlEl.appendChild(choice1El);

    var choice2El = document.createElement("li");
    choice2El.setAttribute("choice-number", "2");
    choice2El.id = "choice2";
    choice2El.className = "choice";
    choice2El.textContent = questionArray[currentQuestionIndex].choice2;
    choiceOlEl.appendChild(choice2El);

    var choice3El = document.createElement("li");
    choice3El.setAttribute("choice-number", "3");
    choice3El.id = "choice3";
    choice3El.className = "choice";
    choice3El.textContent = questionArray[currentQuestionIndex].choice3;
    choiceOlEl.appendChild(choice3El);

    var choice4El = document.createElement("li");
    choice4El.setAttribute("choice-number", "4");
    choice4El.id = "choice4";
    choice4El.className = "choice";
    choice4El.textContent = questionArray[currentQuestionIndex].choice4;
    choiceOlEl.appendChild(choice4El);

    //create elements to show if correct or wrong when answer is selected
    var feedbackWrapperEl = document.createElement("div");
    feedbackWrapperEl.id = "feedback-wrapper";
    questionWrapperEl.appendChild(feedbackWrapperEl);
    var feedbackDividerEl = document.createElement("hr");
    feedbackWrapperEl.appendChild(feedbackDividerEl);
    var feedbackMsgEl = document.createElement("h3");
    feedbackMsgEl.id = "feedback-message";
    feedbackWrapperEl.appendChild(feedbackMsgEl);

    //call the function that starts the timer
    scoreTimerCountdown();
}

//this function is called when an answer choice is clicked on. it determines which choice was clicked on, displays whether or not
//the selected answer was correct or wrong, deducts the time penalty if wrong, replaces the question and choices with the next question,
//and if the quiz is over it will determine if the submit button is clicked when the player enters their initials.
var nextQuestion = function(event) {
    
    var targetEl = event.target;
    var answer = targetEl.getAttribute("choice-number");
    
    //only run the inside code if answer is not null
    if (answer){
        //get the element that will display correct or wrong once the answer is checked
        var feedbackMsgEl = document.querySelector("#feedback-message");
        if (answer===questionArray[currentQuestionIndex].answer){
            //console.log ("You are correct!");
            feedbackMsgEl.textContent = "Correct";
            currentQuestionIndex++;
        }
        else {
            //console.log ("You are wrong");
            scoreTimer = Math.max(0, scoreTimer-10);
            feedbackMsgEl.textContent = "Wrong";
            currentQuestionIndex++;
        }
    }

    //checks if we have reached the end of the quiz and that we have a valid answer
    if (currentQuestionIndex < questionArray.length){
        //update the question and all of the choices
        questionTextEl.textContent = questionArray[currentQuestionIndex].text;
        var choice1El = document.querySelector("#choice1");
        choice1El.textContent = questionArray[currentQuestionIndex].choice1;
        var choice2El = document.querySelector("#choice2");
        choice2El.textContent = questionArray[currentQuestionIndex].choice2;
        var choice3El = document.querySelector("#choice3");
        choice3El.textContent = questionArray[currentQuestionIndex].choice3;
        var choice4El = document.querySelector("#choice4");
        choice4El.textContent = questionArray[currentQuestionIndex].choice4;
    }
    
    if (targetEl.id === "initials-button") {
        submitInitials(event);
    }
}

//this function sets the countdown timer
var scoreTimerCountdown = function() {

    timeInterval = setInterval(function() {
        timerEl.textContent = "Time: " + scoreTimer;

        if (scoreTimer > 0) {
            scoreTimer--;
        }
        else if (scoreTimer === 0) {
            quizOver();
        }
        
        //the other condition for ending the quiz is if all of the questions have been answered
        if (currentQuestionIndex >= questionArray.length){
            quizOver();
        }
    }, 1000);
}

//this function is called once the quiz is over. it stops the timer from running, removes the answer choices, displays the final score,
//displays the form proompting the user to enter their initials
var quizOver = function () {
    
    clearInterval(timeInterval);

    //clears away the unnecessary information to prepare for the initials form being displayed
    var feedbackMsgEl = document.querySelector("#feedback-message");
    feedbackMsgEl.textContent = "";

    var choiceOlEl = document.querySelector("#choice-ol");
    questionWrapperEl.removeChild(choiceOlEl);
    timerEl.textContent = "Time: " + scoreTimer;
    questionTextEl.innerHTML = "All Done! <br> Your Final Score is: " + scoreTimer;

    //create the form and the submit button
    var initialFormEl = document.createElement("form");
    initialFormEl.id = "initials-form";
    questionWrapperEl.appendChild(initialFormEl);

    var inputWrapperEl = document.createElement("div");
    inputWrapperEl.id = "input-wrapper";
    initialFormEl.appendChild(inputWrapperEl);

    var initialLabelEl = document.createElement("label");
    initialLabelEl.form = "initials";
    initialLabelEl.id = "initials-label";
    initialLabelEl.textContent = "Enter Initials";
    inputWrapperEl.appendChild(initialLabelEl);

    var initialTextEl = document.createElement("input");
    initialTextEl.type = "text";
    initialTextEl.id = "initials";
    initialTextEl.name = "initials";
    inputWrapperEl.appendChild(initialTextEl);

    var initialBtnEl = document.createElement("buton");
    initialBtnEl.className = "btn";
    initialBtnEl.id = "initials-button";
    initialBtnEl.textContent = "Submit";
    initialBtnEl.setAttribute("button-id", "initials-submit");
    initialFormEl.appendChild(initialBtnEl);   
}

//this function is called by the event listeners when either the submit buton is clicked, or when the initals are entered and the enter/return key is pressed
var submitInitials = function (event) {
    event.preventDefault();
    var initials = document.querySelector("#initials").value;
    var newScore = {initials: initials, score: scoreTimer};
    
    var savedScores = localStorage.getItem("scores");
    //if no scores exist, i create an empty, dummy score so the JSON.parse function can run even if no scores have been previously saved
    if (!savedScores){
        savedScores = [{initials: "", score: ""}];
        savedScores = JSON.stringify(savedScores);
    }
    //add the new initials/score to the end of the savedScores array and then save them back to localStorage
    //actually sorting the scores is handled by the scores.js script
    savedScores = JSON.parse(savedScores);
    savedScores.push(newScore);
    localStorage.setItem("scores", JSON.stringify(savedScores));

    //direct the user to the high scores page
    window.location.href = "./scores.html";
}

//this function clears the correct or wrong feedback that is displayed when the user selects an answer
//this function is called when the cursor moves over one of the next question's answer choices
var clearFeedback = function (event) {
    var targetEl = event.target;
    var answer = targetEl.getAttribute("choice-number");
    //if answer exists, i.e. if there is a correct or wrong feedback message currently displayed, replace the text with "" to effectively
    //remove the string
    if (answer) {
        var feedbackMsgEl = document.querySelector("#feedback-message");
        feedbackMsgEl.textContent = "";
    }
}

//event listeners
startBtnEl.addEventListener("click", initializeQuiz);
questionWrapperEl.addEventListener("click",nextQuestion);
questionWrapperEl.addEventListener("submit",submitInitials);
questionWrapperEl.addEventListener("mouseover", clearFeedback); 