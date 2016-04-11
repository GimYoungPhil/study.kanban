# 3. Webpack and React

## 3.1 What is React?
A JavaScript Library for Building User Interfaces.

- JSX and Virtual DOM
- JSX vs. HTML
- Better with Friends

## 3.2 Babel
JavaScript compiler.

### Configuring babel-loader

```
$ npm i babel-loader babel-core --save-dev
```

```js
...
const common = {
  entry: {
    app: PATHS.app
  },
  // Add resolve.extensions.
  // '' is needed to allow imports without an extension.
  // Note the .'s before extensions as it will fail to match without!!!
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      },
      // Set up jsx. This accepts js too thanks to RegExp
      {
        test: /\.jsx?$/,
        // Enable caching for improved performance during development
        // It uses default OS directory by default. If you need something
        // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
        loaders: ['babel?cacheDirectory'],
        // Parse only app files! Without this it will go through entire project.
        // In addition to being slow, that will most likely result in an error.
        include: PATHS.app
      }
    ]
  }
};
...
```

### Setting Up .babelrc

```
$ npm i babel-preset-es2015 babel-preset-react --save-dev
```

```
$ npm i babel-preset-survivejs-kanban --save-dev
```

.babelrc
```
{
  "presets": [
    "es2015",
    "react",
    "survivejs-kanban"
  ]
}
```

## 3.3 Defining Your Own Babel Presets

### Using Babel for Webpack Configuration

## 3.4 Alternative Loader Declarations

## 3.5 Developing the First React View
