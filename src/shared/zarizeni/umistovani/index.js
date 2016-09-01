/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxUtils } from '@hhjcz/js-lib'
import rest from '../../app/rest'
import actions from './actions'
import Container from './Container'

export default connect(
  state => ({
    zarizeniResource: rest.selectResource('zarizeni')(state),
    portyZarizeniResource: rest.selectResource('portyZarizeni')(state),
    umisteniResource: rest.selectResource('umisteni')(state),
    akrloksResource: rest.selectResource('akrloks')(state),
  }),
  reduxUtils.createMapDispatchToProps(actions)
)(Container)
