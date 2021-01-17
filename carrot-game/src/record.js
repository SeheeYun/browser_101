export default class Record {
  constructor() {
    this.start;
    this.end;
    this.recordArr = [];
    this.myRecord = document.querySelector('.my_record');
    this.bestRecord = document.querySelector('.best_record');
  }

  startTime() {
    this.start = Date.now();
  }

  elapsedTime() {
    this.end = Date.now();
    this.playTime = this.end - this.start;
    this.myRecord.innerHTML = `${this.playTime / 1000} 초`;
    this.recordArr.push(this.playTime / 1000);
    this.bestRecordTime = Math.min.apply(null, this.recordArr);
    this.bestRecord.innerHTML = `${this.bestRecordTime} 초`;
  }
}
