/** Created by hhj on 2/18/16. */
import React, { PropTypes } from 'react'
import { List } from 'immutable'
import MyIcon from '../lib/MyIcon'
import MyDraggable from '../lib/MyDraggable'
import MyAutoComplete from '../lib/MyAutoComplete'
import { propsHolder as helperPropsHolder, fetchSeznamAkrloks, autoCompleteFactory } from './hintFormHelper'
import './HintForm.styl'
import colors from '../app/colors'

const fields = ['obec', 'ulice', 'cislo', 'akrlok', 'op', 'ixlok']

export default class HintForm extends React.Component {
  static propTypes = {
    lokalitaHint: PropTypes.object.isRequired,
    searchForUmisteni: PropTypes.func.isRequired,
    akrloks: PropTypes.instanceOf(List),
    actions: PropTypes.object.isRequired,
  };

  static defaultProps = {
    lokalitaHint: {},
    searchForUmisteni() {},
    actions: {},
  };

  constructor(props) {
    super(props)
    this.state = this.props.lokalitaHint
    this.onInputChange = this.onInputChange.bind(this)

    // inject props to helper
    helperPropsHolder.actions = this.props.actions
    helperPropsHolder.akrloks = this.props.akrloks


    // generate auto complete getter functions
    this.getAutoCompleteValues = {};
    fields.forEach(fieldName => {
      this.getAutoCompleteValues[fieldName] = autoCompleteFactory(fieldName)
    })
  }

  componentDidMount() {
    // fetch seznam akrloks
    fetchSeznamAkrloks()
  }

  componentWillReceiveProps(nextProps) {
    // update state from props when zarizeni has changed
    if (nextProps.lokalitaHint.id !== this.props.lokalitaHint.id) {
      this.setState(nextProps.lokalitaHint)
    }
  }

  onInputChange(fieldName, value) {
    if (this.state[fieldName] !== value) this.setState({ [fieldName]: value })
  }

  render() {
    const self = this
    const { searchForUmisteni } = this.props
    const lokalitaHint = this.state

    const formItems = fields.map(fieldName => {
      const callbacks = {
        onChange: value => self.onInputChange(fieldName, value),
        getAutoCompleteValues: self.getAutoCompleteValues[fieldName]
      }
      const value = lokalitaHint[fieldName]

      return (
        <div key={fieldName} className="hintFormItem">
          <MyDraggable label={fieldName} value={value} {...callbacks}>
            <MyAutoComplete label={fieldName} value={value} {...callbacks} />
          </MyDraggable>
        </div>
      )
    })

    return (
      <div style={{ backgroundColor: colors.blueGrey200 }}>
        <div className="hintForm">
          {formItems}
        </div>
        <span
          className="btn btn-sm"
          style={{ backgroundColor: colors.blueGrey200, color: 'white', width: '100%' }}
          onClick={function() { searchForUmisteni(lokalitaHint) }}
        >
          <MyIcon>search</MyIcon> Hledat
        </span>
      </div>
    )
  }
}
