/* eslint-disable no-eval */
import { assert } from "@dmail/assert"
import { uneval } from "../index.js"

const value = null
const actual = eval(uneval(value))
const expected = value
assert({
  actual,
  expected,
})
