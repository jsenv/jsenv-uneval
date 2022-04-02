import { buildProject } from "@jsenv/core"

import { projectDirectoryUrl } from "../../jsenv.config.mjs"

await buildProject({
  projectDirectoryUrl,
  buildDirectoryRelativeUrl: "./dist/global/",
  importMapFileRelativeUrl: "./node_resolution.importmap",
  format: "global",
  entryPoints: {
    "./main.js": "jsenv_uneval.js",
  },
  globalName: "__jsenv_uneval__",
  buildDirectoryClean: true,
})
