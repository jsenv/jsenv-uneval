/* eslint-disable no-eval */
import { assert } from "@jsenv/assert"
import { uneval } from "@jsenv/uneval"

{
  const value = new Date()
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = new Date(10)
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}
