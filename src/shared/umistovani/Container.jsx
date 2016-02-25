/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { List } from 'immutable'
import { Pagination } from 'react-bootstrap'
import createMapStateToProps from '../lib/createMapStateToProps'
import rest from '../app/rest'
import Umistovani from './Umistovani'

export class Container extends React.Component {

  static propTypes = {
    neumistena: PropTypes.object,
    zarizeni: PropTypes.object,
    umisteni: PropTypes.object,
    params: PropTypes.object,
    history: PropTypes.object,
  };

  static defaultProps = {
    neumistena: { items: List() },
    zarizeni: { item: {} },
    umisteni: {},
    params: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      pozice: parseInt(props.params.pozice) || 1,
    }
    this.gotoPozice = this.gotoPozice.bind(this)
  }

  componentDidMount() {
    // browser fetching:
    Container.fetchActions.forEach(action => action({ params: this.props.params }, this.props.neumistena.items))
  }

  static getPozice(params) {
    return parseInt(params.pozice) || 0
  }

  // TODO - refactor
  static getZarizeniId(props) {
    const pozice = Container.getPozice(props.params)
    const items = (props.neumistena && props.neumistena.items) ? props.neumistena.items : List()
    const nextZarizeni = items.get(pozice - 1)
    const nextZarizeniId = nextZarizeni ? parseInt(nextZarizeni.id) : null

    return nextZarizeniId
  }

  // server and client side fetch actions (see render.jsx & componentDidMount):
  static get fetchActions() {
    return [Container.fetchNeumistena]
  }

  // TODO - refactor
  static fetchNeumistena({ params }, items = List()) {
    return rest.actions.neumistena.fetchAll({
      params: { _filter: 'neumistena', page: 1, per_page: 10000 },
    }).then(response => {
      const zarizeniId = Container.getZarizeniId({
        params,
        neumistena: { items: response ? List(response.data) : items }
      })
      return Promise.all([
        Container.fetchZarizeni(zarizeniId, rest.actions),
        Container.fetchUmisteni(zarizeniId, rest.actions)
      ])
    })
  }

  static fetchZarizeni(zarizeniId, actions) {
    if (!zarizeniId > 0) return Promise.resolve(null)
    return actions.zarizeni.fetchOne({
      params: { id: zarizeniId, include: 'umisteni.lokalita' },
      projectToLocation: false
    })
  }

  static fetchUmisteni(zarizeniId, actions) {
    if (!zarizeniId > 0) return Promise.resolve(null)
    return actions.umisteni.fetchAll({
      params: { zarizeni_id: zarizeniId, include: 'lokalita' },
      projectToLocation: false
    })
  }

  gotoPozice(pozice) {
    if (this.state.pozice === pozice) return

    this.setState({ pozice })
    const nextZarizeniId = Container.getZarizeniId({ ...this.props, params: { ...this.props.params, pozice } })
    Container.fetchZarizeni(nextZarizeniId, rest.actions)
    Container.fetchUmisteni(nextZarizeniId, rest.actions)

    // FIXME - workaround, depends on url path (should at least use location.pathname ...)
    this.props.history.push({ pathname: `/umistovani/${pozice}` })
  }

  render() {
    const self = this
    const { neumistena, zarizeni, umisteni } = this.props
    return (
      <div id="zarizeni-list">
        <Pagination
          items={neumistena.items.size}
          activePage={this.state.pozice}
          prev next first last ellipsis
          bsSize="small" maxButtons={9}
          onSelect={function(event, selectedEvent) { self.gotoPozice(selectedEvent.eventKey) }}
        />
        {
          zarizeni.item.id > 0
            ? <Umistovani zarizeni={zarizeni.item} seznamUmisteni={umisteni.items} actions={rest.actions.umisteni} />
            : ''
        }
        {
          neumistena.fetching || zarizeni.fetching || umisteni.fetching
            ? <div className="text-info">Fetching...</div> : ''
        }
      </div>
    )
  }
}

export default connect(
  createMapStateToProps(state => state)
)(Container)
