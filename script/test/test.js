const { executeTestPlan, launchChromiumTab, launchFirefoxTab, launchNode } = require("@jsenv/core")
const jsenvConfig = require("../../jsenv.config.js")

executeTestPlan({
  ...jsenvConfig,
  testPlan: {
    "test/**/*.test.js": {
      chromium: {
        launch: launchChromiumTab,
      },
      firefox: {
        launch: launchFirefoxTab,
      },
      node: {
        launch: launchNode,
      },
    },
    "test/**/*.browser.test.js": {
      chromium: {
        launch: launchChromiumTab,
      },
      firefox: {
        launch: launchFirefoxTab,
      },
      node: null,
    },
    "test/**/*.node.test.js": {
      chromium: null,
      firefox: null,
      node: {
        launch: launchNode,
      },
    },
  },
  coverage: process.argv.includes("--coverage"),
})
