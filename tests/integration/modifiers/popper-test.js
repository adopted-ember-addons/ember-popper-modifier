import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { find, render } from "@ember/test-helpers";
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

  test("it can configure named options on the Popper", async function (assert) {
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

  test("it can configure positional options on the Popper", async function (assert) {
    this.set("popperOptions", { placement: "right" });

    await render(hbs`
      <span data-test-tooltip {{did-insert this.setTooltipElement}}>
        Tooltip!
      </span>
      <span data-test-reference {{popper this.tooltipElement this.popperOptions}}>
        Reference!
      </span>
    `);

    await assert.waitFor(() => {
      assert
        .dom(this.tooltipElement)
        .hasAttribute(
          "data-popper-placement",
          this.popperOptions.placement,
          "Passed placement configuration to Popper"
        );
    });

    this.set("popperOptions", { placement: "bottom-start" });

    await assert.waitFor(() => {
      assert
        .dom(this.tooltipElement)
        .hasAttribute(
          "data-popper-placement",
          this.popperOptions.placement,
          "Updated Popper options"
        );
    });
  });

  module("adding modifiers", function () {
    test("can apply a single modifier", async function (assert) {
      await render(hbs`
        <span data-test-tooltip {{did-insert this.setTooltipElement}}>
          <span data-popper-arrow>Arrow</span>
          Tooltip!
        </span>
        <span
          data-test-reference
          {{popper this.tooltipElement modifiers=(popper-modifier 'arrow')}}
        >
          Reference!
        </span>
      `);

      assert
        .dom("[data-popper-arrow]")
        .hasAttribute("style", { any: true }, "Arrow modifier applied");
    });

    test("can apply an array of modifiers", async function (assert) {
      await render(hbs`
        <span data-test-tooltip {{did-insert this.setTooltipElement}}>
          <span data-popper-arrow>Arrow</span>
          Tooltip!
        </span>
        <span
          data-test-reference
          {{popper this.tooltipElement modifiers=(array (popper-modifier 'arrow'))}}
        >
          Reference!
        </span>
      `);

      assert
        .dom("[data-popper-arrow]")
        .hasAttribute("style", { any: true }, "Arrow modifier applied");
    });

    test("popper is updated when a modifier configuration is updated", async function (assert) {
      this.skidding = 0;
      this.distance = 0;

      await render(hbs`
        <span data-test-tooltip {{did-insert this.setTooltipElement}}>
          Tooltip!
        </span>
        <span
          data-test-reference
          {{popper this.tooltipElement modifiers=(popper-modifier 'offset' options=(hash offset=(array this.skidding this.distance)))}}
        >
          Reference!
        </span>
      `);

      const { top: originalTopSetting } = find(
        "[data-test-tooltip]"
      ).getBoundingClientRect();

      this.set("distance", 10);

      await assert.waitFor(() => {
        assert.greaterThan(
          find("[data-test-tooltip]").getBoundingClientRect().top,
          originalTopSetting
        );
      });
    });
  });
});
