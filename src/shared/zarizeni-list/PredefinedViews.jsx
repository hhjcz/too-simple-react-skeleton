/** Created by hhj on 3/3/16. */
import React, { PropTypes } from 'react'
import Toggle from 'material-ui/Toggle'
import { Filter } from '@hhjcz/react-lib/lib/Filter'

const styles = {
  toggle: {
    alignSelf: 'center'
  },
  label: {
    whiteSpace: 'nowrap'
  }
}

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
    const zmenenaFilter = filters && filters.get('previousNetvisionName') && filters.get('previousNetvisionName').value === false // eslint-disable-line max-len
    const deletedFilter = filters && filters.get('deletedAt') && filters.get('deletedAt').value // eslint-disable-line max-len
    const bezIpFilter = filters && filters.get('ipAddress') && filters.get('ipAddress').value === false // eslint-disable-line max-len

    return {
      neumistenaToggled: props.namedFilter === 'neumistena',
      umistenaBezOpToggled: props.namedFilter === 'umistenaBezOp',
      zmenenaToggled: zmenenaFilter,
      smazanaToggled: !deletedFilter,
      bezIpToggled: !bezIpFilter
    }
  }

  render() {
    const { onNamedFilterChange, onFilterChange, showColumn, hideColumn, setColumnWidth } = this.props
    const toggleState = PredefinedViews.computeToggleState(this.props)

    return (
      <div className="row">
        <div className="col col-md-6">
          <Toggle
            label="Neumístěná" toggled={toggleState.neumistenaToggled}
            onToggle={
              function(e, toggled) {
                onNamedFilterChange(toggled ? 'neumistena' : null)
                if (toggled) setColumnWidth('umisteni', 1)
                else setColumnWidth('umisteni')
              }}
            iconStyle={styles.toggle}
            labelStyle={styles.label}
          />
          <Toggle
            label="Umístěná na lokalitě bez OP" toggled={toggleState.umistenaBezOpToggled}
            onToggle={function(e, toggled) {
              onNamedFilterChange(toggled ? 'umistenaBezOp' : null)
            }}
            iconStyle={styles.toggle}
            labelStyle={styles.label}
          />
          <Toggle
            label="Změněná identita" toggled={toggleState.zmenenaToggled}
            onToggle={function(e, toggled) {
              if (toggled) {
                showColumn('previousNetvisionName')
                hideColumn('name')
              } else {
                hideColumn('previousNetvisionName')
                showColumn('name')
              }
              onFilterChange(new Filter({
                name: 'previousNetvisionName',
                value: toggled ? false : null,
                comparator: 'empty'
              }))
            }}
            iconStyle={styles.toggle}
            labelStyle={styles.label}
          />
        </div>
        <div className="col col-md-6 col-md-offset-0">
          <Toggle
            label="I smazaná" toggled={toggleState.smazanaToggled}
            onToggle={function(e, toggled) {
              onFilterChange(new Filter({
                name: 'deletedAt',
                value: toggled ? null : true,
                comparator: 'empty'
              }))
              if (toggled) showColumn('deletedAt')
              else hideColumn('deletedAt')
            }}
            iconStyle={styles.toggle}
            labelStyle={styles.label}
          />
          <Toggle
            label="I bez IP adresy" toggled={toggleState.bezIpToggled}
            onToggle={function(e, toggled) {
              onFilterChange(new Filter({
                name: 'ipAddress',
                value: toggled ? null : false,
                comparator: 'empty'
              }))
              if (toggled) showColumn('ipAddress')
              else hideColumn('ipAddress')
            }}
            iconStyle={styles.toggle}
            labelStyle={styles.label}
          />
        </div>
      </div>
    )
  }
}
