console.log(computerPlay());

function computerPlay() {
    switch (Math.floor(3*Math.random())) {
        case 0:
            return "Rock";
            break;
        case 1:
            return "Paper";
            break;
        case 2:
            return "Scissors"
    }
}