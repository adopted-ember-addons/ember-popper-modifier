import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { buildPopperModifier } from 'ember-popper-modifier/helpers/popper-modifier';

module('Unit | Helper | popper-modifier', function (hooks) {
  setupTest(hooks);

  test('it creates an object like a Popper modifier', function (assert) {
    const result = buildPopperModifier(['foo']);

    assert.deepEqual(
      result,
      { name: 'foo', options: {} },
      'It creates a modifier-like object'
    );
  });

  test('positional options are included in the object', function (assert) {
    const result = buildPopperModifier(['foo', { foo: 'bar' }]);

    assert.deepEqual(
      result,
      { name: 'foo', options: { foo: 'bar' } },
      'It creates a modifier-like object'
    );
  });

  test('named options are included in the object', function (assert) {
    const result = buildPopperModifier(['foo'], { foo: 'bar' });

    assert.deepEqual(
      result,
      { name: 'foo', options: { foo: 'bar' } },
      'It creates a modifier-like object'
    );
  });

  test('named options take precedence', function (assert) {
    const result = buildPopperModifier(['foo', { foo: 'bar' }], { foo: 'baz' });

    assert.deepEqual(
      result,
      { name: 'foo', options: { foo: 'baz' } },
      'The named option overrides the positional one'
    );
  });
});
