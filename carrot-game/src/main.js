'use strict';
import Modal from './modal.js';
import { GameBuilder, Reason } from './game.js';

const game = new GameBuilder()
  .withGameDuration(10)
  .withCarrotCount(10)
  .withBugCount(7)
  .build();

game.setGamefinishListener(reason => {
  let msg;
  reason === Reason.win ? (msg = '🏆 YOU WON 🏆') : (msg = '💩 YOU LOST 💩');
  gameFinishBanner.show(msg);
});

const gameFinishBanner = new Modal();
gameFinishBanner.setClickListener(() => {
  game.start();
});
