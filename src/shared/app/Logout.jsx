/** Created by hhj on 7/14/16. */
import React, { PropTypes } from 'react'

export default class Logout extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  render() {
    return (
      <div className="" style={{ marginRight: '15px' }} onClick={this.props.logout}>
        {this.props.children}
      </div>
    )
  }
}
