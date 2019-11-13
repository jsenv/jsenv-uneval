/* eslint-disable no-eval */
import { assert } from "@dmail/assert"
import { uneval } from "../index.js"

// non strict prototype
// (prototype is not found globally so we fallback to the parent prototype)
{
  function FetchError(message) {
    Error.call(this, message)
    this.message = message
    Error.captureStackTrace(this, this.constructor)
  }

  const value = new FetchError("coucou")
  const actual = eval(uneval(value))
  const expected = { message: "coucou" }
  Object.defineProperty(expected, "stack", {
    value: actual.stack,
    configurable: true,
    writable: true,
  })
  assert({ actual, expected })
}

// unknown prototype
{
  const prototypeValue = {}
  const value = Object.create(prototypeValue)
  try {
    uneval(value, { prototypeStrict: true })
    throw new Error("should throw")
  } catch (actual) {
    const expected = new Error(
      `prototype must be global, like Object.prototype, or somewhere in the value.
prototype constructor name: Object`,
    )
    assert({ actual, expected })
  }
}

// unknown prototype by constructor
{
  function CustomConstructor() {
    this.foo = true
  }
  const value = new CustomConstructor()
  try {
    uneval(value, { prototypeStrict: true })
  } catch (actual) {
    const expected = new Error(
      `prototype must be global, like Object.prototype, or somewhere in the value.
prototype constructor name: CustomConstructor`,
    )
    assert({ actual, expected })
  }
}

// null prototype
{
  const value = Object.create(null)
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}

// prototype in the value
{
  const ancestor = {}
  const parent = Object.create(ancestor)
  const child = Object.create(parent)
  const value = {
    child,
    ancestor,
    parent,
  }
  const actual = eval(uneval(value))
  const expected = value
  assert({ actual, expected })
}
