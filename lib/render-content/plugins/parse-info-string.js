// Based on https://spec.commonmark.org/0.30/#info-string
// Parse out info strings on fenced code blocks, example:
// ```javascript lineNumbers:left copy:all annotate
// becomes...
// node.lang = javascript
// node.meta = { lineNumbers: 'left', copy: 'all', annotate: true }

import { visit } from 'unist-util-visit'

const matcher = (node) => node.type === 'code' && node.lang && node.meta

export default function parseInfoString() {
  return (tree) => {
    visit(tree, matcher, (node) => {
      node.meta = strToObj(node.meta)
    })
  }
}

function strToObj(str) {
  return Object.fromEntries(
    str
      .split(/\s+/g)
      .map((k) => k.split(':'))
      .map(([k, ...v]) => [k, v.length ? v.join(':') : true])
  )
}
