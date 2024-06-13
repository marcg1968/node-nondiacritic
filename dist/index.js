"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeDiacritics = void 0;
var _constants = require("./constants.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); } // src/index.js
/**
 * @typedef diacriticOptions
 * @type {Object}
 * @property {boolean} ucfirst for any uppercase diacritics, replace with only uppercase first
 * @property {boolean} nothing new string containing diacritics
 */

/**
 * @typedef processedString
 * @type {Object}
 * @property {string} original original string
 * @property {string} replaced new string containing diacritics
 */

/**
 * Takes a string and replaces all diacritics with non-diacritics
 * @param {String} str string containing diacritics
 * @param {diacriticOptions} [options] options for display
 * @returns {processedString}
 */

/**
 * Takes a string and replaces all diacritics with non-diacritics
 * @param {String} str - string containing diacritics
 * @param {Object.ucfirst} options.ucfirst - for uppercase diacritics, replace with only uppercase first
 * @param {Object.ucall} options.ucall - for uppercase diacritics, replace with only uppercase first
 * @returns {{original: str, replaced: new_string}} 
 */
var removeDiacritics = exports.removeDiacritics = function removeDiacritics(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (typeof str !== 'string') return null;
  var newStr = str;

  /* coerce options param into object */
  options = _typeof(options) !== 'object' ? {} : options;
  var diacriticals = str.split('').filter(function (e) {
    return e.codePointAt(0) > 122 ? true : false;
  });
  var arrDiacriticalRepl = diacriticals.length ? diacriticals.map(function (e) {
    var _diacriticsMap$find;
    return {
      letter: e,
      repl: ((_diacriticsMap$find = _constants.diacriticsMap.find(function (d) {
        return d.letters.search(e) > -1;
      })) === null || _diacriticsMap$find === void 0 ? void 0 : _diacriticsMap$find.base) || ''
    };
  }) : null;

  /* handle diacritics replacement */
  if (arrDiacriticalRepl) {
    newStr = arrDiacriticalRepl.reduce(function (acc, _ref, i) {
      var _options;
      var letter = _ref.letter,
        repl = _ref.repl;
      repl = (_options = options) !== null && _options !== void 0 && _options.ucfirst && options.ucfirst === true && repl.length > 1 ? repl[0] + repl.slice(1).toLowerCase() : repl;
      return acc.replaceAll(letter, repl);
    }, newStr);
  }
  return {
    original: str,
    replaced: newStr
  };
};