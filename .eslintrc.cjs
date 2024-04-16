module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended-type-checked',
    // 'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  rules: {
    /**
     * Specify how to define React function components
     * Only allow named arrow functions
     * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
     * @example
     * 🟢 const Home = () => <main>Hello World!</main>;
     * @example
     * 🔴 function Home() {
     *  　  return <main>Hello World!</main>;
     * 　　}
     */
    /**
     * Specify the value of the JSX boolean attribute
     * Eliminate the need for explicit boolean attribute notation
     * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
     * @example
     * 🟢 <MyComponent myProp />
     * @example
     * 🔴 <MyComponent myProp={true} />
     */
    'react/jsx-boolean-value': 'error',
    /**
     * Specify the use of self-terminating tags
     * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
     * @example
     * 🟢 <MyComponent />
     * @example
     * 🔴 <MyComponent></MyComponent>
     */
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
  },
};
