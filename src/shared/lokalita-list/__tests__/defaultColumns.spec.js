/** Created by hhj on 2/26/16. */
import { expect } from 'chai'
import { Record, Map } from 'immutable'
import columns from '../defaultColumns'

describe('lokalita-list default columns defs', () => {

  it('should define iterable columns collection', () => {
    expect(columns instanceof Map).to.equal(true)
    expect(columns.size).to.be.above(1)
    columns.map(col => expect(col instanceof Record).to.equal(true)
    )
  })
})
