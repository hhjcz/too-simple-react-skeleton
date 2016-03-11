/** Created by hhj on 3/11/16. */
import { List } from 'immutable'
import NepiOp from './NepiOp'

export function NepiOpyFactory(nepiOpy = []) {
  return List(nepiOpy.map(item => new NepiOp(item)))
}
