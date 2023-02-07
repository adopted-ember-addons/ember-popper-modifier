import BaseFloatingUiModifier from '../-base-floating-ui-modifier';

export default class FloatingUiTooltip extends BaseFloatingUiModifier {
  get floatingElement() {
    return this.primaryElement;
  }

  get referenceElement() {
    return this.secondaryElement;
  }
}
