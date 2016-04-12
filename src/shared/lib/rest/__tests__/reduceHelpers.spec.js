/** Created by hhj on 4/12/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import * as reduceHelpers from '../reduceHelpers'

describe('rest lib reduceHelpers', () => {

  it('should revive state', () => {
    const state = reduceHelpers.revive()
    expect(state).to.be.instanceOf(reduceHelpers.InitialState)
  })

})
