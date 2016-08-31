/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxUtils } from '@hhjcz/js-lib'
import { getItem, getResourceWithItems } from '@hhjcz/redux-rest'
import * as actions from '../../zarizeni-list/actions'
import ZarizeniDetail from './ZarizeniDetail'

export class Container extends React.Component {

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
    const zarizeni = getItem(this.props)
    return (
      <div id="zarizeni">
        <ZarizeniDetail zarizeni={zarizeni} />
      </div>
    )
  }
}

export default connect(
  (state) => getResourceWithItems('zarizeni')(state.resources),
  reduxUtils.createMapDispatchToProps(actions)
)(Container)
