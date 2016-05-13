/** Created by hhj on 5/13/16. */
import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import Checkbox from 'material-ui/Checkbox'

export default class ColumnsControl extends React.Component {
  static propTypes = {
    columns: PropTypes.object.isRequired,
    setColumnVisibility: PropTypes.func.isRequired,
  };

  static defaultProps = {
    columns: Map()
  };

  render() {
    const { columns, setColumnVisibility } = this.props

    return (
      <div>
        {
          columns.map(column =>
            <Checkbox
              key={column.name}
              label={column.name}
              labelPosition="left"
              checked={column.visible}
              onCheck={function(e, isChecked) {
                setColumnVisibility(column.name, isChecked)
              }}
              style={{ width: 'inherit' }}
            />
          )
        }
      </div>
    )
  }
}
