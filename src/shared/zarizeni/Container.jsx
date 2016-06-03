/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import createMapStateToProps from '../lib/createMapStateToProps'
import createMapDispatchToProps from '../lib/createMapDispatchToProps'
import rest, { getIdAtCursor } from '../app/rest'
import Navigation from './Navigation'

export class Container extends React.Component {

  static propTypes = {
    params: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.object,
    zarizeniResource: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.onCursorChange = this.onCursorChange.bind(this)
    this.reload = this.reload.bind(this)
  }

  componentDidMount() {
    if (this.props.location.query.cursor) {
      this.onCursorChange(parseInt(this.props.location.query.cursor))
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentCursor = this.props.zarizeniResource.pagination.cursorAt
    const nextCursor = nextProps.zarizeniResource.pagination.cursorAt

    if (nextCursor !== currentCursor) {
      const zarizeniId = getIdAtCursor(nextProps.zarizeniResource)

      // FIXME - should redirect to /zarizeni/:id/umisteni etc. based on current path...
      // TODO - workaround, depends on url path (should at least use location.pathname ...)
      this.context.router.push({ pathname: `/zarizeni/${zarizeniId}/` })
    }
  }

  onCursorChange(cursor) {
    this.props.dispatch(rest.actions.zarizeni.pointCursorTo(cursor))
  }

  reload() {
    this.onCursorChange(this.props.zarizeniResource.pagination.cursorAt)
  }

  render() {
    const { pagination: { cursorAt, total } } = this.props.zarizeniResource

    return (
      <div id="zarizeni">
        <Navigation
          zarizeniId={this.props.params.id}
          cursorAt={cursorAt} onCursorChange={this.onCursorChange} total={total}
          reload={this.reload}
        />
        {this.props.children}
      </div>
    )
  }
}

export default connect(
  createMapStateToProps(state => ({
    zarizeniResource: state.resources.zarizeni,
  })),
  createMapDispatchToProps(rest.actions)
)(Container)

