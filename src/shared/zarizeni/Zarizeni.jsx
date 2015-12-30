/**
 * Created by hhj on 12/30/15.
 */

import React, {PropTypes} from 'react'

export default class Zarizeni extends React.Component {
  static propTypes = {
    params: PropTypes.object
  }

  render() {
    console.log('Params: ', this.props.params)
    return (
      <div>
        zarizeni id: {this.props.params.id}
      </div>
    )
  }
}

