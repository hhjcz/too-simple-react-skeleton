/** Created by hhj on 2/4/16. */

import React, { PropTypes } from 'react'

export default class Port extends React.Component {
  static propTypes = {
    params: PropTypes.object
  };

  static defaultProps = {};

  render() {
    return (
      <div>
        Port #{this.props.params.portId} na zarizeni {this.props.params.id}
      </div>
    )
  }
}
