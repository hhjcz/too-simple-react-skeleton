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
    const lokalitaOpFilter = filters && filters.get('op') && filters.get('op').value === false // eslint-disable-line max-len

    return {
      // neumistenaToggled: props.namedFilter === 'neumistena',
      lokalitaOpToggled: lokalitaOpFilter,
    }
  }

  render() {
    const { onNamedFilterChange, onFilterChange, showColumn, hideColumn, setColumnWidth } = this.props
    const toggleState = PredefinedViews.computeToggleState(this.props)

    return (
      <div className="row">
        <div className="col col-xs-5">
          <Toggle
            label="Jen s OP" toggled={toggleState.lokalitaOpToggled}
            onToggle={function(e, toggled) {
              onFilterChange(new Filter({
                name: 'op',
                value: toggled ? false : null,
                comparator: 'empty' })
              )
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
