/** Created by hhj on 1/11/16. */
import { Record } from 'immutable'

export const columntValueTypes = {
  number: 'number',
  string: 'string',
  boolean: 'boolean',
  date: 'date',
  ipAddress: 'ipAddress',
}

export class Column extends Record({
  name: 'columnName',
  caption: 'Column Name',
  valueType: columntValueTypes.number,
  defaultValue: null,
  visible: true,
  sortable: true,
  width: 2,
  render: null
}) {
  constructor(args = {}) {
    args.render = args.render || ((model, pozice) => model[this.name])
    super(args)
  }
}

export default Column
