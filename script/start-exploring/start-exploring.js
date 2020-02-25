const { startExploring, jsenvExplorableConfig } = require("@jsenv/core")
const jsenvConfig = require("../../jsenv.config.js")

startExploring({
  ...jsenvConfig,
  port: 3457,
  protocol: "http",
  explorableConfig: {
    ...jsenvExplorableConfig,
  },
})
