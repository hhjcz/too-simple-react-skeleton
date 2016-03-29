/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'react-bootstrap'
import IconButton from 'material-ui/lib/icon-button'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'
import createMapStateToProps from '../lib/createMapStateToProps'
import createMapDispatchToProps from '../lib/createMapDispatchToProps'
import actions from './actions'
import MyIcon from '../lib/MyIcon'
import Umistovani from './Umistovani'
import * as muiColors from 'material-ui/lib/styles/colors'

export class Container extends React.Component {

  static propTypes = {
    zarizeni: PropTypes.object,
    umisteni: PropTypes.object,
    params: PropTypes.object,
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    zarizeni: { item: {}, pagination: {} },
    umisteni: {},
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

    const promise = dispatch(actions.zarizeniList.fetchOneAt(cursorAt, false, force))
      .then(() => {
        const zarizeniId = getState().zarizeni.item.id
        if (!(zarizeniId > 0)) {
          throw new Error('Fetch chyba: nepodaril se fetch zarizeni s validnim id')
        }

        return actions.umisteni.fetchAll({
          params: { zarizeniId },
          projectToLocation: false,
          force
        })
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
      params: this.props.params,
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
    const { zarizeni, umisteni, actions } = this.props
    const seznamUmisteni = umisteni.items
    const cursorAt = zarizeni.pagination.cursorAt
    return (
      <div id="zarizeni-list">
        <Pagination
          items={zarizeni.pagination.total} activePage={cursorAt}
          prev next first last ellipsis bsSize="small" maxButtons={9}
          onSelect={function(event, selectedEvent) { self.onCursorChange(selectedEvent.eventKey) }}
        />
        {
          zarizeni.item.id > 0 ?
            <Umistovani zarizeni={zarizeni.item} seznamUmisteni={seznamUmisteni}
              actions={{ ...actions, reload: self.reload }}
            />
            : ''
        }
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <IconButton tooltip="previous"
            onTouchTap={function() { self.onCursorChange(cursorAt > 1 ? cursorAt - 1 : 1) }}
          >
            <MyIcon color={muiColors.blueGrey600}>arrow_back</MyIcon>
          </IconButton>
          <IconButton tooltip="reload" onTouchTap={function() { self.reload() }}>
            <MyIcon color={muiColors.blueGrey800}>autorenew</MyIcon>
          </IconButton>
          <IconButton tooltip="next"
            onTouchTap={function() {
              self.onCursorChange(cursorAt < zarizeni.pagination.total ? cursorAt + 1 : cursorAt)
            }}
          >
            <MyIcon color={muiColors.blueGrey800}>arrow_forward</MyIcon>
          </IconButton>
        </div>
        {
          zarizeni.fetching || umisteni.fetching ?
            <div className="text-info">
              Louduju...
              <RefreshIndicator
                size={32}
                left={10}
                top={0}
                status="loading"
                style={{ display: 'inline-block', position: 'relative' }}
              />
            </div>
            : null
        }
        {/* <span className="btn btn-xs btn-danger"
         onClick={() => self.forceUpdate()}
         > Rerender</span>*/}
      </div>
    )
  }
}

export default connect(
  createMapStateToProps(state => state),
  createMapDispatchToProps(actions)
)(Container)
