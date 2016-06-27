/** Created by hhj on 2/16/16. */
import { Record, List } from 'immutable'
import { NepiOpyFactory } from './NepiOpy'
import { ZarizeniFactory } from './Zarizeni'

export class Cp2Type extends Record({
  id: 0,
  customPollerID: '',
  pollerName: '',
  sysObjectID: '',
  machineType: '',
  faulty: 0,
  functional: 0,
  total: 0,
  autoAssign: 0
}) {
  constructor(args = {}) {
    if (args.total) args.total = parseInt(args.total)
    if (args.faulty) args.faulty = parseInt(args.faulty)
    if (args.functional) args.functional = parseInt(args.functional)
    super(args)
  }
}

export default Cp2Type
