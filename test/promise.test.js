/* eslint-disable no-eval */
import { assert } from "@jsenv/assert"
import { uneval } from "@jsenv/uneval"

{
  const value = new Promise(() => {})
  try {
    uneval(value)
    throw new Error("should throw")
  } catch (actual) {
    const expected = new Error("promise are not supported.")
    assert({ actual, expected })
  }
}

{
  const value = {
    foo: new Promise(() => {}),
  }
  try {
    uneval(value)
    throw new Error("should throw")
  } catch (actual) {
    const expected = new Error(`promise are not supported.
promise found at: foo[[descriptor:value]]`)
    assert({ actual, expected })
  }
}
