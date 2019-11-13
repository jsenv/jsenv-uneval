/* eslint-disable no-eval */
import { assert } from "@dmail/assert"
import { uneval } from "../index.js"

{
  // eslint-disable-next-line accessor-pairs
  const value = Object.defineProperty({}, "answer", {
    set: () => {},
  })
  try {
    uneval(value)
    throw new Error("should throw")
  } catch (actual) {
    const expected = new Error(`property setter are not allowed.
setter found on property: answer
at: `)
    assert({
      actual,
      expected,
    })
  }
}

{
  // eslint-disable-next-line accessor-pairs
  const value = Object.defineProperty({}, "answer", {
    set: () => {},
  })
  const actual = eval(uneval(value, { functionAllowed: true }))
  const expected = value
  assert({ actual, expected })
}
