/* eslint-disable no-eval */
import { assert } from "@dmail/assert"
import { uneval } from "../index.js"

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
