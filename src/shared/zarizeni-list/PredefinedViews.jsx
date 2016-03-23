/** Created by hhj on 3/3/16. */
import React, { PropTypes } from 'react'
import Toggle from 'material-ui/lib/toggle'
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
    block: { maxWidth: '10em' }
  };

  constructor(props) {
    super(props)
    const deletedFilter = props.filters && props.filters.get('deletedAt') && props.filters.get('deletedAt').value
    this.state = {
      neumistenaToggled: props.namedFilter === 'neumistena',
      smazanaToggled: !deletedFilter
    }
  }

  render() {
    const self = this
    const { onNamedFilterChange, onFilterChange } = this.props
    return (
      <div style={PredefinedViews.styles.block}>
        <Toggle label="Neumístěná" toggled={this.state.neumistenaToggled}
          onToggle={function(e, toggled) { self.setState({ neumistenaToggled: toggled }); onNamedFilterChange(toggled ? 'neumistena' : null) }}
        />
        <Toggle label="I smazaná" toggled={this.state.smazanaToggled}
          onToggle={function(e, toggled) { self.setState({ smazanaToggled: toggled }); onFilterChange(new Filter({ name: 'deletedAt', value: toggled ? null : true, comparator: 'empty' })) }}
        />
      </div>
    )
  }
}
