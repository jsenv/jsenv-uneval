import { escapeTemplateString } from "./escape_template_string.js"

const DOUBLE_QUOTE = `"`
const SINGLE_QUOTE = `'`
const BACKTICK = "`"

export const escapeString = (
  value,
  {
    quote = "auto",
    canUseTemplateString = false,
    fallback = DOUBLE_QUOTE,
  } = {},
) => {
  quote =
    quote === "auto"
      ? determineQuote(value, canUseTemplateString) || fallback
      : quote
  if (quote === BACKTICK) {
    return escapeTemplateString(value)
  }
  // https://github.com/jsenv/jsenv-uneval/blob/6c97ef9d8f2e9425a66f2c88347e0a118d427f3a/src/internal/escapeString.js#L3
  // https://github.com/jsenv/jsenv-inspect/blob/bb11de3adf262b68f71ed82b0a37d4528dd42229/src/internal/string.js#L3
  // https://github.com/joliss/js-string-escape/blob/master/index.js
  // http://javascript.crockford.com/remedial.html
  let escapedString = ""
  let i = 0
  while (i < value.length) {
    const char = value[i]
    i++
    let escapedChar
    if (char === quote) {
      escapedChar = `\\${quote}`
    } else if (char === "\n") {
      escapedChar = "\\n"
    } else if (char === "\r") {
      escapedChar = "\\r"
    } else if (char === "\u2028") {
      escapedChar = "\\u2028"
    } else if (char === "\u2029") {
      escapedChar = "\\u2029"
    } else {
      escapedChar = char
    }
    escapedString += escapedChar
  }
  return `${quote}${escapedString}${quote}`
}

const determineQuote = (string, canUseTemplateString) => {
  const containsDoubleQuote = string.includes(DOUBLE_QUOTE)
  if (!containsDoubleQuote) {
    return DOUBLE_QUOTE
  }
  const containsSimpleQuote = string.includes(SINGLE_QUOTE)
  if (!containsSimpleQuote) {
    return SINGLE_QUOTE
  }
  if (canUseTemplateString) {
    const containsBackTick = string.includes(BACKTICK)
    if (!containsBackTick) {
      return BACKTICK
    }
  }
  return null
}
