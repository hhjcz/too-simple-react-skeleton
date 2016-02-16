/** Created by hhj on 2/16/16. */

import React, { PropTypes } from 'react'

export default class Lokalita extends React.Component {
  static propTypes = {
    lokalita: PropTypes.object,
  };

  static defaultProps = {
    lokalita: {},
  };

  render() {
    const { lokalita } = this.props
    return (
      <div>
        {lokalita.id}
      </div>
    )
  }
}
