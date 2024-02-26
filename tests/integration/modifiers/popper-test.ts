import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { clearRender, render, type TestContext } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import * as td from 'testdouble';
import { getPopperForElement } from 'ember-popper-modifier';
import type {
  Options as PopperOptions,
  Placement as PopperPlacement,
} from '@popperjs/core';

interface Context extends TestContext {
  distance: number;
  placement: PopperPlacement;
  popperOptions: PopperOptions;
  referenceElement: HTMLElement;
  tooltipElement: HTMLElement;

  setReferenceElement: (element: HTMLElement) => void;
  setTooltipElement: (element: HTMLElement) => void;
}

module('Integration | Modifier | popper', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: Context) {
    this.setTooltipElement = (element) => {
      this.set('tooltipElement', element);
    };

    this.setReferenceElement = (element) => {
      this.set('referenceElement', element);
    };
  });

  hooks.afterEach(function () {
    this.set('tooltipElement', undefined);
    this.set('referenceElement', undefined);

    td.reset();
  });

  test('it attaches a tooltip to an element', async function (this: Context, assert) {
    await render<Context>(hbs`
      <span {{did-insert this.setTooltipElement}}>
        Tooltip!
      </span>
      <span {{popper this.tooltipElement}}>
        Reference!
      </span>
    `);

    // Check that the tooltip has Popper styles applied
    assert.dom(this.tooltipElement).hasStyle({ position: 'absolute' });
  });

  test('it can configure named options on the Popper', async function (this: Context, assert) {
    this.set('placement', 'right');

    await render<Context>(hbs`
      <span {{did-insert this.setTooltipElement}}>
        Tooltip!
      </span>
      <span {{popper this.tooltipElement placement=this.placement}}>
        Reference!
      </span>
    `);

    await assert.waitFor(() => {
      assert
        .dom(this.tooltipElement)
        .hasAttribute(
          'data-popper-placement',
          this.placement,
          'Passed placement configuration to Popper',
        );
    });

    this.set('placement', 'bottom-start');

    await assert.waitFor(() => {
      assert
        .dom(this.tooltipElement)
        .hasAttribute(
          'data-popper-placement',
          this.placement,
          'Updated Popper options',
        );
    });
  });

  test('the popper instance for the element can be looked up', async function (this: Context, assert) {
    await render<Context>(hbs`
      <span {{did-insert this.setTooltipElement}}>
        Tooltip!
      </span>
      <span {{did-insert this.setReferenceElement}} {{popper this.tooltipElement}}>
        Reference!
      </span>
    `);

    const popper = getPopperForElement(this.referenceElement);

    assert.ok(popper, 'Returns a Popper instance');
  });

  test('it can configure positional options on the Popper', async function (this: Context, assert) {
    this.set('popperOptions', { placement: 'right' });

    await render<Context>(hbs`
      <span {{did-insert this.setTooltipElement}}>
        Tooltip!
      </span>
      <span {{popper this.tooltipElement this.popperOptions}}>
        Reference!
      </span>
    `);

    await assert.waitFor(() => {
      assert
        .dom(this.tooltipElement)
        .hasAttribute(
          'data-popper-placement',
          this.popperOptions.placement,
          'Passed placement configuration to Popper',
        );
    });

    this.set('popperOptions', { placement: 'bottom-start' });

    await assert.waitFor(() => {
      assert
        .dom(this.tooltipElement)
        .hasAttribute(
          'data-popper-placement',
          this.popperOptions.placement,
          'Updated Popper options',
        );
    });
  });

  test('it destroys the popper instance with the modifier', async function (this: Context, assert) {
    await render<Context>(hbs`
      <span {{did-insert this.setTooltipElement}}>
        Tooltip!
      </span>
      <span {{did-insert this.setReferenceElement}} {{popper this.tooltipElement}}>
        Reference!
      </span>
    `);

    const popper = getPopperForElement(this.referenceElement);

    td.replace(popper, 'destroy');

    await clearRender();

    assert.verify(
      popper.destroy(),
      'Destroyed the Popper instance when un-mounting',
    );

    // Make sure we _actually_ destroy the popper instance
    popper.destroy();
  });

  module('adding modifiers', function () {
    test('can apply a single modifier', async function (this: Context, assert) {
      await render<Context>(hbs`
        <span {{did-insert this.setTooltipElement}}>
          Tooltip!
        </span>
        <span
          {{did-insert this.setReferenceElement}}
          {{popper this.tooltipElement modifiers=(popper-modifier 'offset' offset=(array 0 2))}}
        >
          Reference!
        </span>
      `);

      const popper = getPopperForElement(this.referenceElement);
      const offsetModifier = popper.state.orderedModifiers.find(
        (mod) => mod.name === 'offset',
      );

      assert.deepEqual(
        offsetModifier?.options?.['offset'],
        [0, 2],
        'Offset modifier applied',
      );
    });

    test('can apply an array of modifiers', async function (this: Context, assert) {
      await render<Context>(hbs`
        <span {{did-insert this.setTooltipElement}}>
          Tooltip!
        </span>
        <span
          {{did-insert this.setReferenceElement}}
          {{popper this.tooltipElement modifiers=(array (popper-modifier 'offset' offset=(array 0 2)))}}
        >
          Reference!
        </span>
      `);

      const popper = getPopperForElement(this.referenceElement);
      const offsetModifier = popper.state.orderedModifiers.find(
        (mod) => mod.name === 'offset',
      );

      assert.deepEqual(
        offsetModifier?.options?.['offset'],
        [0, 2],
        'Offset modifier applied',
      );
    });

    test('can apply modifiers as positional params', async function (this: Context, assert) {
      await render<Context>(hbs`
        <span {{did-insert this.setTooltipElement}}>
          Tooltip!
        </span>
        <span
          {{did-insert this.setReferenceElement}}
          {{popper this.tooltipElement (popper-modifier 'offset' offset=(array 0 2))}}
        >
          Reference!
        </span>
      `);

      const popper = getPopperForElement(this.referenceElement);
      const offsetModifier = popper.state.orderedModifiers.find(
        (mod) => mod.name === 'offset',
      );

      assert.deepEqual(
        offsetModifier?.options?.['offset'],
        [0, 2],
        'Offset modifier applied',
      );
    });

    test('popper is updated when a modifier configuration is updated', async function (this: Context, assert) {
      this.distance = 0;

      await render<Context>(hbs`
        <span {{did-insert this.setTooltipElement}}>
          Tooltip!
        </span>
        <span
          {{did-insert this.setReferenceElement}}
          {{popper this.tooltipElement modifiers=(popper-modifier 'offset' offset=(array 0 this.distance))}}
        >
          Reference!
        </span>
      `);

      const popper = getPopperForElement(this.referenceElement);
      let offsetModifier = popper.state.orderedModifiers.find(
        (mod) => mod.name === 'offset',
      );

      assert.deepEqual(
        offsetModifier?.options?.['offset'],
        [0, 0],
        'Offset modifier applied with initial configuration',
      );

      this.set('distance', 10);

      offsetModifier = popper.state.orderedModifiers.find(
        (mod) => mod.name === 'offset',
      );

      assert.deepEqual(
        offsetModifier?.options?.['offset'],
        [0, 10],
        'Offset modifier updated to reflect new configuration',
      );
    });
  });
});
