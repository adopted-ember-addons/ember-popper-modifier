import type PopperModifier from './modifiers/popper';
import type PopperModifierHelper from './helpers/popper-modifier';
import type PopperTooltipModifier from './modifiers/popper-tooltip';

export default interface PopperModifierRegistry {
  popper: typeof PopperModifier;
  'popper-modifier': typeof PopperModifierHelper;
  'popper-tooltip': typeof PopperTooltipModifier;
}
