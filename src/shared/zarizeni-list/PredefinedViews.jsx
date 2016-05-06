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
  };

  static defaultProps = {
    namedFilter: null,
  };

  static styles = {
    block: { maxWidth: '20em' }
  };

  computeToggleState(props) {
    const zmenenaFilter = props.filters && props.filters.get('previousNetvisionName') && props.filters.get('previousNetvisionName').value === false // eslint-disable-line max-len
    const deletedFilter = props.filters && props.filters.get('deletedAt') && props.filters.get('deletedAt').value // eslint-disable-line max-len
    console.log(zmenenaFilter)
    return {
      neumistenaToggled: props.namedFilter === 'neumistena',
      umistenaBezOpToggled: props.namedFilter === 'umistenaBezOp',
      zmenenaToggled: zmenenaFilter,
      smazanaToggled: !deletedFilter,
    }
  }

  render() {
    const { onNamedFilterChange, onFilterChange } = this.props
    const toggleState = this.computeToggleState(this.props)

    return (
      <div style={PredefinedViews.styles.block}>
        <Toggle
          label="Neumístěná" toggled={toggleState.neumistenaToggled}
          onToggle={function(e, toggled) {
            onNamedFilterChange(toggled ? 'neumistena' : null)
          }}
        />
        <Toggle
          label="UmístěnáBezOP" toggled={toggleState.umistenaBezOpToggled}
          onToggle={function(e, toggled) {
            onNamedFilterChange(toggled ? 'umistenaBezOp' : null)
          }}
        />
        <Toggle
          label="Změněná identita" toggled={toggleState.zmenenaToggled}
          onToggle={function(e, toggled) {
            onFilterChange(new Filter({
              name: 'previousNetvisionName',
              value: toggled ? false : null,
              comparator: 'empty' })
            ) }}
        />
        <Toggle
          label="I smazaná" toggled={toggleState.smazanaToggled}
          onToggle={function(e, toggled) {
            onFilterChange(new Filter({
              name: 'deletedAt',
              value: toggled ? null : true,
              comparator: 'empty' })
            ) }}
        />
      </div>
    )
  }
}
