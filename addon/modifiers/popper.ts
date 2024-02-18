import BasePopperModifier from '../-base-popper-modifier';

export default class PopperModifier extends BasePopperModifier {
  get tooltipElement(): HTMLElement | null {
    return this.secondaryElement;
  }

  get referenceElement(): HTMLElement | null {
    return this.primaryElement;
  }
}
