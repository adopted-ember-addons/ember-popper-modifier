import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Modifier | popper-tooltip", function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.setReferenceElement = (element) => {
      this.set("referenceElement", element);
    };
  });

  test("it attaches a tooltip to an element", async function (assert) {
    await render(hbs`
      <span data-test-tooltip {{popper-tooltip this.referenceElement}}>
        Tooltip!
      </span>
      <span data-test-reference {{did-insert this.setReferenceElement}}>
        Reference!
      </span>
    `);

    // Check that the tooltip has Popper styles applied
    assert.dom("[data-test-tooltip]").hasStyle({ position: "absolute" });
  });
});
