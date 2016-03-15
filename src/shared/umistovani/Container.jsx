/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'react-bootstrap'
import createMapStateToProps from '../lib/createMapStateToProps'
import rest from '../app/rest'
import Umistovani from './Umistovani'
import * as zarizeniListActions from '../zarizeni-list/actions'

export class Container extends React.Component {

  static propTypes = {
    zarizeni: PropTypes.object,
    umisteni: PropTypes.object,
    params: PropTypes.object,
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

  static fetchZarizeni({ params, dispatch, getState }) {
    const cursorAt = parseInt(params.cursorAt) || 1

    const promise = dispatch(zarizeniListActions.fetchOneAt(cursorAt, false))
      .then(response => {
        const zarizeniId = getState().zarizeni.item.id
        if (!(zarizeniId > 0)) throw new Error('Fetch chyba: nepodaril se fetch zarizeni s validnim id')

        return rest.actions.umisteni.fetchAll({
          params: { zarizeniId },
          projectToLocation: false
        })
      })

    return promise
  }

  constructor(props) {
    super(props)
    this.onCursorChange = this.onCursorChange.bind(this)
  }

  componentDidMount() {
    // browser fetching:
    Container.fetchActions.forEach(action => action({
      params: this.props.params,
      dispatch: this.props.dispatch,
      getState: () => this.props
    }))
  }

  onCursorChange(event, selectedEvent) {
    const cursorAt = selectedEvent.eventKey
    Container.fetchZarizeni({
      params: { cursorAt },
      dispatch: this.props.dispatch,
      getState: () => this.props
    })

    // TODO - workaround, depends on url path (should at least use location.pathname ...)
    this.context.router.push({ pathname: `/umistovani/${cursorAt}` })
  }

  render() {
    const self = this
    const { zarizeni, umisteni } = this.props
    const seznamUmisteni = umisteni.items
    return (
      <div id="zarizeni-list">
        <Pagination
          items={zarizeni.pagination.total} activePage={zarizeni.pagination.cursorAt}
          prev next first last ellipsis bsSize="small" maxButtons={9}
          onSelect={self.onCursorChange}
        />
        {
          zarizeni.item.id > 0 ?
            <Umistovani zarizeni={zarizeni.item} seznamUmisteni={seznamUmisteni} actions={{ ...rest.actions, reload: self.componentDidMount.bind(self) }} />
            : ''
        }

        {
          zarizeni.fetching || umisteni.fetching
            ? <div className="text-info">Louduju...</div> : ''
        }
      </div>
    )
  }
}

export default connect(
  createMapStateToProps(state => state)
)(Container)
