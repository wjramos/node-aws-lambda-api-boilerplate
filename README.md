# Lambda Boilerplate (Node)
Get started quick building and deploying a full Node.js application quick and painlessly on AWS Lambda

### Features

✓ Author in [ES2015](https://babeljs.io/docs/learn-es2015/) (including the unit tests)
✓ Export as ES5 & [UMD](https://github.com/umdjs/umd)
✓ [Mocha](http://mochajs.org/)-[Chai](http://chaijs.com/)-[Sinon](http://sinonjs.org/) testing stack

### Basic Guide

Write your code in `src`.

Run `npm run build` to compile the source into a distributable format.

Put your unit tests in `test`. The `npm test` command runs the tests using Node.

### npm Scripts

- `npm test` - Lint the library and tests, then run the unit tests
- `npm run lint` - Lint the source and unit tests
- `npm run watch` - Continuously run the unit tests as you make changes to the source
   and test files themselves
- `npm run build` - Lint then build the library
- `npm run coverage` - Generate a coverage report

### Linting

This boilerplate uses [ESLint](http://eslint.org/) to lint your source. To
change the rules, edit the `.eslintrc` files in the root directory, respectively.

Given that your unit tests typically follow different rules from your library
code, it makes sense to lint them against a separate ESLint configuration. For
this reason, a separate, unit-test specific `.eslintrc` can be found in the
`test` directory.

### FAQ

<details>
<summary>
  **What Babel features are supported?**
</summary>

Nearly all Babel features *should* be supported by this boilerplate.

If you're using certain experimental features, like class properties, async-await,
types, or decorators, then you'll need to install [babel-eslint](https://github.com/babel/babel-eslint)
to use as the parser for ESLint.

If you're still getting an error, follow these steps:

1. Double check to make sure that you're not typoing the new syntax ;)
2. Determine what task is failing (for instance, is it ESLint?)
3. Check that project's issue tracker to see if it is a known issue
4. If it isn't, then open an issue here

Because of the fact that dependencies of this boilerplate, such as ESLint, are maintained by a team separate from Babel, there
may be a delay between when a new feature is added to Babel and when those other libraries add support for it.
</details>

<details>
<summary>
  **When should I consider using this boilerplate?**
</summary>

This library is ideal for libraries that export a single file.
</details>

<details>
<summary>
  **What's the cost of transpiling?**
</summary>

A thorough analysis of this question can be found
[here](https://github.com/samccone/The-cost-of-transpiling-es2015-in-2016).
</details>

<details>
<summary>
  **How can I use this with React?**
</summary>

Do you wish to use JSX? If the answer is no, then there is nothing that you need
to do. If the answer is yes, then you need to install the `babel-preset-react`,
and add it to your .babelrc file.

An example .babelrc file with this preset configured can be seen
[here](https://github.com/jmeas/moolah/blob/ee451a9395b3169378f1df506d3a6142201e5306/.babelrc#L5).
</details>

<details>
<summary>
  **How can I export my library without the "default" property?**
</summary>

As stated here, https://github.com/59naga/babel-plugin-add-module-exports:
> Babel@6 doesn't export default module.exports any more
So just `npm install babel-plugin-add-module-exports --save-dev` and then add it to your .babelrc file:
```
{
  "presets": ["latest"],
  "plugins": [
    "add-module-exports",
    "transform-es2015-modules-umd"
  ]
}
```
</details>

### Customizing

This boilerplate is, to a degree, customizable. To make changes,
find what you're looking to do below and follow the instructions.

#### I want to change the primary source file

The primary source file for the library is `src/index.js`. Only the files that this
file imports will be included in the final build. To change the name of this entry file:

1. Rename the file
2. Update the value of `entryFileName` in `package.json` under `babelBoilerplateOptions`

#### I want to change the destination file name or directory

1. Update `main` in `package.json`

#### I want to change what variable my module exports

`MyLibrary` is the name of the variable exported from this boilerplate. You can change this by following
these steps:

1. Ensure that the variable you're exporting exists in your scripts
2. Update the value of `exportVarName` in `package.json` under `babelBoilerplateOptions`
3. Check that the unit tests have been updated to reference the new value

#### I don't want to export a variable

When prompted for the name of the library's main variable, leave the response empty.

#### My library depends on an external module

Install the module and use it in your scripts like usual. Then, go into the Gulpfile and
add the [`externals`](https://webpack.github.io/docs/configuration.html#externals) to the
Webpack build options.

If you want to access the module itself in your unit test files, you will need to set up the
test environment to support the module. To do this:

1. Load the module in the [test setup file](https://github.com/babel/generator-babel-boilerplate/blob/master/test/setup/setup.js).
2. Add any imported variables to globals object in the
[test globals JSON](https://github.com/babel/generator-babel-boilerplate/blob/master/test/setup/.globals.js).
