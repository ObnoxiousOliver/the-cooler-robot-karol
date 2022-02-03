export const method = (name, code) => [`Methode ${name}`, ...code, '*Methode']

export const step = (n) => n === 0 ? [] : ['Schritt' + (n ? `(${n})` : '')]

/**
 * @param {string | string[]} con
 * @param {any[]} code
 * @param {any[]} elseCode
 */
export function IF (con, code, elseCode) {
  return !con.fill
  ? [
    `wenn ${con} dann`,
    ...code,
    ...(elseCode ? ['sonst', ...elseCode] : []),
    '*wenn'
  ] : [
    ...con.map(c => `wenn ${c} dann`),
    ...code,
    ...con.map(() => [
      ...(elseCode ? ['sonst', ...elseCode] : []),
      '*wenn'
    ]),
  ]
}

/**
 * @param {number} n
 * @param {any[]} code
 * @returns {any[]}
 */
export const repeat = (n, code) => [`wiederhole ${n} mal`, ...code, '*wiederhole']
/**
 * @param {string} con
 * @param {any[]} code
 * @returns {any[]}
 */
export const repeatWhile = (con, code) => [`wiederhole solange ${con}`, ...code, '*wiederhole']
/**
 * @param {any[]} code
 * @returns {any[]}
 */
export const repeatForever = (code) => ['wiederhole immer', ...code, '*wiederhole']

export const repeatNTimesWhile = (n, con, code) => repeat(n, IF(con, code))

export const turnRight = () => 'RechtsDrehen'
export const turnLeft = () => 'LinksDrehen'

export const call = x => x

export const not = (con) => 'nicht ' + con
export const isNorth = 'IstNorden'
export const isEast = 'IstOsten'
export const isSouth = 'IstSüden'
export const isWest = 'IstWesten'

export const isWall = 'IstWand'
export const isBrick = 'IstZiegel'
export const isMark = 'IstMarke'

/**
 * @param {boolean} mark
 * @param {string} color
 */
export const setMark = (mark, color) => mark ? 'MarkeSetzen' + (color ? `(${color})` : '') : 'MarkeLöschen'
export const toggleMark = () => 'toggleMark'

export const placeBrick = (count = null) => 'Hinlegen' + (count !== null ? `(${count})` : '')
export const pickupBrick = (count = null) => 'Aufheben' + (count !== null ? `(${count})` : '')

/**
 * 
 * @param {any[]} program 
 * @param {{ newLine: boolean, lineWidth: number }} options 
 * @returns 
 */
export function defineProgram(program, options = {}) {
  const methods = {...(program.methods || {})}

  program.main.flat(Infinity)
    .filter(x => typeof (x) === 'object' && !Array.isArray(x))
    .map(x => x.methods).forEach(x => Object.keys(x).forEach(y => methods[y] = x[y]))

  const program_ = [
    method('N', [repeatWhile(not(isNorth), [turnRight()])]),
    method('E', [repeatWhile(not(isEast), [turnRight()])]),
    method('S', [repeatWhile(not(isSouth), [turnRight()])]),
    method('W', [repeatWhile(not(isWest), [turnRight()])]),
    method('toggleMark', [IF(isMark, [setMark(false)], [setMark(true)])]),
    method('rPtr', resetPointerFunction()),

    // All Methods
    ...Object.keys(methods).map(x => method(x, methods[x])),

    ...program.main.flat(Infinity).map(x => Array.isArray(x) || typeof (x) === 'string' ? x : x?.code),

    resetPointer()
  ]

  var output = program_.flat(Infinity).filter(x => !!x).join(options.newLine ? '\n' : ' ')

  if (options.lineWidth && !options.newLine) {
    const lines = ['']

    output.split(' ').forEach(x => {
      if (lines[lines.length - 1].length > options.lineWidth) {
        lines.push('')
      }

      lines[lines.length - 1] += ' ' + x
    })

    output = lines.map(x => x.trim()).join('\n')
    return output
  } else return output
}

/**
 * @param {'n' | 'e' | 's' | 'w'} direction 
 */
export function turn(direction) {
  switch (direction) {
    case 'n':
      return 'N'
    case 'e':
      return 'E'
    case 's':
      return 'S'
    case 'w':
      return 'W'
  }
}

export const resetPointerFunction = () => [
  turn('n'),
  repeatWhile(not(isWall), step()),
  turn('w'),
  repeatWhile(not(isWall), step()),
  turn('e')
]

export const resetPointer = () => 'rPtr'

/**
 * @param {number} x
 * @param {number} y
 */
export function movePointer (x, y) {
  return [
    resetPointer(),
    turn('e'),
    step(x),
    turnRight(),
    step(y)
  ]
}

/**
 * @param {number} x
 * @param {numer} y
 */
export function movePointerDelta(x, y) {
  return [
    ...(x === 0 ? [] : [
      x > 0 ? turn('e') : turn('w'),
      step(Math.abs(x))
    ]),
    ...(y === 0 ? [] : [
      y > 0 ? turn('s') : turn('n'),
      step(Math.abs(y))
    ])
  ]
}

/**
 * @param {number} w
 * @param {number} l
 * @param {number} h
 * @param {number} x
 * @param {number} y
 * @param {'N' | 'E' | 'S' | 'W'} d
 * @param {{
 *   x: number,
 *   y: number,
 *   height?: number,
 *   block?: 'A' | 'B' | 'C' | 'D' | 'q',
 *   marked?: true | 'K' | 'L' | 'M' | 'N' | 'O'}[]} world
 * @returns
 */
export function defineWorld (w = 100, l = 100, h = 10, x = 0, y = 0, d = 'S', world = []) {
  
  return [
    'KarolVersion3.0',
    [w, l, h, x, y],
    ['S', 'W', 'N', 'E'].indexOf(d),
    ...Array(w).fill(Array(l).fill(0)).map((lArr, wi) => lArr.map((_, li) => {
        var _world = world.find(x => x.x === wi && x.y === li)

        if (!_world) return [...Array(h).fill('n'), 'o']

        var arr = Array(h)
          .fill('n')
          .fill(_world.block ?? 'n', 0, _world.block === 'q' ? 2 : _world.height || 1)

        arr.push(_world.marked === true ? 'L' : _world.marked || 'o')

        return arr
      })
    )
  ].flat(Infinity).join(' ')
}
