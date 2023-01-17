import QUnit from 'qunit';

QUnit.extend(QUnit.assert, {
  greaterThan(
    test,
    value,
    message = `Expected ${test} to be greater than ${value}`
  ) {
    this.pushResult({
      result: test > value,
      actual: test,
      expected: value,
      message,
    });
  },

  lessThan(test, value, message = `Expected ${test} to be less than ${value}`) {
    this.pushResult({
      result: test < value,
      actual: test,
      expected: value,
      message,
    });
  },
});
