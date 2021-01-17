import * as sound from './sound.js';

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.field');
    this.field.addEventListener('click', this.onClick);
  }

  init() {
    this.field.innerHTML = '';
    this._addItems('carrot', this.carrotCount, 'img/carrot.png');
    this._addItems('bug', this.bugCount, 'img/bug.png');
  }

  _addItems(className, count, imgPath) {
    for (let i = 0; i < count; i++) {
      let randomX = randomIntGenerator(0, 800);
      let randomY = randomIntGenerator(0, 180);
      const item = document.createElement('img');
      item.setAttribute('src', imgPath);
      item.setAttribute('alt', className);
      item.setAttribute('class', className);
      item.setAttribute('draggable', 'false');
      item.style.transform = `translate(${randomX}px,${randomY}px)`;
      this.field.appendChild(item);
    }
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick = event => {
    const target = event.target;
    if (target.className === 'carrot') {
      sound.playCarrot();
      target.remove();
      this.onItemClick && this.onItemClick('carrot');
    } else if (target.className === 'bug') {
      this.onItemClick && this.onItemClick('bug');
    }
  };
}

function randomIntGenerator(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
