/** Created by hhj on 2/4/16. */

import React, { PropTypes } from 'react'

export default class Umisteni extends React.Component {
  static propTypes = {
    zarizeni: PropTypes.object.isRequired
  };

  static defaultProps = {};

  render() {
    const { zarizeni } = this.props
    return (
      <div>
        <div>#{zarizeni.id}</div>
        <div>{zarizeni.name}</div>
      </div>
    )
  }
}
