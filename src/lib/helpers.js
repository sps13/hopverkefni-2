/**
 *
@param {object}
*/
export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
/**
 *
 * @param {string} name á element
 * @param  {...any} children fyrir element
 */
export function el(name, ...children) {
  const element = document.createElement(name);
  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
  }
  return element;
}
