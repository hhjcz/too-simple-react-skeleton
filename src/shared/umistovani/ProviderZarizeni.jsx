/** Created by hhj on 2/23/16. */
import React, { PropTypes } from 'react'
import Umistovani from './Umistovani'

export default class ProviderZarizeni extends React.Component {
  static propTypes = {
    zarizeniId: PropTypes.number,
    zarizeni: PropTypes.object,
    umisteni: PropTypes.object,
    actions: PropTypes.object,
  };

  static defaultProps = {
    zarizeni: { item: {} },
    umisteni: {},
    actions: {},
  };

  componentDidMount() {
    this.fetch(this.props.zarizeniId)
  }

  componentWillReceiveProps(nextProps) {
    const nextZarizeniId = nextProps.zarizeniId
    if (nextZarizeniId && nextZarizeniId !== this.props.zarizeniId) {
      this.fetch(nextZarizeniId)
    }
  }

  fetch(zarizeniId) {
    if (!zarizeniId > 0) return
    this.fetchZarizeni.bind(this)(zarizeniId)
    this.fetchUmisteni.bind(this)(zarizeniId)
  }

  fetchZarizeni(zarizeniId) {
    this.props.actions.zarizeni.fetchOne({
      params: { id: zarizeniId, include: 'umisteni.lokalita' },
      projectToLocation: false
    })
  }

  fetchUmisteni(zarizeniId) {
    this.props.actions.umisteni.fetchAll({
      params: { zarizeni_id: zarizeniId, include: 'lokalita' },
      projectToLocation: false
    })
  }

  render() {
    const { zarizeni, umisteni, actions } = this.props
    return (
      <div>
        <Umistovani zarizeni={zarizeni.item} seznamUmisteni={umisteni.items} actions={actions.umisteni} />
        {zarizeni.fetching || umisteni.fetching ? <div className="text-info">Fetching...</div> : ''}
      </div>
    )
  }
}
