import { BITS, cellToPos, clearCell, copyCell, shiftCell } from "./bitCells"
import { setMark, movePointerDelta, turn, step, isMark, repeat, movePointer, IF, toggleMark, not, resetPointer, placeBricks, repeatWhile, repeatNTimesWhile, isBrick, placeBrick, pickupBrick, turnLeft } from "./base"

export function adder (a, b, out) {
  function setBytes(b2, b1) {
    return [
      setMark(!!b1),
      turn('w'),
      step(),
      setMark(!!b2)
    ]
  }

  var diffXab = cellToPos(b)[0] - cellToPos(a)[0]
  var diffYab = cellToPos(b)[1] - cellToPos(a)[1]

  var diffXbout = cellToPos(out)[0] - cellToPos(b)[0]
  var diffYbout = cellToPos(out)[1] - cellToPos(b)[1]

  var diffXouta = cellToPos(a)[0] - cellToPos(out)[0]
  var diffYouta = cellToPos(a)[1] - cellToPos(out)[1]
  
  const fromAtoB = movePointerDelta(diffXab, diffYab)
  const fromBtoOut = movePointerDelta(diffXbout, diffYbout)
  const fromOutToA = movePointerDelta(diffXouta, diffYouta)

  const oneBitAdder = (last) => [
    IF(isMark, [
      // Goto B[0]
      fromAtoB,

      IF(isMark, [
        // Goto Out[0]
        fromBtoOut,

        IF(
          isMark,
          last ? [setMark(1)] : setBytes(1, 1), // 1 + 1 + 1 = 11
          last ? [setMark(0)] : setBytes(1, 0) // 1 + 1 + 0 = 10
        ),
      ], [
        // Goto Out[0]
        fromBtoOut,

        IF(
          isMark,
          last ? [setMark(0)] : setBytes(1, 0), // 1 + 0 + 1 = 10
          last ? [setMark(1)] : setBytes(0, 1) // 1 + 0 + 0 = 01
        ),
      ])
    ], [
      // Goto B[0]
      fromAtoB,

      IF(isMark, [
        // Goto Out[0]
        fromBtoOut,

        IF(
          isMark,
          last ? [setMark(0)] : setBytes(1, 0), // 0 + 1 + 1 = 10
          last ? [setMark(1)] : setBytes(0, 1) // 0 + 1 + 0 = 01
        ),
      ], [
        // Goto Out[0]
        fromBtoOut,

        IF(
          isMark,
          last ? [setMark(1)] : setBytes(0, 1), // 0 + 0 + 1 = 01
          last ? [setMark(0)] : setBytes(0, 0) // 0 + 0 + 0 = 00
        ),
      ])
    ]),

    ...(last ? [] : [
      fromOutToA,
      turn('s')
    ])
  ]

  return [
    movePointer(...cellToPos(out)),
    setMark(false),
    fromOutToA,
    turn('s'),
    repeat(BITS - 1, oneBitAdder()),
    oneBitAdder(true)
  ]
}

export function multiplier (a, b, out, cache1, cache2) {
  return [
    movePointer(...cellToPos(a)),
    turn('w'),
    placeBrick(),
    copyCell(b, cache1),

    repeat(BITS - 2, [
      movePointer(...cellToPos(a)),
      turn('w'),
      repeatWhile(not(isBrick), step()),
      pickupBrick(),
      step(),
      placeBrick(),
      turnLeft(),
      turnLeft(),
      step(),

      IF(isMark, [
        adder(cache1, cache2, out),
        copyCell(out, cache2),
      ]),
      shiftCell(cache1),
    ]),
    
    movePointer(...cellToPos(a)),
    turn('w'),
    repeatWhile(not(isBrick), step()),
    pickupBrick(),

    IF(isMark, [
      adder(cache1, cache2, out),
      copyCell(out, cache2),
    ]),
    shiftCell(cache1),

    movePointer(...cellToPos(a, BITS - 1)),
    IF(isMark, adder(cache1, cache2, out)),

    clearCell(cache1),
    clearCell(cache2)
  ]
}

/**
 * @param {number} a
 * @param {number} b
 * @param {number} out
 * @param {'add'|'subtract'|'multiply'} method
 * @param {number} cache only relevant when multipling
 */
export function alu (a, b, out, method = 'add', cache1, cache2) {
  switch (method) {
    case 'add':
      return [
        adder(a, b, out)
      ]
    case 'subtract':
      return [
        negateCell(b),
        adder(a, b, out),
        negateCell(b)
      ]
    case 'multiply':
      return [
        movePointer(...cellToPos(a, BITS - 1)),
        IF(isMark, [
          negateCell(a),
          movePointer(...cellToPos(cache1, BITS - 2)),
          turn('w'),
          placeBrick()
        ]),

        movePointer(...cellToPos(b, BITS - 1)),
        IF(isMark, [
          negateCell(b),
          movePointer(...cellToPos(cache2, BITS - 2)),
          turn('w'),
          placeBrick()
        ]),

        multiplier(a, b, out, cache1, cache2),

        movePointer(...cellToPos(cache1, BITS - 2)),
        turn('w'),
        IF(isBrick, [
          pickupBrick(),
          negateCell(a),
          movePointer(...cellToPos(cache2, BITS - 2)),
          turn('w'),
          IF(not(isBrick), [
            negateCell(out)
          ], [
            pickupBrick(),
            negateCell(b)
          ])
        ], [,
          movePointer(...cellToPos(cache2, BITS - 2)),
          turn('w'),
          IF(isBrick, [
            pickupBrick(),
            negateCell(b),
            negateCell(out)
          ])
        ])
      ]
  }
}

export function incrementCell (index) {
  return [
    movePointer(...cellToPos(index)),
    turn('w'),

    repeatNTimesWhile(BITS - 1, isMark, [
      toggleMark(),
      step()
    ]),
    toggleMark(),
  ]
}

export function decrementCell (index) {
  return [
    movePointer(...cellToPos(index)),
    turn('w'),

    repeatNTimesWhile(BITS - 1, not(isMark), [
      toggleMark(),
      step()
    ]),
    toggleMark(),
  ]
}

export function negateCell (index) {
  return [
    movePointer(...cellToPos(index)),
    turn('w'),
    repeat(BITS - 1, [
      toggleMark(),
      step()
    ]),
    toggleMark(),
    incrementCell(index)
  ]
}
