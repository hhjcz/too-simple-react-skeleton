/**
 * Created by hhj on 12/28/15.
 */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import createMapStateToProps from '../createMapStateToProps'
import createMapDispatchToProps from '../createMapDispatchToProps'
import * as listActions from './actions'
import Tabulka from './Tabulka.jsx'
import Paginator from './Paginator'

class Container extends React.Component {

  static propTypes = {
    fetching: PropTypes.boolean,
    seznamZarizeni: PropTypes.object,
    pagination: PropTypes.object,
    actions: PropTypes.object
  }

  render() {
    const {actions, pagination, seznamZarizeni, fetching} = this.props
    return (
      <div id="zarizeni-list">
        <h2>Seznam zarizeni</h2>
        <Tabulka seznamZarizeni={seznamZarizeni.toList()} />
        <Paginator pagination={pagination} onPageChange={(page) => actions.gotoPage(page)} />
        {fetching ? 'Fetching...' : ''}
      </div>
    )
  }
}

export default connect(
  createMapStateToProps('zarizeniList'),
  createMapDispatchToProps(listActions)
)(Container)
