/** Created by hhj on 2/4/16. */

import React, { PropTypes } from 'react'

export default class Ports extends React.Component {
  static propTypes = {
    params: PropTypes.object,
  };

  static defaultProps = {};

  render() {
    return (
      <div>
        Porty na zarizeni id: {this.props.params.id}
      </div>
    )
  }
}
