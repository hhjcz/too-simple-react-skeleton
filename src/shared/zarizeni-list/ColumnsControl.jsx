/** Created by hhj on 5/13/16. */
import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import Panel from 'react-bootstrap/lib/Panel'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import MyIcon from '../lib/MyIcon'
import colors from '../app/colors'

export default class ColumnsControl extends React.Component {
  static propTypes = {
    columns: PropTypes.object.isRequired,
    setColumnVisibility: PropTypes.func.isRequired,
  };

  static defaultProps = {
    columns: Map()
  };

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    const self = this
    const { columns, setColumnVisibility } = this.props

    return (
      <div>
        <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={function() { self.setState({ open: !self.state.open }) }}
        >
          <IconButton tooltip={this.state.open ? 'sbalit' : 'rozbalit'}>
            <MyIcon color={colors.green100}>{this.state.open ? 'expand_less' : 'expand_more'}</MyIcon>
          </IconButton>
          <MyIcon color={colors.green100} tooltip="zobrazené sloupce">view_column</MyIcon>
        </div>
        <Panel collapsible expanded={this.state.open} style={{ border: '0px' }}>
          {
            columns.map(column =>
              <Checkbox
                key={column.name}
                label={column.caption}
                labelPosition="left"
                checked={column.visible}
                onCheck={function(e, isChecked) {
                  setColumnVisibility(column.name, isChecked)
                }}
              />
            )
          }
        </Panel>
      </div>
    )
  }
}
