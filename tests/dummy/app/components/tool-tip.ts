import templateOnlyComponent from '@ember/component/template-only';
import type { Placement as PopperPlacement } from '@popperjs/core';

export interface ToolTipSignature {
  Args: {
    Named: {
      attachTo: HTMLElement;
      placement?: PopperPlacement;
    };
  };
  Blocks: {
    default: [];
  };
  Element: HTMLSpanElement;
}

const ToolTip = templateOnlyComponent<ToolTipSignature>();

export default ToolTip;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    ToolTip: typeof ToolTip;
  }
}
