/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { List } from 'immutable'
import { Pagination } from 'react-bootstrap'
import createMapStateToProps from '../lib/createMapStateToProps'
import rest from '../app/rest'
import Umistovani from './Umistovani'
import * as zarizeniListActions from '../zarizeni-list/actions'

export class Container extends React.Component {

  static propTypes = {
    neumistena: PropTypes.object,
    zarizeni: PropTypes.object,
    umisteni: PropTypes.object,
    store: PropTypes.object,
    params: PropTypes.object,
    dispatch: PropTypes.func,
    history: PropTypes.object,
  };

  static defaultProps = {
    neumistena: { items: List() },
    zarizeni: { item: {}, pagination: {} },
    umisteni: {},
    params: {},
  };

  // server and client side fetch actions (see render.jsx & componentDidMount):
  static get fetchActions() {
    return [Container.pointCursorTo]
  }

  static fetchUmisteni(zarizeniId, actions) {
    if (!zarizeniId > 0) return Promise.resolve(null)
    return actions.umisteni.fetchAll({
      params: { zarizeni_id: zarizeniId, include: 'lokalita' },
      projectToLocation: false
    })
  }

  static pointCursorTo({ params: { cursorAt }, dispatch, getState }) {
    cursorAt = parseInt(cursorAt) || 1

    // TODO - workaround, depends on url path (should at least use location.pathname ...)
    // this.props.history.push({ pathname: `/umistovani/${cursorAt}` })

    return dispatch(zarizeniListActions.fetchOneAt(cursorAt, false, { include: 'umisteni.lokalita' })).then(response => {
      const zarizeniId = getState().zarizeni.item.id
      return Promise.all([
        // Container.fetchZarizeni(zarizeniId, rest.actions),
        Container.fetchUmisteni(zarizeniId, rest.actions)
      ])
    })

  }

  componentDidMount() {
    // browser fetching:
    Container.fetchActions.forEach(action => action({
      params: this.props.params,
      dispatch: this.props.dispatch,
      getState: () => this.props
    }))
  }

  render() {
    const self = this
    const { neumistena, zarizeni, umisteni } = this.props
    return (
      <div id="zarizeni-list">
        <Pagination
          items={zarizeni.pagination.total}
          activePage={zarizeni.pagination.cursorAt}
          prev next first last ellipsis
          bsSize="small" maxButtons={9}
          onSelect={function(event, selectedEvent) { Container.pointCursorTo({ params: { cursorAt: selectedEvent.eventKey }, dispatch: self.props.dispatch, getState: () => self.props }) }}
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
