// be carefull because this function is mutating recipe objects inside the recipeArray.
// this is not an issue because each recipe object is not accessible from the outside
// when used internally by uneval
export const sortRecipe = (recipeArray) => {
  const findInRecipePrototypeChain = (recipe, callback) => {
    let currentRecipe = recipe
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (currentRecipe.type !== "composite") break
      const prototypeIdentifier = currentRecipe.prototypeIdentifier
      if (prototypeIdentifier === undefined) break
      currentRecipe = recipeArray[prototypeIdentifier]

      if (callback(currentRecipe, prototypeIdentifier)) return prototypeIdentifier
    }
    return undefined
  }

  const recipeArrayOrdered = recipeArray.slice()
  recipeArrayOrdered.sort((leftRecipe, rightRecipe) => {
    const leftType = leftRecipe.type
    const rightType = rightRecipe.type

    if (leftType === "composite" && rightType === "composite") {
      const rightRecipeIsInLeftRecipePrototypeChain = findInRecipePrototypeChain(
        leftRecipe,
        (recipeCandidate) => recipeCandidate === rightRecipe,
      )
      // if left recipe requires right recipe, left must be after right
      if (rightRecipeIsInLeftRecipePrototypeChain) return 1

      const leftRecipeIsInRightRecipePrototypeChain = findInRecipePrototypeChain(
        rightRecipe,
        (recipeCandidate) => recipeCandidate === leftRecipe,
      )
      // if right recipe requires left recipe, right must be after left
      if (leftRecipeIsInRightRecipePrototypeChain) return -1
    }

    if (leftType !== rightType) {
      // if left is a composite, left must be after right
      if (leftType === "composite") return 1
      // if right is a composite, right must be after left
      if (rightType === "composite") return -1
    }

    const leftIndex = recipeArray.indexOf(leftRecipe)
    const rightIndex = recipeArray.indexOf(rightRecipe)
    // left was before right, don't change that
    if (leftIndex < rightIndex) return -1
    // right was after left, don't change that
    return 1
  })

  return recipeArrayOrdered
}
