import test from 'tape'
import {h} from 'hastscript'
import {selectAll} from 'hast-util-select'
import {truncate} from './index.js'

test('hastUtilTruncate', (t) => {
  t.deepEqual(
    truncate(h('p', 'Lorem ipsum dolor sit amet'), {size: 11}),
    h('p', 'Lorem ipsum'),
    'should truncate'
  )

  t.deepEqual(
    truncate(h('p', 'Lorem ipsum dolor sit amet'), {size: 10}),
    h('p', 'Lorem'),
    'should truncate to a nice break'
  )

  t.deepEqual(
    truncate(h('p', 'Lorem ipsum dolor sit amet'), {size: 4}),
    h('p', 'Lore'),
    'should truncate to an ugly break if there’s no perfect break'
  )

  t.deepEqual(
    truncate(h('p', 'Lorem ipsum dolor sit amet'), {size: 10, ellipsis: '…'}),
    h('p', 'Lorem…'),
    'should truncate w/ `ellipsis`'
  )

  t.deepEqual(
    truncate(h('p', 'Lorem ipsum dolor sit amet'), {size: 11}),
    h('p', 'Lorem ipsum'),
    'should truncate right to `size`, if that’s a perfect break'
  )

  t.deepEqual(
    truncate(h('p', 'Lorem ipsum dolor sit amet'), {size: 12}),
    h('p', 'Lorem ipsum'),
    'should truncate right to the wordbreak before `size`, if that points to whitespace'
  )

  t.deepEqual(
    truncate(h('p', 'Lorem ipsum, dolor sit amet'), {size: 11}),
    h('p', 'Lorem ipsum'),
    'should truncate right to the wordbreak before `size`, if that points to punctuation'
  )

  t.deepEqual(
    truncate(h('p', 'Lorem ipsum, dolor sit amet'), {size: 12}),
    h('p', 'Lorem ipsum,'),
    'should truncate right to the punctuation at `size`, if that points to whitespace'
  )

  t.deepEqual(
    truncate(h('p', 'Lorem ipsum dolor sit amet'), {
      size: 10,
      maxCharacterStrip: 0
    }),
    h('p', 'Lorem ipsu'),
    'should truncate w/ `maxCharacterStrip: 0`'
  )

  const tree = h('p', [
    'Lorem ipsum dolor sit amet, ',
    h('del', 'consectetur'),
    ' adipisicing elit'
  ])

  t.deepEqual(
    truncate(
      h('p', [
        'Lorem ipsum dolor sit amet, ',
        h('del', 'consectetur'),
        ' adipisicing elit'
      ])
    ),
    h('p', [
      'Lorem ipsum dolor sit amet, ',
      h('del', 'consectetur'),
      ' adipisicing elit'
    ]),
    'should copy elements'
  )

  t.deepEqual(
    truncate(tree, {ignore: selectAll('del', tree)}),
    h('p', ['Lorem ipsum dolor sit amet, ', ' adipisicing elit']),
    'should truncate w/ `ignore`'
  )

  t.end()
})
