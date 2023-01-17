import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class WithToolTip extends Component {
  @tracked tooltipVisible = false;
  @tracked referenceElement;

  @action setReferenceElement(element) {
    this.referenceElement = element;
  }

  @action showTooltip() {
    this.tooltipVisible = true;
  }

  @action hideTooltip() {
    this.tooltipVisible = false;
  }
}
