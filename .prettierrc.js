'use strict';

module.exports = {
  singleQuote: true,
  overrides: [
    {
      files: ['*.css', '*.hbs', '*.json', '*.yml'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
