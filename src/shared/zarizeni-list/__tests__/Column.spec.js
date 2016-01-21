/** Created by hhj on 1/11/16. */
import { expect } from 'chai'
import { Record, Map } from 'immutable'

import { Column, columntValueTypes, columns } from '../column'

describe('zarizeni-list Column', () => {

  beforeEach(() => {
  })

  it('should instantiate with default values', () => {
    const column = new Column()
    expect(column instanceof Record).to.equal(true)
    expect(column.name).to.equal('column')
    expect(column.valueType).to.equal(columntValueTypes.number)
  })

})

describe('zarizen-list Columns collection', () => {

  it('should define iterable columns collection', () => {
    expect(columns instanceof Map).to.equal(true)
    expect(columns.size).to.be.above(2)
    columns.map(col => {
      expect(col instanceof Record).to.equal(true)
    })
  })

})
