import Modifier, { type ArgsFor } from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { isArray } from '@ember/array';
import { isEmpty } from '@ember/utils';
import {
  createPopper,
  type Instance as PopperInstance,
  type Options as PopperOptions,
} from '@popperjs/core';

import {
  setPopperForElement,
  isModifier,
  type PopperModifierDescription,
} from './index';
import {
  beginRunLoopModifier as beginRunLoop,
  endRunLoopModifier as endRunLoop,
} from './in-runloop-modifier';
import type Owner from '@ember/owner';

export interface PopperSignature {
  Args: {
    Positional: [
      HTMLElement,
      ...(Partial<PopperOptions> | PopperModifierDescription)[],
    ];
    Named: Partial<PopperOptions>;
  };
  Element: HTMLElement;
}

function getPopperOptions(
  positional: PopperSignature['Args']['Positional'],
  named: PopperSignature['Args']['Named'],
): Partial<PopperOptions> {
  // Get an array of just positional "options"; first item is an element reference
  const [, ...positionalArguments] = positional;

  // Positional args that are not modifiers should be treated as full "options" objects
  const allPositionalOptions = positionalArguments.filter<
    Partial<PopperOptions>
  >((arg): arg is Partial<PopperOptions> => !isModifier(arg));

  // Positional args that are modifiers will extend the rest of the configuration
  const allPositionalModifiers =
    positionalArguments.filter<PopperModifierDescription>(
      (arg): arg is PopperModifierDescription => isModifier(arg),
    );

  const { ...namedOptions } = named;
  const options: Partial<PopperOptions> = {
    ...allPositionalOptions.reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {}),
    ...namedOptions,
  };

  // Ensure that the `modifiers` is always an array
  const modifiers =
    options.modifiers === undefined || isEmpty(options.modifiers)
      ? []
      : isArray(options.modifiers)
        ? options.modifiers
        : [options.modifiers];

  // Add runloop integration and positional modifiers to the array of modifiers
  options.modifiers = [
    ...modifiers,
    ...allPositionalModifiers,
    beginRunLoop,
    endRunLoop,
  ];

  return options;
}

export default abstract class PopperModifier extends Modifier<PopperSignature> {
  popper: PopperInstance | null = null;
  primaryElement: HTMLElement | null = null;
  secondaryElement: HTMLElement | null = null;

  abstract get tooltipElement(): HTMLElement;
  abstract get referenceElement(): HTMLElement;

  modify(
    element: PopperSignature['Element'],
    positionalArgs: PopperSignature['Args']['Positional'],
    namedArgs: PopperSignature['Args']['Named'],
  ): void {
    this.primaryElement = element;
    this.secondaryElement = positionalArgs[0];

    const popperOptions = getPopperOptions(positionalArgs, namedArgs);

    // Create the popper once all required arguments are present
    if (!this.popper && this.referenceElement && this.tooltipElement) {
      this.popper = createPopper(
        this.referenceElement,
        this.tooltipElement,
        popperOptions,
      );

      setPopperForElement(this.primaryElement, this.popper);
    }
    this.popper?.setOptions(popperOptions);
  }

  constructor(owner: Owner, args: ArgsFor<PopperSignature>) {
    super(owner, args);
    registerDestructor(this, this.cleanup);
  }

  cleanup = () => {
    this.popper?.destroy();
  };
}
