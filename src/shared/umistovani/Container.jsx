/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'react-bootstrap'
import createMapStateToProps from '../lib/createMapStateToProps'
import createMapDispatchToProps from '../lib/createMapDispatchToProps'
import { getSubState, getItems, getItem, generateSubState as resourcesSubState } from '../app/rest'
import actions from './actions'
import Umistovani from './Umistovani'
import FetchIndicator from './../lib/FetchIndicator'
import Navigation from './Navigation'

export class Container extends React.Component {

  static propTypes = {
    zarizeniResource: PropTypes.object,
    umisteniResource: PropTypes.object,
    akrloksResource: PropTypes.object,
    params: PropTypes.object,
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    zarizeniResource: { pagination: {} },
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

  // FIXME - refactor without the need for getState() - direct use of response from action?
  //       - for first try to make a separate action from this
  static fetchZarizeni({ params, dispatch, getState, force }) {
    const cursorAt = parseInt(params.cursorAt) || 1

    const promise = dispatch(actions.zarizeniList.fetchOneAt(cursorAt, force))
      .then(() => {
        const zarizeni = getItem(getSubState('zarizeni')(getState))
        const zarizeniId = zarizeni.id
        if (!(zarizeniId > 0)) {
          throw new Error('Fetch chyba: nepodaril se fetch zarizeni s validnim id')
        }

        return Promise.all([
          actions.umisteni.fetchCollection({ params: { zarizeniId }, force }),
          actions.portyZarizeni.fetchCollection({ params: { zarizeniId }, force })
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
      // FIXME - refactor, adds dependency to state structure and is complicated
      getState: () => resourcesSubState({ zarizeni: this.props.zarizeniResource })
    }))
  }

  onCursorChange(cursorAt, force = false) {
    Container.fetchZarizeni({
      params: { cursorAt },
      dispatch: this.props.dispatch,
      // FIXME - refactor, adds dependency to state structure and is complicated
      getState: () => resourcesSubState({ zarizeni: this.props.zarizeniResource }),
      force
    })

    // TODO - workaround, depends on url path (should at least use location.pathname ...)
    this.context.router.push({ pathname: `/umistovani/${cursorAt}` })
  }

  reload() {
    this.onCursorChange(this.props.zarizeniResource.pagination.cursorAt, true)
  }

  render() {
    const self = this
    const { zarizeniResource, umisteniResource, akrloksResource, actions } = this.props
    const { pagination: { cursorAt, total: zarizeniCount } } = zarizeniResource
    const zarizeni = getItem(zarizeniResource)
    const seznamUmisteni = getItems(umisteniResource)
    const akrloks = getItems(akrloksResource)

    return (
      <div id="zarizeni-list">
        <Pagination
          items={zarizeniCount} activePage={cursorAt}
          prev next first last ellipsis bsSize="small" maxButtons={9}
          onSelect={function(event, selectedEvent) { self.onCursorChange(selectedEvent.eventKey) }}
        />
        <Umistovani zarizeni={zarizeni} seznamUmisteni={seznamUmisteni}
          actions={{ ...actions, reload: self.reload }} akrloks={akrloks}
        />
        <Navigation cursorAt={cursorAt} total={zarizeniCount}
          onCursorChange={self.onCursorChange} reload={self.reload}
        />
        <FetchIndicator fetching={zarizeniResource.fetching || umisteniResource.fetching} />
        {/* <span className="btn btn-xs btn-danger" onClick={() => self.forceUpdate()} > Rerender</span>*/}
      </div>
    )
  }
}

export default connect(
  createMapStateToProps(state => ({
    zarizeniResource: state.resources.zarizeni,
    umisteniResource: state.resources.umisteni,
    akrloksResource: state.resources.akrloks
  })),
  createMapDispatchToProps(actions)
)(Container)
