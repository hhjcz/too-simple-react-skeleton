/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import Navigation from './Navigation'

export default class Container extends React.Component {

  static propTypes = {
    params: PropTypes.object,
    children: PropTypes.object,
  };

  render() {
    return (
      <div id="zarizeni">
        <Navigation zarizeniId={this.props.params.id} />
        {this.props.children}
      </div>
    )
  }
}

