/*
 * This file uses "@jsenv/eslint-config" to configure ESLint
 * https://github.com/jsenv/eslint-config#eslint-config----
 */

const {
  composeEslintConfig,
  eslintConfigBase,
  eslintConfigForPrettier,
  eslintConfigToPreferExplicitGlobals,
  jsenvEslintRules,
  jsenvEslintRulesForImport,
} = require("@jsenv/eslint-config")

const eslintConfig = composeEslintConfig(
  eslintConfigBase,

  // Enables top level await
  {
    parserOptions: {
      ecmaVersion: 2022,
    },
  },

  // Files in this repository are all meant to be executed in Node.js and browsers
  // and we want to tell this to ESLint.
  {
    env: {
      "shared-node-browser": true,
    },
  },

  // Reuse jsenv eslint rules
  {
    rules: {
      ...jsenvEslintRules,
    },
  },

  // Enable import plugin
  {
    plugins: ["import"],
    settings: {
      "import/resolver": {
        // Tell ESLint to use the importmap to resolve imports.
        // Read more in https://github.com/jsenv/jsenv-node-module-import-map#Configure-vscode-and-eslint-for-importmap
        "@jsenv/importmap-eslint-resolver": {
          projectDirectoryUrl: __dirname,
          importMapFileRelativeUrl: "./node_resolution.importmap",
        },
      },
    },
    rules: jsenvEslintRulesForImport,
  },

  // Enable HTML plugin
  {
    plugins: ["html"],
    settings: {
      extensions: [".html"],
    },
    // .html files are written for browsers
    overrides: [
      {
        files: ["**/*.html"],
        env: {
          "shared-node-browser": false,
          "browser": true,
        },
      },
    ],
  },

  // test files are written for both
  {
    overrides: [
      {
        files: ["test/**/*.js"],
        env: {
          "shared-node-browser": false,
          "browser": true,
          "node": true,
        },
        globals: {
          __filename: "off",
          __dirname: "off",
          require: "off",
          exports: "off",
        },
      },
    ],
  },

  // .mjs files
  {
    overrides: [
      {
        files: ["**/*.mjs"],
        env: {
          "shared-node-browser": false,
          "node": true,
        },
        globals: {
          __filename: "off",
          __dirname: "off",
          require: "off",
          exports: "off",
        },
        settings: {
          "import/resolver": {
            "@jsenv/importmap-eslint-resolver": {
              node: true,
            },
          },
        },
      },
    ],
  },

  // .cjs files
  {
    overrides: [
      {
        files: ["**/*.cjs"],
        env: {
          browser: false,
          node: true,
          commonjs: true,
        },
        // inside *.cjs files. restore commonJS "globals"
        globals: {
          __filename: true,
          __dirname: true,
          require: true,
          exports: true,
        },
        // inside *.cjs files, use commonjs module resolution
        settings: {
          "import/resolver": {
            node: {},
          },
        },
      },
    ],
  },

  eslintConfigToPreferExplicitGlobals,

  // We are using prettier, disable all eslint rules
  // already handled by prettier.
  eslintConfigForPrettier,
)

module.exports = eslintConfig
