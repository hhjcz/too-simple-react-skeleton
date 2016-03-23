/** Created by hhj on 2/18/16. */
import React, { PropTypes } from 'react'
import MyIcon from '../lib/MyIcon'
import MyDraggableInput from '../lib/MyDraggableInput'
import './HintForm.styl'
import * as muiColors from 'material-ui/lib/styles/colors'

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
    const form = ['obec', 'ulice', 'cislo', 'akrlok', 'op', 'ixlok'].map(name =>
      <div key={name} className="hintFormItem">
        <MyDraggableInput label={name} value={lokalitaHint[name]} {...eventHandlers} />
      </div>
    )

    return (
      <div style={{ backgroundColor: muiColors.blueGrey200 }}>
        {/* <Button label="Hledat" secondary onTouchStart={ function() { searchForUmisteni(lokalitaHint) } }> */}
        <div className="hintForm">
          {form}
        </div>
        <span className="btn btn-sm" style={{ backgroundColor: muiColors.blueGrey200, color: 'white', width: '100%' }} onClick={ function() { searchForUmisteni(lokalitaHint) } }>
          <MyIcon>search</MyIcon> Hledat
        </span>
      </div>
    )
  }
}
