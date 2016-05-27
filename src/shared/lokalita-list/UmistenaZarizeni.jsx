/** Created by hhj on 5/18/16. */
import React, { PropTypes } from 'react'
import { List } from 'immutable'

export default class UmistenaZarizeni extends React.Component {
  static propTypes = {
    umistenaZarizeni: PropTypes.object.isRequired
  };

  static defaultProps = {
    umistenaZarizeni: List()
  };

  render() {
    const { umistenaZarizeni } = this.props
    // const count = umistenaZarizeni.count()

    return (
      <div className="row">
        {/* <div className="col col-xs-1">{count}</div> */}
        <div className="col col-xs-11">
          {
            umistenaZarizeni.map(zarizeni =>
              <div key={zarizeni.id}>{zarizeni.name}</div>
            )
          }
        </div>
      </div>
    )
  }
}
