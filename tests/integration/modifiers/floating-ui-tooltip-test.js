import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { getComputePositionPromiseForElement } from 'ember-popper-modifier';

module('Integration | Modifier | floating-ui-tooltip', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.setReferenceElement = (element) => {
      this.set('referenceElement', element);
    };
  });

  test('it attaches a tooltip to an element', async function (assert) {
    await render(hbs`
      <span
        {{!-- template-lint-disable no-inline-styles --}}
        style="position: absolute; top: 0; left: 0;"
        data-test-tooltip
        {{floating-ui-tooltip this.referenceElement}}
      >
        Tooltip!
      </span>
      <span data-test-reference {{did-insert this.setReferenceElement}}>
        Reference!
      </span>
    `);

    // Check that the tooltip has Floating UI styles applied
    assert
      .dom('[data-test-tooltip]')
      .doesNotHaveStyle({ top: '0px', left: '0px' });
  });

  test('the computePosition return for the element can be looked up', async function (assert) {
    await render(hbs`
      <span data-test-tooltip {{floating-ui-tooltip this.referenceElement}}>
        Tooltip!
      </span>
      <span data-test-reference {{did-insert this.setReferenceElement}}>
        Reference!
      </span>
    `);

    const element = find('[data-test-tooltip]');
    const computePositionReturn = await getComputePositionPromiseForElement(
      element
    );

    assert.ok(computePositionReturn, 'Returns a computePosition result');
  });
});
