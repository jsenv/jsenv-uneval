const { generateGlobalBundle } = require("@jsenv/core")
const jsenvConfig = require("../../jsenv.config.js")

generateGlobalBundle({
  ...jsenvConfig,
  globalName: "__jsenv_uneval__",
})
