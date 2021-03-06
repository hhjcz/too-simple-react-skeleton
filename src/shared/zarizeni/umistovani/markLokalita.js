/** Created by hhj on 2/16/16. */
import { longestSubstring } from '@hhjcz/js-lib'
import { stringifyLokalita } from './stringifyLokalita'

const markCssClass = 'text-warning'

function normalize(str) {
  if (!str) return ''
  let nstr = str.toString()
  if (nstr) nstr = nstr.toLowerCase()
  return nstr
}

function Marked(marked, markLength) {
  this.marked = marked || ''
  this.markLength = markLength || 0
}

Marked.prototype.concat = function(toConcat) {
  if (typeof toConcat === 'string') {
    this.marked += toConcat
  } else {
    this.marked += toConcat.marked
    this.markLength += toConcat.markLength
  }

  return this
}

function mark(str1, str2) {
  const nstr1 = normalize(str1)
  const nstr2 = normalize(str2)
  const marked = new Marked()
  if (nstr1 && nstr2 && nstr1 === nstr2) {
    marked.marked += `<span class="${markCssClass}"><b>${str1}</b></span>`
    marked.markLength += nstr1.length
  } else {
    marked.marked += str1
  }

  return marked
}

function markObec(lokalita, lokalitaHint) {
  let markedObec = mark(lokalita.obec, lokalitaHint.obec)
  if (markedObec.markLength === 0) {
    if (lokalitaHint.map && lokalitaHint.map.indexOf(lokalita.obec) >= 0) {
      markedObec = mark(lokalita.obec, lokalita.obec)
    }
  }

  return markedObec
}

function markUlice(lokalita, lokalitaHint) {
  return mark(lokalita.ulice, lokalitaHint.ulice)
}

function markCispop(lokalita, lokalitaHint) {
  return mark(lokalita.cispop, lokalitaHint.cispop)
}

function markCisori(lokalita, lokalitaHint) {
  return mark(lokalita.cisori, lokalitaHint.cisori)
}

function markCisdop(lokalita, lokalitaHint) {
  return mark(lokalita.chardop, lokalitaHint.chardop)
}

function markAkrlok(lokalita, lokalitaHint) {
  const marked = longestSubstring.mark(
    lokalita.akrlok,
    lokalitaHint.ulice,
    '<span class="text-warning"><b>',
    '</b></span>'
  )
  const markedAkrlok = new Marked()
  if (lokalita.akrlok && lokalita.akrlok.length > 0) markedAkrlok.concat(' :: ').concat(marked)

  return markedAkrlok
}

/**
 * @param {Lokalita} lokalita
 * @param {LokalitaHint} lokalitaHint
 * @returns {Marked}
 */
export default function markLokalita(lokalita, lokalitaHint) {
  const marked = new Marked()

  marked.concat(markObec(lokalita, lokalitaHint))
    .concat(lokalita.cast ? `-${lokalita.cast} ` : '')
    .concat(markUlice(lokalita, lokalitaHint))
    .concat(' ')
    .concat(markCispop(lokalita, lokalitaHint))
    .concat('/')
    .concat(markCisori(lokalita, lokalitaHint))
    .concat(' ')
    .concat(markCisdop(lokalita, lokalitaHint))
    .concat(markAkrlok(lokalita, lokalitaHint))

  if (marked.markLength === 0) {
    // mark longest common substring
    const trimmedName = lokalitaHint.zarizeniName || ''
    const trimmedAdresa = stringifyLokalita(lokalita)
    marked.marked = longestSubstring
      .mark(trimmedName, trimmedAdresa, '<span class="text-warning"><b>', '</b></span>')
      .marked2
  }

  return marked
}
