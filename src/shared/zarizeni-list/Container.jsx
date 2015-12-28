/**
 * Created by hhj on 12/28/15.
 */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Map} from 'immutable'
import createMapStateToProps from '../createMapStateToProps'
import createMapDispatchToProps from '../createMapDispatchToProps'
import * as actions from './actions'
import Tabulka from './Tabulka.jsx'

class Container extends React.Component {

  static propTypes = {
    seznamZarizeni: PropTypes.object,
    pagination: PropTypes.object,
    actions: PropTypes.object
  }

  render() {

    return (
      <div id="zarizeni-list">
        <h2>Seznam zarizeni</h2>
        <Tabulka seznamZarizeni={this.props.seznamZarizeni} />
      </div>
    )
  }
}

export default connect(
  createMapStateToProps('zarizeniList'),
  createMapDispatchToProps(actions)
)(Container)

