/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { List } from 'immutable'
import { Pagination } from 'react-bootstrap'
import createMapStateToProps from '../lib/createMapStateToProps'
import createMapDispatchToProps from '../lib/createMapDispatchToProps'
import rest from '../app/rest'
import ProviderZarizeni from './ProviderZarizeni'

export class Container extends React.Component {

  static propTypes = {
    neumistena: PropTypes.object,
    zarizeni: PropTypes.object,
    umisteni: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object,
    params: PropTypes.object,
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
    Container.fetchActions.forEach(action => action({ params: this.props.params }, this.props.neumistena.items ))
  }

  componentWillReceiveProps(nextProps) {
    // const nextZarizeniId = Container.getZarizeniId(nextProps)
    // if (nextZarizeniId > 0 && nextZarizeniId !== this.state.zarizeniId) {
    //   ProviderZarizeni.fetch(nextZarizeniId, rest.actions)
    //   this.setState({ zarizeniId: nextZarizeniId })
    // }
  }

  static getPozice(params) {
    return parseInt(params.pozice) || 0
  }

  static getZarizeniId(props) {
    const pozice = Container.getPozice(props.params)
    const items = (props.neumistena && props.neumistena.items) ? props.neumistena.items : List()
    const nextZarizeni = items.get(pozice - 1)
    const nextZarizeniId = nextZarizeni ? parseInt(nextZarizeni.id) : null

    return nextZarizeniId
  }

  static fetchNeumistena({ params }, items = List()) {
    return rest.actions.neumistena.fetchAll({
      params: { _filter: 'neumistena', page: 1, per_page: 10000 },
    }).then(response => {
      const zarizeniId = Container.getZarizeniId({ params, neumistena: { items: response ? List(response.data) : items } })
      return ProviderZarizeni.fetch(zarizeniId, rest.actions)
    })
  }

  // server and client side fetch actions (see render.jsx & componentDidMount):
  // static fetchActions = [actions.fetchAll];
  static get fetchActions() {
    return [Container.fetchNeumistena]// , Container.fetchZarizeni, Container.fetchUmisteni]
  }

  gotoPozice(pozice) {
    this.setState({ pozice })
    const nextZarizeniId = Container.getZarizeniId({ ...this.props, params: { ...this.props.params, pozice } })
    // if (nextZarizeniId > 0 && nextZarizeniId !== this.state.zarizeniId) {
    ProviderZarizeni.fetch(nextZarizeniId, rest.actions)
    //   this.setState({ zarizeniId: nextZarizeniId })
    // }
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
          onSelect={function(event, selectedEvent) {
            console.log('selected key: ', selectedEvent.eventKey)
            if (self.state.pozice !== selectedEvent.eventKey) self.gotoPozice(selectedEvent.eventKey)
          }}
        />
        {
          zarizeni.item.id > 0
            ? <ProviderZarizeni zarizeni={zarizeni} umisteni={umisteni} actions={rest.actions} />
            : ''
        }
      </div>
    )
  }
}

export default connect(
  createMapStateToProps(state => state),
  // createMapDispatchToProps(rest.actions)
)(Container)
