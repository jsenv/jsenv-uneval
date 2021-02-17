/* eslint-disable no-eval */
import { assert } from "@jsenv/assert"
import { uneval } from "@jsenv/uneval"

{
  const value = new WeakMap()
  try {
    uneval(value)
    throw new Error("should throw")
  } catch (actual) {
    const expected = new Error("weakMap are not supported.")
    assert({ actual, expected })
  }
}

{
  const value = {
    foo: new WeakMap(),
  }
  try {
    uneval(value)
    throw new Error("should throw")
  } catch (actual) {
    const expected = new Error(`weakMap are not supported.
weakMap found at: foo[[descriptor:value]]`)
    assert({ actual, expected })
  }
}
