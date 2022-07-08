console.log(playRound(playerPlay(), computerPlay()));

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
                alert("Invalid selection");
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