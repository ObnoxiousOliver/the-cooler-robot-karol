"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IF = IF;
exports.call = void 0;
exports.defineProgram = defineProgram;
exports.defineWorld = defineWorld;
exports.method = exports.isWest = exports.isWall = exports.isSouth = exports.isNorth = exports.isMark = exports.isEast = exports.isBrick = void 0;
exports.movePointer = movePointer;
exports.movePointerDelta = movePointerDelta;
exports.toggleMark = exports.step = exports.setMark = exports.resetPointerFunction = exports.resetPointer = exports.repeatWhile = exports.repeatNTimesWhile = exports.repeatForever = exports.repeat = exports.placeBrick = exports.pickupBrick = exports.not = void 0;
exports.turn = turn;
exports.turnRight = exports.turnLeft = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var method = function method(name, code) {
  return ["Methode ".concat(name)].concat(_toConsumableArray(code), ['*Methode']);
};

exports.method = method;

var step = function step(n) {
  return n === 0 ? [] : ['Schritt' + (n ? "(".concat(n, ")") : '')];
};
/**
 * @param {string | string[]} con
 * @param {any[]} code
 * @param {any[]} elseCode
 */


exports.step = step;

function IF(con, code, elseCode) {
  return !con.fill ? ["wenn ".concat(con, " dann")].concat(_toConsumableArray(code), _toConsumableArray(elseCode ? ['sonst'].concat(_toConsumableArray(elseCode)) : []), ['*wenn']) : [].concat(_toConsumableArray(con.map(function (c) {
    return "wenn ".concat(c, " dann");
  })), _toConsumableArray(code), _toConsumableArray(con.map(function () {
    return [].concat(_toConsumableArray(elseCode ? ['sonst'].concat(_toConsumableArray(elseCode)) : []), ['*wenn']);
  })));
}
/**
 * @param {number} n
 * @param {any[]} code
 * @returns {any[]}
 */


var repeat = function repeat(n, code) {
  return ["wiederhole ".concat(n, " mal")].concat(_toConsumableArray(code), ['*wiederhole']);
};
/**
 * @param {string} con
 * @param {any[]} code
 * @returns {any[]}
 */


exports.repeat = repeat;

var repeatWhile = function repeatWhile(con, code) {
  return ["wiederhole solange ".concat(con)].concat(_toConsumableArray(code), ['*wiederhole']);
};
/**
 * @param {any[]} code
 * @returns {any[]}
 */


exports.repeatWhile = repeatWhile;

var repeatForever = function repeatForever(code) {
  return ['wiederhole immer'].concat(_toConsumableArray(code), ['*wiederhole']);
};

exports.repeatForever = repeatForever;

var repeatNTimesWhile = function repeatNTimesWhile(n, con, code) {
  return repeat(n, IF(con, code));
};

exports.repeatNTimesWhile = repeatNTimesWhile;

var turnRight = function turnRight() {
  return 'RechtsDrehen';
};

exports.turnRight = turnRight;

var turnLeft = function turnLeft() {
  return 'LinksDrehen';
};

exports.turnLeft = turnLeft;

var call = function call(x) {
  return x;
};

exports.call = call;

var not = function not(con) {
  return 'nicht ' + con;
};

exports.not = not;
var isNorth = 'IstNorden';
exports.isNorth = isNorth;
var isEast = 'IstOsten';
exports.isEast = isEast;
var isSouth = 'IstSüden';
exports.isSouth = isSouth;
var isWest = 'IstWesten';
exports.isWest = isWest;
var isWall = 'IstWand';
exports.isWall = isWall;
var isBrick = 'IstZiegel';
exports.isBrick = isBrick;
var isMark = 'IstMarke';
/**
 * @param {boolean} mark
 * @param {string} color
 */

exports.isMark = isMark;

var setMark = function setMark(mark, color) {
  return mark ? 'MarkeSetzen' + (color ? "(".concat(color, ")") : '') : 'MarkeLöschen';
};

exports.setMark = setMark;

var toggleMark = function toggleMark() {
  return 'toggleMark';
};

exports.toggleMark = toggleMark;

var placeBrick = function placeBrick() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return 'Hinlegen' + (count !== null ? "(".concat(count, ")") : '');
};

