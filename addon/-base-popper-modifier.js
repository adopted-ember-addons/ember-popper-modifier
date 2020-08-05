import Modifier from "ember-modifier";
import { isArray } from "@ember/array";
import { isEmpty } from "@ember/utils";
import { assert } from "@ember/debug";
import { createPopper } from "@popperjs/core";

import { setPopperForElement, isModifier } from "./index";
import {
  beginRunLoopModifier as beginRunLoop,
  endRunLoopModifier as endRunLoop,
} from "./in-runloop-modifier";

export default class PopperModifier extends Modifier {
  /** @type {HTMLElement} */
  // eslint-disable-next-line getter-return
  get tooltipElement() {
    assert("Must implement `tooltipElement` property", false);
  }

  /** @type {HTMLElement} */
  // eslint-disable-next-line getter-return
  get referenceElement() {
    assert("Must implement `referenceElement` property", false);
  }

  get popperOptions() {
    // Get an array of just positional "options"; first item is an element reference
    const positionalArguments = this.args.positional
      .slice(1)
      .filter((arg) => Boolean(arg));

    // Positional args that are not modifiers should be treated as full "options" objects
    const allPositionalOptions = positionalArguments.filter(
      (arg) => !isModifier(arg)
    );

    // Positional args that are modifiers will extend the rest of the configuration
    const allPositionalModifiers = positionalArguments.filter((arg) =>
      isModifier(arg)
    );

    const { ...namedOptions } = this.args.named;
    const options = {
      ...allPositionalOptions.reduce((acc, curr) => {
        return { ...acc, ...curr };
      }, {}),
      ...namedOptions,
    };

    // Ensure that the `modifiers` is always an array
    const modifiers = isEmpty(options.modifiers)
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

  didReceiveArguments() {
    // Create the popper once all required arguments are present
    if (!this.popper && this.referenceElement && this.tooltipElement) {
      this.popper = createPopper(
        this.referenceElement,
        this.tooltipElement,
        this.popperOptions
      );

      setPopperForElement(this.element, this.popper);
    }
  }

  didUpdateArguments() {
    this.popper?.setOptions(this.popperOptions);
  }

  willRemove() {
    this.popper?.destroy();
  }
}
