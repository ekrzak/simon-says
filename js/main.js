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

const wait = (delay) => {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });    
}

async function highlightCellsComputer(arr) {
    for (let element of arr) {
        await wait(750);
        document.querySelector(`#${colors[element]}-cell`).classList.add('active');
        setTimeout(function() {
            document.querySelector(`#${colors[element]}-cell`).classList.remove('active');
        }, 200);
    }
}

function highlightCellsPlayer(color) {
    document.querySelector(`#${color}-cell`).classList.add('active');
    setTimeout(
        function() { 
            document.querySelector(`#${color}-cell`).classList.remove('active');
    }, 150);
}

function turnMachine(arr, counter) {
    while (arr.length < counter) {
        arr.push(generateRandomNumber());
    }    
    highlightCellsComputer(arr);
    console.log(arr)
}

function turnPlayer() {
    let array = [];

    document.querySelectorAll('.color-cells').forEach(function (cell) {
        cell.onclick = function (event) {
            if (event.target.getAttribute('name') === 'blue') {
                array.push(0);
                highlightCellsPlayer(event.target.getAttribute('name'));

            } else if (event.target.getAttribute('name') === 'red') {
                array.push(1);
                highlightCellsPlayer(event.target.getAttribute('name'));

            } else if (event.target.getAttribute('name') === 'yellow') {
                array.push(2);
                highlightCellsPlayer(event.target.getAttribute('name'));

            } else if (event.target.getAttribute('name') === 'green') {
                array.push(3);
                highlightCellsPlayer(event.target.getAttribute('name'));
            }

            return array;

        };

    });

}

function playGame() {
    let counter = 3;
    let arrayComputer = [];
        
   turnMachine(arrayComputer, counter);
   //console.log(arrayComputer);
    //let arrayPlayer = turnPlayer();
   
   
}

document.querySelector('#play-button').onclick = playGame;