/** Created by hhj on 6/27/16. */
import React, { PropTypes } from 'react'
import IconButton from 'material-ui/IconButton'
import MyIcon from '../../lib/MyIcon'
import colors from '../../app/colors'
import * as actions from './actions'

export default class ActionButtons extends React.Component {
  static propTypes = {
    cp2type: PropTypes.object.isRequired
  };

  static defaultProps = {
    cp2type: {}
  };

  render() {
    const { cp2type } = this.props

    return (
      <div>
        <IconButton tooltip="Assign" primary onTouchTap={() => actions.updateCp2Type(cp2type.customPollerID, cp2type.sysObjectID, 1)}><MyIcon color={colors.green300}>assignment_turned_in</MyIcon></IconButton>
        <IconButton tooltip="UnAssign" primary onTouchTap={() => actions.updateCp2Type(cp2type.customPollerID, cp2type.sysObjectID, 2)}><MyIcon color={colors.red300}>assignment_late</MyIcon></IconButton>
        <IconButton tooltip="Ignore" primary onTouchTap={() => actions.updateCp2Type(cp2type.customPollerID, cp2type.sysObjectID, 3)}><MyIcon color={colors.grey500}>not_interested</MyIcon></IconButton>
      </div>
    )
  }
}