/* eslint-disable no-eval */
import { assert } from "@jsenv/assert"
import { uneval } from "@jsenv/uneval"

{
  const value = new WeakSet()
  try {
    uneval(value)
    throw new Error("should throw")
  } catch (actual) {
    const expected = new Error("weakSet are not supported.")
    assert({ actual, expected })
  }
}

{
  const value = {
    foo: new WeakSet(),
  }
  try {
    uneval(value)
    throw new Error("should throw")
  } catch (actual) {
    const expected = new Error(`weakSet are not supported.
weakSet found at: foo[[descriptor:value]]`)
    assert({ actual, expected })
  }
}
