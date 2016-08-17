/** Created by hhj on 2/16/16. */
import React, { PropTypes } from 'react'
import markLokalita from './markLokalita'

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
    if (!lokalita) return null
    const createMarked = () => ({ __html: markLokalita(lokalita, lokalitaHint).marked })
    return (
      <span dangerouslySetInnerHTML={createMarked()} />
    )
  }
}
