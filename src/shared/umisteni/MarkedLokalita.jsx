/** Created by hhj on 2/16/16. */
import markLokalita from './lokalitaMarker'

import React, { PropTypes } from 'react'

export default class MarkedLokalita extends React.Component {
  static propTypes = {
    lokalita: PropTypes.object,
    zarizeni: PropTypes.object,
  };

  static defaultProps = {
    lokalita: {},
    zarizeni: {},
  };

  render() {
    const { lokalita, zarizeni } = this.props
    const createMarked = () => ({ __html: markLokalita(lokalita, zarizeni).marked })
    return (
      <div>
        {lokalita.id}
        <span dangerouslySetInnerHTML={createMarked()} />
      </div>
    )
  }
}
