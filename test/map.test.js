/* eslint-disable no-eval */
import { assert } from "@dmail/assert"
import { uneval } from "../index.js"

{
  const value = new Map()
  value.set({}, 42)
  const evaluatedValue = eval(uneval(value))
  const actual = Array.from(evaluatedValue.entries())
  const expected = Array.from(value.entries())
  assert({ actual, expected })
}
