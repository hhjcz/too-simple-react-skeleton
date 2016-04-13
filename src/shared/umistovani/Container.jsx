/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'react-bootstrap'
import createMapStateToProps from '../lib/createMapStateToProps'
import createMapDispatchToProps from '../lib/createMapDispatchToProps'
import { getItems, getItem } from '../lib/rest'
import actions from './actions'
import Umistovani from './Umistovani'
import FetchIndicator from './../lib/FetchIndicator'
import Navigation from './Navigation'

export class Container extends React.Component {

  static propTypes = {
    zarizeni: PropTypes.object,
    umisteni: PropTypes.object,
    akrloks: PropTypes.object,
    params: PropTypes.object,
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    zarizeni: { pagination: {} },
    umisteni: {},
    akrloks: {},
    params: {},
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  // server and client side fetch actions (see render.jsx & componentDidMount):
  static get fetchActions() {
    return [Container.fetchZarizeni]
  }

  static fetchZarizeni({ params, dispatch, getState, force }) {
    const cursorAt = parseInt(params.cursorAt) || 1

    const promise = dispatch(actions.zarizeniList.fetchOneAt(cursorAt, force))
      .then(() => {
        const zarizeniId = getItem(getState().zarizeni).id
        if (!(zarizeniId > 0)) {
          throw new Error('Fetch chyba: nepodaril se fetch zarizeni s validnim id')
        }

        return Promise.all([
          actions.umisteni.fetchCollection({
            params: { zarizeniId },
            force
          }),
          actions.portyZarizeni.fetchCollection({
            params: { zarizeniId },
            force
          })
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
      params: { cursorAt: this.props.zarizeni.pagination.cursorAt, ...this.props.params },
      dispatch: this.props.dispatch,
      getState: () => this.props
    }))
  }

  onCursorChange(cursorAt, force = false) {
    Container.fetchZarizeni({
      params: { cursorAt },
      dispatch: this.props.dispatch,
      getState: () => this.props,
      force
    })

    // TODO - workaround, depends on url path (should at least use location.pathname ...)
    this.context.router.push({ pathname: `/umistovani/${cursorAt}` })
  }

  reload() {
    this.onCursorChange(this.props.zarizeni.pagination.cursorAt, true)
  }

  render() {
    const self = this
    const { zarizeni: zarizeniResource, umisteni: umisteniResource, akrloks: akrloksResource, actions } = this.props
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
    zarizeni: state.zarizeni,
    umisteni: state.umisteni,
    akrloks: state.akrloks
  })),
  createMapDispatchToProps(actions)
)(Container)
