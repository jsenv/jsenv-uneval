/* globals BigInt */
/* eslint-disable no-eval */
import { assert } from "@jsenv/assert"
import { uneval } from "@jsenv/uneval"

{
  const value = BigInt(1)
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}
