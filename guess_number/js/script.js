document.querySelector("#guessBtn").addEventListener("click", checkGuess);

document.querySelector("#resetBtn").addEventListener("click", initializeGame);

let randomNumber;
let attempts = 0;
let winNumber = 0;
let lossNumber = 0;
let matchNumber = 0;

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
   attempts = 0;
   matchNumber++;
   document.querySelector("#resetBtn").style.display = "none";

   document.querySelector("#guessBtn").style.display = "inline";

   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.focus();
   playerGuess.value = "";

   let feedback = document.querySelector("#feedback");
   feedback.textContent = "";

   document.querySelector("#guessNumber").textContent = attempts;

   document.querySelector("#matches").textContent = matchNumber;

   document.querySelector("#guesses").textContent = "";
}

function checkGuess()
{
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    if(guess < 1 || guess > 99)
    {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }
    attempts++;
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";
    if(guess == randomNumber)
    {
        feedback.textContent = "You guessed the number ! You won !";
        feedback.style.color = "green";

        winNumber++;
        document.querySelector("#wins").textContent = winNumber;
        
        gameOver();
    }
    else
    {
        document.querySelector("#guesses").textContent += guess + " ";
        document.querySelector("#guessNumber").textContent = attempts;
        if(attempts == 7)
        {
            feedback.textContent = "Sorry, you ran out of attempts. You lost ! The number was " + "'" + randomNumber + "'.";
            feedback.style.color = "red";
            
            lossNumber++;
            document.querySelector("#losses").textContent = lossNumber;
            gameOver();
        }
        else if(guess > randomNumber)
        {
            feedback.textContent = "You guessed high. Try lower !";
        }
        else
        {
            feedback.textContent = "You guessed low. Try higher !";
        }
    }
}

function gameOver()
{
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";
    resetBtn.style.display  = "inline";
}