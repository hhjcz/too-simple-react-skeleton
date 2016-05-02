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

  constructor(props) {
    super(props)
    const zmenenaFilter = props.filters && props.filters.get('previousNetvisionName') && props.filters.get('previousNetvisionName').value // eslint-disable-line max-len
    const deletedFilter = props.filters && props.filters.get('deletedAt') && props.filters.get('deletedAt').value // eslint-disable-line max-len
    this.state = {
      neumistenaToggled: props.namedFilter === 'neumistena',
      zmenenaToggled: zmenenaFilter,
      smazanaToggled: !deletedFilter,
    }
  }

  render() {
    const self = this
    const { onNamedFilterChange, onFilterChange } = this.props
    return (
      <div style={PredefinedViews.styles.block}>
        <Toggle
          label="Neumístěná" toggled={this.state.neumistenaToggled}
          onToggle={function(e, toggled) {
            self.setState({ neumistenaToggled: toggled })
            onNamedFilterChange(toggled ? 'neumistena' : null)
          }}
        />
        <Toggle
          label="Změněná identita" toggled={this.state.zmenenaToggled}
          onToggle={function(e, toggled) {
            self.setState({ zmenenaToggled: toggled })
            onFilterChange(new Filter({
              name: 'previousNetvisionName',
              value: toggled ? false : null,
              comparator: 'empty' })
            ) }}
        />
        <Toggle
          label="I smazaná" toggled={this.state.smazanaToggled}
          onToggle={function(e, toggled) {
            self.setState({ smazanaToggled: toggled })
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
