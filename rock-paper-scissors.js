//Represent int options and outcomes as const variables
const Options = {
    Rock: 0,
    Paper: 1,
    Scissors: 2
}
const Outcomes = {
    Win: 0,
    Lose: 1,
    Tie: 2
}
Object.freeze(Options);
Object.freeze(Outcomes);
const optionNames = ["Rock", "Paper", "Scissors"];
let optionNameUpperToId = {};
for (let i = 0; i < 3; i++) {
    optionNameUpperToId[optionNames[i].toUpperCase()] = i;
}
Object.freeze(optionNameUpperToId);
const COUNT = 5;
let globalScoreCard = [0,0,0];

//Reset score card
function resetScoreCard(scoreCard) {
    for (let i = 0; i < 3; i++)
        scoreCard[i] = 0;
}

//Reset score card if player or opponent has enough points
function checkReset() {
    if (globalScoreCard[Outcomes.Win] >= COUNT || globalScoreCard[Outcomes.Lose] >= COUNT) {
        gameOutput.textContent = readGameWinner(globalScoreCard);
        resetScoreCard(globalScoreCard);
    }
}

//Generate random number from 0-2 representing computer choice
function computerPlay() {
    return Math.floor(3*Math.random());
}

//Get player choice input from prompt
function promptPlay() {
    while (true) {
        let selection = prompt("Type 'Rock', 'Paper', or 'Scissors'");
        if (!selection)
            throw new Error("Cancelled game");
        selection = selection.toUpperCase();
        let selectedOption = optionNameUpperToId[selection];
        if (typeof selectedOption != 'undefined')
            return selectedOption;
        roundOutput.textContent = `Invalid selection: ${selectedOption}`;
    }
}

//Determine round outcome of player vs computer
function playRound(playerSelection, computerSelection) {
    if (playerSelection == computerSelection)
        return Outcomes.Tie;
    if ((playerSelection == Options.Rock && computerSelection == Options.Paper)
     || (playerSelection == Options.Paper && computerSelection == Options.Scissors)
     || (playerSelection == Options.Scissors && computerSelection == Options.Rock))
        return Outcomes.Lose;
    return Outcomes.Win;
}

//Play round using button input as player selection
function buttonPlayRound(playerSelectionName) {
    gameOutput.textContent = ``;
    let playerSelection = optionNameUpperToId[playerSelectionName.toUpperCase()];
    let computerSelection = computerPlay();
    let outcome = playRound(playerSelection, computerSelection);
    roundOutput.textContent = readRoundWinner(outcome, optionNames[playerSelection], optionNames[computerSelection]);
    globalScoreCard[outcome]++;
    gameOutput.textContent = readScoreCard(globalScoreCard);
    checkReset();
}

//Generate round winner message
function readRoundWinner(outcome, playerChoice, computerChoice) {
    switch(outcome) {
        case Outcomes.Win:
            return `You Win! ${playerChoice} beats ${computerChoice}`;
        case Outcomes.Lose:
            return `You Lose! ${computerChoice} beats ${playerChoice}`;
        case Outcomes.Tie:
            return "It's a tie!";
    }
}

function hasEnded(scoreCard, count) {
    return Math.abs(scoreCard[Outcomes.Win] - scoreCard[Outcomes.Lose]) > count / 2;
}

//Play player vs computer games using prompts and fill in score card
function game(scoreCard, count) {
    let gameCountMsg = ``;
    if (count > 1)
        gameCountMsg = `best of ${count} `;
    roundOutput.textContent = `Welcome to a ${gameCountMsg}game of Rock Paper Scissors!`;
    for (let i = 0; i < 3; i++)
        scoreCard[i] = 0;
    for (let i = 0; i < count && !hasEnded(scoreCard); i++) {
        let playerSelection = promptPlay();
        let computerSelection = computerPlay();
        let outcome = playRound(playerSelection, computerSelection);
        roundOutput.textContent = readRoundWinner(outcome, optionNames[playerSelection], optionNames[computerSelection]);
        scoreCard[outcome]++;
    }
    return scoreCard;
}

function readScoreCard(scoreCard) {
    let [playerScore, computerScore, tieScore] = scoreCard;
    return `Score: ${playerScore}-${computerScore}-${tieScore}`;
}

//Generate game winner message
function readGameWinner(scoreCard) {
    let [playerScore, computerScore, tieScore] = scoreCard;
    if (playerScore > computerScore)
        result = `You Win!`;
    else if (playerScore < computerScore)
        result = `You Lose!`;
    else
        result = `It's a tie!`;
    return result + ` ` + readScoreCard(scoreCard);
}

//Show single-round game results
function playAndPrintGame() {
    playAndPrintGame(1);
}

//Show multiple-round game results
function playAndPrintGame(count) {
    gameOutput.textContent = readGameWinner(game(new Array(3), count));
}

const buttons = document.querySelectorAll('.selection');
buttons.forEach((button) => {
    button.classList.add();
    button.addEventListener('click', () => {
        buttonPlayRound(button.textContent);
    })
})
const promptPlayButton = document.querySelector('.prompt-play');
promptPlayButton.addEventListener('click', () => {
    playAndPrintGame(COUNT);
});
const gameOutput = document.querySelector('.round-output');
const roundOutput = document.querySelector('.game-output');
/*gameOutput.addEventListener('error', () => {
    gameOutput.textContent = console.error();
});*/