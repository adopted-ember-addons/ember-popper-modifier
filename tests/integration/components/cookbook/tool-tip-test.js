import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | cookbook/tool-tip', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.showTooltip = false;
    this.handleMouseOver = () => {
      this.set('showTooltip', true);
    };
    this.handleMouseLeave = () => {
      this.set('showTooltip', false);
    };
    this.setButtonElement = (element) => {
      this.set('buttonElement', element);
    };
  });

  test('rendering a tooltip', async function (assert) {
    await render(hbs`
      <button
        type="button"
        data-test-button
        {{did-insert this.setButtonElement}}
        {{on 'mouseover' this.handleMouseOver}}
        {{on 'mouseleave' this.handleMouseLeave}}
      >
        Hover me!
      </button>

      {{#if this.showTooltip}}
        <ToolTip @attachTo={{this.buttonElement}} data-test-tooltip>
          More Information
        </ToolTip>
      {{/if}}
    `);

    assert.dom('[data-test-tooltip]').doesNotExist();

    await triggerEvent('[data-test-button]', 'mouseover');

    assert.dom('[data-test-tooltip]').exists();

    await triggerEvent('[data-test-button]', 'mouseleave');

    assert.dom('[data-test-tooltip]').doesNotExist();
  });

  test('wrapping an element with a tooltip component', async function (assert) {
    await render(hbs`
      <WithToolTip @content="More Information" data-test-tooltip as |register show hide|>
        <button
          type="button"
          data-test-button
          {{did-insert register}}
          {{on 'mouseover' show}}
          {{on 'mouseleave' hide}}
        >
          Hover me!
        </button>
      </WithToolTip>
    `);

    assert.dom('[data-test-tooltip]').doesNotExist();

    await triggerEvent('[data-test-button]', 'mouseover');

    assert.dom('[data-test-tooltip]').exists();

    await triggerEvent('[data-test-button]', 'mouseleave');

    assert.dom('[data-test-tooltip]').doesNotExist();
  });
});
