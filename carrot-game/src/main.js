'use strict';
import Modal from './modal.js';
import Game from './game.js';

const game = new Game(10, 10, 7);
game.setGamefinishListener(e => {
  let msg;
  e === 'win' ? (msg = '🏆 YOU WON 🏆') : (msg = '💩 YOU LOST 💩');
  gameFinishBanner.show(msg);
});

const gameFinishBanner = new Modal();
gameFinishBanner.setClickListener(() => {
  game.start();
});
