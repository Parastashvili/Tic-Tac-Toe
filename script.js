"use strict";

const activator = document.querySelectorAll(".buton_box");
const start_game = document.querySelectorAll('.start_buttons');
const vsplayer = document.getElementById('game_screen');
const startscreen = document.getElementById('home_screen');
const play_area = document.querySelectorAll('.boxes');
const turnO = document.getElementById('turn_icono');
const turnX = document.getElementById('turn_iconx');
const xwincount = document.getElementById('xwincount');
const owincount = document.getElementById('owincount');
const tiecount = document.getElementById('tiecount');

let positions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let x_oPositions = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

let player = 'x';
let mode = 'cpu';

const buttonhover = () => {
    for (let i = 0; i < positions.length; i++) {
        const play_boxes_number = positions[i];
        if (player === "x") {
            play_area[play_boxes_number].classList.add('xhover');
            play_area[play_boxes_number].classList.remove('ohover');
        } else {
            play_area[play_boxes_number].classList.add('ohover');
            play_area[play_boxes_number].classList.remove('xhover');
        }
    }
};

const activate = (icon) => {
    if (icon === "x") {
        activator[0].classList.add("active");
        activator[1].classList.remove("active");
        player = "x";
    } else {
        activator[1].classList.add("active");
        activator[0].classList.remove("active");
        player = "x";
    }
};

const restart_btn = document.getElementById('restart_game');
const restartBTN = document.getElementById('restart_screen');

restart_btn.addEventListener('click', function requestRestart() {
    restartBTN.style.display = "flex";
    vsplayer.style.opacity = "0.3";
});

const noCancel = document.getElementById('cancel');
const yesRestart = document.getElementById('yesrestart');
noCancel.addEventListener('click', function cancel() {
    restartBTN.style.display = "none";
    vsplayer.style.opacity = "1";
});
yesRestart.addEventListener('click', function restart() {
    location.reload();
})

let sequence = 2;
function turn_is() {
    if (sequence % 2 === 0) {
        turnX.style.display = "block";
        turnO.style.display = "none";
    } else {
        turnX.style.display = "none";
        turnO.style.display = "block";
    }
};

const blockinput = document.getElementById('blockinput');

const place_icon = () => {
    for (let i = 0; i < play_area.length; i++) {
        play_area[i].onclick = (e) => {
            const clicked = document.createElement('img');
            clicked.classList.add('icon-class');
            e.target.classList.remove('xhover');
            e.target.classList.remove('ohover');
            const removeFreeCell = positions.indexOf(i);
            positions.splice(removeFreeCell, 1);
            if (player === 'x') {
                clicked.src = "./assets/icon-x.svg";
                e.target.append(clicked);
                player = 'o';
                sequence++;
                turn_is();
                x_oPositions[i] = "X";
                checkWin();
                if (winScreen.style.display != 'flex') {
                    if (mode === 'cpu') {
                        blockinput.style.display = 'block';
                        setTimeout(randNumber, 1000);
                    }
                }

            } else {
                clicked.src = "./assets/icon-o.svg"
                e.target.append(clicked);
                player = 'x';
                sequence++;
                turn_is();
                x_oPositions[i] = "O";
                checkWin();
                if (winScreen.style.display != 'flex') {
                    if (mode === 'cpu') {
                        setTimeout(randNumber, 1000);
                        blockinput.style.display = 'block';
                    }
                }
            }
            buttonhover();
            e.target.onclick = null;
        }
    }
};
let freeCells = [];

function randNumber() {
    let myArray = positions;
    let randomIndex = Math.floor(Math.random() * myArray.length);
    let randomNumber = myArray[randomIndex];
    const clicked = document.createElement('img');
    clicked.classList.add('icon-class');
    play_area[randomNumber].append(clicked);
    play_area[randomNumber].classList.remove('xhover');
    play_area[randomNumber].classList.remove('ohover');
    if (player === 'x') {
        clicked.src = "./assets/icon-x.svg";
        x_oPositions[randomNumber] = "X";
        player = 'o'
        sequence++;
        turn_is();
    } else {
        clicked.src = "./assets/icon-o.svg"
        x_oPositions[randomNumber] = "O";
        player = 'x'
        sequence++;
        turn_is();
    }
    play_area[randomNumber].onclick = null;
    const removeFreeCell = positions.indexOf(randomNumber);
    positions.splice(removeFreeCell, 1);
    checkWin();
    buttonhover();
    blockinput.style.display = 'none';
};

