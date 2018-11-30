import { empty, el } from './helpers';
import { loadSavedLect, savedLectures } from './storage';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.containerRow = document.querySelector('.list__row');
    this.url = '../lectures.json';

    this.HTMLButton = document.getElementById('button__HTML');
    this.CSSButton = document.getElementById('button__CSS');
    this.JSButton = document.getElementById('button__JavaScript');
    this.HTMLButton.addEventListener('click', this.HTMLFunction);
    this.CSSButton.addEventListener('click', this.CSSFunction);
    this.JSButton.addEventListener('click', this.JSFunction);
  }

  load() {
    this.loadLect()
      .then(data => this.showList(data))

      .catch((error) => {
        console.error(error);
        this.setError(error.message);
      });
  }

  loadLect() {
    return fetch(this.url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Villa við að sækja fyrirlestur');
        }
        return res.json();
      });
  }

  /**
   * @param {String} errorMessage
   */
  setError(errorMessage) {
    displayError(errorMessage);
  }

  /**
   * @param {click on button} e
   */
  HTMLFunction(e) {
    e.target.classList.toggle('sort__button');
    this.CSSButton = document.getElementById('button__CSS');
    this.JSButton = document.getElementById('button__JavaScript');
    this.containerRow = document.querySelector('.list__row');
    if (e.target.id == 'button__HTML') {
      for (let i = 1; i <= this.containerRow.children.length; i++) {
        if ((this.CSSButton.classList.value === 'button') && (this.JSButton.classList.value === 'button')) {
          if (this.containerRow.childNodes[i].id !== 'html') {
            console.log(this.containerRow.childNodes[i]);
            this.containerRow.childNodes[i].classList.toggle('invisible');
          }
        } else {
          if (this.containerRow.childNodes[i].id === 'html') {
            this.containerRow.childNodes[i].classList.toggle('invisible');
          }
        }
      }
    }
  }

  /**
   * @param {click on button} e
   */
  CSSFunction(e) {
    e.target.classList.toggle('sort__button');
    this.HTMLButton = document.getElementById('button__HTML');
    this.JSButton = document.getElementById('button__JavaScript');
    this.containerRow = document.querySelector('.list__row');

    if (e.target.id == 'button__CSS') {
      for (let i = 1; i <= this.containerRow.children.length; i++) {
        if ((this.HTMLButton.classList.value === 'button') && (this.JSButton.classList.value === 'button')) {
          if (this.containerRow.childNodes[i].id !== 'css') {
            this.containerRow.childNodes[i].classList.toggle('invisible');
          }
        } else {
          if (this.containerRow.childNodes[i].id === 'css') {
            this.containerRow.childNodes[i].classList.toggle('invisible');
          }
        }
      }
    }
  }

  /**
   * @param {click on button} e
   */
  JSFunction(e) {
    e.target.classList.toggle('sort__button');
    this.HTMLButton = document.getElementById('button__HTML');
    this.CSSButton = document.getElementById('button__CSS');
    this.containerRow = document.querySelector('.list__row');

    if (e.target.id == 'button__JavaScript') {
      for (let i = 1; i <= this.containerRow.children.length; i++) {
        if ((this.HTMLButton.classList.value === 'button') && (this.CSSButton.classList.value === 'button')) {
          if (this.containerRow.childNodes[i].id !== 'javascript') {
            this.containerRow.childNodes[i].classList.toggle('invisible');
          }
        } else { // Annars látum við JavaScript birtast
          if (this.containerRow.childNodes[i].id === 'javascript') {
            this.containerRow.childNodes[i].classList.toggle('invisible');
          }
        }
      }
    }
  }

  addSaved(data) {
    const saved = loadSavedLect();

    data.finished = saved.indexOf(data.slug) >= 0;

    return data;
  }

  imageElement(data) {
    const image = el('div');
    image.classList.add('index__lectImage');

    if (data.thumbnail) {
      const img = el('img');
      img.setAttribute('src', data.thumbnail);
      img.classList.add('index__lectImg');
      img.setAttribute('alt', data.title);
      image.appendChild(img);
    } else {
      const img = el('div');
      img.classList.add('index__lectImg');
      img.setAttribute('alt', data.title);
      image.appendChild(img);
    }

    return image;
  }

  textElement(data) {
    const category = el('a', data.category);
    category.classList.add('index__lectCategory');
    category.setAttribute('href', `/fyrirlestur.html?slug=${data.slug}`);

    const heading = el('h2', data.title);
    heading.classList.add('index__lectTitle');

    const finished__image = el('div');
    const finished__img = el('p', '✓');
    finished__img.classList.add('finished__img');
    finished__image.appendChild(finished__img);

    const index__lectText = el('div', category, heading);
    index__lectText.classList.add('index__lectText');

    const textElement = el('div', index__lectureText, finished__image);
    textElement.classList.add('index__textElement');

    return textElement;
  }

  showDone(textElement, data) {
    const ls = localStorage.lectures.substring(1, (localStorage.lectures.length) - 1);
    const lsList = ls.split(',');
    for (let i = 0; i < lsList.length; i++) {
      if (lsList[i] === `"${data.slug}"`) {
        textElement.childNodes[1].classList.toggle('invisible');
      }
    }
    return '';
  }

  show(data) {
    const image = this.imageElement(data);
    const textElement = this.textElement(data);

    const finalItem = el('a', image, textElement);
    finalItem.classList.add('lectContainer');
    finalItem.setAttribute('id', data.category);
    finalItem.setAttribute('href', `/fyrirlestur.html?slug=${data.slug}`);
    this.containerRow.appendChild(finalItem);

    textElement.childNodes[1].classList.toggle('invisible');

    this.showDone(textElement, data);

    return '';
  }

  showList(data) {
    for (let i = 0; i < data.lect.length; i++) {
      this.show(data.lect[i]);
    }
    return '';
  }
}
