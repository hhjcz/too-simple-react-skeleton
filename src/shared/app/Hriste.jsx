/** Created by hhj on 1/12/16. */
import React from 'react'
import { Image } from 'react-bootstrap'
import FontIcon from 'material-ui/lib/font-icon'
import './fonts.css'
import MyIcon from '../lib/MyIcon'

export default class Hriste extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <div>
          <img alt="50x50 placeholder" src={require('./50x50.png')} />
          <Image alt="50x50 placeholder" src={require('./50x50.png')} circle />
        </div>
        <div style={{ fontFamily: 'Roboto', fontSize: '2em', fontWeight: '300' }}>
          Roboto-300 font family: příliš žluťoučký kůň úpěl dábelské kódy
        </div>
        <div style={{ fontWeight: '100', fontSize: '1em' }}>
          Material Icons font:
          <MyIcon color="red">delete</MyIcon>
          <MyIcon color="green" style={{ fontSize: '4em' }}>motorcycle</MyIcon>
        </div>
        <div>
          Font Awesome: <i className="fa fa-home text-danger" style={{ fontSize: '3em' }} />
        </div>
        <div>
          Font Awesome in FontIcon:
          <FontIcon className="fa fa-bicycle" style={{ fontSize: '3em' }} />
        </div>
      </div>
    )
  }
}
