/** Created by hhj on 1/6/16. */
import { expect } from 'chai'
import createMapDispatchToProps from '../createMapDispatchToProps'

describe('createMapDispatchToProps', () => {

  const firstAction = x => x
  const secondAction = y => y
  const dispatch = z => `dispatched ${z}`

  it('should map dispatch function to props', () => {
    const props = createMapDispatchToProps({ firstAction, secondAction })(dispatch)

    expect(props.dispatch).to.equal(dispatch)
  })

  it('should bind actions to dispatch function', () => {
    const props = createMapDispatchToProps({ firstAction, secondAction })(dispatch)

    expect(typeof props.actions.firstAction).to.equal('function')
    expect(props.actions.firstAction('something')).to.equal('dispatched something')
  })

  it('should bind actions passed as array', () => {
    const actions = [{ firstAction, secondAction }, { secondAction, firstAction }]
    const props = createMapDispatchToProps(actions)(dispatch)

    expect(typeof props.actions.firstAction).to.equal('function')
    expect(props.actions.firstAction('something')).to.equal('dispatched something')
  })

  it('should not duplicate actions (should merge)', () => {
    const actions = [{ firstAction, secondAction }, { secondAction, firstAction }]
    const props = createMapDispatchToProps(actions)(dispatch)

    expect(Object.keys(props.actions).length).to.equal(2)
  })

})
