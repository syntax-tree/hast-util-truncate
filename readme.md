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

Say we have the following HTML file, `example.html`:

```html
```

And our module, `example.js`, contains:

```js
```

Now, running `node example.js` yields:

```html
```

## API

This package exports the following identifiers: `truncate`.
There is no default export.

### `truncate(tree, options?)`

Truncate the tree to a certain number of characters.

##### `options`

###### Returns

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
