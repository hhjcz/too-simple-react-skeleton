/** Created by hhj on 4/21/16. */
import React, { PropTypes } from 'react'
import { List } from 'immutable'
import MyDraggable from '../lib/MyDraggable'
import colors from '../app/colors'

export default class SeznamPortu extends React.Component {
  static propTypes = {
    seznamPortu: PropTypes.instanceOf(List).isRequired,
  };

  static defaultProps = {
    seznamPortu: List(),
  };

  static markPotencialniNepiop(string) {
    if (!string) return null
    // TODO - works with single match - should do multiple with /\d{4,6}/gi
    const match = string.match(/\d{4,6}/)
    let marked = null
    if (match) {
      marked = (
        <span>
          {string.substring(0, match.index)}
          <MyDraggable value={match} style={{ background: colors.deepOrangeA100 }}>
            {match[0]}
          </MyDraggable>
          {string.substring(match.index + match[0].length, string.length)}
        </span>
      )
    }

    return marked
  }

  render() {
    const { seznamPortu } = this.props
    return (
      <div className="col col-xs-6">
        {
          seznamPortu.map(port =>
            <div key={port.id}>
              {SeznamPortu.markPotencialniNepiop(port.name)} {SeznamPortu.markPotencialniNepiop(port.infoName)}
            </div>
          )
        }
      </div>
    )
  }
}
