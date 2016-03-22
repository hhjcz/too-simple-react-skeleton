/** Created by hhj on 3/3/16. */
import React, { PropTypes } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import Toggle from 'material-ui/lib/toggle'
import Filter from '../app/models/Filter'

export default class PredefinedViews extends React.Component {
  static propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    onSortChange: PropTypes.func.isRequired,
    onGeneralParamChange: PropTypes.func.isRequired,
    namedFilter: PropTypes.any,
  };

  static defaultProps = {
    namedFilter: null,
  };

  static styles = {
    block: {
      maxWidth: '200px',
    }
  };

  constructor(props) {
    super(props)
    this.state = { toggled: props.namedFilter === 'neumistena' }
  }

  render() {
    const self = this
    const { onFilterChange, onSortChange, onGeneralParamChange } = this.props
    const aktivni = true
    return (
      <div style={PredefinedViews.styles.block}>
        {/* <ButtonGroup>
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
         </ButtonGroup> */}
        <Toggle label="Neumístěná" toggled={this.state.toggled}
          onToggle={function(e, toggled) { self.setState({ toggled }); onGeneralParamChange({ name: '_filter', value: toggled ? 'neumistena' : null }) }}
        />
      </div>
    )
  }
}
