/** Created by hhj on 2/4/16. */
import React, { PropTypes } from 'react'
import Lokalita from './Lokalita'

export default class Umisteni extends React.Component {
  static propTypes = {
    zarizeni: PropTypes.object.isRequired,
    umisteni: PropTypes.object.isRequired,
  };

  static defaultProps = {
    zarizeni: {},
    umisteni: {},
  };

  render() {
    const { zarizeni, umisteni } = this.props
    return (
      <div>
        <div>#{zarizeni.id}</div>
        <div>{zarizeni.name}</div>
        {
          umisteni.map(u =>
            <Lokalita lokalita={u.lokalita} />
          )
        }
      </div>
    )
  }
}
