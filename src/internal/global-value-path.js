/* eslint-env browser, node */

import { isComposite } from "./isComposite.js"

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
const compositeWellKnownMap = new WeakMap()
const primitiveWellKnownMap = new Map()

export const getCompositeGlobalPath = (value) =>
  compositeWellKnownMap.get(value)

export const getPrimitiveGlobalPath = (value) =>
  primitiveWellKnownMap.get(value)

const visitGlobalObject = (value) => {
  const visitValue = (value, path) => {
    if (isComposite(value)) {
      // prevent infinite recursion
      if (compositeWellKnownMap.has(value)) {
        return
      }
      compositeWellKnownMap.set(value, path)

      const visitProperty = (property) => {
        let descriptor
        try {
          descriptor = Object.getOwnPropertyDescriptor(value, property)
        } catch (e) {
          if (e.name === "SecurityError") {
            return
          }
          throw e
        }

        if (!descriptor) {
          // it's apparently possible to have getOwnPropertyNames returning
          // a property that later returns a null descriptor
          // for instance window.showModalDialog in webkit 13.0
          return
        }

        // do not trigger getter/setter
        if ("value" in descriptor) {
          const propertyValue = descriptor.value
          visitValue(propertyValue, [...path, property])
        }
      }

      Object.getOwnPropertyNames(value).forEach((name) => visitProperty(name))
      Object.getOwnPropertySymbols(value).forEach((symbol) =>
        visitProperty(symbol),
      )
    }

    primitiveWellKnownMap.set(value, path)
    return
  }

  visitValue(value, [])
}

if (typeof window === "object") visitGlobalObject(window)

if (typeof global === "object") visitGlobalObject(global)
