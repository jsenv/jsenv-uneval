/* eslint-disable no-eval */
import { assert } from "@jsenv/assert"
import { uneval } from "@jsenv/uneval"

const value = null
const actual = eval(uneval(value))
const expected = value
assert({
  actual,
  expected,
})
