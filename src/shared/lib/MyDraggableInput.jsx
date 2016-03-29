/** Created by hhj on 3/2/16. */
import React, { PropTypes } from 'react'
import { Input, Glyphicon } from 'react-bootstrap'

export default class MyDraggableInput extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    bsSize: PropTypes.string,
  };

  static validate(value) {
    return value && value.length >= 0
  }

  static droppedTo = null;

  constructor(props) {
    super(props)
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.bsStyle = this.bsStyle.bind(this)

    this.state = { draggedOver: false }
  }

  onDragStart(e) {
    MyDraggableInput.droppedTo = null
    e.dataTransfer.setData('value', e.currentTarget.dataset.value)
  }

  onDragEnd() {
    // clear value when successfully dropped to other input
    if (MyDraggableInput.droppedTo && MyDraggableInput.droppedTo !== this) this.props.onChange(this.props.label, '')
    MyDraggableInput.droppedTo = null
    this.setState({ draggedOver: false })
  }

  onDragOver(e) {
    e.preventDefault()
    this.setState({ draggedOver: 'warning' })
  }

  onDragLeave() {
    this.setState({ draggedOver: false })
  }

  onDrop(e) {
    // indicate that it was dropped here
    MyDraggableInput.droppedTo = this
    this.setState({ draggedOver: false })
    this.props.onChange(this.props.label, e.dataTransfer.getData('value'))
  }

  bsStyle(value) {
    const bsStyle = {}
    if (this.state.draggedOver) bsStyle.bsStyle = 'warning'
    else if (value && value.length > 0) bsStyle.bsStyle = MyDraggableInput.validate(value) ? 'success' : 'error'

    return bsStyle
  }

  render() {
    const { label, value, onChange } = this.props
    return (
      <div data-value={value} data-label={label} draggable
        onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}
        onDragOver={this.onDragOver} onDragLeave={this.onDragLeave}
        className="text-info"
      >
        <Input
          value={value}
          type="text"
          bsSize={this.props.bsSize || 'small'}
          {...this.bsStyle(value)}
          draggable
          addonBefore={label}
          addonAfter={<Glyphicon glyph="erase" onClick={function() { onChange(label, '')} } />}
          onChange={function(e) { onChange(label, e.target.value) }}
          onDrop={this.onDrop}
        />
      </div>
    )
  }
}
