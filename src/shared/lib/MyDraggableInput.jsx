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

  static bsStyle(value) {
    if (value && value.length > 0) return MyDraggableInput.validate(value) ? 'success' : 'error'
    return ''
  }

  static droppedTo = null;

  constructor(props) {
    super(props)
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDrop = this.onDrop.bind(this)

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

  render() {
    const { label, value, onChange } = this.props
    const bsStyle = this.state.draggedOver || MyDraggableInput.bsStyle(value)
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
          bsStyle={bsStyle}
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
