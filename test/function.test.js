/* eslint-disable no-eval */
import { assert } from "@jsenv/assert"
import { uneval } from "../index.js"

{
  const value = () => {}
  try {
    uneval(value)
    throw new Error("should throw")
  } catch (error) {
    const actual = {
      name: error.name,
      message: error.message,
    }
    const expected = {
      name: "Error",
      message: "function are not allowed.",
    }
    assert({ actual, expected })
  }
}

{
  const value = {
    foo: () => {},
  }
  try {
    uneval(value)
    throw new Error("should throw")
  } catch (error) {
    const actual = {
      name: error.name,
      message: error.message,
    }
    const expected = {
      name: "Error",
      message: `function are not allowed.
function found at: foo[[descriptor:value]]`,
    }
    assert({ actual, expected })
  }
}

{
  const value = () => 42
  const actual = eval(uneval(value, { functionAllowed: true }))
  const expected = value
  assert({ actual, expected })
}
