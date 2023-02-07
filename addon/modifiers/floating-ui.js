import BaseFloatingUiModifier from '../-base-floating-ui-modifier';

export default class FloatingUiModifier extends BaseFloatingUiModifier {
  get floatingElement() {
    return this.secondaryElement;
  }

  get referenceElement() {
    return this.primaryElement;
  }
}
