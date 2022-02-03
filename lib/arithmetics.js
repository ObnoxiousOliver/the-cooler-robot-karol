"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adder = adder;
exports.alu = alu;
exports.decrementCell = decrementCell;
exports.incrementCell = incrementCell;
exports.multiplier = multiplier;
exports.negateCell = negateCell;

var _bitCells = require("./bitCells");

var _base = require("./base");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function adder(a, b, out) {
  function setBytes(b2, b1) {
    return [(0, _base.setMark)(!!b1), (0, _base.turn)('w'), (0, _base.step)(), (0, _base.setMark)(!!b2)];
  }

  var diffXab = (0, _bitCells.cellToPos)(b)[0] - (0, _bitCells.cellToPos)(a)[0];
  var diffYab = (0, _bitCells.cellToPos)(b)[1] - (0, _bitCells.cellToPos)(a)[1];
  var diffXbout = (0, _bitCells.cellToPos)(out)[0] - (0, _bitCells.cellToPos)(b)[0];
  var diffYbout = (0, _bitCells.cellToPos)(out)[1] - (0, _bitCells.cellToPos)(b)[1];
  var diffXouta = (0, _bitCells.cellToPos)(a)[0] - (0, _bitCells.cellToPos)(out)[0];
  var diffYouta = (0, _bitCells.cellToPos)(a)[1] - (0, _bitCells.cellToPos)(out)[1];
  var fromAtoB = (0, _base.movePointerDelta)(diffXab, diffYab);
  var fromBtoOut = (0, _base.movePointerDelta)(diffXbout, diffYbout);
  var fromOutToA = (0, _base.movePointerDelta)(diffXouta, diffYouta);

  var oneBitAdder = function oneBitAdder(last) {
    return [(0, _base.IF)(_base.isMark, [// Goto B[0]
    fromAtoB, (0, _base.IF)(_base.isMark, [// Goto Out[0]
    fromBtoOut, (0, _base.IF)(_base.isMark, last ? [(0, _base.setMark)(1)] : setBytes(1, 1), // 1 + 1 + 1 = 11
    last ? [(0, _base.setMark)(0)] : setBytes(1, 0) // 1 + 1 + 0 = 10
    )], [// Goto Out[0]
    fromBtoOut, (0, _base.IF)(_base.isMark, last ? [(0, _base.setMark)(0)] : setBytes(1, 0), // 1 + 0 + 1 = 10
    last ? [(0, _base.setMark)(1)] : setBytes(0, 1) // 1 + 0 + 0 = 01
    )])], [// Goto B[0]
    fromAtoB, (0, _base.IF)(_base.isMark, [// Goto Out[0]
    fromBtoOut, (0, _base.IF)(_base.isMark, last ? [(0, _base.setMark)(0)] : setBytes(1, 0), // 0 + 1 + 1 = 10
    last ? [(0, _base.setMark)(1)] : setBytes(0, 1) // 0 + 1 + 0 = 01
    )], [// Goto Out[0]
    fromBtoOut, (0, _base.IF)(_base.isMark, last ? [(0, _base.setMark)(1)] : setBytes(0, 1), // 0 + 0 + 1 = 01
    last ? [(0, _base.setMark)(0)] : setBytes(0, 0) // 0 + 0 + 0 = 00
    )])])].concat(_toConsumableArray(last ? [] : [fromOutToA, (0, _base.turn)('s')]));
  };

  return [_base.movePointer.apply(void 0, _toConsumableArray((0, _bitCells.cellToPos)(out))), (0, _base.setMark)(false), fromOutToA, (0, _base.turn)('s'), (0, _base.repeat)(_bitCells.BITS - 1, oneBitAdder()), oneBitAdder(true)];
}

