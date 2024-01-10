# ember-popper-modifier

An Ember [modifier](https://guides.emberjs.com/release/components/template-lifecycle-dom-and-modifiers/) for working with [Popper.js](https://popper.js.org/).

## Compatibility

- Ember.js v4.8 or above
- Ember CLI v4.8 or above
- Node.js v18 or above

## Installation

```
ember install ember-popper-modifier
```

## Usage

This addon provides Ember modifiers that interfaces with the Popper.js library. It handles creating Popper instances as well as configuring them as options are updated.

Popper.js operates on two elements at the same time:

1. The "reference" element, which is the one the tooltip is positioned relative to
2. The "popper" element, which is the one that floats.

Two modifiers are provided, depending on which element you want to apply the modifier to and which you want to pass as a reference:

- `{{popper}}` is applied on the reference element and given the tooltip as an argument
- `{{popper-tooltip}}` is applied on the tooltip element and passed the reference as an argument

Aside from that difference, the modifiers are identical. Thus, the examples below will only show the usage of `{{popper}}`; know that all of the same principles and options work for `{{popper-tooltip}}` as well.

More information WIP.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
