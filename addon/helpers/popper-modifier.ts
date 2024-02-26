import { helper } from '@ember/component/helper';
import { createModifier, type PopperModifierDescription } from '../index';
import type { Modifier as PopperModifier } from '@popperjs/core';

type PopperModifierOptions = Partial<
  PopperModifier<unknown, { [key: string]: unknown }>
>['options'];

export interface PopperSignature {
  Args: {
    Positional: [string, ...PopperModifierOptions[]];
    Named: PopperModifierOptions;
  };
  Return: PopperModifierDescription;
}

export function buildPopperModifier(
  [name, positionalOptions]: PopperSignature['Args']['Positional'],
  optionsHash: PopperSignature['Args']['Named'],
) {
  const options = {
    ...positionalOptions,
    ...optionsHash,
  };

  return createModifier({
    name,
    options,
  });
}

export default helper<PopperSignature>(buildPopperModifier);
