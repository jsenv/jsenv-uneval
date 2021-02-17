import { startExploring } from "@jsenv/core"
import * as jsenvConfig from "../../jsenv.config.js"

startExploring({
  ...jsenvConfig,
  compileServerPort: 3457,
  protocol: "https",
  explorableConfig: {
    test: {
      "test/**/*.html": true,
    },
  },
})
