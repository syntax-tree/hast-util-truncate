# hast-util-truncate

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[hast][]** utility to truncate the tree to a certain number of characters.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install hast-util-truncate
```

## Use

Say we have the following module, `example.js`:

```js
import {h} from 'hastscript'
import {truncate} from 'hast-util-truncate'

const tree = h('p', [
  'Lorem ipsum dolor sit amet, ',
  h('em', 'consectetur'),
  'adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
])

console.log(truncate(tree, {ellipsis: '…'}));
```

Now, running `node example.js` yields:

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
      value: 'adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim…'
    }
  ]
}
```

## API

This package exports the following identifiers: `truncate`.
There is no default export.

### `truncate(tree, options?)`

Truncate the tree to a certain number of characters.

###### `options.size`

Number of characters to truncate to (`number`, default: `140`).

###### `options.ellipsis`

Value to use at truncation point (`string`, optional).

###### `options.maxCharacterStrip`

How far to walk back (`number`, default: `30`).
The algorithm attempts to break right after a word rather than the exact `size`.
Take for example the `|`, which is the actual break defined by `size`, and the
`…` is the location where the ellipsis is placed: `This… an|d that`.
Breaking at `|` would at best look bad but could likely result in things such as
`ass…` for `assignment` — which is not ideal.
`maxCharacterStrip` defines how far back the algorithm will walk to find a
pretty word break.
This prevents a potential slow operation on larger `size`s without any
whitespace.
If `maxCharacterStrip` characters are walked back and no nice break point is
found, the bad break point is used.
Set `maxCharacterStrip: 0` to not find a nice break.

###### `options.ignore`

Nodes to exclude from the resulting tree (`Array.<Node>`).
These are not counted towards `size`.

###### Returns

`Node` — Truncated copy of `tree`

## Security

Use of `hast-util-truncate` should be safe if the tree is already safe and
you’re not using user content in options.
When in doubt, use [`hast-util-sanitize`][sanitize].

## Related

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

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

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/HEAD/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/HEAD/support.md

[coc]: https://github.com/syntax-tree/.github/blob/HEAD/code-of-conduct.md

[sanitize]: https://github.com/syntax-tree/hast-util-sanitize

[hast]: https://github.com/syntax-tree/hast
