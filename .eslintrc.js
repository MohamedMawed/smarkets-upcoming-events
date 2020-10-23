module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true,
    browser: true,
  },
  rules: {
    'react/prefer-stateless-function': 1,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'global-require': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'react/prop-types': ['error', { ignore: ['navigation'] }],
    curly: [2, 'all'],
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
  },
};
