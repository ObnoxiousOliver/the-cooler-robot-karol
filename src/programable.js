import { defineWorld } from "./base"
import { BITS, cellToPos } from "./bitCells"

/**
 * Executes a script written in the cells 0 - 1000
 * @returns {any[]}
 */
export function executeScript () {
  return [
    
  ]
}

/**
 * Outputs a world file content string
 * 
 * Op Codes: 
 *  0b0000 - Move A
 *  0b0001 - Move B
 *  0b0010 - Move C
 *  0b0011 - Move D
 *
 *  0b0100 - Add
 *  0b0101 - Subtract
 *  0b0110 - Multiply
 *  0b0111 - Divide
 * 
 *  1000 - Jump
 * @param {{
 *  data: {[x: string]: number},
 *  main: object[]
 * }} script
 * @returns {string}
 */
export function defineScript (script) {
  if (!script) return ''

  const world = []
  const width = 128
  const length = 128

  var data
  if (script.data) {
    data = Object.keys(script.data).map((x, i) => ({
      pointer: i,
      key: x,
      value: script.data[x]
    }))
  }

  var main
  var labels = []
  if (script.main) {
    script.main.forEach((x, i) => {
      if (x.label) {
        labels.push({
          label: x.label,
          pointer: i - labels.length
        })
      }
    })

    main = script.main.filter(x => !x.label).map((x, i) => ({
      pointer: i,
      op: x.op,
      argument: x.argument
    }))
  }

  main.forEach((cmd, i) => {
    var pos = cellToPos(i, BITS - 1)

    var dataValue = typeof (cmd.argument) === 'number' ? null : data.find(x => x.key === cmd.argument)

    if (typeof (cmd.argument) !== 'number' && !dataValue) {
      throw new Error(`There is no data with key "${cmd.argument}"`)
    }

    var value = cmd.op * 0b0001000000000000 + ((typeof (cmd.argument) === 'number'
      ? cmd.argument
      : dataValue.pointer
    ) ?? 0)

    world.push(...Array(BITS).fill(0).map((_, i) => ({
      x: pos[0] + i,
      y: pos[1],
      marked: value.toString(BITS).padStart(BITS, '0')[i] === '1'
    })))
  })

  var worldFile = defineWorld(width, length, 1, 0, 0, 'S', world)

  return worldFile
}

/**
 * @param {'A' | 'B' | 'C' | 'D'} register
 * @param {number} value
 * @returns 
 */
export function mov (register, key) {
  return {
    op: 0b0000 + ['A', 'B', 'C', 'D'].indexOf(register),
    argument: key
  }
}

/**
 * @param {string} label
 * @returns 
 */
export function label (label) {
  return { label }
}
