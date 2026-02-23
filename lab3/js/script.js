let q1choices = ["BMW", "Audi", "Ferrari", "Lamborghini"];
shuffleArray(q1choices);
shuffleQ1Choices();

function shuffleQ1Choices() {
    for (let i = 0; i < q1choices.length; i++) {
        let radioElement = document.createElement("input");
        radioElement.type = "radio";
        radioElement.name = "q1";
        radioElement.value = q1choices[i];
        radioElement.id = "q1Choice" + i;
        
        let labelElement = document.createElement("label");
        labelElement.setAttribute("for", "q1Choice" + i);
        labelElement.appendChild(radioElement);
        labelElement.appendChild(document.createTextNode(" " + q1choices[i]));
        
        document.querySelector("#q1ChoicesDiv").appendChild(labelElement);
    }
}

let q5choices = [
    {name: "BMW", correct: false},
    {name: "Audi", correct: false},
    {name: "Ferrari", correct: true},
    {name: "Lamborghini", correct: true}
];
shuffleArray(q5choices);

for (let i = 0; i < q5choices.length; i++) {
    let checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.value = q5choices[i].name;
    checkboxElement.id = "q5Choice" + i;
    checkboxElement.dataset.correct = q5choices[i].correct;
    
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", "q5Choice" + i);
    labelElement.appendChild(checkboxElement);
    labelElement.appendChild(document.createTextNode(" " + q5choices[i].name));
    
    document.querySelector("#q5ChoicesDiv").appendChild(labelElement);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

if (!localStorage.getItem("quizTaken")) {
    localStorage.setItem("quizTaken", "0");
}
document.getElementById("timesTaken").textContent = localStorage.getItem("quizTaken");

document.querySelector("button").addEventListener("click", gradeQuiz);

function gradeQuiz() {
    let q1userAnswer = document.querySelector("input[name=q1]:checked");
    let q2userAnswer = document.querySelector("#q2Choices").value;
    let q3userAnswer = document.querySelector("#q3Choices").value;
    let q4userAnswer = document.querySelector("#q4Choices").value;

    let q1Answer = "Lamborghini";
    let q2Answer = "Lamborghini";
    let q3Answer = "Lamborghini";
    let q4Answer = "1";

    let score = 0;

    if (q1userAnswer && q1userAnswer.value === q1Answer) {
        score += 20;
        showFeedback("q1Feedback", true);
    } else {
        showFeedback("q1Feedback", false);
    }

    if (q2userAnswer === q2Answer) {
        score += 20;
        showFeedback("q2Feedback", true);
    } else {
        showFeedback("q2Feedback", false);
    }

    if (q3userAnswer === q3Answer) {
        score += 20;
        showFeedback("q3Feedback", true);
    } else {
        showFeedback("q3Feedback", false);
    }

    if (q4userAnswer === q4Answer) {
        score += 20;
        showFeedback("q4Feedback", true);
    } else {
        showFeedback("q4Feedback", false);
    }

    let q5correct = true;
    let checkboxes = document.querySelectorAll("#q5ChoicesDiv input[type=checkbox]");
    checkboxes.forEach(function(cb) {
        let shouldBeChecked = cb.dataset.correct === "true";
        if (cb.checked !== shouldBeChecked) {
            q5correct = false;
        }
    });
    
    if (q5correct) {
        score += 20;
        showFeedback("q5Feedback", true);
    } else {
        showFeedback("q5Feedback", false);
    }

    let resultDiv = document.querySelector("#result");
    resultDiv.textContent = "Your score is: " + score + "/100";
    resultDiv.className = "show";

    if (score > 80) {
        let congratsDiv = document.querySelector("#congrats");
        congratsDiv.textContent = "🎉 Congratulations! Great job! 🎉";
        congratsDiv.className = "show";
    }

    let times = parseInt(localStorage.getItem("quizTaken")) + 1;
    localStorage.setItem("quizTaken", times.toString());
    document.getElementById("timesTaken").textContent = times;
}

function showFeedback(id, isCorrect) {
    let feedback = document.getElementById(id);
    let emoji = isCorrect ? "✓" : "✗";
    let text = isCorrect ? " Correct!" : " Incorrect!";
    
    feedback.innerHTML = "";
    feedback.appendChild(document.createTextNode(emoji + text));
    feedback.className = "feedback show " + (isCorrect ? "correct" : "incorrect");
}