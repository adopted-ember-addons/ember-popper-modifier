import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { isArray } from '@ember/array';
import { isEmpty } from '@ember/utils';
import { assert } from '@ember/debug';
import { computePosition, autoUpdate } from '@floating-ui/dom';
import {
  begin as begingWrappingInRunLoop,
  end as endWrappingInRunLoop,
} from '@ember/runloop';
import { action } from '@ember/object';
import { setComputePositionPromiseForElement, isMiddleware } from './index';

function positionArrow(arrowMiddleware, arrowMiddlewareData) {
  const { x, y } = arrowMiddlewareData;
  const { element: arrowElement } = arrowMiddleware.options;

  Object.assign(arrowElement.style, {
    left: x != null ? `${x}px` : '',
    top: y != null ? `${y}px` : '',
  });
}

function getFloatingUiOptions(positional, named) {
  // Get an array of just positional "options"; first item is an element reference
  const positionalArguments = positional.slice(1).filter((arg) => Boolean(arg));

  // Positional args that are not middleware should be treated as full "options" objects
  const allPositionalOptions = positionalArguments.filter(
    (arg) => !isMiddleware(arg)
  );

  // Positional args that are middleware will extend the rest of the configuration
  const allPositionalMiddleware = positionalArguments.filter((arg) =>
    isMiddleware(arg)
  );

  const { autoUpdateOptions, ...namedOptions } = named;
  const computePositionConfig = {
    ...allPositionalOptions.reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {}),
    ...namedOptions,
  };

  // Ensure that the `middleware` is always an array
  const middlewareArray = isEmpty(computePositionConfig.middleware)
    ? []
    : isArray(computePositionConfig.middleware)
    ? computePositionConfig.middleware
    : [computePositionConfig.middleware];

  computePositionConfig.middleware = [
    ...middlewareArray,
    ...allPositionalMiddleware,
  ];

  return { autoUpdateOptions, computePositionConfig };
}

function cleanup(instance) {
  instance.cleanupFn?.();
}

export default class FloatingUiModifier extends Modifier {
  /** @type {HTMLElement} */
  // eslint-disable-next-line getter-return
  get floatingElement() {
    assert('Must implement `floatingElement` property', false);
  }

  /** @type {HTMLElement} */
  // eslint-disable-next-line getter-return
  get referenceElement() {
    assert('Must implement `referenceElement` property', false);
  }

  @action
  updatePosition() {
    let { computePositionConfig } = this;
    let computePositionPromise = computePosition(
      this.referenceElement,
      this.floatingElement,
      computePositionConfig
    );
    begingWrappingInRunLoop();

    setComputePositionPromiseForElement(
      this.floatingElement,
      computePositionPromise
    );

    computePositionPromise.then((computePositionReturn) => {
      const { x, y, middlewareData } = computePositionReturn;

      Object.assign(this.floatingElement.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      if (middlewareData.arrow) {
        positionArrow(
          computePositionConfig.middleware.find((i) => i.name === 'arrow'),
          middlewareData.arrow
        );
      }
      endWrappingInRunLoop();
    });
  }

  modify(element, positionalArgs, namedArgs) {
    const { autoUpdateOptions, computePositionConfig } = getFloatingUiOptions(
      positionalArgs,
      namedArgs
    );

    this.primaryElement = element;
    this.secondaryElement = positionalArgs[0];
    this.computePositionConfig = computePositionConfig;

    // Compute position and assign it to the floating element
    // once all required arguments are present
    if (this.referenceElement && this.floatingElement) {
      if (autoUpdateOptions) {
        this.cleanupFn = autoUpdate(
          this.referenceElement,
          this.floatingElement,
          this.updatePosition,
          autoUpdateOptions
        );
      } else {
        this.updatePosition();
      }
    }
  }

  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }
}
