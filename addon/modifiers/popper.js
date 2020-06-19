import BasePopperModifier from "../-base-popper-modifier";

export default class PopperModifier extends BasePopperModifier {
  get tooltipElement() {
    return this.args.positional[0];
  }

  get referenceElement() {
    return this.element;
  }
}
