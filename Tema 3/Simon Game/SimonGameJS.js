let sequence = [];
let playerSequence = [];

const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileCointainer = document.querySelector('.js-container');

function startGame() {
    startButton.classList.add('hidden');
    info.classList.remove('hidden');
    info.textContent = "Asteapta...";
    nextRound();
}

startButton.addEventListener('click', startGame);
tileCointainer.addEventListener('click', event => {
    const {tile} = event.target.dataset;

    if (tile) handleClick(tile);
});

let level = 0;

function nextRound() {
    level += 1;

    tileCointainer.classList.add('unclickable');
    info.textContent = "Asteapta...";
    heading.textContent = `Level ${level} of 15`;
    
    const nextSequence = [...sequence];
    nextSequence.push(nextStep());
    playRound(nextSequence);

    sequence = [...nextSequence];
    setTimeout(() => {
        playerTurn(level);
    }, level * 600 + 1000);
}

function nextStep() {
    const tiles = ['red', 'green', 'blue', 'yellow'];
    const random = tiles[Math.floor(Math.random() * tiles.length)];

    return random;
}

function activateTile(color) {
    const tile = document.querySelector(`[data-tile='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);

    tile.classList.add('activated');
    sound.play();

    setTimeout( () =>{
        tile.classList.remove('activated');
    }, 300);
}

function playRound(nextSequence){
    nextSequence.forEach((color, index) =>{
        setTimeout(() =>{
            activateTile(color);
        }, (index + 1) * 600);
    });
}

function playerTurn(level){
    tileCointainer.classList.remove('unclickable');
    info.textContent = `Randul tau: ${level} Tap${level > 1 ? 's' : ''}`;
}

function handleClick(tile) {
    const index = playerSequence.push(tile) - 1;
    const sound = document.querySelector(`[data-sound='${tile}']`);
    sound.play();

    const remainingTaps = sequence.length - playerSequence.length;

    if (playerSequence[index] !== sequence[index]){
        resetGame("Hopa !! Sfarsit de joc, ai apasat pe butonul gresit !");
        return;
    }


    if(playerSequence.length === sequence.length) {
        if(playerSequence.length === 15) {
            resetGame("Bravvo ! Ai terminat cu succes toate nivelele !");
            return;
        }
        playerSequence = [];info.textContent = "Bun ! Continuat !";
        setTimeout(() => {
            nextRound();
        }, 1000);
        return;
    }

    info.textContent = `Randul tau: ${remainingTaps} Tap${remainingTaps > 1 ? 's' : ''}`;
}

function resetGame(text) {
    alert(text);
    sequence = [];
    playerSequence = [];
    level = 0;
    startButton.classList.remove('hidden');
    heading.textContent = 'Simon Game';
    info.classList.add('hidden');
    tileCointainer.classList.add('unclickable');
}