exports.placeBrick = placeBrick;

var pickupBrick = function pickupBrick() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return 'Aufheben' + (count !== null ? "(".concat(count, ")") : '');
};
/**
 * 
 * @param {any[]} program 
 * @param {{ newLine: boolean, lineWidth: number }} options 
 * @returns 
 */


exports.pickupBrick = pickupBrick;

function defineProgram(program) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var methods = _objectSpread({}, program.methods || {});

  program.main.flat(Infinity).filter(function (x) {
    return _typeof(x) === 'object' && !Array.isArray(x);
  }).map(function (x) {
    return x.methods;
  }).forEach(function (x) {
    return Object.keys(x).forEach(function (y) {
      return methods[y] = x[y];
    });
  });
  var program_ = [method('N', [repeatWhile(not(isNorth), [turnRight()])]), method('E', [repeatWhile(not(isEast), [turnRight()])]), method('S', [repeatWhile(not(isSouth), [turnRight()])]), method('W', [repeatWhile(not(isWest), [turnRight()])]), method('toggleMark', [IF(isMark, [setMark(false)], [setMark(true)])]), method('rPtr', resetPointerFunction())].concat(_toConsumableArray(Object.keys(methods).map(function (x) {
    return method(x, methods[x]);
  })), _toConsumableArray(program.main.flat(Infinity).map(function (x) {
    return Array.isArray(x) || typeof x === 'string' ? x : x === null || x === void 0 ? void 0 : x.code;
  })), [resetPointer()]);
  var output = program_.flat(Infinity).filter(function (x) {
    return !!x;
  }).join(options.newLine ? '\n' : ' ');

  if (options.lineWidth && !options.newLine) {
    var lines = [''];
    output.split(' ').forEach(function (x) {
      if (lines[lines.length - 1].length > options.lineWidth) {
        lines.push('');
      }

      lines[lines.length - 1] += ' ' + x;
    });
    output = lines.map(function (x) {
      return x.trim();
    }).join('\n');
    return output;
  } else return output;
}
/**
 * @param {'n' | 'e' | 's' | 'w'} direction 
 */


function turn(direction) {
  switch (direction) {
    case 'n':
      return 'N';

    case 'e':
      return 'E';

    case 's':
      return 'S';

    case 'w':
      return 'W';
  }
}

var resetPointerFunction = function resetPointerFunction() {
  return [turn('n'), repeatWhile(not(isWall), step()), turn('w'), repeatWhile(not(isWall), step()), turn('e')];
};

exports.resetPointerFunction = resetPointerFunction;

var resetPointer = function resetPointer() {
  return 'rPtr';
};
/**
 * @param {number} x
 * @param {number} y
 */


exports.resetPointer = resetPointer;

function movePointer(x, y) {
  return [resetPointer(), turn('e'), step(x), turnRight(), step(y)];
}
/**
 * @param {number} x
 * @param {numer} y
 */


function movePointerDelta(x, y) {
  return [].concat(_toConsumableArray(x === 0 ? [] : [x > 0 ? turn('e') : turn('w'), step(Math.abs(x))]), _toConsumableArray(y === 0 ? [] : [y > 0 ? turn('s') : turn('n'), step(Math.abs(y))]));
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


function defineWorld() {
  var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  var l = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var h = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var x = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var y = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var d = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'S';
  var world = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];
  return ['KarolVersion3.0', [w, l, h, x, y], ['S', 'W', 'N', 'E'].indexOf(d)].concat(_toConsumableArray(Array(w).fill(Array(l).fill(0)).map(function (lArr, wi) {
    return lArr.map(function (_, li) {
      var _world$block;

      var _world = world.find(function (x) {
        return x.x === wi && x.y === li;
      });

      if (!_world) return [].concat(_toConsumableArray(Array(h).fill('n')), ['o']);
      var arr = Array(h).fill('n').fill((_world$block = _world.block) !== null && _world$block !== void 0 ? _world$block : 'n', 0, _world.block === 'q' ? 2 : _world.height || 1);
      arr.push(_world.marked === true ? 'L' : _world.marked || 'o');
      return arr;
    });
  }))).flat(Infinity).join(' ');
}