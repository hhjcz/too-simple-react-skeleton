/** Created by hhj on 2/16/16. */
import { Record } from 'immutable'
import { NepiOpyFactory } from './NepiOpy'

export class Lokalita extends Record({
  id: 0,
  ixlok: 0,
  kraj: '',
  obec: '',
  cast: '',
  ulice: '',
  cispop: 0,
  cisori: 0,
  cisdop: 0,
  chardop: '',
  cisevi: 0,
  akrlok: '',
  kodObjektUIR: 0,
  bunka: 0,
  nepiOpy: NepiOpyFactory(),
  nepiOpyCount: 0,
}) {
  constructor(args = {}) {
    if (args && args.nepiOpy) args.nepiOpy = NepiOpyFactory(args.nepiOpy.data || args.nepiOpy)
    if (args.cisdop) args.chardop = String.fromCharCode('a'.charCodeAt(0) + args.cisdop - 1)
    if (args.nepiOpyCount) args.nepiOpyCount = args.nepiOpyCount[0]
    super(args)
  }
}

export default Lokalita
