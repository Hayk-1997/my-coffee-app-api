module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'extends': 'eslint:recommended',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    // Catch problematic imports. https://material-ui.com/guides/minimizing-bundle-size/#option-1
    'no-restricted-imports': [
      'error',
      {
        'patterns': ['@material-ui/*/*/*', '!@material-ui/core/test-utils/*']
      }
    ],
    'no-multi-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'indent': ['error', 2],
    'prefer-const': ['error', {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false
    }]
  }
};