"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineScript = defineScript;
exports.executeScript = executeScript;
exports.label = label;
exports.mov = mov;

var _base = require("./base");

var _bitCells = require("./bitCells");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Executes a script written in the cells 0 - 1000
 * @returns {any[]}
 */
function executeScript() {
  return [];
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


function defineScript(script) {
  if (!script) return '';
  var world = [];
  var width = 128;
  var length = 128;
  var data;

  if (script.data) {
    data = Object.keys(script.data).map(function (x, i) {
      return {
        pointer: i,
        key: x,
        value: script.data[x]
      };
    });
  }

  var main;
  var labels = [];

  if (script.main) {
    script.main.forEach(function (x, i) {
      if (x.label) {
        labels.push({
          label: x.label,
          pointer: i - labels.length
        });
      }
    });
    main = script.main.filter(function (x) {
      return !x.label;
    }).map(function (x, i) {
      return {
        pointer: i,
        op: x.op,
        argument: x.argument
      };
    });
  }

  main.forEach(function (cmd, i) {
    var _ref;

    var pos = (0, _bitCells.cellToPos)(i, _bitCells.BITS - 1);
    var dataValue = typeof cmd.argument === 'number' ? null : data.find(function (x) {
      return x.key === cmd.argument;
    });

    if (typeof cmd.argument !== 'number' && !dataValue) {
      throw new Error("There is no data with key \"".concat(cmd.argument, "\""));
    }

    var value = cmd.op * 4096 + ((_ref = typeof cmd.argument === 'number' ? cmd.argument : dataValue.pointer) !== null && _ref !== void 0 ? _ref : 0);
    world.push.apply(world, _toConsumableArray(Array(_bitCells.BITS).fill(0).map(function (_, i) {
      return {
        x: pos[0] + i,
        y: pos[1],
        marked: value.toString(_bitCells.BITS).padStart(_bitCells.BITS, '0')[i] === '1'
      };
    })));
  });
  var worldFile = (0, _base.defineWorld)(width, length, 1, 0, 0, 'S', world);
  return worldFile;
}
/**
 * @param {'A' | 'B' | 'C' | 'D'} register
 * @param {number} value
 * @returns 
 */


function mov(register, key) {
  return {
    op: 0 + ['A', 'B', 'C', 'D'].indexOf(register),
    argument: key
  };
}
/**
 * @param {string} label
 * @returns 
 */


function label(label) {
  return {
    label: label
  };
}