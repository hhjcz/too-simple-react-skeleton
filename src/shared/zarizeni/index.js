/** Created by hhj on 12/28/15. */
import { connect } from 'react-redux'
import { reduxUtils } from '@hhjcz/js-lib'
import rest from '../app/rest'
import Container from './Container'

export default connect(
  state => ({
    zarizeniResource: rest.selectResource('zarizeni')(state),
  }),
  reduxUtils.createMapDispatchToProps(rest.actions)
)(Container)

