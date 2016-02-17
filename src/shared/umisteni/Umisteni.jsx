/** Created by hhj on 2/4/16. */
import React, { PropTypes } from 'react'
import MarkedLokalita from './MarkedLokalita'

export default class Umisteni extends React.Component {
  static propTypes = {
    zarizeni: PropTypes.object.isRequired,
    seznamUmisteni: PropTypes.object.isRequired,
  };

  static defaultProps = {
    zarizeni: {},
    seznamUmisteni: {},
  };

  render() {
    const { zarizeni, seznamUmisteni } = this.props
    return (
      <div>
        <div>#{zarizeni.id}</div>
        <div>{zarizeni.name}</div>
        {
          seznamUmisteni.map && seznamUmisteni.map(u =>
            <MarkedLokalita zarizeni={zarizeni} lokalita={u.lokalita} key={u.id} />
          )
        }
      </div>
    )
  }
}
