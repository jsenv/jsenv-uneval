# uneval

Convert value into evaluable string.

[![github package](https://img.shields.io/github/package-json/v/jsenv/jsenv-uneval.svg?logo=github&label=package)](https://github.com/jsenv/jsenv-uneval/packages)
[![npm package](https://img.shields.io/npm/v/@jsenv/uneval.svg?logo=npm&label=package)](https://www.npmjs.com/package/@jsenv/uneval)
[![github ci](https://github.com/jsenv/jsenv-uneval/workflows/ci/badge.svg)](https://github.com/jsenv/jsenv-uneval/actions?workflow=ci)
[![codecov coverage](https://codecov.io/gh/jsenv/jsenv-uneval/branch/master/graph/badge.svg)](https://codecov.io/gh/jsenv/jsenv-uneval)

# Table of contents

- [Presentation](#Presentation)
- [JSON.stringify limits](#JSONstringify-limits)
- [Browser example](#Browser-example)
- [Node example](#Node-example)
- [Installation](#Installation)

# Presentation

`@jsenv/uneval` turns a JavaScript value into a string that can be evaluated. It exists to overcome `JSON.stringify` limitations but **prefer `JSON.stringify` over `uneval` when you can**.

## JSON.stringify limits

- Returns `"{}"` for a regexp

  ```js
  JSON.stringify(/foo/) === "{}"
  ```

- Returns `"0"` for `-0`

  ```js
  JSON.stringify(-0) === "0"
  ```

- Returns `"null"` for `NaN`

  ```js
  JSON.stringify(NaN) === "null"
  ```

- Returns `"null"` for `Infinity`

  ```js
  JSON.stringify(Infinity) === "null"
  ```

- Throws on circular structure

  ```js
  const value = {}
  value.self = value
  try {
    JSON.stringify(value)
  } catch (error) {
    error.name === "TypeError"
  }
  ```

- Returns a string for a date

  ```js
  JSON.stringify(new Date(0)) === `"1970-01-01T00:00:00.000Z"`
  ```

- Is not optimized for repetitive structure

  ```js
  const value = "a-very-long-string"
  JSON.stringify([value, value])
  ```

  `"a-very-long-string"` would be repeated twice the string.

- Ignores non enumerable properties

  ```js
  JSON.stringify(Object.defineProperty({}, "foo", { enumerable: false })) === "{}"
  ```

## Browser example

```html
<script src="https://unpkg.com/@jsenv/uneval@1.1.0/dist/global/main.js"></script>
<script>
  const { uneval } = window.__jsenv_uneval__
  console.log(eval(uneval({ answer: 42 })))
</script>
```

— see also https://jsenv.github.io/jsenv-uneval/browser-example.

## Node example

```js
const { uneval } = require("@jsenv/uneval")

console.log(eval(uneval({ answer: 42 })))
```

— see also https://jsenv.github.io/jsenv-uneval/node-example.

# Installation

```console
npm install @jsenv/uneval
```
