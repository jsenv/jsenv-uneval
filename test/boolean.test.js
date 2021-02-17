/* eslint-disable no-eval */
import { assert } from "@jsenv/assert"
import { uneval } from "@jsenv/uneval"

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
