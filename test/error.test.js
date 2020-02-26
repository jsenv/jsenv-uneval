/* eslint-disable no-eval */
import { assert } from "@jsenv/assert"
import { uneval } from "../index.js"

{
  const value = new Error("here")
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = new RangeError("here")
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = new Error("hello")
  Object.defineProperty(value, "bar", {
    enumerable: false,
    value: "bar",
  })
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = new Error()
  value.name = "AssertionError"
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}
