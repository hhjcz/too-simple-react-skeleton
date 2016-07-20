/** Created by hhj on 2/16/16. */
import { Record } from 'immutable'

export class Cp2Type extends Record({
  id: 0,
  customPollerID: '',
  sysObjectID: '',
  pollerName: '',
  machineType: '',
  faulty: 0,
  functional: 0,
  total: 0,
  autoAssign: 0,
  updatedAt: ''
}) {
  constructor(args = {}) {
    if (args.total) args.total = parseInt(args.total)
    if (args.faulty) args.faulty = parseInt(args.faulty)
    if (args.functional) args.functional = parseInt(args.functional)
    super(args)
  }
}

export default Cp2Type
