/** Created by hhj on 2/16/16. */
import markLokalita from './markLokalita'
import NepiOpy from './NepiOpy'

import React, { PropTypes } from 'react'

export default class MarkedLokalita extends React.Component {
  static propTypes = {
    lokalita: PropTypes.object,
    lokalitaHint: PropTypes.object,
  };

  static defaultProps = {
    lokalita: {},
    lokalitaHint: {},
  };

  render() {
    const { lokalita, lokalitaHint } = this.props
    const createMarked = () => ({ __html: markLokalita(lokalita, lokalitaHint).marked })
    return (
      <div>
        <span dangerouslySetInnerHTML={createMarked()} />
        <NepiOpy nepiOpy={lokalita.nepiOpy} />
      </div>
    )
  }
}
