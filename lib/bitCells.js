"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BITS = void 0;
exports.cellToPos = cellToPos;
exports.clearCell = clearCell;
exports.copyCell = copyCell;
exports.shiftCell = shiftCell;
exports.unshiftCell = unshiftCell;

var _base = require("./base");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var BITS = 16;
exports.BITS = BITS;

function cellToPos(index) {
  var bit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 128;
  var length = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 128;
  return [Math.floor(index / width) * BITS + (BITS - 1) - bit, index % length];
}

function copyCell(from, to) {
  var diffX = cellToPos(to)[0] - cellToPos(from)[0];
  var diffY = cellToPos(to)[1] - cellToPos(from)[1];
  return [_base.movePointer.apply(void 0, _toConsumableArray(cellToPos(from))), (0, _base.repeat)(BITS - 1, [(0, _base.IF)(_base.isMark, [(0, _base.movePointerDelta)(diffX, diffY), (0, _base.setMark)(true)], [(0, _base.movePointerDelta)(diffX, diffY), (0, _base.setMark)(false)]), (0, _base.turn)('w'), (0, _base.step)(), (0, _base.movePointerDelta)(-diffX, -diffY)]), (0, _base.IF)(_base.isMark, [(0, _base.movePointerDelta)(diffX, diffY), (0, _base.setMark)(true)], [(0, _base.movePointerDelta)(diffX, diffY), (0, _base.setMark)(false)])];
}

function clearCell(index) {
  return {
    methods: {
      clearCell: [(0, _base.turn)('w'), (0, _base.repeat)(BITS - 1, [(0, _base.setMark)(false), (0, _base.step)()]), (0, _base.setMark)(false)]
    },
    code: [_base.movePointer.apply(void 0, _toConsumableArray(cellToPos(index))), (0, _base.call)('clearCell')]
  };
}

function shiftCell(index) {
  return {
    methods: {
      shiftCell: [(0, _base.turn)('e'), (0, _base.repeat)(BITS - 1, [(0, _base.step)(), (0, _base.IF)(_base.isMark, [(0, _base.turnLeft)(), (0, _base.turnLeft)(), (0, _base.step)(), (0, _base.turnLeft)(), (0, _base.turnLeft)(), (0, _base.setMark)(true)], [(0, _base.turnLeft)(), (0, _base.turnLeft)(), (0, _base.step)(), (0, _base.turnLeft)(), (0, _base.turnLeft)(), (0, _base.setMark)(false)]), (0, _base.step)()]), (0, _base.setMark)(false)]
    },
    code: [_base.movePointer.apply(void 0, _toConsumableArray(cellToPos(index, BITS - 1))), (0, _base.call)('shiftCell')]
  };
}

function unshiftCell(index) {
  return [_base.movePointer.apply(void 0, _toConsumableArray(cellToPos(index))), (0, _base.turn)('w'), (0, _base.repeat)(BITS - 1, [(0, _base.step)(), (0, _base.IF)(_base.isMark, [(0, _base.turnLeft)(), (0, _base.turnLeft)(), (0, _base.step)(), (0, _base.turnLeft)(), (0, _base.turnLeft)(), (0, _base.setMark)(true)], [(0, _base.turnLeft)(), (0, _base.turnLeft)(), (0, _base.step)(), (0, _base.turnLeft)(), (0, _base.turnLeft)(), (0, _base.setMark)(false)]), (0, _base.step)()]), (0, _base.setMark)(false)];
}