import { empty, el } from './helpers';
import { loadSavedLect, savedLect } from './storage';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.containerRow = document.querySelector('.list__row');
    this.url='../lectures.json';

    //Þegar ýtt er á takka þarf að sýna rétta fyrilestra
    this.HTMLButton=document.getElementById('button__HTML');
    this.CSSButton=document.getElementById('button__CSS');
    this.JSButton=document.getElementById('button__JavaScript');
    this.HTMLButton.addEventListener('click', this.HTMLFunction);
    this.CSSButton.addEventListener('click', this.CSSFunction);
    this.JSButton.addEventListener('click', this.JSFunction);
  }
  
  /**
   * Hleður niður gögnunum inn á síðuna
   */
  load() {
    this.loadLect()
    .then(data => this.showList(data)) 
    
    .catch((error) => {
      console.error(error);
      this.setError(error.message);
    });  
  }
  
  /**
   * Fall sem skilar gögnunum
   */
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
   * Birtir villuskilaboð
   * @param {String} errorMessage 
   */
  setError(errorMessage){
    displayError(errorMessage); 
  }
  
  /**
   * Fall sem birtir þá fyrirlestra sem eru í flokki HTML
   * Og felur hina ef ekki er búið að byðja sérstaklega um að birta þá
   * @param {click on button} e 
   */
  HTMLFunction(e) {
    e.target.classList.toggle('sort__button'); //Skiptum um klasanafn þegar takki er valinn
    this.CSSButton = document.getElementById('button__CSS');
    this.JSButton = document.getElementById('button__JavaScript');
    this.containerRow = document.querySelector('.list__row');
    if(e.target.id == 'button__HTML'){
      for(let i = 1; i <= this.containerRow.children.length; i++){
        if((this.CSSButton.classList.value === 'button') && (this.JSButton.classList.value === 'button')){
          if(this.containerRow.childNodes[i].id !== 'html'){
            console.log(this.containerRow.childNodes[i]);
            this.containerRow.childNodes[i].classList.toggle('invisible');
          } 
        } else { //Annars látum við HTML birtast
          if(this.containerRow.childNodes[i].id === 'html'){
            this.containerRow.childNodes[i].classList.toggle('invisible');
          } 
        }
      }
    }
  }
  /**
   * Fall sem birtir þá fyrirlestra sem eru í flokki CSS
   * Og felur hina ef ekki er búið að biðja sérstaklega um að birta þá
   * @param {click on button} e 
   */
  CSSFunction(e) {
    e.target.classList.toggle('sort__button'); //Skiptum um klasanafn þegar takki er valinn
    this.HTMLButton = document.getElementById('button__HTML');
    this.JSButton = document.getElementById('button__JavaScript');
    this.containerRow = document.querySelector('.list__row');

    if(e.target.id == 'button__CSS'){
      for(let i= 1; i<=this.containerRow.children.length; i++){
        //Ef ekki er búið að ýta á annan takka, látum við allt annað en css hverfa
        if((this.HTMLButton.classList.value === 'button') && (this.JSButton.classList.value === 'button')){
          if(this.containerRow.childNodes[i].id !== 'css'){
            this.containerRow.childNodes[i].classList.toggle('invisible');
          } 
        } else { //Annars látum við css birtast
          if(this.containerRow.childNodes[i].id === 'css'){
            this.containerRow.childNodes[i].classList.toggle('invisible');
          } 
        }
      }
    }
  }
  /**
   * Fall sem birtir þá fyrirlestra sem eru í flokki JavaScript 
   * Og felur hina ef ekki er búið að biðja sérstaklega um að birta þá
   * @param {click on button} e 
   */
  JSFunction(e) {
    e.target.classList.toggle('sort__button'); //Skiptum um klasanafn þegar takki er valinn
    this.HTMLButton = document.getElementById('button__HTML');
    this.CSSButton = document.getElementById('button__CSS');
    this.containerRow = document.querySelector('.list__row');

    if(e.target.id == 'button__JavaScript'){
      for(let i= 1; i<=this.containerRow.children.length; i++){
        //Ef ekki er búið að ýta á annan takka, látum við allt annað en JavaScript hverfa
        if((this.HTMLButton.classList.value === 'button') && (this.CSSButton.classList.value === 'button')){
          if(this.containerRow.childNodes[i].id !== 'javascript'){
            this.containerRow.childNodes[i].classList.toggle('invisible');
          } 
        } else { //Annars látum við JavaScript birtast
          if(this.containerRow.childNodes[i].id === 'javascript'){
            this.containerRow.childNodes[i].classList.toggle('invisible');
          } 
        }
      }
    }
  }

  /**
   * Skilar þeim upplýsingum sem eru vistuð í Local Storage á þessari síðu
   */
  addSaved(data){
    const saved = loadSavedLect(); // Hér eru allt vistað

    data.finished = saved.indexOf(data.slug) >= 0;

    return data;
  }

  /**
   * Býr til mynda hlut ef mynd er til staðar. Annars tóman hlut
   * Skilar svo hlutnum
   */
  imageElement(data){
    const image = el('div');
    image.classList.add('index__lectImage');

    if(data.thumbnail){
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

  /**
   * Býr til textaboxið sem heldur utan um fyrirsögn og flokk
   * hvers fyrilesturs. Skilar textaboxinu. 
   */
  textElement(data){
    const category = el('a' , data.category);  
    category.classList.add('index__lectCategory');
    category.setAttribute('href', '/fyrirlestur.html?slug='+data.slug);  

    const heading = el('h2', data.title);  
    heading.classList.add('index__lectTitle');

    const finished__image = el('div'); 
    const finished__img = el('p',  '✓');
    finished__img.classList.add('finished__img'); 
    finished__image.appendChild(finished__img);

    const index__lectText= el('div', category, heading);
    index__lectText.classList.add('index__lectText');

    const textElement= el('div', index__lectureText, finished__image);
    textElement.classList.add('index__textElement');

    return textElement;
  }

  /**
   * Sýnir eða tekur af done merkið ✓ eftir því hvort hlutur sé vistaður í 
   * Local Storage eða ekki. 
   */
  showDone(textElement, data){
    const ls = localStorage.lectures.substring(1,(localStorage.lectures.length)-1)
    const lsList = ls.split(',');
    for(let i=0; i< lsList.length; i++){
      if(lsList[i] === '"' + data.slug + '"'){
        textElement.childNodes[1].classList.toggle('invisible');
      }
    }
    return '';
  }

  /**
   * Birtir gögnin á síðunni
   */
  show(data){
    const image = this.imageElement(data);
    const textElement = this.textElement(data);

    const finalItem = el('a', image, textElement);
    finalItem.classList.add('lectContainer');
    finalItem.setAttribute('id', data.category);
    finalItem.setAttribute('href', '/fyrirlestur.html?slug='+data.slug);
    this.containerRow.appendChild(finalItem);

    textElement.childNodes[1].classList.toggle('invisible');

    this.showDone(textElement, data);

    return '';
  }

  /**
   * Rennur í gegnum lista af öllum gögnunum sem á að birta, og lætur birta hvert og eitt
   */
  showList(data){
    var i;
    for(i=0; i< data.lect.length; i++){
      this.show(data.lect[i]);
    }
    return '';
  }
}