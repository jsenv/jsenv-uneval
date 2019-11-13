/* eslint-disable no-eval */
import { assert } from "@dmail/assert"
import { uneval } from "../index.js"

{
  const value = Object.defineProperty({}, "answer", {
    get: () => 42,
  })
  try {
    uneval(value)
    throw new Error("should throw")
  } catch (actual) {
    const expected = new Error(`property getter are not allowed.
getter found on property: answer
at: `)
    assert({
      actual,
      expected,
    })
  }
}

{
  const value = Object.defineProperty({}, "answer", {
    get: () => 42,
  })
  const actual = eval(uneval(value, { functionAllowed: true }))
  const expected = value
  assert({ actual, expected })
}
