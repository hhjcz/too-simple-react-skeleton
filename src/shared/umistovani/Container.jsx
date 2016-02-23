/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import qs from 'query-string'
import createMapStateToProps from '../lib/createMapStateToProps'
import createMapDispatchToProps from '../lib/createMapDispatchToProps'
import rest from '../app/rest'
import ProviderZarizeni from './ProviderZarizeni'

export class Container extends React.Component {

  static propTypes = {
    neumistena: PropTypes.object,
    zarizeni: PropTypes.object,
    umisteni: PropTypes.object,
    actions: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object,
    params: PropTypes.object,
  };

  static defaultProps = {
    neumistena: { items: [] },
    zarizeni: { item: {} },
    umisteni: {},
    actions: {},
    params: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      zarizeniId: null,
    }
    this.getPozice = this.getPozice.bind(this)
  }

  // browser fetching:
  componentDidMount() {
    console.info('Container::componentDidMount')
    const { dispatch, location, params } = this.props
    Container.fetchActions.forEach(action => dispatch(action({ params })))
    this.updateState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    console.info('Container::componentWillReceiveProps', nextProps)
    this.updateState(nextProps)
  }

  getPozice(params) {
    // const { location } = this.props
    const pozice = parseInt(params.pozice)

    return pozice || 0
  }

  updateState(nextProps) {
    const pozice = this.getPozice(nextProps.params)
    const nextZarizeni = nextProps.neumistena.items.get(pozice)
    const nextZarizeniId = nextZarizeni ? nextZarizeni.id : null
    if (nextZarizeniId !== this.state.zarizeniId) this.setState({ zarizeniId: nextZarizeniId })
  }

  static fetchNeumistena({ params }) {
    return rest.actions.neumistena.fetchAll({
      params: { _filter: 'neumistena', page: 1, per_page: 10000 },
    })
  }

  // server and client side fetch actions (see render.jsx & componentDidMount):
  // static fetchActions = [actions.fetchAll];
  static get fetchActions() {
    return [Container.fetchNeumistena]// , Container.fetchZarizeni, Container.fetchUmisteni]
  }

  render() {
    console.info('Container::render')
    const { neumistena, zarizeni, umisteni, actions } = this.props
    const zarizeniId = parseInt(this.state.zarizeniId)
    return (
      <div id="zarizeni-list">
        { /* neumistena.items.map(item => `#${item.id} `) */ }
        <Link to={`/umistovani/${this.getPozice(this.props.params) - 1}`}> Previous </Link>
        <Link to={`/umistovani/${this.getPozice(this.props.params) + 1}`}> Next </Link>
        {
          zarizeniId > 0
            ? <ProviderZarizeni zarizeniId={zarizeniId} zarizeni={zarizeni} umisteni={umisteni} actions={actions} />
            : ''
        }
      </div>
    )
  }
}

export default connect(
  createMapStateToProps(state => state),
  createMapDispatchToProps(rest.actions)
)(Container)
