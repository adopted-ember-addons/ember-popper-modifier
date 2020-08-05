const ELEMENT_TO_POPPER = new WeakMap();

const IS_POPPER_MODIFIER = Symbol("is-popper-modifier");

export function getPopperForElement(element) {
  return ELEMENT_TO_POPPER.get(element);
}

export function setPopperForElement(element, popperInstance) {
  ELEMENT_TO_POPPER.set(element, popperInstance);
}

/**
 * Mark an object as a Popper modifier
 *
 * @param {object} configuration
 * @return {object}
 */
export function createModifier(configuration) {
  return {
    [IS_POPPER_MODIFIER]: true,
    ...configuration,
  };
}

/**
 * Check whether an object is a Popper modifier
 *
 * @param {object} configuration
 * @return {boolean}
 */
export function isModifier(configuration) {
  return configuration[IS_POPPER_MODIFIER] === true;
}
