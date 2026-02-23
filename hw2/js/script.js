let playerBalance = 100;
let wins = 0;
let losses = 0;
let ties = 0;
let gameHistory = [];

const diceImages = [
    'img/dice-six-faces-one.png',
    'img/dice-six-faces-two.png',
    'img/dice-six-faces-three.png',
    'img/dice-six-faces-four.png',
    'img/dice-six-faces-five.png',
    'img/dice-six-faces-six.png',
];

const rollButton = document.querySelector('#rollButton');
const resetButton = document.querySelector('#resetButton');
const betAmountInput = document.querySelector('#betAmount');
const playerBalanceElement = document.querySelector('#playerBalance');
const playerDice = document.querySelector('#playerDice');
const computerDice = document.querySelector('#computerDice');
const resultMessage = document.querySelector('#resultMessage');
const winsElement = document.querySelector('#wins');
const lossesElement = document.querySelector('#losses');
const tiesElement = document.querySelector('#ties');
const historyList = document.querySelector('#historyList');

rollButton.addEventListener('click', playGame);

resetButton.addEventListener('click', resetGame);

betAmountInput.addEventListener('input', validateBetAmount);

function validateBetAmount() {
    const betAmount = parseInt(betAmountInput.value);
    
    if (betAmount < 1) {
        betAmountInput.value = 1;
    } else if (betAmount > playerBalance) {
        betAmountInput.value = playerBalance;
    }
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function displayDiceImage(container, diceValue) {
    container.innerHTML = '';
    const img = document.createElement('img');
    img.src = diceImages[diceValue - 1];
    container.appendChild(img);
}

function animateWin(dice) {
    dice.animate(
        [
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(20deg)' },
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(-20deg)' },
            { transform: 'rotate(0deg)' }
        ],
        {
            duration: 600,
            iterations: 2,
            easing: 'ease-in-out'
        }
    );
}

async function playGame() {
    const betAmount = parseInt(betAmountInput.value);
    
    rollButton.disabled = true;
    
    const playerRoll = rollDice();
    const computerRoll = rollDice();
    
    displayDiceImage(playerDice, playerRoll);
    displayDiceImage(computerDice, computerRoll);
    
    let result = '';
    let resultClass = '';
    
    if (playerRoll > computerRoll) {
        playerBalance += betAmount;
        wins++;
        result = `You Win! +$` + betAmount;
        resultClass = 'win';
        await animateWin(playerDice);
    } else if (playerRoll < computerRoll) {
        playerBalance -= betAmount;
        losses++;
        result = `You Lose! -$` + betAmount;
        resultClass = 'lose';
        await animateWin(computerDice);
    } else {
        ties++;
        result = `It's a Tie! No change`;
        resultClass = 'tie';
    }

    resultMessage.textContent = result;
    resultMessage.className = resultClass;
    
    playerBalanceElement.textContent = playerBalance;
    winsElement.textContent = wins;
    lossesElement.textContent = losses;
    tiesElement.textContent = ties;
    
    addToHistory(playerRoll, computerRoll, betAmount, resultClass);
    
    if (playerBalance <= 0) {
        alert('Game Over! You ran out of money. Resetting game...');
        resetGame();
    }
    
    rollButton.disabled = false;
}

function addToHistory(playerRoll, computerRoll, betAmount, result) {
    const historyItem = {
        playerRoll: playerRoll,
        computerRoll: computerRoll,
        betAmount: betAmount,
        result: result
    };
    
    gameHistory.unshift(historyItem);
    
    if (gameHistory.length > 10) {
        gameHistory.pop();
    }
    
    historyList.innerHTML = '';
    for (const item of gameHistory) {
        const historyDiv = document.createElement('div');
        historyDiv.className = `history-item ${item.result}`;
        
        let resultText = '';
        if (item.result === 'win') {
            resultText = `Won $${item.betAmount}`;
        } else if (item.result === 'lose') {
            resultText = `Lost $${item.betAmount}`;
        } else {
            resultText = 'Tied';
        }
        
        historyDiv.textContent = `You: ${item.playerRoll} vs Computer: ${item.computerRoll} - ${resultText}`;
        historyList.appendChild(historyDiv);
    }
}

function resetGame() {
    playerBalance = 100;
    wins = 0;
    losses = 0;
    ties = 0;
    gameHistory = [];
    
    playerBalanceElement.textContent = playerBalance;
    winsElement.textContent = wins;
    lossesElement.textContent = losses;
    tiesElement.textContent = ties;
    
    playerDice.innerHTML = '<div class="dice-placeholder">?</div>';
    computerDice.innerHTML = '<div class="dice-placeholder">?</div>';
    
    resultMessage.textContent = '';
    resultMessage.className = '';
    
    historyList.innerHTML = '<p class="no-history">No games played yet</p>';
    
    betAmountInput.value = 10;
    betAmountInput.max = playerBalance;
}

validateBetAmount();