/** Created by hhj on 3/16/16. */
import React, { PropTypes } from 'react'
import './icons.css'
import FontIcon from 'material-ui/lib/font-icon'

export default class MyIcon extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    style: PropTypes.object,
    color: PropTypes.string,
  };

  static defaultProps = {
    color: 'white',
  };

  static defaultStyle = {
    verticalAlign: 'middle',
    fontSize: '20px'
  };

  render() {
    return (
      <FontIcon className="material-icons" {...this.props} style={{ ...MyIcon.defaultStyle, ...this.props.style }}>
        {this.props.children}
      </FontIcon>
    )
  }
}
