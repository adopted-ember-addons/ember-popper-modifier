import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ToolTip extends Component {
  @tracked arrowElement;

  @action setArrowElement(element) {
    this.arrowElement = element;
  }
}
