'use strict';

module.exports = {
  singleQuote: true,
  overrides: [
    {
      files: ['*.css', '*.hbs'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
