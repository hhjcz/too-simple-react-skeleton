/** Created by hhj on 4/1/16. */
/* eslint-disable no-nested-ternary */
import React, { PropTypes } from 'react'
import AutoComplete from 'react-autocomplete'
import { Glyphicon } from 'react-bootstrap'
import debounce from './debounce'

const styles = {
  item: {
    padding: '0.1em 0.8em',
    cursor: 'default'
  },

  highlightedItem: {
    padding: '0.1em 0.8em',
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc',
    position: 'fixed',
    background: 'white'
  }
}

// collection of items as returned by renderItem()
const renderItems = items => items.map((item, index) => {
  const group = item.props.group
  // const text = item.props.children
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

const renderItem = (item, isHighlighted) =>
  <div style={isHighlighted ? styles.highlightedItem : styles.item} key={item.value} group={item.group}>
    {item.value}
  </div>


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
    this.getAutoCompleteValues = debounce(this.getAutoCompleteValues, 500, this)

    this.state = { autoCompleteValues: [], message: '' }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ message: '...hledám...' })
      this.setState(await this.getAutoCompleteValues(nextProps))
    }
  }

  async getAutoCompleteValues(props) {
    const values = await props.getAutoCompleteValues(props.value)
    if (typeof values === 'string') return {
      autoCompleteValues: [],
      message: values
    }
    return {
      autoCompleteValues: values || [],
      message: ''
    }
  }

  renderMenu(items, value, style) {
    return (
      <div style={{ ...styles.menu, ...style }}>
        {value === '' ? (
          null
          /* <div style={{ padding: '0.8em' }}>...alespoň 3 znaky...</div> */
          /* <div style={{ padding: '0.8em' }}></div> */
        ) : this.state && this.state.message ? (
          <div style={{ padding: '0.8em' }}>{this.state.message}</div>
        /* ) : this.state && this.state.loading ? ( */
        /*   <div style={{ padding: '0.8em' }}>...hledám...</div> */
        ) : items.length === 0 ? (
          <div style={{ padding: '0.8em' }}>...žádná shoda...</div>
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
        <span className="input-group-addon" style={{ cursor: 'pointer' }} onClick={function() { onChange('')} }>
          <Glyphicon glyph="erase" />
        </span>
      </div>
    )
  }
}
