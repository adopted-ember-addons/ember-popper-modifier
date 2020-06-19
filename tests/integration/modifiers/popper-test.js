import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Modifier | popper", function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.setTooltipElement = (element) => {
      this.set("tooltipElement", element);
    };
  });

  test("it attaches a tooltip to an element", async function (assert) {
    await render(hbs`
      <span data-test-tooltip {{did-insert this.setTooltipElement}}>
        Tooltip!
      </span>
      <span data-test-reference {{popper this.tooltipElement}}>
        Reference!
      </span>
    `);

    // Check that the tooltip has Popper styles applied
    assert.dom(this.tooltipElement).hasStyle({ position: "absolute" });
  });

  test("it can configure options on the Popper", async function (assert) {
    this.set("placement", "right");

    await render(hbs`
      <span data-test-tooltip {{did-insert this.setTooltipElement}}>
        Tooltip!
      </span>
      <span data-test-reference {{popper this.tooltipElement placement=this.placement}}>
        Reference!
      </span>
    `);

    await assert.waitFor(() => {
      assert
        .dom(this.tooltipElement)
        .hasAttribute(
          "data-popper-placement",
          this.placement,
          "Passed placement configuration to Popper"
        );
    });

    this.set("placement", "bottom-start");

    await assert.waitFor(() => {
      assert
        .dom(this.tooltipElement)
        .hasAttribute(
          "data-popper-placement",
          this.placement,
          "Updated Popper options"
        );
    });
  });
});
