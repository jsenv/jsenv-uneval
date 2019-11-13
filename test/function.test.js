/* eslint-disable no-eval */
import { assert } from "@dmail/assert"
import { uneval } from "../index.js"

{
  const value = () => {}
  try {
    uneval(value)
    throw new Error("should throw")
  } catch (actual) {
    const expected = new Error("function are not allowed.")
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
  } catch (actual) {
    const expected = new Error(`function are not allowed.
function found at: foo[[descriptor:value]]`)
    assert({ actual, expected })
  }
}

{
  const value = () => 42
  const actual = eval(uneval(value, { functionAllowed: true }))
  const expected = value
  assert({ actual, expected })
}
