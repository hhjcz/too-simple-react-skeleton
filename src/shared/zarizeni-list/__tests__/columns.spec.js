/** Created by hhj on 2/26/16. */
import { expect } from 'chai'
import { Record, Map } from 'immutable'
import columns from '../columns'

describe('zarizen-list columns', () => {

  it('should define iterable columns collection', () => {
    expect(columns instanceof Map).to.equal(true)
    expect(columns.size).to.be.above(2)
    columns.map(col => {
      expect(col instanceof Record).to.equal(true)
    })
  })
})
