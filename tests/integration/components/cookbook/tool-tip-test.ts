import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, type TestContext } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

interface Context extends TestContext {
  buttonElement: HTMLButtonElement | undefined;
  showTooltip: boolean;
  handleMouseOver: () => void;
  handleMouseLeave: () => void;
  setButtonElement: (element: HTMLButtonElement) => void;
}

module('Integration | Component | cookbook/tool-tip', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: Context) {
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
    await render<Context>(hbs`
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
        {{#if this.buttonElement}}
          <ToolTip @attachTo={{this.buttonElement}} data-test-tooltip>
            More Information
          </ToolTip>
        {{/if}}
      {{/if}}
    `);

    assert.dom('[data-test-tooltip]').doesNotExist();

    await triggerEvent('[data-test-button]', 'mouseover');

    assert.dom('[data-test-tooltip]').exists();

    await triggerEvent('[data-test-button]', 'mouseleave');

    assert.dom('[data-test-tooltip]').doesNotExist();
  });

  test('wrapping an element with a tooltip component', async function (assert) {
    await render<Context>(hbs`
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
