/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { selectIdAtCursor } from '@hhjcz/redux-rest'
import rest from '../app/rest'
import Navigation from './Navigation'

export default class Container extends React.Component {

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
      const zarizeniId = selectIdAtCursor(nextProps.zarizeniResource)

      // FIXME - any other way how to programmaticly set route param?
      // TODO - workaround, depends on url path (should at least use location.pathname ...)
      const { location } = this.props
      const splitLocation = location.pathname.split('/')
      const subView = location && location.pathname ? `/${splitLocation[splitLocation.length - 1]}` : ''
      this.context.router.push({ pathname: `/zarizeni/${zarizeniId}${subView}` })
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