const winScreen = document.getElementById('winner_screen');
const winnerPlayer = document.getElementById('winner_player');
const quitbtn = document.getElementById('quitbtn');
quitbtn.addEventListener('click', function restart() {
    location.reload();
});

let xWins = 0;
let oWins = 0;
let ties = 0;

const nextbtn = document.getElementById('nextroundbtn');
nextbtn.addEventListener('click', function nextRound() {
    x_oPositions = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    positions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    blockinput.style.display = 'none';
    winScreen.style.display = 'none';
    vsplayer.style.opacity = "1";
    sequence = 2;
    player = 'x';
    turn_is();
    for (let i = 0; i < 9; i++) {
        if (play_area[i].firstChild) {
            play_area[i].removeChild(play_area[i].firstChild);
        }
        if (play_area[i].classList.contains('winX')) {
            play_area[i].classList.remove('winX')
        };
        if (play_area[i].classList.contains('winO')) {
            play_area[i].classList.remove('winO')
        };
        place_icon();
        buttonhover();
    }
    if (mode === 'cpu' && playerchoosed === 'o') {
        randNumber();
    }
});


let winX = document.getElementById('xicon');
let winO = document.getElementById('oicon');
let winner_round = document.getElementById('winner_round');

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (x_oPositions[a] && x_oPositions[a] === x_oPositions[b] &&
            x_oPositions[b] === x_oPositions[c] &&
            (x_oPositions[a] === "X" || x_oPositions[a] === "O")) {
            blockinput.style.display = 'block';
            winScreen.style.display = 'flex';
            if (x_oPositions[a] === "X" && x_oPositions[b] === "X" && x_oPositions[c] === "X") {
                winnerPlayer.innerHTML = "PLAYER 1 WINS!";
                vsplayer.style.opacity = "0.5";
                xWins++;
                xwincount.innerHTML = xWins;
                winX.style.display = 'flex';
                winO.style.display = 'none';
                winner_round.style.color = "#31C3BD";
                winner_round.innerHTML = "TAKES THE ROUND";
                winnerPlayer.style.display = 'block';
                play_area[a].classList.add('winX');
                play_area[b].classList.add('winX');
                play_area[c].classList.add('winX');
            } else {
                winnerPlayer.innerHTML = "PLAYER 2 WINS!";
                vsplayer.style.opacity = "0.5";
                oWins++;
                owincount.innerHTML = oWins;
                winX.style.display = 'none';
                winO.style.display = 'flex';
                winner_round.style.color = "#F2B137";
                winner_round.innerHTML = "TAKES THE ROUND";
                winnerPlayer.style.display = 'block';
                play_area[a].classList.add('winO');
                play_area[b].classList.add('winO');
                play_area[c].classList.add('winO');
            }
            return null;
        }
    }
    if (x_oPositions.every(cell => cell !== ' ')) {
        blockinput.style.display = 'block';
        vsplayer.style.opacity = "0.3";
        ties++;
        tiecount.innerHTML = ties;
        winX.style.display = 'none';
        winO.style.display = 'none';
        winner_round.style.color = "#A8BFC9";
        winner_round.innerHTML = "ROUND TIED";
        winScreen.style.display = 'flex';
        winnerPlayer.style.display = 'none';
    }
};
const xwinstext = document.getElementById('xwinstext');
const owinstext = document.getElementById('owinstext');

const startGame = (vs) => {
    vsplayer.style.display = "flex";
    startscreen.style.display = 'none';
    mode = vs;
    if (mode === 'player') {
        xwinstext.innerHTML = 'X (P1)';
        owinstext.innerHTML = 'O (P2)';
    }
    buttonhover();
    place_icon();
};
let playerchoosed;
const startGames = (cpu) => {
    mode = cpu;
    if (activator[1].classList.contains("active")) {
        blockinput.style.display = 'block';
    }
    vsplayer.style.display = "flex";
    startscreen.style.display = 'none';
    if (activator[1].classList.contains("active")) {
        playerchoosed = 'o';
        xwinstext.innerHTML='X (CPU)';
        owinstext.innerHTML='O (YOU)';
        setTimeout(randNumber, 1000);
        setTimeout(function change() {
            player = 'o';
        }, 2020);
    } else {
        player = 'x';
    }
    buttonhover();
    place_icon();
}





