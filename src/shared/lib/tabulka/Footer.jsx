/** Created by hhj on 12/29/15. */
import React, { PropTypes } from 'react'
import { Pagination, FormGroup, FormControl, InputGroup } from 'react-bootstrap'
import debounce from '../debounce'
import ColumnsControl from './ColumnsControl'

export default class Footer extends React.Component {
  static propTypes = {
    rowCount: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onRowCountChange: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired,
    setColumnVisibility: PropTypes.func.isRequired,
    bsSize: PropTypes.string,
    debounce: PropTypes.number
  };

  static defaultProps = {
    debounce: 500,
    bsSize: 'small',
    maxButtons: 9,
  };

  static validatePageSize(rowCount) {
    return Footer.parsePageSize(rowCount) > 0
  }

  static parsePageSize(rowCount) {
    return parseInt(rowCount, 10)
  }

  constructor(props) {
    super(props);
    this.state = {
      rowCount: this.props.rowCount
    }
    if (this.props.debounce > 0) {
      this.onRowCountChange = debounce(this.onRowCountChange, this.props.debounce, this)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rowCount !== nextProps.rowCount) {
      this.setState({ rowCount: nextProps.rowCount })
    }
  }

  onRowCountChange(rowCount) {
    console.log('PreValidated')
    if (Footer.validatePageSize(rowCount)) {
      console.log('Validated', rowCount)
      this.props.onRowCountChange(Footer.parsePageSize(rowCount))
    }
  }

  render() {
    const self = this
    const { columns, setColumnVisibility, total, bsSize } = this.props
    return (
      <div className="row" style={{ marginTop: '1em' }}>
        <div className="col col-md-2 ">
          <FormGroup bsSize={bsSize} bsSize={bsSize}>
            <InputGroup>
              <InputGroup.Addon>total</InputGroup.Addon>
              <FormControl type="text" value={total} disabled />
            </InputGroup>
          </FormGroup>
        </div>
        <div className="col col-xs-2">
          <FormGroup
            bsSize={bsSize}
            validationState={!Footer.validatePageSize(this.state.rowCount) ? 'error' : ''}
          >
            <InputGroup>
              <InputGroup.Addon>rows</InputGroup.Addon>
              <FormControl
                type="text" id="rowCountInput"
                value={this.state.rowCount}
                onChange={function(event) {
                  if (event.persist) event.persist()
                  const rowCount = event.target.value
                  console.log('Rowcount: ', rowCount)
                  self.setState({ rowCount })
                  console.log('State: ', self.state)
                  self.onRowCountChange(rowCount)
                }}
              />
            </InputGroup>
          </FormGroup>
        </div>
        <div className="col col-md-6 col-md-offset-1">
          <ColumnsControl columns={columns} setColumnVisibility={setColumnVisibility} />
        </div>
      </div>
    )
  }
}
