const mainBgm = new Audio('sound/bg.mp3');
const carrotBgm = new Audio('sound/carrot_pull.mp3');
const wonBgm = new Audio('sound/game_win.mp3');
const lostBgm = new Audio('sound/alert.wav');

export function playCarrot() {
  playBgm(carrotBgm);
}
export function playMain() {
  playBgm(mainBgm);
}
export function playWon() {
  playBgm(wonBgm);
}
export function playLost() {
  playBgm(lostBgm);
}
export function pauseMain() {
  pauseBgm(mainBgm);
}

function playBgm(bgm) {
  bgm.play();
  bgm.currentTime = 0;
}

function pauseBgm(bgm) {
  bgm.pause();
}
