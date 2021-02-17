/* eslint-disable no-eval */
import { assert } from "@jsenv/assert"
import { uneval } from "@jsenv/uneval"

// unknown symbol
{
  const value = Symbol()
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
      message: `symbol must be global, like Symbol.iterator, or created using Symbol.for().
symbol: Symbol()`,
    }
    assert({ actual, expected })
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
