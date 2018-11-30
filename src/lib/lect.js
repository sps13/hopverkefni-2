import { empty, el } from './helpers';
import { loadSavedLect, savedLect } from './storage';

export default class List {
  constructor() {
    this.container = document.querySelector('.lect-page');
    this.containerList = document.querySelector('.lect__list');
    this.url = '../lectures.json';
  }

  /**
   *
   * @param {*} e
   */
  finished(e) {
    const qs = new URLSearchParams(window.location.search);
    const slug = qs.get('slug');

    savedLect(slug);
    const saved = loadSavedLect();

    console.log(localStorage);

    return saved;
  }

  /**
   *
   * @param {*} slug
   */
  loadLect(slug) {
    return fetch(this.url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Villa við að sækja fyrirlestur');
        }
        return res.json();
      })
      .then((data) => {
        const found = data.lectures.find(i => i.slug === slug);
        if (!found) {
          throw new Error('Fyrirlestur fannst ekki');
        }
        return found;
      });
  }

  /**
     *
     * @param {url} slug
     */
  showFinished(slug) {
    const finished__img = el('p', '✓');
    const finished = el('a', 'Klára fyrirlestur');
    finished.setAttribute('href', `/fyrirlestur.html?slug=${slug}`);
    finished.addEventListener('click', this.finished);

    const finished__container = el('div', finished__img, finished);
    finished__container.classList.add('finished__container');

    this.container.appendChild(finished__container);

    const ls = localStorage.lectures.substring(1, (localStorage.lectures.length) - 1);
    const lsList = ls.split(',');
    for (let i = 0; i < lsList.length; i++) {
      if (lsList[i] === `"${slug}"`) {
        console.log('Vistað');
        finished__img.classList.add('seeImage');
        finished.classList.add('finished__done');
        break;
      }
    }
    if (finished__img.classList.value !== 'seeImage') {
      console.log('Ekki vistað');
      finished__img.classList.add('dontSeeImage');
      finished.classList.add('finished');
    }
  }

  /**
   *
   */
  showGoBack() {
    const back__container = el('div');
    back__container.classList.add('back__container');
    const back = el('a', 'Til baka');
    back.setAttribute('href', '../');
    back.classList.add('back__link');
    back__container.appendChild(back);
    this.container.appendChild(back__container);
  }

  /**
     *
     */
  load() {
    const qs = new URLSearchParams(window.location.search);
    const slug = qs.get('slug');

    this.loadLect(slug)
      .then(data => this.showList(data))

      .catch((error) => {
        console.error(error);
        this.setError(error.message);
      });

    this.showFinished(slug);
    this.showGoBack();
  }

  show(data) {
    if (data.type === 'text' || data.type === 'code') {
      const listP = data.data.split('\n');
      for (let i = 0; i < listP.length; i++) {
        const newElement = el('p', listP[i]);
        newElement.classList.add(data.type);
        this.containerList.appendChild(newElement);
      }
    }

    if (data.type === 'list') {
      const newElement = el('ul');
      newElement.classList.add(data.type);
      for (let i = 0; i < data.data.length; i++) {
        const underElement = el('li', data.data[i]);
        underElement.classList.add('list__item');
        newElement.appendChild(underElement);
      }
      this.containerList.appendChild(newElement);
    }

    if (data.type === 'quote') {
      const newElement = el('div');
      newElement.classList.add('quote__container');

      const quote = el('p', data.data);
      quote.classList.add('quote');

      const quoteAuthor = el('p', data.attribute);
      quoteAuthor.classList.add('quoteAuthor');

      newElement.appendChild(quote);
      newElement.appendChild(quoteAuthor);
      this.containerList.appendChild(newElement);
    }

    if (data.type === 'image') {
      const newElement = el('div');
      newElement.classList.add('image__container');

      const img = el('img');
      img.classList.add('lect__img');
      img.setAttribute('src', data.data);

      const imgText = el('p', data.caption);
      imgText.classList.add('img__text');

      newElement.appendChild(img);
      newElement.appendChild(imgText);
      this.containerList.appendChild(newElement);
    }

    if (data.type === 'heading') {
      const newElement = el('h2', data.data);
      newElement.classList.add('category__heading');
      this.containerList.appendChild(newElement);
    }

    if (data.type === 'youtube') {
      const newElement = el('iframe');
      newElement.classList.add(data.type);
      newElement.setAttribute('src', data.data);
      this.containerList.appendChild(newElement);
    }
  }

  /**
     * Sýnir haus síðunnar
     */
  showHeader(data) {
    this.containerHeader = document.querySelector('.header__container');
    const underheader = el('h2', data.category);
    underheader.classList.add('header__texti');
    this.containerHeader.appendChild(underheader);
    const headerTitle = el('h1', data.title);
    headerTitle.classList.add('overHeader__texti');
    this.containerHeader.appendChild(headerTitle);
  }

  showList(data) {
    this.showHeader(data);

    for (let i = 0; i < data.content.length; i++) {
      this.show(data.content[i]);
    }
  }
}
