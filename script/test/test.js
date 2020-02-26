const {
  executeTestPlan,
  launchChromiumTab,
  launchFirefoxTab,
  launchWebkitTab,
  launchNode,
} = require("@jsenv/core")
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
      webkit: {
        launch: launchWebkitTab,
      },
      node: {
        launch: launchNode,
      },
    },
  },
  coverage: process.argv.includes("--coverage"),
  completedExecutionLogMerging: true,
})
