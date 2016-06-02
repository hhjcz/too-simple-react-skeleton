/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'react-bootstrap'
import createMapStateToProps from '../../lib/createMapStateToProps'
import createMapDispatchToProps from '../../lib/createMapDispatchToProps'
import { getSubState as getResourceSubState, getItems, getItem } from '../../app/rest'
import actions from './actions'
import NedavneLokality from './NedavneLokality'
import Umistovani from './Umistovani'
import FetchIndicator from '../../lib/FetchIndicator'
import Navigation from './Navigation'

export class Container extends React.Component {

  static propTypes = {
    zarizeniResource: PropTypes.object,
    umisteniResource: PropTypes.object,
    portyZarizeniResource: PropTypes.object,
    akrloksResource: PropTypes.object,
    params: PropTypes.object,
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    zarizeniResource: { pagination: {} },
    portyZarizeniResource: {},
    umisteniResource: {},
    akrloksResource: {},
    params: {},
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  // server and client side fetch actions (see render.jsx & componentDidMount):
  static get fetchActions() {
    return [Container.fetchZarizeni]
  }

  // TODO - refactor: move to actions
  static fetchZarizeni({ params, dispatch, getState }) {
    const cursorAt = parseInt(params.cursorAt) || 1
    // retrieve getState from dispatch, if not defined
    getState = getState || dispatch(({ getState }) => getState)

    const promise = dispatch(actions.zarizeniList.fetchOneAt(cursorAt))
      .then(() => {
        const zarizeniResource = getResourceSubState('zarizeni')(getState)
        const zarizeni = getItem(zarizeniResource)
        const zarizeniId = zarizeni.id
        if (!(zarizeniId > 0)) {
          throw new Error('Fetch chyba: nepodaril se fetch zarizeni s validnim id')
        }

        return Promise.all([
          actions.umisteni.fetchCollection({ params: { zarizeniId } }),
          actions.portyZarizeni.fetchCollection({ params: { zarizeniId } })
        ])
      })

    return promise
  }

  constructor(props) {
    super(props)
    this.onCursorChange = this.onCursorChange.bind(this)
    this.reload = this.reload.bind(this)
  }

  componentDidMount() {
    // browser fetching:
    Container.fetchActions.forEach(action => action({
      params: { cursorAt: this.props.zarizeniResource.pagination.cursorAt, ...this.props.params },
      dispatch: this.props.dispatch,
    }))
  }

  onCursorChange(cursorAt) {
    Container.fetchZarizeni({
      params: { cursorAt },
      dispatch: this.props.dispatch,
    })

    // TODO - workaround, depends on url path (should at least use location.pathname ...)
    this.context.router.push({ pathname: `/umistovani/${cursorAt}` })
  }

  reload() {
    this.onCursorChange(this.props.zarizeniResource.pagination.cursorAt)
  }

  render() {
    const self = this
    const { zarizeniResource, umisteniResource, akrloksResource, portyZarizeniResource, actions } = this.props
    const { pagination: { cursorAt, total: zarizeniCount } } = zarizeniResource
    const zarizeni = getItem(zarizeniResource)
    const seznamUmisteni = getItems(umisteniResource)
    const seznamPortu = getItems(portyZarizeniResource)
    const akrloks = getItems(akrloksResource)

    return (
      <div id="umistovani">
        <Navigation zarizeniId={zarizeni.id} />
        <div className="row">
          <div className="col col-xs-6">
            <Pagination
              items={zarizeniCount} activePage={cursorAt}
              prev next first last ellipsis bsSize="small" maxButtons={9}
              onSelect={function(eventKey) { self.onCursorChange(eventKey) }}
            />
          </div>
          <div className="col col-xs-6">
            <NedavneLokality />
          </div>
        </div>
        <Umistovani
          zarizeni={zarizeni} seznamUmisteni={seznamUmisteni} seznamPortu={seznamPortu} akrloks={akrloks}
          fetching={zarizeniResource.fetching || umisteniResource.fetching}
          actions={{ ...actions, reload: self.reload }}
        />
        <Navigation
          cursorAt={cursorAt} total={zarizeniCount}
          onCursorChange={self.onCursorChange} reload={self.reload}
        />
        <FetchIndicator fetching={zarizeniResource.fetching || umisteniResource.fetching} />
      </div>
    )
  }
}

export default connect(
  createMapStateToProps(state => ({
    zarizeniResource: state.resources.zarizeni,
    portyZarizeniResource: state.resources.portyZarizeni,
    umisteniResource: state.resources.umisteni,
    akrloksResource: state.resources.akrloks
  })),
  createMapDispatchToProps(actions)
)(Container)
