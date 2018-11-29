import List from './lib/list';
import Lect from './lib/lect';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLectPage = page.classList.contains('lect-page');
  if (isLectPage) {
    const lect = new Lect();
    lect.load();
  } else {
    const list = new List();
    list.load();
  }
});