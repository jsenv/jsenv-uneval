// const { launchChromium } = require("@jsenv/chromium-launcher")
const { launchNode } = require("@jsenv/node-launcher")

const projectPath = __dirname
exports.projectPath = projectPath

const testDescription = {
  "/test/**/*.test.js": {
    // browser: {
    //   launch: launchChromium,
    // },
    node: {
      launch: launchNode,
    },
  },
}
exports.testDescription = testDescription
