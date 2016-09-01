/** Created by hhj on 12/28/15. */
import { connect } from 'react-redux'
import { reduxUtils } from '@hhjcz/js-lib'
import { selectIdAtCursor, selectResource } from '@hhjcz/redux-rest'
import rest from '../app/rest'
import Container from './Container'

const getResource = selectResource(rest.getRootTree)

export default connect(
  state => ({
    zarizeniResource: getResource('zarizeni')(state),
  }),
  reduxUtils.createMapDispatchToProps(rest.actions)
)(Container)