function multiplier(a, b, out, cache1, cache2) {
  return [_base.movePointer.apply(void 0, _toConsumableArray((0, _bitCells.cellToPos)(a))), (0, _base.turn)('w'), (0, _base.placeBrick)(), (0, _bitCells.copyCell)(b, cache1), (0, _base.repeat)(_bitCells.BITS - 2, [_base.movePointer.apply(void 0, _toConsumableArray((0, _bitCells.cellToPos)(a))), (0, _base.turn)('w'), (0, _base.repeatWhile)((0, _base.not)(_base.isBrick), (0, _base.step)()), (0, _base.pickupBrick)(), (0, _base.step)(), (0, _base.placeBrick)(), (0, _base.turnLeft)(), (0, _base.turnLeft)(), (0, _base.step)(), (0, _base.IF)(_base.isMark, [adder(cache1, cache2, out), (0, _bitCells.copyCell)(out, cache2)]), (0, _bitCells.shiftCell)(cache1)]), _base.movePointer.apply(void 0, _toConsumableArray((0, _bitCells.cellToPos)(a))), (0, _base.turn)('w'), (0, _base.repeatWhile)((0, _base.not)(_base.isBrick), (0, _base.step)()), (0, _base.pickupBrick)(), (0, _base.IF)(_base.isMark, [adder(cache1, cache2, out), (0, _bitCells.copyCell)(out, cache2)]), (0, _bitCells.shiftCell)(cache1), _base.movePointer.apply(void 0, _toConsumableArray((0, _bitCells.cellToPos)(a, _bitCells.BITS - 1))), (0, _base.IF)(_base.isMark, adder(cache1, cache2, out)), (0, _bitCells.clearCell)(cache1), (0, _bitCells.clearCell)(cache2)];
}
/**
 * @param {number} a
 * @param {number} b
 * @param {number} out
 * @param {'add'|'subtract'|'multiply'} method
 * @param {number} cache only relevant when multipling
 */


function alu(a, b, out) {
  var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'add';
  var cache1 = arguments.length > 4 ? arguments[4] : undefined;
  var cache2 = arguments.length > 5 ? arguments[5] : undefined;

  switch (method) {
    case 'add':
      return [adder(a, b, out)];

    case 'subtract':
      return [negateCell(b), adder(a, b, out), negateCell(b)];

    case 'multiply':
      return [_base.movePointer.apply(void 0, _toConsumableArray((0, _bitCells.cellToPos)(a, _bitCells.BITS - 1))), (0, _base.IF)(_base.isMark, [negateCell(a), _base.movePointer.apply(void 0, _toConsumableArray((0, _bitCells.cellToPos)(cache1, _bitCells.BITS - 2))), (0, _base.turn)('w'), (0, _base.placeBrick)()]), _base.movePointer.apply(void 0, _toConsumableArray((0, _bitCells.cellToPos)(b, _bitCells.BITS - 1))), (0, _base.IF)(_base.isMark, [negateCell(b), _base.movePointer.apply(void 0, _toConsumableArray((0, _bitCells.cellToPos)(cache2, _bitCells.BITS - 2))), (0, _base.turn)('w'), (0, _base.placeBrick)()]), multiplier(a, b, out, cache1, cache2), _base.movePointer.apply(void 0, _toConsumableArray((0, _bitCells.cellToPos)(cache1, _bitCells.BITS - 2))), (0, _base.turn)('w'), (0, _base.IF)(_base.isBrick, [(0, _base.pickupBrick)(), negateCell(a), _base.movePointer.apply(void 0, _toConsumableArray((0, _bitCells.cellToPos)(cache2, _bitCells.BITS - 2))), (0, _base.turn)('w'), (0, _base.IF)((0, _base.not)(_base.isBrick), [negateCell(out)], [(0, _base.pickupBrick)(), negateCell(b)])], [, _base.movePointer.apply(void 0, _toConsumableArray((0, _bitCells.cellToPos)(cache2, _bitCells.BITS - 2))), (0, _base.turn)('w'), (0, _base.IF)(_base.isBrick, [(0, _base.pickupBrick)(), negateCell(b), negateCell(out)])])];
  }
}

function incrementCell(index) {
  return [_base.movePointer.apply(void 0, _toConsumableArray((0, _bitCells.cellToPos)(index))), (0, _base.turn)('w'), (0, _base.repeatNTimesWhile)(_bitCells.BITS - 1, _base.isMark, [(0, _base.toggleMark)(), (0, _base.step)()]), (0, _base.toggleMark)()];
}

function decrementCell(index) {
  return [_base.movePointer.apply(void 0, _toConsumableArray((0, _bitCells.cellToPos)(index))), (0, _base.turn)('w'), (0, _base.repeatNTimesWhile)(_bitCells.BITS - 1, (0, _base.not)(_base.isMark), [(0, _base.toggleMark)(), (0, _base.step)()]), (0, _base.toggleMark)()];
}

function negateCell(index) {
  return [_base.movePointer.apply(void 0, _toConsumableArray((0, _bitCells.cellToPos)(index))), (0, _base.turn)('w'), (0, _base.repeat)(_bitCells.BITS - 1, [(0, _base.toggleMark)(), (0, _base.step)()]), (0, _base.toggleMark)(), incrementCell(index)];
}