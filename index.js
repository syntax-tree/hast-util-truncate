/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Content} Content
 * @typedef {import('hast').Text} Text
 * @typedef {Root|Content} Node
 *
 * @typedef Options
 *   Configuration.
 * @property {number} [size=140]
 *   Number of characters to truncate to.
 * @property {string} [ellipsis]
 *   Value to use at truncation point.
 * @property {number} [maxCharacterStrip=30]
 *   How far to walk back.
 *   The algorithm attempts to break right after a word rather than the exact
 *   `size`.
 *   Take for example the `|`, which is the actual break defined by `size`, and
 *   the `…` is the location where the ellipsis is placed: `This… an|d that`.
 *   Breaking at `|` would at best look bad but could likely result in things
 *   such as `ass…` for `assignment` — which is not ideal.
 *   `maxCharacterStrip` defines how far back the algorithm will walk to find
 *   a pretty word break.
 *   This prevents a potential slow operation on larger `size`s without any
 *   whitespace.
 *   If `maxCharacterStrip` characters are walked back and no nice break point
 *   is found, the bad break point is used.
 *   Set `maxCharacterStrip: 0` to not find a nice break.
 * @property {Content[]} [ignore=[]]
 *   Nodes to exclude from the resulting tree.
 *   These are not counted towards `size`.
 */

import {unicodeWhitespace, unicodePunctuation} from 'micromark-util-character'

/**
 * Truncate the tree to a certain number of characters.
 *
 * @template {Node} Tree
 * @param {Tree} tree
 * @param {Options} [options]
 * @returns {Tree}
 */
export function truncate(tree, options = {}) {
  // To do: support units.
  const {size = 140, ellipsis, maxCharacterStrip = 30, ignore = []} = options
  let searchSize = 0
  /** @type {Text|undefined} */
  let overflowingText
  const result = preorder(tree)

  if (overflowingText) {
    const uglyBreakpoint = size - searchSize
    let breakpoint = uglyBreakpoint

    // If the number at the break is not an alphanumerical…
    if (unicodeAlphanumeric(overflowingText.value.charCodeAt(breakpoint))) {
      let remove = -1

      // Move back while the character before breakpoint is an alphanumerical.
      while (
        breakpoint &&
        ++remove < maxCharacterStrip &&
        unicodeAlphanumeric(overflowingText.value.charCodeAt(breakpoint - 1))
      ) {
        breakpoint--
      }

      // Move back while the character before breakpoint is *not* an alphanumerical.
      while (
        breakpoint &&
        ++remove < maxCharacterStrip &&
        !unicodeAlphanumeric(overflowingText.value.charCodeAt(breakpoint - 1))
      ) {
        breakpoint--
      }
    }

    overflowingText.value = overflowingText.value.slice(
      0,
      breakpoint || uglyBreakpoint
    )

    if (ellipsis) {
      overflowingText.value += ellipsis
    }
  }

  // @ts-expect-error: `preorder` for the top node always returns itself.
  return result

  /**
   * @param {Node} node
   * @returns {Node|undefined}
   */
  function preorder(node) {
    if (node.type === 'text') {
      if (searchSize + node.value.length > size) {
        overflowingText = {...node}
        return overflowingText
      }

      searchSize += node.value.length
    }

    /** @type {Node} */
    const replacement = {...node}

    if ('children' in node) {
      /** @type {Content[]} */
      const children = []
      let index = -1

      while (++index < node.children.length) {
        const child = node.children[index]

        if (!ignore.includes(child)) {
          const result = preorder(child)
          // @ts-expect-error: assume content matches.
          if (result) children.push(result)
        }

        if (overflowingText) {
          break
        }
      }

      // @ts-expect-error: assume content matches.
      replacement.children = children
    }

    return replacement
  }
}

/**
 * @param {number} code
 * @returns {boolean}
 */
function unicodeAlphanumeric(code) {
  return !unicodeWhitespace(code) && !unicodePunctuation(code)
}
