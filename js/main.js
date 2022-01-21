const generateRandomNumber = function() { // returns a random number from zero to three
    const randomNumber = Math.random();

    if (randomNumber < 0.25) {
        return 0;
    } else if (randomNumber >= 0.25 && randomNumber < 0.5) {
        return 1;
    } else if (randomNumber >= 0.5 && randomNumber < 0.75) {
        return 2;
    } else {
        return 3;
    }
}

const colors = {
    0: 'blue',
    1: 'red',
    2: 'yellow',
    3: 'green'
};

function highlightCells(arr) {
    
    arr.forEach(element => { // adds and removes the .active class for elements of the array
        document.querySelector(`#${colors[element]}-cell`).classList.add('active');
        setTimeout(
            function() { 
                document.querySelector(`#${colors[element]}-cell`).classList.remove('active')
            }, 500);
    });
    
}

function extendComputerSequence(arr) {
    arr.push(generateRandomNumber());
}

function turnMachine(arr) {
    extendComputerSequence(arr);
    highlightCells(arr);
}

function playGame() {
    let arrayComputer = [];
    let arrayPlayer = [];
    
   turnMachine(arrayComputer);
   console.log(arrayComputer);
}

document.querySelector('#play-button').onclick = playGame;