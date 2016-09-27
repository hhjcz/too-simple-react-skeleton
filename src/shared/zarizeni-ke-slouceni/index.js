/** Created by hhj on 8/31/16. */
import { connect } from 'react-redux'
import { reduxUtils } from '@hhjcz/js-lib'
import rest from '../app/rest'
import Container from './Container'
import * as actions from './actions'

export default connect(
  (state) => ({
    ...(rest.selectResource('zarizeniKeSlouceni')(state)),
    ...(state.zarizeniKeSlouceni.toObject())
  }),
  reduxUtils.createMapDispatchToProps(actions)
)(Container)
