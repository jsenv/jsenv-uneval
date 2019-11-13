const { accessSync } = require("fs")
const { resolve } = require("path")

// the concept here is to generate import map only
// if you run npm install while working on the module
// but not if the module is installed as a dependency.
// to achieve this we could use process.env.INIT_CWD === process.cwd()
// but we'll use an even more robust approach checking if script exists
// because it won't be published to npm
const path = resolve(__dirname, "../generate-import-map/generate-import-map.js")
let access
try {
  accessSync(path)
  access = true
} catch (e) {
  access = false
}
if (access) {
  // eslint-disable-next-line import/no-dynamic-require
  require(path)
}
