const { executeTestPlan, launchChromiumTab, launchNode } = require("@jsenv/core")
const jsenvConfig = require("../../jsenv.config.js")

executeTestPlan({
  ...jsenvConfig,
  testPlan: {
    "test/**/*.test.js": {
      browser: {
        launch: launchChromiumTab,
      },
      node: {
        launch: launchNode,
      },
    },
    "test/**/*.browser.test.js": {
      browser: {
        launch: launchChromiumTab,
      },
      node: null,
    },
    "test/**/*.node.test.js": {
      browser: null,
      node: {
        launch: launchNode,
      },
    },
  },
  coverage: process.argv.includes("--coverage"),
})
