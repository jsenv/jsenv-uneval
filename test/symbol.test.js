/* eslint-disable no-eval */
import { assert } from "@dmail/assert"
import { uneval } from "../index.js"

// unknown symbol
{
  const value = Symbol()
  try {
    uneval(value)
    throw new Error("should throw")
  } catch (actual) {
    const expected = new Error(
      `symbol must be global, like Symbol.iterator, or created using Symbol.for().
symbol: Symbol()`,
    )

    assert({
      actual,
      expected,
    })
  }
}

// global symbol
{
  const value = Symbol.iterator
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

// Symbol.for()
{
  const value = Symbol.for("whatever")
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}
