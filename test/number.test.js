/* eslint-disable no-eval */
import { assert } from "@jsenv/assert"
import { uneval } from "@jsenv/uneval"

{
  const value = 0
  const actual = eval(uneval(value))
  const expected = 0
  assert({ actual, expected })
}

{
  const value = 1
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = -0
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = Infinity
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  // eslint-disable-next-line no-new-wrappers
  const value = new Number(0)
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}
