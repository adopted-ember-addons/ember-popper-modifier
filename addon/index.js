import {
  offset,
  shift,
  flip,
  arrow,
  size,
  autoPlacement,
  hide,
  inline,
} from '@floating-ui/dom';

const ELEMENT_TO_COMPUTE_POSITION_RETURN = new WeakMap();
const IS_FLOATING_UI_MIDDLEWARE = Symbol('is-floating-ui-middleware');

export function getComputePositionPromiseForElement(element) {
  return ELEMENT_TO_COMPUTE_POSITION_RETURN.get(element);
}

export function setComputePositionPromiseForElement(
  element,
  computePositionReturn
) {
  ELEMENT_TO_COMPUTE_POSITION_RETURN.set(element, computePositionReturn);
}
/**
 * Mark an object as a Floating UI middleware
 *
 * @param {object} configuration
 * @return {object}
 */
export function createMiddleware(configuration) {
  return {
    [IS_FLOATING_UI_MIDDLEWARE]: true,
    ...configuration,
  };
}

/**
 * Check whether an object is a Floating UI middleware
 *
 * @param {object} configuration
 * @return {boolean}
 */
export function isMiddleware(configuration) {
  return configuration[IS_FLOATING_UI_MIDDLEWARE] === true;
}

export { offset, shift, flip, arrow, size, autoPlacement, hide, inline };
