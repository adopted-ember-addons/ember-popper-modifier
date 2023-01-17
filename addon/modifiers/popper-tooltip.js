import BasePopperModifier from '../-base-popper-modifier';

export default class PopperModifier extends BasePopperModifier {
  get tooltipElement() {
    return this.primaryElement;
  }

  get referenceElement() {
    return this.secondaryElement;
  }
}
