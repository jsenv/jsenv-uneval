# uneval [![npm package](https://img.shields.io/npm/v/@jsenv/uneval.svg?logo=npm&label=package)](https://www.npmjs.com/package/@jsenv/uneval)

`@jsenv/uneval` turns a JavaScript value into a string that can be evaluated. It exists to overcome `JSON.stringify` limitations.

Using `@jsenv/uneval` + `eval` is more powerful and accurate than `JSON.stringify` + `JSON.parse`. It supports circular structure and preserves types like `Date`, `Infinity`, `-0`, `BigInt` and more.

However `JSON.stringify` is way faster and is safe (it cannot execute arbitrary code). So **prefer `JSON.stringify + JSON.parse` over `uneval + eval` when you can**.

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

- Returns a string for a date

  ```js
  JSON.stringify(new Date(0)) === `"1970-01-01T00:00:00.000Z"`
  ```

- Throws on BigInt

  ```js
  try {
    JSON.stringify(1n)
  } catch (e) {
    e.type // "TypeError"
    e.message // "Do not know how to serialize a BigInt"
  }
  ```

- Throws on circular structure

  ```js
  const value = {}
  value.self = value
  try {
    JSON.stringify(value)
  } catch (error) {
    error.name // "TypeError"
    error.message // "Converting circular structure to JSON"
  }
  ```

- Ignores non enumerable properties

  ```js
  JSON.stringify(Object.defineProperty({}, "foo", { enumerable: false })) ===
    "{}"
  ```

- Is not optimized for repetitive structure

  ```js
  const value = "a-very-long-string"
  JSON.stringify([value, value])
  ```

  `"a-very-long-string"` would be repeated twice the string.

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
