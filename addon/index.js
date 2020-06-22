const ELEMENT_TO_POPPER = new WeakMap();

export function getPopperForElement(element) {
  return ELEMENT_TO_POPPER.get(element);
}

export function setPopperForElement(element, popperInstance) {
  ELEMENT_TO_POPPER.set(element, popperInstance);
}
