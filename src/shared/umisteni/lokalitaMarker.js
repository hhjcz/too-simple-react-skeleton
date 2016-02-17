/** Created by hhj on 2/16/16. */
import umisteniHinter from './umisteniHinter'
import longestSubstring from '../lib/longestSubstring'

const markCssClass = 'text-warning'

function normalize(str) {
  if (str == null) return ''
  let nstr = str.toString()
  if (nstr) nstr = nstr.toLowerCase()
  return nstr
}

function Marked() {
  this.marked = ''
  this.markLength = 0
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

function markObec(lokalita, zarizeni) {
  const hint = zarizeni.lokalitaHint
  let markedObec = mark(lokalita.obec, hint.obec)
  if (markedObec.markLength === 0) {
    if (zarizeni.netvisionZarizeni && zarizeni.netvisionZarizeni.defaultmap && zarizeni.netvisionZarizeni.defaultmap.indexOf(lokalita.obec) >= 0) {
      markedObec = mark(lokalita.obec, lokalita.obec)
    }
  }

  return markedObec
}

function markUlice(lokalita, zarizeni) {
  return mark(lokalita.ulice, zarizeni.lokalitaHint.ulice)
}

function markCispop(lokalita, zarizeni) {
  return mark(lokalita.cispop, zarizeni.lokalitaHint.cispop)
}

function markCisori(lokalita, zarizeni) {
  return mark(lokalita.cisori, zarizeni.lokalitaHint.cisori)
}

function markCisdop(lokalita, zarizeni) {
  return mark(lokalita.chardop, zarizeni.lokalitaHint.chardop)
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

/**
 *
 * @param {Lokalita} lokalita
 * @param {Zarizeni} zarizeni
 * @returns {Marked}
 */
export default function(lokalita, zarizeni) {
  zarizeni.lokalitaHint || (zarizeni.lokalitaHint = umisteniHinter.find(zarizeni.name))
  const marked = new Marked()

  marked.concat(markObec(lokalita, zarizeni))
    .concat(lokalita.cast ? `-${lokalita.cast} ` : '')
    .concat(markUlice(lokalita, zarizeni))
    .concat(' ')
    .concat(markCispop(lokalita, zarizeni))
    .concat('/')
    .concat(markCisori(lokalita, zarizeni))
    .concat(' ')
    .concat(markCisdop(lokalita, zarizeni))

  if (marked.markLength > 0) return marked

  // mark longest common substring
  const trimmedName = zarizeni.name ? zarizeni.name : ''
  const trimmedAdresa = lokalita ? lokalita.adresa : ''
  marked.marked = longestSubstring
    .mark(trimmedName, trimmedAdresa, '<span class="text-warning"><b>', '</b></span>')
    .marked2

  return marked
}
