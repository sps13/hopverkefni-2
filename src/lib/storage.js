const LOCALSTORAGE_KEY = 'lectures';

export function loadSavedLect() {
  const savedJsonLect = localStorage.getItem(LOCALSTORAGE_KEY);
  // eslint-disable-next-line no-shadow
  const savedLect = JSON.parse(savedJsonLect) || [];

  return savedLect;
}

export function savedLect(slug) {
  const saved = loadSavedLect();

  const index = saved.indexOf(slug);

  if (index >= 0) {
    saved.splice(index, 1);
  } else {
    saved.push(slug);
  }

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(saved));
}
