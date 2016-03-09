/** @param {Lokalita} lokalita */
function isSerializable(lokalita) {
  if (lokalita && lokalita.ixlok > 0) return true
  return false
}

/** Created by hhj on 10/13/15. */

/** @param {Lokalita} lokalita */
export function stringifyObec(lokalita) {
  if (!isSerializable(lokalita)) return ''

  return lokalita.obec + (lokalita.cast ? `-${lokalita.cast}` : '')
}

/** @param {Lokalita} lokalita */
export function stringifyUlice(lokalita) {
  if (!isSerializable(lokalita)) return ''

  let ulice = `${lokalita.ulice} `
  if (lokalita.cispop) ulice += lokalita.cispop
  if (lokalita.cisori && lokalita.cispop) ulice += '/'
  if (lokalita.cisori) ulice += lokalita.cisori
  if (lokalita.cisdop > 0) ulice += lokalita.chardop

  return ulice
}

/** @param {Lokalita} lokalita */
export function stringifyLokalita(lokalita) {
  if (!isSerializable(lokalita)) return ''

  const obec = stringifyObec(lokalita)
  const ulice = stringifyUlice(lokalita)
  const akrlok = lokalita.akrlok ? ` "${lokalita.akrlok}"` : ''
  const adresa = `${obec}, ${ulice} :: ${akrlok}`.replace(/\s{2,}/, ' ')

  return adresa

}

export default stringifyLokalita
