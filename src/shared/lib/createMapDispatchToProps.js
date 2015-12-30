/**
 * Created by hhj on 12/28/15.
 */

import {bindActionCreators} from 'redux'
import {Map} from 'immutable'

const createMapDispatchToProps = actions => dispatch => {
  const creators = Map()
    .merge(...[actions])
    .filter(value => typeof value === 'function')
    .toObject()

  return ({
    dispatch,
    actions: bindActionCreators(creators, dispatch)
  })
}

export default createMapDispatchToProps
