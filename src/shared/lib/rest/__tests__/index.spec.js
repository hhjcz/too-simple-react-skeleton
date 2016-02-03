/** Created by hhj on 2/1/16. */
import { expect } from 'chai'
import myRest from '../index'

describe('myRest library', () => {

  let state
  let reducer
  let rest
  const nullResponse = {}
  const someEndpoint = {}
  someEndpoint.toObject = () => someEndpoint

  const fetch = url => ({
    // console.log('Dispatching: ', action)
    then: successCb => successCb({
      ok: true,
      json: () => ({
        then: successCb2 => successCb2(nullResponse)
      })
    })
  })

  const getState = () => ({ someEndpoint })

  const dispatch = action => {
    if (typeof action === 'function') return action({ dispatch, getState, fetch })
    if (action.type === '@@my-rest/SOME_ENDPOINT_SUCCESS') {
      expect(action.data).not.to.be.undefined // eslint-disable-line no-unused-expressions
    }
    const initialState = reducer(getState())
    state = reducer(initialState, action)

    return action
  }

  beforeEach(() => {
    rest = myRest({ someEndpoint: { url: '/someUrl' } }, fetch)
    reducer = rest.reducers.someEndpoint
  })

  it('should create basic object', () => {
    expect(typeof rest).to.equal('object')
    expect(typeof rest.actions).to.equal('object')
    expect(typeof rest.reducers).to.equal('object')
    expect(typeof rest.use).to.equal('function')
  })

  it('should create actions', () => {
    const { actions, reducers } = rest
    expect(typeof actions.someEndpoint.getAll).to.equal('function')
    expect(typeof reducers.someEndpoint).to.equal('function')
  })

  it('should use provided fetch', () => {
    dispatch(rest.actions.someEndpoint.getAll())
  })
})