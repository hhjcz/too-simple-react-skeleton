/** Created by hhj on 2/18/16. */
import React, { PropTypes } from 'react'
import { Input } from 'react-bootstrap'

class MyInput extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static validate(value) {
    return value && value.length >= 0
  }

  static bsStyle(value) {
    if (value && value.length > 0) return MyInput.validate(value) ? 'success' : 'error'
    return ''
  }

  render() {
    const { label, value, onChange } = this.props
    return (
      <span className="text-info">
        <Input
          value={value}
          type="text"
          bsSize="small"
          addonBefore={label}
          bsStyle={MyInput.bsStyle(value)}
          onChange={function(event) {
            onChange(label, event.target.value)
          }}
        />
      </span>
    )
  }
}

export default class LokalitaHint extends React.Component {
  static propTypes = {
    lokalitaHint: PropTypes.object.isRequired,
    searchForUmisteni: PropTypes.func.isRequired,
  };

  static defaultProps = {
    lokalitaHint: {},
    searchForUmisteni() {
    },
  };

  constructor(props) {
    super(props)
    this.state = this.props.lokalitaHint
    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange(label, value) {
    const newState = {}
    newState[label] = value
    this.setState(newState)
  }

  render() {
    const { searchForUmisteni } = this.props
    const lokalitaHint = this.state
    return (
      <div>
        <MyInput label="obec" value={lokalitaHint.obec} onChange={this.onInputChange} />
        <MyInput label="ulice" value={lokalitaHint.ulice} onChange={this.onInputChange} />
        {/* <span className="btn btn-xs btn-info" ng-click="lokalitaHint.akrlok=lokalitaHint.ulice; lokalitaHint.ulice=''">
         2akrlok
         </span>
         */}
        <MyInput label="cislo" value={lokalitaHint.cislo} onChange={this.onInputChange} />
        <MyInput label="akrlok" value={lokalitaHint.akrlok} onChange={this.onInputChange} />
        <MyInput label="op" value={lokalitaHint.op} onChange={this.onInputChange} />
        <MyInput label="ixlok" value={lokalitaHint.ixlok} onChange={this.onInputChange} />

        <span className="btn btn-sm btn-danger" onClick={ function() { searchForUmisteni(lokalitaHint) } }>
          Search
        </span>
      </div>
    )
  }
}
