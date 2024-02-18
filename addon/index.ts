import {
  type Instance as PopperInstance,
  type Modifier as PopperModifier,
  type Options as PopperOptions,
} from '@popperjs/core';

const ELEMENT_TO_POPPER: WeakMap<Element, PopperInstance> = new WeakMap();

const IS_POPPER_MODIFIER = Symbol('is-popper-modifier');

export interface CustomPopperOptions extends Omit<PopperOptions, 'modifiers'> {
  modifiers:
    | PopperOptions['modifiers']
    | Partial<PopperModifier<unknown, { [key: string]: unknown }>>;
}

export type PopperModifierDescription = Partial<
  PopperModifier<unknown, { [key: string]: unknown }>
> & {
  [IS_POPPER_MODIFIER]: true;
};

export function getPopperForElement(element: Element): PopperInstance {
  const popperInstance = ELEMENT_TO_POPPER.get(element);

  if (!popperInstance) {
    throw new Error('Popper instance for element does not exist in cache');
  }

  return popperInstance;
}

export function setPopperForElement(
  element: Element,
  popperInstance: PopperInstance,
): void {
  ELEMENT_TO_POPPER.set(element, popperInstance);
}

/**
 * Mark an object as a Popper modifier
 *
 * @param {object} configuration
 * @return {object}
 */
export function createModifier(
  configuration: CustomPopperOptions['modifiers'],
): PopperModifierDescription {
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
export function isModifier(configuration: unknown): boolean {
  return (
    typeof configuration === 'object' &&
    configuration !== null &&
    IS_POPPER_MODIFIER in configuration &&
    configuration[IS_POPPER_MODIFIER] === true
  );
}
