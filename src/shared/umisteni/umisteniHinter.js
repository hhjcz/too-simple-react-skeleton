/** Created by hhj on 2/5/16. */

/** @typedef {{obec: string, ulice: string, cislo: number, cispop: number, cisori: number, chardop: string, op: number|string, akrlok: string, ixlok: number}} LokalitaHint */

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
}

const zkratkaToObec = zkratkaObce => zkratky[zkratkaObce.toLowerCase()] || zkratkaObce

function LokalitaHint(obec, ulice, cislo, chardop, op, akrlok, ixlok) {
  // console.log(obec)
  this.obec = obec || ''
  this.ulice = ulice || ''
  this.cislo = cislo || ''
  this.cispop = this.cislo
  this.cisori = this.cislo
  this.chardop = chardop || ''
  this.op = op || ''
  this.akrlok = akrlok || ''
  this.ixlok = ixlok || ''
}

LokalitaHint.prototype.toString = function() {
  const str = (this.obec ? `${this.obec}, ` : '') + (this.ulice ? `${this.ulice} ` : '')
    + (this.cislo ? `${this.cislo} ` : '') + this.chardop + (this.op ? `OP#${this.op}` : '')

  return str
}

LokalitaHint.prototype.fromDefaultMap = function(mapName, force) {
  if (!force && this.obec.length > 0) return
  let splitIndex = mapName.indexOf(' ')
  if (splitIndex === -1) splitIndex = mapName.indexOf('-')
  if (splitIndex === -1) splitIndex = mapName.length
  this.obec = mapName.substr(0, splitIndex)
}

/**
 * @param name
 * @returns {LokalitaHint}
 */
export function find(name) {
  /** @type {LokalitaHint} lokalitaHint */
  let lokalitaHint

  let match = name.match(/\[(\D+)\]\s*([a-z\s\._]*)\s*(\d*)\s*-+\s*(\D+)(\d*)(.*)/i)
  if (match !== null) {
    lokalitaHint = new LokalitaHint(null, match[2].trim(), match[3])
  }

  if (!lokalitaHint) {
    match = name.match(/\S+\.(\S+)\.([0-9]*[A-Za-z]+)(\d*)(\w*).*/i)
    if (match !== null) {
      lokalitaHint = new LokalitaHint(zkratkaToObec(match[1]), match[2].trim(), match[3], match[4])
    }
  }

  for (let i = 6; i >= 4; i--) {
    const re = new RegExp(`(SA-)*(\\d{${i},})`, 'i');
    match = re.exec(name);
    if (match !== null) {
      const op = (match[1] || '') + match[2]
      if (lokalitaHint) lokalitaHint.op = op
      else lokalitaHint = new LokalitaHint(null, null, null, null, op)
      break
    }
  }

  lokalitaHint = lokalitaHint || new LokalitaHint()

  return lokalitaHint
}

export default {
  find
}
