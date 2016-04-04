/** Created by hhj on 2/18/16. */
import React, { PropTypes } from 'react'
import MyIcon from '../lib/MyIcon'
import MyDraggable from '../lib/MyDraggable'
import MyAutoComplete from '../lib/MyAutoComplete'
import './HintForm.styl'
import * as muiColors from 'material-ui/lib/styles/colors'

export default class HintForm extends React.Component {
  static propTypes = {
    lokalitaHint: PropTypes.object.isRequired,
    searchForUmisteni: PropTypes.func.isRequired,
    akrloks: PropTypes.array,
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
    this.getAutoCompleteValues = this.getAutoCompleteValues.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // update state from props when zarizeni has changed
    if (nextProps.lokalitaHint.id !== this.props.lokalitaHint.id) {
      this.setState(nextProps.lokalitaHint)
    }
  }

  onInputChange(label, value) {
    const newState = {}
    newState[label] = value
    this.setState(newState)
  }

  getAutoCompleteValues(label) {
    switch (label) {
      case 'akrlok':
        return value => this.props.akrloks.filter(akrlok => akrlok.indexOf(value.toLowerCase()) > -1)

      default:
        return () => []
    }
  }

  render() {
    const self = this
    const { searchForUmisteni } = this.props
    const lokalitaHint = this.state

    const formItems = ['obec', 'ulice', 'cislo', 'akrlok', 'op', 'ixlok'].map(label => {
      const callbacks = {
        onChange: value => self.onInputChange(label, value),
        getAutoCompleteValues: self.getAutoCompleteValues(label)
      }
      const value = lokalitaHint[label]

      return (
        <div key={label} className="hintFormItem">
          <MyDraggable label={label} value={value} {...callbacks}>
            <MyAutoComplete label={label} value={value} {...callbacks} />
          </MyDraggable>
        </div>
      )
    })

    return (
      <div style={{ backgroundColor: muiColors.blueGrey200 }}>
        <div className="hintForm">
          {formItems}
        </div>
        <span className="btn btn-sm"
          style={{ backgroundColor: muiColors.blueGrey200, color: 'white', width: '100%' }}
          onClick={ function() { searchForUmisteni(lokalitaHint) } }
        >
          <MyIcon>search</MyIcon> Hledat
        </span>
      </div>
    )
  }
}
