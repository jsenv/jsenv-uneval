/* eslint-disable no-eval */
import { assert } from "@dmail/assert"
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
  Object.defineProperty(expected, "bar", {
    enumerable: false,
    value: "bar",
  })
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = new Error()
  expected.name = "AssertionError"
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}
