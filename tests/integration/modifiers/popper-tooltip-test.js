import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { getPopperForElement } from 'ember-popper-modifier';

module('Integration | Modifier | popper-tooltip', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.setReferenceElement = (element) => {
      this.set('referenceElement', element);
    };
  });

  test('it attaches a tooltip to an element', async function (assert) {
    await render(hbs`
      <span data-test-tooltip {{popper-tooltip this.referenceElement}}>
        Tooltip!
      </span>
      <span data-test-reference {{did-insert this.setReferenceElement}}>
        Reference!
      </span>
    `);

    // Check that the tooltip has Popper styles applied
    assert.dom('[data-test-tooltip]').hasStyle({ position: 'absolute' });
  });

  test('the popper instance for the element can be looked up', async function (assert) {
    await render(hbs`
      <span data-test-tooltip {{popper-tooltip this.referenceElement}}>
        Tooltip!
      </span>
      <span data-test-reference {{did-insert this.setReferenceElement}}>
        Reference!
      </span>
    `);

    const element = find('[data-test-tooltip]');
    const popper = getPopperForElement(element);

    assert.ok(popper, 'Returns a Popper instance');
  });
});
