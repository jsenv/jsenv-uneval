import { buildProject } from "@jsenv/core"

import { projectDirectoryUrl } from "../../jsenv.config.mjs"

await buildProject({
  projectDirectoryUrl,
  buildDirectoryRelativeUrl: "./dist/commonjs/",
  format: "commonjs",
  entryPoints: {
    "./main.js": "jsenv_uneval.cjs",
  },
  runtimeSupport: {
    node: "14.7",
  },
  buildDirectoryClean: true,
})
