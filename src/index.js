import fs from 'fs'
import { alu } from './arithmetics'
import { defineProgram, IF, isMark, movePointer, step, turn } from './base'
import { cellToPos } from './bitCells'

const p = defineProgram({
  main: [
    movePointer(...cellToPos(0)),
    turn('w'),
    IF(isMark, [
      alu(1, 2, 3, 'subtract')
    ], [
      step(),
      IF(isMark, [
        alu(1, 2, 3, 'multiply', 4, 5)
      ], [
        alu(1, 2, 3, 'add')
      ])
    ])
  ]
}, {
  newLine: false,
  lineWidth: 200
})

// const script = defineScript({
//   data: {
//     var1: 0b1101,
//     var2: 0b1101
//   },
//   main: [
//     mov('A', 'var1'),
//     mov('B', 'var2')
//   ]
// })

// fs.writeFileSync('world.kdw', script)
fs.writeFileSync('program.kdp',
`{
  Rechtsoben wird der Operator bestimmt

  Eie Markierung auf...
  Nichts = Addieren
  Rot = Subtrahieren
  Gelb = Multiplizieren

  Die beiden Zahlen mit denen gerechnet werden soll
  komm in die erste und zweite Zeile

  Das Programm mit Schnellstart ausführen, da der Prozess
  teils sehr lange dauern kann.
}

` + p)
