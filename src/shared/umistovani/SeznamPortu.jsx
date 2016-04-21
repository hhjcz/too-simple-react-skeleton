/** Created by hhj on 4/21/16. */
import React, { PropTypes } from 'react'
import { List } from 'immutable'

export default class SeznamPortu extends React.Component {
  static propTypes = {
    seznamPortu: PropTypes.instanceOf(List).isRequired,
  };

  static defaultProps = {
    seznamPortu: List(),
  };

  render() {
    const { seznamPortu } = this.props
    return (
      <div>
        {
          seznamPortu.map(port =>
            <div>
              {port.name} / {port.infoName}
            </div>
          )
        }
      </div>
    )
  }
}
