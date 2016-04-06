/** Created by hhj on 2/18/16. */
import React, { PropTypes } from 'react'
import MyIcon from '../lib/MyIcon'
import MyDraggable from '../lib/MyDraggable'
import MyAutoComplete from '../lib/MyAutoComplete'
import { propsHolder, fetchSeznamAkrloks, getAutoCompleteValuesFn } from './hintFormCompletion'
import './HintForm.styl'
import * as muiColors from 'material-ui/lib/styles/colors'


const fields = ['obec', 'ulice', 'cislo', 'akrlok', 'op', 'ixlok']

export default class HintForm extends React.Component {
  static propTypes = {
    lokalitaHint: PropTypes.object.isRequired,
    searchForUmisteni: PropTypes.func.isRequired,
    akrloks: PropTypes.array,
    actions: PropTypes.object.isRequired,
  };

  static defaultProps = {
    lokalitaHint: {},
    searchForUmisteni() {
    },
    actions: {},
  };

  constructor(props) {
    super(props)
    this.state = this.props.lokalitaHint
    this.onInputChange = this.onInputChange.bind(this)

    propsHolder.actions = this.props.actions
    propsHolder.akrloks = this.props.akrloks

    fetchSeznamAkrloks()

    this.getAutoCompleteValues = {};
    fields.forEach(label => {
      this.getAutoCompleteValues[label] = getAutoCompleteValuesFn(label)
    })
  }

  componentWillReceiveProps(nextProps) {
    // update state from props when zarizeni has changed
    if (nextProps.lokalitaHint.id !== this.props.lokalitaHint.id) {
      this.setState(nextProps.lokalitaHint)
    }
  }

  onInputChange(label, value) {
    if (this.state[label] !== value) this.setState({ [label]: value })
  }

  render() {
    const self = this
    const { searchForUmisteni } = this.props
    const lokalitaHint = this.state

    const formItems = fields.map(label => {
      const callbacks = {
        onChange: value => self.onInputChange(label, value),
        getAutoCompleteValues: self.getAutoCompleteValues[label]
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
