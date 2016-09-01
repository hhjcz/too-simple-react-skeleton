/** Created by hhj on 12/28/15. */
import React from 'react'
import { connect } from 'react-redux'
import { reduxUtils } from '@hhjcz/js-lib'
import rest from '../app/rest'
import * as actions from './actions'
import Container from './Container'

export default connect(
  (state) => ({
    lokalitaResource: rest.selectResource('lokalita')(state),
    zarizeniNaLokalitaResource: rest.selectResource('zarizeniNaLokalite')(state),
    nepiOpyNaLokaliteResource: rest.selectResource('nepiOpyNaLokalite')(state),
  }),
  reduxUtils.createMapDispatchToProps(actions)
)(Container)
