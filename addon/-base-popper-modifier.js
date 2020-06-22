import Modifier from "ember-modifier";
import { isArray } from "@ember/array";
import { assert } from "@ember/debug";
import { createPopper } from "@popperjs/core";

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
    const { ...options } = this.args.named;

    if (options.modifiers) {
      options.modifiers = isArray(options.modifiers)
        ? options.modifiers
        : [options.modifiers];
    }

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
    }
  }

  didUpdateArguments() {
    this.popper?.setOptions(this.popperOptions);
  }
}
