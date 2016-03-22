/** Created by hhj on 3/3/16. */
import React, { PropTypes } from 'react'
import Toggle from 'material-ui/lib/toggle'

export default class PredefinedViews extends React.Component {
  static propTypes = {
    onNamedFilterChange: PropTypes.func.isRequired,
    namedFilter: PropTypes.string,
  };

  static defaultProps = {
    namedFilter: null,
  };

  static styles = {
    block: { maxWidth: '10em' }
  };

  constructor(props) {
    super(props)
    this.state = { neumistenaToggled: props.namedFilter === 'neumistena' }
  }

  render() {
    const self = this
    const { onNamedFilterChange } = this.props
    return (
      <div style={PredefinedViews.styles.block}>
        <Toggle label="Neumístěná" toggled={this.state.neumistenaToggled}
          onToggle={function(e, toggled) { self.setState({ neumistenaToggled: toggled }); onNamedFilterChange(toggled ? 'neumistena' : null) }}
        />
      </div>
    )
  }
}
