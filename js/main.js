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

function turnMachine(arr) {
    arr.push(generateRandomNumber());   
    highlightCellsComputer(arr);
    console.log(arr);
}

function turnPlayer(array) {
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
        };        
    });
}

function sameArrays(arr1, arr2) {
    for (let i = 0; i < arr2.length; i++) {
        if (arr1[i] === arr2[i]) {
            continue;
        } else {
            return false;
        }
    }

    return true;
}

async function playGame() {
    $play.classList.add('hidden');
    document.querySelector('#result-counter-text').classList.add('hidden');
    let arrayComputer = [];
    let arrayPlayer = [];
        
    turnMachine(arrayComputer);
    
    while (arrayPlayer.length < arrayComputer.length) {
        turnPlayer(arrayPlayer);
        await wait(1000);
        if (sameArrays(arrayPlayer, arrayComputer)) {
            arrayPlayer = [];
            turnMachine(arrayComputer);
        }
    }
    document.querySelector('#result-counter-text').classList.remove('hidden');
    document.querySelector('#result-counter-text').textContent = `Your record is ${arrayComputer.length - 1}. Try again!`;
    $play.classList.remove('hidden');
   
}

const $play = document.querySelector('#play-button');
$play.onclick = playGame;