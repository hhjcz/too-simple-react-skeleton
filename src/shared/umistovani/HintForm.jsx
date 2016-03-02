/** Created by hhj on 2/18/16. */
import React, { PropTypes } from 'react'
import MyDraggableInput from '../lib/MyDraggableInput'

export default class HintForm extends React.Component {
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

  componentWillReceiveProps(nextProps) {
    // update state from props when zarizeni has changed
    if (nextProps.lokalitaHint.id !== this.props.lokalitaHint.id) this.setState(nextProps.lokalitaHint)
  }

  onInputChange(label, value) {
    const newState = {}
    newState[label] = value
    this.setState(newState)
  }

  render() {
    const { searchForUmisteni } = this.props
    const lokalitaHint = this.state
    const eventHandlers = {
      onChange: this.onInputChange,
    }
    const form = Object.keys(lokalitaHint).map(name =>
      <MyDraggableInput key={name} label={name} value={lokalitaHint[name]} {...eventHandlers} />
    )

    return (
      <div>
        {form}
        {/* <MyInput label="obec" value={lokalitaHint.obec} {...eventHandlers} />
         <MyInput label="ulice" value={lokalitaHint.ulice} {...eventHandlers} />
         <MyInput label="cislo" value={lokalitaHint.cislo} {...eventHandlers} />
         <MyInput label="akrlok" value={lokalitaHint.akrlok} {...eventHandlers} />
         <MyInput label="op" value={lokalitaHint.op} {...eventHandlers} />
         <MyInput label="ixlok" value={lokalitaHint.ixlok} {...eventHandlers} />
         */}

        <span className="btn btn-sm btn-info" onClick={ function() { searchForUmisteni(lokalitaHint) } }>
          Search
        </span>
      </div>
    )
  }
}
