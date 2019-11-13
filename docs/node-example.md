# `uneval` interactive node example

Warning: runkit often uses an outdated `@jsenv/uneval` version which may not work.<br />

<div id="runkit-source">
const { uneval } = require("@jsenv/uneval")
const value = {
  answer: 42
}
const valueCopy = eval(uneval(value))
console.log(valueCopy)
</div>
<script src="https://embed.runkit.com" data-element-id="runkit-source"></script>
