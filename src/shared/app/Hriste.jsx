/** Created by hhj on 1/12/16. */
import React from 'react'
import { Image } from 'react-bootstrap'

export default class Hriste extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <img alt="50x50 placeholder" src={require('./50x50.png')} />
        <Image alt="50x50 placeholder" src={require('./50x50.png')} circle />
      </div>
    )
  }
}
