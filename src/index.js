// src/index.js

import { diacriticsMap } from './constants.js'

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
export const removeDiacritics = (str, options={}) => {
    if (typeof str !== 'string') return null
    let newStr = str
    
    /* coerce options param into object */
    options = typeof options !== 'object' ? {} : options

    const diacriticals = str.split('').filter(e => e.codePointAt(0) > 122 ? true : false)
    const arrDiacriticalRepl = diacriticals.length
        ? diacriticals.map(e => ({ letter: e, repl: diacriticsMap.find(d => d.letters.search(e) > -1)?.base || ''}))
        : null

    /* handle diacritics replacement */
    if (arrDiacriticalRepl) {
        newStr = arrDiacriticalRepl.reduce((acc, { letter, repl }, i) => {
            repl = options?.ucfirst && options.ucfirst === true && repl.length > 1 
                ? repl[0] + repl.slice(1).toLowerCase()
                : repl
            return acc.replaceAll(letter, repl)
        }, newStr)
    }
    return {
        original: str,
        replaced: newStr,
    }
}
