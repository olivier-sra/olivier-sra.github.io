document.querySelector("button").addEventListener("click", gradeQuiz);
let q1choices = ["BMW", "Audi", "Ferrari", "Lamborghini"];

shuffleQ1Choices();
function shuffleQ1Choices() {
    for (let i of q1choices) {
        
        let radioElement = document.createElement("input");
        radioElement.type = "radio";
        radioElement.name = "q1";
        radioElement.value = i;
        
        let labelElement = document.createElement("label");
        labelElement.textContent = i;
        
        labelElement.prepend(radioElement);
        labelElement.prepend(" ");
        
        document.querySelector("#q1ChoicesDiv").append(labelElement);
    }
}

function gradeQuiz() {

    let q1userAnswer = document.querySelector("input[name=q1]:checked").value;
    let q2userAnswer = document.querySelector("#q2Choices").value;
    let q3userAnswer = document.querySelector("#q3Choices").value;
    let q4userAnswer = document.querySelector("#q4Choices").value;

    let q1Answer = "BMW";
    let q2Answer = "Lamborghini";
    let q3Answer = "Lamborghini";
    let q4Answer = "Audi";
    let q5Answer = [false, false, true, true];

    let score = 0;

    if (q1userAnswer === q1Answer) {
        score += 20;
        document.querySelector("#q1").style.color = "green";
    }
    else {
        document.querySelector("#q1").style.color = "red";
    }

    if (q2userAnswer === q2Answer) {
        score += 20;
        document.querySelector("#q2").style.color = "green";
    }
    else {
        document.querySelector("#q2").style.color = "red";
    }

    if (q3userAnswer === q3Answer) {
        score += 20;
        document.querySelector("#q3").style.color = "green";
    }
    else {
        document.querySelector("#q3").style.color = "red";
    }

    if (q4userAnswer === q4Answer) {
        score += 20;
        document.querySelector("#q4").style.color = "green";
    }
    else {
        document.querySelector("#q4").style.color = "red";
    }

    let q5userAnswer = [document.querySelector("#q5Choice1").checked,
                        document.querySelector("#q5Choice2").checked,
                        document.querySelector("#q5Choice3").checked,
                        document.querySelector("#q5Choice4").checked];
    
    if (q5userAnswer === q5Answer) {
        score += 20;
        document.querySelector("#q5").style.color = "green";
    }
    else {
        document.querySelector("#q5").style.color = "red";
    }

    document.querySelector("#result").textContent = "Your score is: " + score;
    alert("Your score is: " + score);

}