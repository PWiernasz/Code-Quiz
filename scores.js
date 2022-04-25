
//elements selected from the scores.html document and stored in variables
var scoreWrapperEl = document.querySelector("#score-wrapper");
var btnWrapperEl = document.querySelector("#button-wrapper");

//function loads scores from localStorage, sorts them by score and then displays the all to an ordered list
var loadScores = function () {

    var savedScores = localStorage.getItem("scores");
    
    //if there are no scores in localStorage, return false
    if (!savedScores){
        console.log ("No Scores Recorded");
        return false;
    }

    savedScores = JSON.parse(savedScores);

    //sort function sorts the array of objects by the value of the score attribute
    savedScores.sort(function(a, b) {return a.score - b.score});

    var scoreListOl = document.createElement("ol");
    scoreListOl.id = "score-ol";
    scoreWrapperEl.appendChild(scoreListOl);

    //the above sort function sorts the array in ascending order, since I want the score in decending order
    //I am looping through the array in reverse
    for (var i = savedScores.length-1; i > 0; i--) {
        var scoreListItem = document.createElement("li");
        scoreListItem.className = "score-li";
        console.log("attempting to display array index " + savedScores[i]);
        scoreListItem.innerHTML = savedScores[i].initials + " - " + savedScores[i].score;
        scoreListOl.appendChild(scoreListItem);
    }

return true;
}

//call the loadScores function, catch the value returned in scoresLoaded
//if scoresLoaded is false (no scores loaded) display the emptyScoresEL message
var scoresLoaded = loadScores();
if (scoresLoaded === false){
    var emptyScoresEl = document.createElement("h2");
    emptyScoresEl.id = "empty-score-msg";
    emptyScoresEl.textContent = "No Scores Recorded";
    scoreWrapperEl.appendChild(emptyScoresEl);
}

//create the return button
var returnBtnEl = document.createElement("button");
returnBtnEl.id = "return-button";
returnBtnEl.className = "btn";
returnBtnEl.textContent = "Go Back";
btnWrapperEl.appendChild(returnBtnEl);

//create the clear scores button
var clearBtnEl = document.createElement("button");
clearBtnEl.id = "clear-scores";
clearBtnEl.className = "btn";
clearBtnEl.textContent = "Clear Scores";
btnWrapperEl.appendChild(clearBtnEl);

//this function will return the user to index.html when the go back button is pressed
var goBack = function () {
    window.location.href = "./index.html";
}

//this function cleares the localStorage and reloads the scores page to display the 
//no scores message
var clearScores = function () {
    localStorage.clear();
    location.reload()
}

//event listeners for the buttons
returnBtnEl.addEventListener("click", goBack);
clearBtnEl.addEventListener("click", clearScores);