import { empty } from './helpers';
//  import { loadSavedLectures, savedLectures } from './storage';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    //  this.containerRow = document.querySelector('.list__row');
    //  this.url='../lectures.json';
  }

  load() {
    empty(this.container);
  }
}
