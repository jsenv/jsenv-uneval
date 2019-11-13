/* eslint-disable no-eval */
import { assert } from "@dmail/assert"
import { uneval } from "../index.js"

{
  const value = {}
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  // eslint-disable-next-line no-new-object
  const value = new Object({})
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = { foo: true }
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = { 0: "foo" }
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = { Infinity: "foo" }
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = { foo: true, nested: { bar: true } }
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = {}
  value.self = value
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = {
    nested: {},
  }
  value.nested.parent = value
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

{
  const value = Object.create(null)
  value[Symbol.toStringTag] = "stuff"
  value.foo = true
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

// order respected
{
  const value = {
    name: {},
    friends: {
      id: 0,
      name: "foo",
    },
  }
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}
