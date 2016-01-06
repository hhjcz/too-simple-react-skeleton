/** Created by hhj on 12/28/15. */
import { bindActionCreators } from 'redux'
import { Map } from 'immutable'

/**
 * @param actions
 */
const createMapDispatchToProps = actions => dispatch => {
  const creators = Map()
    .merge(actions)  // when actions is an object
    .merge(...actions) // when action is an array (called with [actions])
    .filter(value => typeof value === 'function')
    .toObject()

  return ({
    dispatch,
    actions: bindActionCreators(creators, dispatch)
  })
}

export default createMapDispatchToProps
