import { call, IF, isMark, method, movePointer, movePointerDelta, repeat, setMark, step, turn, turnLeft } from "./base"

export const BITS = 16

export function cellToPos (index, bit = 0, width = 128, length = 128) {
  return [
    Math.floor(index / width) * BITS + (BITS - 1) - bit,
    index % length
  ]
}

export function copyCell (from, to) {
  var diffX = cellToPos(to)[0] - cellToPos(from)[0]
  var diffY = cellToPos(to)[1] - cellToPos(from)[1]

  return [
    movePointer(...cellToPos(from)),
    repeat(BITS - 1, [
      IF(isMark, [
        movePointerDelta(diffX, diffY),
        setMark(true)
      ], [
        movePointerDelta(diffX, diffY),
        setMark(false)
      ]),
      turn('w'),
      step(),
      movePointerDelta(-diffX, -diffY),
    ]),
    IF(isMark, [
      movePointerDelta(diffX, diffY),
      setMark(true)
    ], [
      movePointerDelta(diffX, diffY),
      setMark(false)
    ])
  ]
}

export function clearCell (index) {
  return {
    methods: {
      clearCell: [
        turn('w'),
        repeat(BITS - 1, [
          setMark(false),
          step()
        ]),
        setMark(false)
      ]
    },
    code: [
      movePointer(...cellToPos(index)),
      call('clearCell')
    ]
  }
}

export function shiftCell (index) {
  return {
    methods: {
      shiftCell: [
        turn('e'),
        repeat(BITS - 1, [
          step(),
          IF(isMark, [
            turnLeft(),
            turnLeft(),
            step(),
            turnLeft(),
            turnLeft(),
            setMark(true)
          ], [
            turnLeft(),
            turnLeft(),
            step(),
            turnLeft(),
            turnLeft(),
            setMark(false)
          ]),
          step()
        ]),
        setMark(false)
      ]
    },
    code: [
      movePointer(...cellToPos(index, BITS - 1)),
      call('shiftCell')
    ]
  }

}

export function unshiftCell (index) {
  return [
    movePointer(...cellToPos(index)),
    turn('w'),
    repeat(BITS - 1, [
      step(),
      IF(isMark, [
        turnLeft(),
        turnLeft(),
        step(),
        turnLeft(),
        turnLeft(),
        setMark(true)
      ], [
        turnLeft(),
        turnLeft(),
        step(),
        turnLeft(),
        turnLeft(),
        setMark(false)
      ]),
      step()
    ]),
    setMark(false)
  ]
}
