export default class Modal {
  constructor() {
    this.modal = document.querySelector('.modal');
    this.modalText = document.querySelector('.modal_text');
    this.playBtn = document.querySelector('.play');
    this.replayBtn = document.querySelector('.replay');
    this.replayBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  show(msg) {
    this.playBtn.style.visibility = 'hidden';
    this.modal.classList.add('visible');
    this.modalText.innerHTML = msg;
  }

  hide() {
    this.playBtn.style.visibility = 'visible';
    this.modal.classList.remove('visible');
  }
}
