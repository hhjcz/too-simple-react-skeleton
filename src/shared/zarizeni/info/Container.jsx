/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { reduxUtils } from '@hhjcz/js-lib'
import { selectItem } from '@hhjcz/redux-rest'
import * as actions from '../../zarizeni-list/actions'
import ZarizeniDetail from './ZarizeniDetail'

export default class Container extends React.Component {

  static propTypes = {
    params: PropTypes.object,
  };

  // server and client side fetch actions (see render.jsx & componentDidMount):
  static fetchActions = [actions.fetchOne];

  // browser fetching:
  componentDidMount() {
    const { params } = this.props
    Container.fetchActions.forEach((action) => action({ params }))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      const { params } = nextProps
      Container.fetchActions.forEach((action) => action({ params }))
    }
  }

  render() {
    const zarizeni = selectItem(this.props)
    return (
      <div id="zarizeni">
        <ZarizeniDetail zarizeni={zarizeni} />
      </div>
    )
  }
}

