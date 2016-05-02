/** Created by hhj on 2/5/16. */

const zkratky = {
  prg: 'Praha',
  brn: 'Brno',
  ost: 'Ostrava',
  ova: 'Ostrava',
  plz: 'Plzen',
  pri: 'Pribram',
  par: 'Pardubice',
  sum: 'Sumperk',
  hk: 'Hradec Kralove',
  hrk: 'Hradec Kralove',
  unl: 'Usti nad Labem',
  cb: 'Ceske Budejovice',
  pre: 'Prerov',
  opa: 'Opava',
  kv: 'Karlovy Vary',
  kol: 'Kolin',
  olo: 'Olomouc',
  zli: 'Zlin',
  kla: 'Kladno',
  tep: 'Teplice',
  lib: 'Liberec',
  tab: 'Tabor',
  bre: 'Breclav',
  baa: 'Bratislava',
}

const zkratkaToObec = zkratkaObce => zkratky[zkratkaObce.toLowerCase()] || zkratkaObce

function LokalitaHint({ id, obec, ulice, cislo, chardop, op, akrlok, ixlok, map, zarizeniName } = {}) { // eslint-disable-line max-len
  // console.log(obec)
  this.id = id || 0
  this.obec = obec || ''
  this.ulice = ulice || ''
  this.cislo = cislo || ''
  this.cispop = this.cislo
  this.cisori = this.cislo
  this.chardop = chardop || ''
  this.op = op || ''
  this.akrlok = akrlok || ''
  this.ixlok = ixlok || ''
  this.map = map || ''
  this.zarizeniName = zarizeniName || ''
}

LokalitaHint.prototype.toString = function() {
  return (this.obec ? `${this.obec}, ` : '') + (this.ulice ? `${this.ulice} ` : '')
    + (this.cislo ? `${this.cislo} ` : '') + this.chardop + (this.op ? `OP#${this.op}` : '')
}

LokalitaHint.prototype.fromMapName = function(mapName, force) {
  if (!force && this.obec.length > 0) return
  let splitIndex = mapName.indexOf(' ')
  if (splitIndex === -1) splitIndex = mapName.indexOf('-')
  if (splitIndex === -1) splitIndex = mapName.length
  this.obec = mapName.substr(0, splitIndex)
}

/**
 * @param {string} name
 * @param {string} mapName
 * @param {number} id
 * @returns {LokalitaHint}
 */
export default function findLokalitaHint(name = '', mapName = '', id = 0) {
  /** @type {HintForm} lokalitaHint */
  let lokalitaHint

  let match = name.match(/\[(\D+)\]\s*([a-z\s\._]*)\s*(\d*)([A-z]*)\s*-+\s*(\D+)(\d*)(.*)/i)
  if (match !== null) {
    lokalitaHint = new LokalitaHint({
      id,
      ulice: match[2].trim(),
      cislo: match[3],
      chardop: (match[4] || '').toLowerCase()
    })
  }

  if (!lokalitaHint) {
    match = name.match(/\S+\.(\S+)\.([0-9]*[A-Za-z]+)(\d*)(\w*).*/i)
    if (match !== null) {
      lokalitaHint = new LokalitaHint({
        id,
        obec: zkratkaToObec(match[1]),
        ulice: match[2].trim(),
        cislo: match[3],
        chardop: (match[4] || '').toLowerCase()
      })
    }
  }

  match = name.match(/((?:SA-)?\d{4,6})/)
  if (match !== null) {
    const op = (match[0] || '')
    if (lokalitaHint) lokalitaHint.op = op
    else lokalitaHint = new LokalitaHint({ id, op })
  }

  lokalitaHint = lokalitaHint || new LokalitaHint({ id })

  lokalitaHint.fromMapName(mapName)
  lokalitaHint.zarizeniName = name

  return lokalitaHint
}
