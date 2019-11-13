// https://github.com/joliss/js-string-escape/blob/master/index.js
// http://javascript.crockford.com/remedial.html
export const escapeString = (value) => {
  const string = String(value)
  let i = 0
  const j = string.length
  var escapedString = ""
  while (i < j) {
    const char = string[i]
    let escapedChar
    if (char === '"' || char === "'" || char === "\\") {
      escapedChar = `\\${char}`
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
    i++
  }
  return escapedString
}
