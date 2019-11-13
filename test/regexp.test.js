/* eslint-disable no-eval */
import { assert } from "@dmail/assert"
import { uneval } from "../index.js"

{
  const value = /ok/g
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = new RegExp("foo", "g")
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}
