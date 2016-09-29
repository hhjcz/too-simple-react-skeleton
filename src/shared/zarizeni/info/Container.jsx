/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { selectors } from '@hhjcz/redux-rest'
import * as actions from '../../zarizeni-list/actions'
import ZarizeniDetail from './ZarizeniDetail'

export default class Container extends React.Component {

  static propTypes = {
    params: PropTypes.object,
  };

  static defaultProps = {
    params: {},
  }

  // server and client side fetch actions (see render.jsx & componentDidMount):
  static fetchActions = [actions.fetchOne];

  // browser fetching:
  componentDidMount() {
    Container.fetchActions.forEach((action) => action({ params: this.props.params }))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      Container.fetchActions.forEach((action) => action({ params: nextProps.params }))
    }
  }

  render() {
    const zarizeni = selectors.selectItem(this.props, {}, this.props.params.id)
    return (
      <div id="zarizeni">
        <ZarizeniDetail zarizeni={zarizeni} />
      </div>
    )
  }
}

