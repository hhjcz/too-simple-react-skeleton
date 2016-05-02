/** Created by hhj on 4/21/16. */
import React, { PropTypes } from 'react'
import { List } from 'immutable'
import { markPotencialniNepiop } from './markUtils'

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
      <div className="col col-xs-6">
        {
          seznamPortu.map(port =>
            <div key={port.id}>
              {markPotencialniNepiop(port.name)} {markPotencialniNepiop(port.infoName)}
            </div>
          )
        }
      </div>
    )
  }
}
