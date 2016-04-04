/** Created by hhj on 4/1/16. */
/* eslint-disable no-nested-ternary */
import React, { PropTypes } from 'react'
import AutoComplete from 'react-autocomplete'
import { Glyphicon } from 'react-bootstrap'

const renderItems = items => items.map((item, index) => {
  const group = item.props.group
  const text = item.props.children
  if (index === 0 || items[index - 1].props.group !== group) {
    const style = {
      background: '#eee',
      color: '#454545',
      padding: '2px 0.4em',
      fontWeight: 'bold'
    }
    return [<div style={style}>{group.toUpperCase()}</div>, item]
  }

  return item
})

const renderItem = item => <div style={{ padding: '0.1em 0.8em' }} key={item.value} group={item.group}>{item.value}</div>


export default class MyAutoComplete extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    getAutoCompleteValues: PropTypes.func.isRequired,
    draggable: PropTypes.bool,
    bsStyle: PropTypes.string,
  };

  static defaultProps = {
    getAutoCompleteValues: () => [],
    draggable: true,
  };

  constructor(props) {
    super(props)
    this.renderMenu = this.renderMenu.bind(this)

    this.state = this.getAutoCompleteValues(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) this.setState(this.getAutoCompleteValues(nextProps))
  }

  getAutoCompleteValues(props) {
    return { autoCompleteValues: props.getAutoCompleteValues(props.value) }
  }

  renderMenu(items, value, style) {
    return (
      <div style={{ position: 'fixed', background: 'white', ...style }}>
        {value === '' ? (
          /* <div style={{ padding: '0.8em' }}></div>*/
          null
        ) : this.state && this.state.loading ? (
          <div style={{ padding: '0.8em' }}>Loading...</div>
        ) : items.length === 0 ? (
          null
        ) : renderItems(items)}
      </div>
    )
  }

  render() {
    const self = this
    const { label, value, onChange, draggable, bsStyle } = this.props

    return (
      <div className={`input-group input-group-sm has-${bsStyle}`}>
        <span className="input-group-addon">{label}</span>
        <AutoComplete
          value={value}
          inputProps={{ className: 'form-control', draggable }}
          items={this.state.autoCompleteValues}
          getItemValue={item => item.value}
          renderItem={renderItem}
          renderMenu={self.renderMenu}
          onChange={function(e, value) { onChange(value) }}
          onSelect={function(value) { onChange(value) }}
        />
        <span className="input-group-addon">
          <Glyphicon glyph="erase" onClick={function() { onChange('')} } />
        </span>
      </div>
    )
  }
}
