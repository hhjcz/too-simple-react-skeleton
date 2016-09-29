/** Created by hhj on 9/29/16. */
import React, { PropTypes } from 'react'
import ZarizeniInfo from '../zarizeni/info'

export default class Slucovani extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    firstId: PropTypes.number.isRequired,
    secondId: PropTypes.number.isRequired,
  };

  static defaultProps = {};

  render() {
    const { firstId, secondId } = this.props.params
    return (
      <div>
        <ZarizeniInfo params={{ id: firstId }} />
        <hr />
        <ZarizeniInfo params={{ id: secondId }} />
      </div>
    )
  }
}
