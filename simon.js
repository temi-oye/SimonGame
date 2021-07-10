let red = document.getElementById("red");
let green = document.getElementById("green");
let blue = document.getElementById("blue");
let yellow = document.getElementById("yellow");
let colorBox = document.getElementById("color-box");
let colorsArr = [red, green, blue, yellow];
let colorSequence = [];

let start = document.getElementById("start");
let info = document.getElementById("info");
let strict = document.getElementById("strict");
let easy = document.getElementById("easy");
// let restartBtn = document.getElementById("restart")

let round = 0;

let simon = [];
let player = [];

let redSound = new Audio(
	"https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
);
let greenSound = new Audio(
	"https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
);
let blueSound = new Audio(
	"https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
);
let yellowSound = new Audio(
	"https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
);

let soundArr = [redSound, greenSound, blueSound, yellowSound];
let soundSequence = [];

async function active(el) {
	el.classList.add("active");
	await sleep(300);
	el.classList.remove("active");
}
async function cycle(arrOfColors) {
	unclickable(colorBox);

	for (let color = 0; color < arrOfColors.length; color++) {
		active(arrOfColors[color]);
		soundSequence[color].play();
		await sleep(500);
	}

	clickable(colorBox);
}

function unclickable(el) {
	el.classList.add("unclickable");
}
function clickable(el) {
	el.classList.remove("unclickable");
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

red.onclick = function log() {
	active(this);
	player.push(this);
	redSound.play();
	check();
};
green.onclick = function log() {
	active(this);
	player.push(this);
	greenSound.play();
	check();
};
blue.onclick = function log() {
	active(this);
	player.push(this);
	blueSound.play();
	check();
};
yellow.onclick = function log() {
	active(this);
	player.push(this);
	yellowSound.play();
	check();
};
function startGame(){
	start.classList.add("hidden");

	strict.classList.remove("hidden");
	easy.classList.remove("hidden");

	info.classList.remove("strict");
	info.classList.remove("easy");
}

start.onclick = startGame

strict.onclick = function gameMode() {
	// info.classList.add("strict");
	info.classList.remove("easy");
	reset()
	simonTurn();
};
easy.onclick = function gameMode() {
	info.classList.add("easy");
	reset()
	simonTurn();
};

function changeText(el, newText) {
	return (el.textContent = newText);
}

function check() {
	changeText(
		info,
		`Your Turn round: ${simon.length} You have ${
			simon.length - player.length
		} clicks left`
	);

	if (round == 5 && player.length == round) {
		console.log("win", player, simon);
		win();
		return;
	}

	if (player.length >= simon.length) {
		if (player[player.length - 1] !== simon[player.length - 1]) {
			if (info.classList.contains("easy")) {
				softReset();
				return;
			}
			lose();
			return;
		}

		playerTurn();
	}
	if (player[player.length - 1] !== simon[player.length - 1]) {
		if (info.classList.contains("easy")) {
			softReset();
			return;
		}
		lose();
		return;
	}
}
function endGame() {
	reset();
}
function lose() {

	changeText(info, `You lose! Try again?`);
	endGame();
}
function win() {
	changeText(info, `You Win! Try again?`);
	endGame();
}
async function simonTurn() {
	let num = nextColor();
	//problem - we are calling simonTurn @ the end of softReset
	simon.push(colorsArr[num]);
	colorSequence = simon;
	
	soundSequence.push(soundArr[num]);

	changeText(info, `Simon's Turn round: ${simon.length}`);
	cycle(simon);
	//Problem
	round++;

	await sleep(simon.length * 500);
	changeText(
		info,`Your Turn round: ${simon.length} You have ${simon.length - player.length} clicks left`
	);
}
async function playerTurn() {
	player = [];
	await sleep(1000);
	simonTurn();
}
function nextColor() {
	let selectedColor = Math.floor(Math.random() * colorsArr.length);
	return selectedColor;
}

function reset() {
	player = [];
	simon = [];
	soundSequence = [];
	round = 0;
}
async function softReset() {
	player = [];
	changeText(info, "Try Again");
	await sleep(1000);
	cycle(simon)
}
