module.exports = {
  parser: 'babel-eslint',
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'prettier/prettier': 'error'
  },
  plugins: ['react', 'prettier', 'jsx-a11y'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
};
