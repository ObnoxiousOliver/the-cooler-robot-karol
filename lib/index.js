"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _arithmetics = require("./arithmetics");

var _base = require("./base");

var _bitCells = require("./bitCells");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var p = (0, _base.defineProgram)({
  main: [_base.movePointer.apply(void 0, _toConsumableArray((0, _bitCells.cellToPos)(0))), (0, _base.turn)('w'), (0, _base.IF)(_base.isMark, [(0, _arithmetics.alu)(1, 2, 3, 'subtract')], [(0, _base.step)(), (0, _base.IF)(_base.isMark, [(0, _arithmetics.alu)(1, 2, 3, 'multiply', 4, 5)], [(0, _arithmetics.alu)(1, 2, 3, 'add')])])]
}, {
  newLine: false,
  lineWidth: 200
}); // const script = defineScript({
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

_fs["default"].writeFileSync('program.kdp', "{\n  Rechtsoben wird der Operator bestimmt\n\n  Eie Markierung auf...\n  Nichts = Addieren\n  Rot = Subtrahieren\n  Gelb = Multiplizieren\n\n  Die beiden Zahlen mit denen gerechnet werden soll\n  komm in die erste und zweite Zeile\n\n  Das Programm mit Schnellstart ausf\xFChren, da der Prozess\n  teils sehr lange dauern kann.\n}\n\n" + p);