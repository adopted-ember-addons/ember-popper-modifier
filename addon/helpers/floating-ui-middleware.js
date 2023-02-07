import { helper } from '@ember/component/helper';
import {
  offset,
  shift,
  flip,
  arrow,
  size,
  autoPlacement,
  hide,
  inline,
} from '@floating-ui/dom';
import { createMiddleware } from '../index';

let BUILT_IN_MIDDLEWARE = {
  offset,
  shift,
  flip,
  arrow,
  size,
  autoPlacement,
  hide,
  inline,
};

export function buildFloatingUiMiddleware(
  [name, ...positionalArguments],
  namedOptions
) {
  if (BUILT_IN_MIDDLEWARE[name]) {
    const [positionalOptions] = positionalArguments;
    const options = positionalOptions || namedOptions?.options;

    return createMiddleware(BUILT_IN_MIDDLEWARE[name](options));
  }

  const [positionalFn, positionalOptions] = positionalArguments;
  const options = namedOptions?.options || positionalOptions;

  return createMiddleware({
    name,
    fn: namedOptions?.fn || positionalFn,
    ...(options && { options }),
  });
}

export default helper(buildFloatingUiMiddleware);
