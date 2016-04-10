# 2. Developing with Webpack

##  2.1 Setting Up the project

프로젝트 폴더 생성, 폴더 이동, package.json 파일 설정
```
$ mkdir kanban_app
$ cd kanban_app
$ npm init -y
```

.gitignore 파일 생성 및 내용 추가
```
node_modules

.DS_Store

*.log
```

## 2.2 Installing Webpack

```
$ npm i webpack --save-dev
```

package.json 파일, webpack 버전 확인
```json
...
  "devDependencies": {
    "webpack": "^1.12.14"
  }
...
```

프로젝트 폴더
```
/kanban_app
  /.git
  /node_modules
    /.bin
      - webpack
    /webpack
      /bin
        - webpack.js
  - .gitignore
  - pakcage.json
  - README.md
```
./node_modules/.bin/webpack -> ./node_modules/webpack/bin/webpack.js

webpack 실행
```
$ node_modules/.bin/webapck
webpack 1.12.14
Usage: https://webpack.github.io/docs/cli.html

Options:
  --help, -h, -?
  --config
  --context
  --entry
...
--display-cached-assets
--display-reasons, --verbose, -v

Output filename not configured.
```

## 2.3 Directory Structure

```
/kanban_app
  /app
    - index.js
    - component.js
  /build
    - index.html
  - .gitignore
  - package.json
  - README.md
  - webpack.config.js
```

/app 폴더의 파일들(index.js, component.js)은 -> /build/bundle.js 파일로 번들링 된다.
관련된 사항은 webpack.config.js에 설정함.


## 2.4 Setting Up Assets

app/component.js
```js
module.exports = function () {
  var element = document.createElement('h1');
  element.innerHTML = 'Hello world';
  return element;
};
```

app/index.js
```js
var component = require('./component');
var app = document.createElement('div');

document.body.appendChild(app);

app.appendChild(component());
```

build/index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Kanban app</title>
  </head>
  <body>
    <div id="app"></div>

    <script src="./bundle.js"></script>
  </body>
</html>
```

## 2.5 Setting Up Webpack Configuration

```js
const path = require('path');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  // Entry accepts a path or an object of entries. We'll be using the
  // latter form given it's convenient with more complex configurations.
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  }
};
```

webpack 실행
```
$ node_modules/.bin/webpack
Hash: 5ff705b73692cab9d30f
Version: webpack 1.12.14
Time: 40ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.75 kB       0  [emitted]  app
   [0] ./app/index.js 145 bytes {0} [built]
   [1] ./app/component.js 137 bytes {0} [built]
$
```

브라우저 확인
```
$ open ./build/index.html
```

## 2.6 Adding a Build Shortcut

package.json
```json
...
  "scripts": {
    "build": "webpack"
  },
...
```

```
$ npm run build
```


## 2.7 Setting Up webpack-dev-server

```
$ npm i webpack-dev-server --save-dev
```

package.json
```json
...
  "devDependencies": {
    "webpack": "^1.12.14",
    "webpack-dev-server": "^1.14.1"
  }
...
```

package.json
```json
...
  "scripts": {
    "build": "webpack",
    "start": "webpack-dev-server --content-base build"
  },
...
```

```
$ npm run start

> study.kanban@1.0.0 start /Users/phil/web/study.kanban
> webpack-dev-server --content-base build

http://localhost:8080/webpack-dev-server/
webpack result is served from /
content is served from /Users/phil/web/study.kanban/build
Hash: 71c2e5b016455e6de197
Version: webpack 1.12.14
Time: 52ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.75 kB       0  [emitted]  app
chunk    {0} bundle.js (app) 284 bytes [rendered]
    [0] ./app/index.js 145 bytes {0} [built]
    [1] ./app/component.js 139 bytes {0} [built]
webpack: bundle is now VALID.
```

Splitting Up the Configuration
설정 분리하기

```
$ npm i webpack-merge --save-dev
```

package.json
```json
...
  "devDependencies": {
    "webpack": "^1.12.14",
    "webpack-dev-server": "^1.14.1",
    "webpack-merge": "^0.8.4"
  }
...
```

webpack.config.js
```js
const path = require('path');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  }
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {});
}

if (TARGET === 'build') {
  module.exports = merge(common, {});
}
```

Configuring Hot Module Replacement (HMR)

webpack.config.js
```js
...
const webpack = require('webpack');

...
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
...
```

package.json
```json
...
  "scripts": {
    "build": "webpack",
    "start": "webpack-dev-server"
  },
...
```

```
$ npm run start

> study.kanban@1.0.0 start /Users/phil/web/study.kanban
> webpack-dev-server

http://localhost:8080/
webpack result is served from /
content is served from /Users/phil/web/study.kanban/build
404s will fallback to /index.html

webpack: bundle is now VALID.
```


## 2.8 Refreshing CSS

```
$ npm i css-loader style-loader --save-dev
```

package.json
```json
...
  "devDependencies": {
    "css-loader": "^0.23.1",
    "style-loader": "^0.13.1",
    "webpack": "^1.12.14",
    "webpack-dev-server": "^1.14.1",
    "webpack-merge": "^0.8.4"
  }
...
```

webpack.config.js
```js
...
const common = {
  entry: {
    app: PATHS.app
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
      }
    ]
  }
};
...
```

## 2.9 Setting Up Initial CSS

app/main.css
```css
body {
  background: cornsilk;
}
```

## 2.10 Enabling Sourcemaps

```js
...
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    ...
  });
}
...
```

## 2.11 Avoiding npm install by Using npm-install-webpack-plugin

```
$ npm i npm-install-webpack-plugin --save-dev
```

webpack.config.js
```js
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

...

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    ...
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true
      })
    ]
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {});
}
```

## 2.12 Linting the Project

## 2.13 Conclusion
