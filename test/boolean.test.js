/* eslint-disable no-eval */
import { assert } from "@dmail/assert"
import { uneval } from "../index.js"

{
  const value = true
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = false
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  // eslint-disable-next-line no-new-wrappers
  const value = new Boolean(true)
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}
