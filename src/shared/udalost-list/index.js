/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxUtils } from '@hhjcz/js-lib'
import rest from '../app/rest'
import * as actions from './actions'
import Container from './Container'

export default connect(
  (state) => ({
    ...(rest.selectResource('udalost')(state)),
    ...(state.udalostList.toObject()),
  }),
  reduxUtils.createMapDispatchToProps(actions)
)(Container)
