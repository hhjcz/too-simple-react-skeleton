/** Created by hhj on 3/3/16. */
import React, { PropTypes } from 'react'
import Toggle from 'material-ui/Toggle'
import { Filter } from './../app/models/Filter'

export default class PredefinedViews extends React.Component {
  static propTypes = {
    onNamedFilterChange: PropTypes.func.isRequired,
    namedFilter: PropTypes.string,
    onFilterChange: PropTypes.func.isRequired,
    filters: PropTypes.object,
    showColumn: PropTypes.func.isRequired,
    hideColumn: PropTypes.func.isRequired,
    setColumnWidth: PropTypes.func.isRequired,
  };

  static defaultProps = {
    namedFilter: null,
  };

  static computeToggleState(props) {
    const filters = props.filters
    const nepiOpFilter = filters && filters.get('op') && filters.get('op').value === false // eslint-disable-line max-len
    const umistenaZarizeniFilter = filters && filters.get('zarizeni') && filters.get('zarizeni').value === false // eslint-disable-line max-len

    return {
      // neumistenaToggled: props.namedFilter === 'neumistena',
      nepiOpToggled: nepiOpFilter,
      umistenaZarizeniToggled: umistenaZarizeniFilter,
    }
  }

  render() {
    const { onNamedFilterChange, onFilterChange, showColumn, hideColumn, setColumnWidth } = this.props // eslint-disable-line no-unused-vars
    const toggleState = PredefinedViews.computeToggleState(this.props)

    return (
      <div className="row">
        <div className="col col-xs-5">
          <Toggle
            label="Jen s OP" toggled={toggleState.nepiOpToggled}
            onToggle={function(e, toggled) {
              onFilterChange(new Filter({
                name: 'op',
                value: toggled ? false : null,
                comparator: 'empty' })
              )
            }}
          />
          <Toggle
            label="Jen s umístěným zařízením" toggled={toggleState.umistenaZarizeniToggled}
            onToggle={function(e, toggled) {
              onFilterChange(new Filter({
                name: 'zarizeni',
                value: toggled ? false : null,
                comparator: 'empty' })
              )
            }}
          />
        </div>
      </div>
    )
  }
}
