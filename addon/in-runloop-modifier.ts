import {
  begin as begingWrappingInRunLoop,
  end as endWrappingInRunLoop,
} from '@ember/runloop';
import {
  type Instance as PopperInstance,
  type Modifier as PopperModifier,
} from '@popperjs/core';

// This set keeps track of whether a particular Popper instance is currently in an update
// loop that is tracked by the Ember Run Loop
//
// This is necessary in order to ensure that Popper changes are known to the Ember run loop,
// and helps make sure that, for example, Ember's test helpers wait for any re-positioning to
// take place before advancing
//
// We need to keep track of whether a run loop has already been started for an update cycle
// because the number of "starts" and "ends" of the Popper update look do not always match;
// if we "start" again before we have "ended", then we can open an Ember run loop that is never
// closed, which will cause our application to hang.
const POPPER_IN_RUN_LOOP: WeakSet<PopperInstance> = new WeakSet();

const FIRST_PHASE = 'beforeRead';
const LAST_PHASE = 'afterWrite';

export const beginRunLoopModifier: Partial<
  PopperModifier<'ember-runloop-begin', { [key: string]: unknown }>
> = {
  name: 'ember-runloop-begin',
  phase: FIRST_PHASE,
  enabled: true,
  fn({ instance }: { instance: PopperInstance }) {
    if (!POPPER_IN_RUN_LOOP.has(instance)) {
      POPPER_IN_RUN_LOOP.add(instance);

      begingWrappingInRunLoop();
    }
  },
};

export const endRunLoopModifier: Partial<
  PopperModifier<'ember-runloop-end', { [key: string]: unknown }>
> = {
  name: 'ember-runloop-end',
  phase: LAST_PHASE,
  enabled: true,
  fn({ instance }: { instance: PopperInstance }) {
    if (POPPER_IN_RUN_LOOP.has(instance)) {
      POPPER_IN_RUN_LOOP.delete(instance);

      endWrappingInRunLoop();
    }
  },
};
