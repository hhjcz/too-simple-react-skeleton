/** Created by hhj on 2/4/16. */
import React, { PropTypes } from 'react'
import MarkedLokalita from './MarkedLokalita'
import findLokalitaHint from './findLokalitaHint'

export default class Umistovani extends React.Component {
  static propTypes = {
    zarizeni: PropTypes.object.isRequired,
    seznamUmisteni: PropTypes.object.isRequired,
    actions: PropTypes.object,
  };

  static defaultProps = {
    zarizeni: {},
    seznamUmisteni: {},
  };

  searchForUmisteni(zarizeni, lokalitaHint) {
    const params = {
      search: true,
      zarizeni_id: zarizeni.id,
      obec: 'Praha',
      'trimmed_ulice-lk': lokalitaHint.ulice,
    }
    this.props.actions.fetchAll({ params })
  }

  render() {
    const { zarizeni, seznamUmisteni } = this.props
    const lokalitaHint = findLokalitaHint(zarizeni.name)
    return (
      <div>
        <div>#{`${zarizeni.id} ${zarizeni.name}`}</div>
        <span className="btn btn-sm btn-danger" onClick={function() { this.searchForUmisteni(zarizeni, lokalitaHint) }}>
          Search
        </span>
        {
          seznamUmisteni.map && seznamUmisteni.map(u =>
            <MarkedLokalita lokalitaHint={lokalitaHint} lokalita={u.lokalita} key={u.id} />
          )
        }
      </div>
    )
  }
}
