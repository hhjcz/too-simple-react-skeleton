/** Created by hhj on 2/18/16. */
import React, { PropTypes } from 'react'
import debounce from '../lib/debounce'
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

    this.fetchSeznamAkrloks.call(this)

    this.getAutoCompleteValues = [];
    ['obec', 'ulice', 'cislo', 'akrlok', 'op', 'ixlok'].forEach(label => {
      this.getAutoCompleteValues[label] = this.getAutoCompleteValuesFn.call(this, label)
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

  getAutoCompleteValuesFn(label) {
    switch (label) {
      case 'ulice':
        this.fetchSeznamUlic = debounce(this.fetchSeznamUlic, 500, this)
        return value => {
          if (value.length < 3) return '...alespoň 3 znaky...'
          return this.fetchSeznamUlic(value)
        }

      case 'akrlok':
        return value => this.props.akrloks
          .filter(lokalita => lokalita.akrlok.toLowerCase().indexOf(value.toLowerCase()) > -1)
          .map(lokalita => ({ value: lokalita.akrlok, group: lokalita.obec }))

      default:
        return () => []
    }
  }

  fetchSeznamAkrloks() {
    if (!(this.props.actions.akrloks && this.props.actions.akrloks.fetchCollection)) return null
    return this.props.actions.akrloks.fetchCollection({ force: true })
  }

  fetchSeznamUlic(substring) {
    substring = (substring || '').replace(' ', '').toLowerCase()

    return this.props.actions.lokalita.fetchCollection({
      params: { 'trimmed_ulice-lk': `${substring}%`, _fields: 'ulice' },
      force: true
    }).then(response => response.data.map(item => ({
      value: item.ulice,
      group: ''
    })))
  }

  render() {
    const self = this
    const { searchForUmisteni } = this.props
    const lokalitaHint = this.state

    const formItems = ['obec', 'ulice', 'cislo', 'akrlok', 'op', 'ixlok'].map(label => {
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
