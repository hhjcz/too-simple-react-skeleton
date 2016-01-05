/** Created by hhj on 12/18/15. */
import { expect } from 'chai'
import { Pagination, nextPage, previousPage, gotoPage } from './../pagination'

describe('pagination', () => {

  it('should go to page', () => {
    const state = new Pagination({ page: 1, perPage: 666, total: 6666, totalPages: 6 })
    const nextState = gotoPage(state, 6)

    expect(nextState).to.equal(new Pagination({ page: 6, perPage: 666, total: 6666, totalPages: 6 }))
    expect(state).to.equal(new Pagination({ page: 1, perPage: 666, total: 6666, totalPages: 6 }))
  })

  it('should set next page', () => {
    const state = new Pagination({ page: 1, perPage: 666, total: 6666, totalPages: 3 })
    const nextState = nextPage(state)

    expect(nextState).to.equal(new Pagination({ page: 2, perPage: 666, total: 6666, totalPages: 3 }))
    expect(state).to.equal(new Pagination({ page: 1, perPage: 666, total: 6666, totalPages: 3 }))
  })

  it('should not overflow', () => {
    const state = new Pagination({ page: 666, perPage: 66, totalPages: 666 })
    const nextState = nextPage(state)

    expect(nextState).to.equal(state)
    expect(nextState === state).to.equal(true)
  })

  it('should set previous page', () => {
    const state = new Pagination({ page: 3, perPage: 666, total: 6666, totalPages: 3 })
    const nextState = previousPage(state)

    expect(nextState).to.equal(new Pagination({ page: 2, perPage: 666, total: 6666, totalPages: 3 }))
    expect(state).to.equal(new Pagination({ page: 3, perPage: 666, total: 6666, totalPages: 3 }))
  })

  it('should not underflow', () => {
    const state = new Pagination({ page: 1, perPage: 66, totalPages: 666 })
    const nextState = previousPage(state)

    expect(nextState).to.equal(state)
    expect(nextState === state).to.equal(true)
  })
})
