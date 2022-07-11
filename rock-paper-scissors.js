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

playAndPrintGame();

//Generate random number from 0-2 representing computer choice
function computerPlay() {
    return Math.floor(3*Math.random());
}

//Get player choice input
function playerPlay() {
    while (true) {
        let selection = prompt("Type 'Rock', 'Paper', or 'Scissors'");
        if (!selection) 
            throw new Error("Cancelled game");
        selection = selection.toUpperCase();
        for (let i = 0; i < 3; i++) {
            if (selection == optionNames[i].toUpperCase())
                return i;
        }
        console.log("Invalid selection");
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

//Play 5 player vs computer games and fill in score card
function game(scoreCard) {
    console.log("Welcome to a best of 5 game of Rock Paper Scissors!");
    for (let i = 0; i < 3; i++)
        scoreCard[i] = 0;
    for (let i = 0; i < 5; i++) {
        let playerSelection = playerPlay();
        let computerSelection = computerPlay();
        let outcome = playRound(playerSelection, computerSelection);
        console.log(readRoundWinner(outcome, optionNames[playerSelection], optionNames[computerSelection]));
        scoreCard[outcome]++;
    }
    return scoreCard;
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
    return result + ` Score: ${playerScore}-${computerScore}-${tieScore}`;
}

//Show game results in console
function playAndPrintGame() {
    console.log(readGameWinner(game(new Array(3))));
}