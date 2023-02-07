import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { getComputePositionPromiseForElement } from 'ember-popper-modifier';

module('Integration | Modifier | floating-ui', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
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
  });

  test('it attaches a tooltip to an element', async function (assert) {
    await render(hbs`
      <span style="position: absolute; top: 0; left: 0;" {{did-insert this.setTooltipElement}}>
        Tooltip!
      </span>
      <span {{floating-ui this.tooltipElement}}>
        Reference!
      </span>
    `);

    // Check that the tooltip has Floating Ui styles applied
    assert
      .dom(this.tooltipElement)
      .doesNotHaveStyle({ top: '0px', left: '0px' });
  });

  test('the computePositionReturn for the element can be looked up', async function (assert) {
    await render(hbs`
      <span style="position: absolute" {{did-insert this.setTooltipElement}}>
        Tooltip!
      </span>
      <span {{did-insert this.setReferenceElement}} {{floating-ui this.tooltipElement}}>
        Reference!
      </span>
    `);

    const computePositionReturn = await getComputePositionPromiseForElement(
      this.tooltipElement
    );

    assert.ok(computePositionReturn, 'Returns a computePositionReturn');
  });

  test('it can configure positional options on the Floating UI element', async function (assert) {
    assert.expect(2);
    this.set('floatingUiOptions', { placement: 'right' });

    await render(hbs`
      <span {{did-insert this.setTooltipElement}}>
        Tooltip!
      </span>
      <span {{floating-ui this.tooltipElement this.floatingUiOptions}}>
        Reference!
      </span>
    `);

    await assert.waitFor(async () => {
      const computePositionReturn = await getComputePositionPromiseForElement(
        this.tooltipElement
      );

      assert.strictEqual(
        computePositionReturn.placement,
        this.floatingUiOptions.placement,
        'Passed placement configuration to Floating Ui'
      );
    });

    this.set('floatingUiOptions', { placement: 'bottom-start' });

    await assert.waitFor(async () => {
      const computePositionReturn = await getComputePositionPromiseForElement(
        this.tooltipElement
      );

      assert.strictEqual(
        computePositionReturn?.placement,
        this.floatingUiOptions.placement,
        'Updated placement configuration'
      );
    });
  });

  module('adding middleware', function () {
    test('can apply a single middleware', async function (assert) {
      await render(hbs`
        <span {{did-insert this.setTooltipElement}}>
          Tooltip!
        </span>
        <span
          {{did-insert this.setReferenceElement}}
          {{floating-ui this.tooltipElement middleware=(floating-ui-middleware 'offset' options=2)}}
        >
          Reference!
        </span>
      `);

      const { middlewareData } = await getComputePositionPromiseForElement(
        this.tooltipElement
      );

      assert.deepEqual(
        middlewareData.offset,
        { x: 0, y: 2 },
        'Offset middleware applied'
      );
    });

    test('can apply an array of middleware', async function (assert) {
      await render(hbs`
        <span {{did-insert this.setTooltipElement}}>
          Tooltip!
        </span>
        <span
          {{did-insert this.setReferenceElement}}
          {{floating-ui this.tooltipElement middleware=(array (floating-ui-middleware 'offset' options=2))}}
        >
          Reference!
        </span>
      `);

      const { middlewareData } = await getComputePositionPromiseForElement(
        this.tooltipElement
      );

      assert.deepEqual(
        middlewareData.offset,
        { x: 0, y: 2 },
        'Offset middleware applied'
      );
    });

    test('can apply middleware as positional params', async function (assert) {
      await render(hbs`
        <span {{did-insert this.setTooltipElement}}>
          Tooltip!
        </span>
        <span
          {{did-insert this.setReferenceElement}}
          {{floating-ui this.tooltipElement (floating-ui-middleware 'offset' options=2)}}
        >
          Reference!
        </span>
      `);

      const { middlewareData } = await getComputePositionPromiseForElement(
        this.tooltipElement
      );

      assert.deepEqual(
        middlewareData.offset,
        { x: 0, y: 2 },
        'Offset middleware applied'
      );
    });

    test('floating element is updated when a middleware configuration is updated', async function (assert) {
      this.distance = 0;

      await render(hbs`
        <span {{did-insert this.setTooltipElement}}>
          Tooltip!
        </span>
        <span
          {{did-insert this.setReferenceElement}}
          {{floating-ui this.tooltipElement middleware=(floating-ui-middleware 'offset' options=this.distance)}}
        >
          Reference!
        </span>
      `);

      const { middlewareData } = await getComputePositionPromiseForElement(
        this.tooltipElement
      );

      assert.deepEqual(
        middlewareData.offset,
        { x: 0, y: 0 },
        'Offset middleware applied with initial configuration'
      );

      this.set('distance', 10);

      const { middlewareData: newMiddlewareData } =
        await getComputePositionPromiseForElement(this.tooltipElement);

      assert.deepEqual(
        newMiddlewareData.offset,
        { x: 0, y: 10 },
        'Offset middleware updated to reflect new configuration'
      );
    });
  });
});
