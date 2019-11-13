/* eslint-disable no-eval */
import { assert } from "@dmail/assert"
import { uneval } from "../index.js"

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
