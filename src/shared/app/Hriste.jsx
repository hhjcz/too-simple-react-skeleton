/** Created by hhj on 1/12/16. */
import React, { PropTypes } from 'react'
import { Image } from 'react-bootstrap'
import FontIcon from 'material-ui/lib/font-icon'
import { connect } from 'react-redux'
import './fonts.css'
import MyIcon from '../lib/MyIcon'

export class Hriste extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
  };

  static defaultProps = {
    state: {}
  };

  render() {
    return (
      <div>
        <div style={{ fontSize: '3em' }}>
          State size: {JSON.stringify(this.props.state).length} chars long
        </div>
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
        <div>
          Pridavam radku... a slovo...
        </div>
      </div>
    )
  }
}

export default connect(state => ({ state }))(Hriste)
