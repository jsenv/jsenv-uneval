/* eslint-disable no-eval */
import { assert } from "@dmail/assert"
import { uneval } from "../index.js"

{
  const value = []
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = [[]]
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = Array(3)
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = [Symbol.iterator]
  const actual = eval(uneval(value))
  const expected = value
  assert({
    actual,
    expected,
  })
}

{
  // eslint-disable-next-line no-array-constructor
  const value = new Array("foo", 1)
  const actual = eval(uneval(value))
  const expected = value
  assert({
    actual,
    expected,
  })
}

{
  const value = []
  value.push(value)
  const actual = eval(uneval(value))
  const expected = value
  assert({
    actual,
    expected,
  })
}
