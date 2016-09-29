/** Created by hhj on 8/31/16. */
import { connect } from 'react-redux'
import { reduxUtils } from '@hhjcz/js-lib'
import { MyGridContainer as Container } from '@hhjcz/react-lib'
import rest from '../app/rest'
import * as actions from './actions'

export default connect(
  (state) => ({
    title: 'zarizeni-ke-slouceni',
    ...(rest.selectResource('zarizeniKeSlouceni')(state)),
    ...(state.zarizeniKeSlouceni.toObject())
  }),
  reduxUtils.createMapDispatchToProps(actions)
)(Container)
