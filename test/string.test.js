/* eslint-disable no-eval */
import { assert } from "@dmail/assert"
import { uneval } from "../index.js"

{
  const value = ""
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = "dam"
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = "don't"
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = `his name is "dam"`
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = "a\nb"
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = "a\rb"
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = "a\u2028b"
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = "a\u2029b"
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  // eslint-disable-next-line no-new-wrappers
  const value = new String("")
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}
