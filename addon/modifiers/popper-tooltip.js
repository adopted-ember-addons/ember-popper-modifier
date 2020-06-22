import BasePopperModifier from "../-base-popper-modifier";

export default class PopperModifier extends BasePopperModifier {
  get tooltipElement() {
    return this.element;
  }

  get referenceElement() {
    return this.args.positional[0];
  }
}
