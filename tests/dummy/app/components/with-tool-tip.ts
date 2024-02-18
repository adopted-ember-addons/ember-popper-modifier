import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { type Placement } from '@popperjs/core';
import type { ToolTipSignature } from './tool-tip';

export interface WithToolTipSignature {
  Args: {
    Named: {
      content: string;
      placement?: Placement;
    };
  };
  Blocks: {
    default: [
      setReferenceElement: (element: HTMLElement) => void,
      showTooltip: () => void,
      hideTooltip: () => void,
    ];
  };
  Element: ToolTipSignature['Element'];
}

export default class WithToolTip extends Component<WithToolTipSignature> {
  @tracked tooltipVisible: boolean = false;
  @tracked referenceElement: HTMLElement | null = null;

  @action setReferenceElement(element: HTMLElement): void {
    this.referenceElement = element;
  }

  @action showTooltip(): void {
    this.tooltipVisible = true;
  }

  @action hideTooltip(): void {
    this.tooltipVisible = false;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    WithToolTip: typeof WithToolTip;
  }
}
