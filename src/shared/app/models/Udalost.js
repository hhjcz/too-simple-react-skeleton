/** Created by hhj on 5/30/16. */
import { Record } from 'immutable'
import { DruhUdalosti } from './DruhUdalosti'

export class Udalost extends Record({
  id: null,
  druh: new DruhUdalosti(),
  data: [],
  stav: null,
  createdAt: '',
  updatedAt: '',
}) {
  constructor(args) {
    if (args && args.druh) args.druh = new DruhUdalosti(args.druh)
    super(args)
  }
}

export default Udalost
