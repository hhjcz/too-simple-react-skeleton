/** Created by hhj on 12/28/15. */
import React from 'react'
import { connect } from 'react-redux'
import { reduxUtils } from '@hhjcz/js-lib'
import { getResourceWithItems, getItem, getItems } from '@hhjcz/redux-rest'
import rest from '../app/rest'
import * as actions from './actions'
import Container from './Container'

const getResource = getResourceWithItems(rest.getRootTree)

export default connect(
  (state) => ({
    lokalitaResource: getResource('lokalita')(state),
    zarizeniNaLokalitaResource: getResource('zarizeniNaLokalite')(state),
    nepiOpyNaLokaliteResource: getResource('nepiOpyNaLokalite')(state),
  }),
  reduxUtils.createMapDispatchToProps(actions)
)(Container)
