import { assert } from '@ember/debug';
import BasePopperModifier from '../-base-popper-modifier';

export default class PopperModifier extends BasePopperModifier {
  get tooltipElement(): HTMLElement {
    assert('Tooltip element is available', this.primaryElement);

    return this.primaryElement;
  }

  get referenceElement(): HTMLElement {
    assert('Reference element is available', this.secondaryElement);

    return this.secondaryElement;
  }
}
