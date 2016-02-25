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
    // ProviderZarizeni.fetch(this.props.zarizeniId, this.props.actions)
  }

  componentWillReceiveProps(nextProps) {
    // const nextZarizeniId = nextProps.zarizeniId
    // if (nextZarizeniId && nextZarizeniId !== this.props.zarizeniId) {
    //   ProviderZarizeni.fetch(nextZarizeniId, this.props.actions)
    // }
  }

  static fetch(zarizeniId, actions) {
    // return
    if (!zarizeniId > 0) return
    ProviderZarizeni.fetchZarizeni(zarizeniId, actions)
    ProviderZarizeni.fetchUmisteni(zarizeniId, actions)
  }

  static fetchZarizeni(zarizeniId, actions) {
    const actionReturn = actions.zarizeni.fetchOne({
      params: { id: zarizeniId, include: 'umisteni.lokalita' },
      projectToLocation: false
    })
    return actionReturn
  }

  static fetchUmisteni(zarizeniId, actions) {
    actions.umisteni.fetchAll({
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
