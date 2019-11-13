/* eslint-disable no-eval */
import { assert } from "@dmail/assert"
import { uneval } from "../index.js"

{
  const value = new Set([40, 42])
  const evaluatedValue = eval(uneval(value))
  const actual = Array.from(evaluatedValue.values())
  const expected = Array.from(value.values())
  assert({ actual, expected })
}
