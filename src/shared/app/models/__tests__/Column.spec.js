/** Created by hhj on 1/11/16. */
import { expect } from 'chai'
import { Record } from 'immutable'
import { Column, columntValueTypes } from '../Column'

describe('zarizeni-list Column', () => {

  it('should instantiate with default values', () => {
    const column = new Column()
    expect(column instanceof Record).to.equal(true)
    expect(column.name).to.equal('column')
    expect(column.valueType).to.equal(columntValueTypes.number)
  })

})
