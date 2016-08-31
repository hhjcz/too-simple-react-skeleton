/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxUtils } from '@hhjcz/js-lib'
import { getResourceWithItems } from '@hhjcz/redux-rest'
import rest from '../../app/rest'
import actions from './actions'
import Container from './Container'

const getResource = getResourceWithItems(rest.getRootTree)

export default connect(
  state => ({
    zarizeniResource: getResource('zarizeni')(state),
    portyZarizeniResource: getResource('portyZarizeni')(state),
    umisteniResource: getResource('umisteni')(state),
    akrloksResource: getResource('akrloks')(state),
  }),
  reduxUtils.createMapDispatchToProps(actions)
)(Container)
