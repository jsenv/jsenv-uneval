import { startDevServer } from "@jsenv/core"

import { projectDirectoryUrl } from "../../jsenv.config.mjs"

await startDevServer({
  projectDirectoryUrl,
  port: 3457,
  // protocol: "https",
  explorableConfig: {
    test: {
      "test/**/*.html": true,
    },
  },
})
