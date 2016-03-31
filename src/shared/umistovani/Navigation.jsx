/** Created by hhj on 3/31/16. */
import React, { PropTypes } from 'react'
import IconButton from 'material-ui/lib/icon-button'
import MyIcon from '../lib/MyIcon'
import * as muiColors from 'material-ui/lib/styles/colors'

export default class Navigation extends React.Component {
  static propTypes = {
    cursorAt: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onCursorChange: PropTypes.func.isRequired,
    reload: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  render() {
    const { cursorAt, total, onCursorChange, reload } = this.props
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>

        <IconButton tooltip="previous"
          onTouchTap={function() { onCursorChange(cursorAt > 1 ? cursorAt - 1 : 1) }}
        >
          <MyIcon color={muiColors.blueGrey600}>arrow_back</MyIcon>
        </IconButton>

        <IconButton tooltip="reload" onTouchTap={function() { reload() }}>
          <MyIcon color={muiColors.blueGrey800}>autorenew</MyIcon>
        </IconButton>

        <IconButton tooltip="next"
          onTouchTap={function() {
            onCursorChange(cursorAt < total ? cursorAt + 1 : cursorAt)
          }}
        >
          <MyIcon color={muiColors.blueGrey800}>arrow_forward</MyIcon>
        </IconButton>

      </div>
    )
  }
}
