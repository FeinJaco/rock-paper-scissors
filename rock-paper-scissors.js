console.log(game());

function computerPlay() {
    switch (Math.floor(3*Math.random())) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors"
    }
}

function playerPlay() {
    while (true) {
        switch (prompt("Type 'Rock', 'Paper', or 'Scissors'").toUpperCase()) {
            case 'ROCK':
                return "Rock";
            case 'PAPER':
                return "Paper";
            case 'SCISSORS':
                return "Scissors";
            default:
                console.log("Invalid selection");
        }
    }
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection == computerSelection)
        return "It's a tie!";
    if ((playerSelection == "Rock" && computerSelection == "Paper") 
    || (playerSelection == "Paper" && computerSelection == "Scissors") 
    || (playerSelection == "Scissors" && computerSelection == "Rock"))
        return `You Lose! ${computerSelection} beats ${playerSelection}`;
    return `You Win! ${playerSelection} beats ${computerSelection}`;
}

function game() {
    console.log("Welcome to a best of 5 game of Rock Paper Scissors!");
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 0; i < 5; i++) {
        let message = playRound(playerPlay(), computerPlay());
        console.log(message);
        if (message.substring(4,7) == "Win")
            playerScore++;
        else if (message.substring(4,8) == "Lose")
            computerScore++;
    }
    let result;
    if (playerScore == computerScore)
        result = `It's a tie!`;
    if (playerScore > computerScore)
        result = `You Win!`;
    result = `You Lose!`;
    return result + ` Score: ${playerScore}-${computerScore}-${5 - playerScore - computerScore}`
}