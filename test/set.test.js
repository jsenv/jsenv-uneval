/* eslint-disable no-eval */
import { assert } from "@jsenv/assert"
import { uneval } from "@jsenv/uneval"

{
  const value = new Set([40, 42])
  const evaluatedValue = eval(uneval(value))
  const actual = Array.from(evaluatedValue.values())
  const expected = Array.from(value.values())
  assert({ actual, expected })
}
