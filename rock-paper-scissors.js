//Represent int options, outcomes, and win rules as const variables
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
const WinRules = {
    BestOf: 0,
    TotalPoints: 1,
}
Object.freeze(Options);
Object.freeze(Outcomes);
Object.freeze(WinRules);

//Create const lists to convert selection values to names and back
const optionNames = ["Rock", "Paper", "Scissors"];
const optionNameUpperToSelection = {};
for (let i = 0; i < 3; i++) {
    optionNameUpperToSelection[optionNames[i].toUpperCase()] = i;
}
Object.freeze(optionNameUpperToSelection);

//Set const game settings and initialize global score card
const COUNT = 5;
const WIN_RULE = WinRules.TotalPoints;
let globalScoreCard = [0,0,0];

//Generate random number from 0-2 representing computer choice
function computerPlay() {
    return Math.floor(3*Math.random());
}

//Determine round outcome of player vs computer
function playRound(playerSelection, computerSelection=computerPlay()) {
    if (playerSelection == computerSelection)
        return Outcomes.Tie;
    if ((playerSelection == Options.Rock && computerSelection == Options.Paper)
     || (playerSelection == Options.Paper && computerSelection == Options.Scissors)
     || (playerSelection == Options.Scissors && computerSelection == Options.Rock))
        return Outcomes.Lose;
    return Outcomes.Win;
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

//Read score card
function readScoreCard(scoreCard=globalScoreCard) {
    let [playerScore, computerScore, tieScore] = scoreCard;
    return `Score: ${playerScore}-${computerScore}-${tieScore}`;
}

//Generate game winner message
function readGameWinner(scoreCard=globalScoreCard) {
    let [playerScore, computerScore,] = scoreCard;
    if (playerScore > computerScore)
        result = `You Win!`;
    else if (playerScore < computerScore)
        result = `You Lose!`;
    else
        result = `It's a tie!`;
    return result + ` ` + readScoreCard();
}

//Evaluate whether game is over
function hasEnded(scoreCard=globalScoreCard, count=COUNT, winRule=WIN_RULE) {
    if (winRule == WinRules.BestOf)
        return Math.abs(scoreCard[Outcomes.Win] - scoreCard[Outcomes.Lose]) > count / 2;
    if (winRule == WinRules.TotalPoints)
        return scoreCard[Outcomes.Win] >= count || scoreCard[Outcomes.Lose] >= count;
}

//Reset score card
function resetScoreCard(scoreCard=globalScoreCard) {
    for (let i = 0; i < 3; i++)
        scoreCard[i] = 0;
}

//Reset score card if player or opponent has enough points
function checkReset() {
    if (hasEnded()) {
        gameOutput.textContent = readGameWinner();
        resetScoreCard();
    }
}

//Play round using button input as player selection
function buttonPlayRound(playerChoice) {
    gameOutput.textContent = ``;
    let playerSelection = optionNameUpperToSelection[playerChoice.toUpperCase()];
    let computerSelection = computerPlay();
    let outcome = playRound(playerSelection, computerSelection);
    roundOutput.textContent = readRoundWinner(outcome, optionNames[playerSelection], optionNames[computerSelection]);
    globalScoreCard[outcome]++;
    gameOutput.textContent = readScoreCard();
    checkReset();
}

//Create variables for HTML I/O
const buttons = document.querySelectorAll('button.selection');
buttons.forEach((button) => {
    button.classList.add();
    button.addEventListener('click', () => {
        buttonPlayRound(button.textContent);
    })
})
const roundOutput = document.querySelector('.round-output');
const gameOutput = document.querySelector('.game-output');