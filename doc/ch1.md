# 1. Webpack Compared

## 1.1 The Rise of the SPAs

## 1.2 Task Runners and Bundlers

## 1.3 Make

[Building JavaScript projects with Make](https://blog.jcoglan.com/2014/02/05/building-javascript-projects-with-make/)

## 1.4 Grunt

[SGrunt](http://gruntjs.com/) : Task Runner

## 1.5 Gulp

[Gulp](http://gulpjs.com/) : Streaming build system

## 1.6 Browserify

[Browserify](http://browserify.org/)

## 1.7 Webpack

[Webpack](https://webpack.github.io/) : Module Bundler

## 1.8 JSPM

[jspm](http://jspm.io/) : browser package management

## 1.9 Why Use Webpack?

- Hot Module Replacement
- Bundle Splitting
- Asset Hashing
- Loaders and Plugins

## 1.10 Module Formats Supported by Webpack

- CommonJS
```js
var MyModule = require('./MyModule');

// export at module root
module.exports = function() { ... };

// alternatively, export individual functions
exports.hello = function() {...};
```
- ES6
```js
import MyModule from './MyModule.js';

// export at module root
export default function () { ... };

// or export as module function,
// you can have multiple of these per
module export function hello() {...};
```
- AMD
```js
define(['./MyModule.js'], function (MyModule) {
  // export at module root
  return function() {};
});
// or
define(['./MyModule.js'], function (MyModule) {
  // export as module function
  return {
    hello: function() {...}
  };
});
```

## 1.11 Conclusion
