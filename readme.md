# hast-util-truncate

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[hast][] utility to truncate the tree to a certain number of characters.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`truncate(tree, options?)`](#truncatetree-options)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a utility that takes a [hast][] (HTML) syntax tree and truncates
it to a certain number of characters, while otherwise preserving the tree
structure.

## When should I use this?

This is a small utility useful when you need to create a shorter version of a
potentially long document.

This utility is similar to [`hast-util-excerpt`][hast-util-excerpt], which
truncates a tree to a certain comment.

The rehype plugin
[`rehype-infer-description-meta`][rehype-infer-description-meta]
wraps both this utility and `hast-util-excerpt` to figure out a description of a
document, for use with [`rehype-meta`][rehype-meta].

## Install

This package is [ESM only][esm].
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install hast-util-truncate
```

In Deno with [`esm.sh`][esmsh]:

```js
import {truncate} from "https://esm.sh/hast-util-truncate@1"
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {truncate} from "https://esm.sh/hast-util-truncate@1?bundle"
</script>
```

## Use

Say our module `example.js` looks as follows:

```js
import {h} from 'hastscript'
import {truncate} from 'hast-util-truncate'

const tree = h('p', [
  'Lorem ipsum dolor sit amet, ',
  h('em', 'consectetur'),
  'adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
])

console.log(truncate(tree, {ellipsis: '???'}));
```

???now running `node example.js` yields:

```js
{
  type: 'element',
  tagName: 'p',
  properties: {},
  children: [
    {type: 'text', value: 'Lorem ipsum dolor sit amet, '},
    {
      type: 'element',
      tagName: 'em',
      properties: {},
      children: [{type: 'text', value: 'consectetur'}]
    },
    {
      type: 'text',
      value: 'adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim???'
    }
  ]
}
```

## API

This package exports the identifier `truncate`.
There is no default export.

### `truncate(tree, options?)`

Truncate the tree to a certain number of characters.

##### `options`

Configuration (optional).

###### `options.size`

Number of characters to truncate to (`number`, default: `140`).

###### `options.ellipsis`

Value to use at truncation point (`string`, optional).

###### `options.maxCharacterStrip`

How far to walk back (`number`, default: `30`).
The algorithm attempts to break right after a word rather than the exact `size`.
Take for example the `|`, which is the actual break defined by `size`, and the
`???` is the location where the ellipsis is placed: `This??? an|d that`.
Breaking at `|` would at best look bad but could likely result in things such as
`ass???` for `assignment`, which is not ideal.
`maxCharacterStrip` defines how far back the algorithm will walk to find a
pretty word break.
This prevents a potential slow operation on larger `size`s without any
whitespace.
If `maxCharacterStrip` characters are walked back and no nice break point is
found, the bad break point is used.
Set `maxCharacterStrip: 0` to not find a nice break.

###### `options.ignore`

Nodes to exclude from the resulting tree (`Array<Node>`).
These are not counted towards `size`.

###### Returns

Truncated copy of `tree` (`Node`).

## Types

This package is fully typed with [TypeScript][].
It exports the additional type `Options`.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Security

Use of `hast-util-truncate` should be safe if the tree is already safe and
you???re not using user content in options.
When in doubt, use [`hast-util-sanitize`][sanitize].

## Related

*   [`hast-util-excerpt`][hast-util-excerpt]
    ??? truncate the tree to a comment
*   [`rehype-infer-description-meta`][rehype-infer-description-meta]
    ??? infer file metadata from the contents of the document
*   [`rehype-meta`][rehype-meta]
    ??? add metadata to the head of a document

## Contribute

See [`contributing.md`][contributing] in [`syntax-tree/.github`][health] for
ways to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] ?? [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/syntax-tree/hast-util-truncate/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/hast-util-truncate/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-truncate.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-truncate

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-truncate.svg

[downloads]: https://www.npmjs.com/package/hast-util-truncate

[size-badge]: https://img.shields.io/bundlephobia/minzip/hast-util-truncate.svg

[size]: https://bundlephobia.com/result?p=hast-util-truncate

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[license]: license

[author]: https://wooorm.com

[health]: https://github.com/syntax-tree/.github

[contributing]: https://github.com/syntax-tree/.github/blob/main/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/main/support.md

[coc]: https://github.com/syntax-tree/.github/blob/main/code-of-conduct.md

[sanitize]: https://github.com/syntax-tree/hast-util-sanitize

[hast]: https://github.com/syntax-tree/hast

[hast-util-excerpt]: https://github.com/syntax-tree/hast-util-excerpt

[rehype-infer-description-meta]: https://github.com/rehypejs/rehype-infer-description-meta

[rehype-meta]: https://github.com/rehypejs/rehype-meta
