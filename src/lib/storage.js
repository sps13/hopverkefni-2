const LOCALSTORAGE_KEY = 'lectures';

/**
 * Skilar þeim hlutum sem eru vistaðir í Local Storage
 */
export function loadSavedLect() {
    const savedJsonLect = localStorage.getItem(LOCALSTORAGE_KEY);
    const savedLect = JSON.parse(savedJsonLect) || [];

    return savedLect;
}

/**
 * Vistar eða hættir að vista hluti í Locale Storage
 */
export function savedLect(slug) { 
    const saved = loadSavedLect(); 
    
    //Ef hlutur er nú þegar vistaður hefur index gildið -1
    const index = saved.indexOf(slug); 

    if(index >= 0){ 
        saved.splice(index, 1); 
    } else {
        saved.push(slug);
    }

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(saved));
}