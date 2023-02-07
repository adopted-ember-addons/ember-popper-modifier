import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { buildFloatingUiMiddleware } from 'ember-popper-modifier/helpers/floating-ui-middleware';
import { offset } from '@floating-ui/dom';
module('Unit | Helper | floating-ui-middleware', function (hooks) {
  setupTest(hooks);

  test('it creates an object like a Floating Ui middleware', function (assert) {
    const result = buildFloatingUiMiddleware(['foo']);

    assert.deepEqual(
      result,
      { name: 'foo', fn: undefined },
      'It creates a middleware-like object'
    );
  });

  test('positional options are included in the object', function (assert) {
    const fn = (x, y) => ({ x, y });
    const result = buildFloatingUiMiddleware(['foo', fn]);

    assert.deepEqual(
      result,
      { name: 'foo', fn },
      'It creates a middleware-like object'
    );
  });

  test('named options are included in the object', function (assert) {
    const fn = (x, y) => ({ x, y });
    const result = buildFloatingUiMiddleware(['foo'], { fn });

    assert.deepEqual(
      result,
      { name: 'foo', fn },
      'It creates a middleware-like object'
    );
  });

  test('named options take precedence', function (assert) {
    const fn = (x, y) => ({ x, y });
    const fn2 = (x, y) => ({ x, y });
    const result = buildFloatingUiMiddleware(['foo', fn], {
      fn: fn2,
    });

    assert.deepEqual(
      result,
      { name: 'foo', fn: fn2 },
      'The named option overrides the positional one'
    );
  });

  test('built-in middleware can be called with its name', function (assert) {
    const builtInOffsetResult = offset(10);
    const { name, options } = buildFloatingUiMiddleware(['offset', 10]);

    assert.deepEqual(
      { name, options },
      {
        name: builtInOffsetResult.name,
        options: builtInOffsetResult.options,
      },
      'Built-in middleware was called'
    );
  });
});
