module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'prettier', // 关闭与 Prettier 冲突的规则
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // 可以添加自定义规则
    'no-console': 'warn',
    'no-unused-vars': 'warn',
  },
}