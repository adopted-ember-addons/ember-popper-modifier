import BasePopperModifier from '../-base-popper-modifier';

export default class PopperModifier extends BasePopperModifier {
  get tooltipElement() {
    return this.secondaryElement;
  }

  get referenceElement() {
    return this.primaryElement;
  }
}
