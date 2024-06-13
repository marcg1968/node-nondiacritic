"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeDiacritics = void 0;
var _constants = require("./constants.js");
// src/index.js

var removeDiacritics = exports.removeDiacritics = function removeDiacritics(str) {
  if (typeof str !== 'string') return null;
  var newStr = str;
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
      var letter = _ref.letter,
        repl = _ref.repl;
      return acc.replaceAll(letter, repl);
    }, newStr);
  }
  return {
    original: str,
    replaced: newStr
  };
};