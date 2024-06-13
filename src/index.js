// src/index.js

import { diacriticsMap } from './constants.js'

export const removeDiacritics = str => {
    if (typeof str !== 'string') return null
    let newStr = str

    const diacriticals = str.split('').filter(e => e.codePointAt(0) > 122 ? true : false)
    const arrDiacriticalRepl = diacriticals.length
        ? diacriticals.map(e => ({ letter: e, repl: diacriticsMap.find(d => d.letters.search(e) > -1)?.base || ''}))
        : null
    
    /* handle diacritics replacement */
    if (arrDiacriticalRepl) {
        newStr = arrDiacriticalRepl.reduce((acc, { letter, repl }, i) => acc.replaceAll(letter, repl), newStr)
    }
    return {
        original: str,
        replaced: newStr,
    }
}
