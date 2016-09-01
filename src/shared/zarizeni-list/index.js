/** Created by hhj on 8/31/16. */
import { connect } from 'react-redux'
import { reduxUtils } from '@hhjcz/js-lib'
import { selectors } from '@hhjcz/redux-rest'
import rest from '../app/rest'
import Container from './Container'
import * as actions from './actions'

const getResource = selectors.selectResource(rest.getRootTree)

export default connect(
  (state) => ({
    ...(getResource('zarizeni')(state)),
    ...(state.zarizeniList.toObject())
  }),
  reduxUtils.createMapDispatchToProps(actions)
)(Container)
