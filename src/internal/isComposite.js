// https://developer.mozilla.org/en-US/docs/Glossary/Primitive

export const isComposite = (value) => {
  if (value === null) return false
  const type = typeof value
  if (type === "object") return true
  if (type === "function") return true
  return false
}
