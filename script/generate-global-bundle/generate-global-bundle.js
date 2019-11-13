const { generateGlobalBundle } = require("@jsenv/bundling")
const { projectPath } = require("../../jsenv.config.js")

generateGlobalBundle({
  projectDirectoryPath: projectPath,
  globalName: "__jsenv_uneval__",
})
