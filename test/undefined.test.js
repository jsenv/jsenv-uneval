/* eslint-disable no-eval */
import { assert } from "@dmail/assert"
import { uneval } from "../index.js"

const value = undefined
const actual = eval(uneval(expected))
const expected = value
assert({ actual, expected })
