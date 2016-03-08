/** Created by hhj on 3/3/16. */
import React, { PropTypes } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import Filter from '../app/models/Filter'

export default class PredefinedViews extends React.Component {
  static propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    onSortChange: PropTypes.func.isRequired,
    onGeneralParamChange: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  render() {
    const { onFilterChange, onSortChange, onGeneralParamChange } = this.props
    const aktivni = true
    return (
      <div>
        <ButtonGroup>
          <Button bsStyle="info" bsSize="small"
            active={aktivni}
            onClick={function(e) {
              // e.target.active = true
              onGeneralParamChange({ name: '_filter', value: 'neumistena' })
            }}
          >
            Neumistena
          </Button>
          <Button bsStyle="info" bsSize="small" onClick={function(e) {onFilterChange(new Filter({ name: 'id', value: '' }))}}>
            All
          </Button>
        </ButtonGroup>
      </div>
    )
  }
}
