/** Created by hhj on 1/12/16. */
import React, { PropTypes } from 'react'
import { Image } from 'react-bootstrap'
import FontIcon from 'material-ui/lib/font-icon'
import IconButton from 'material-ui/lib/icon-button'
import { connect } from 'react-redux'
import './fonts.css'
import MyIcon from '../lib/MyIcon'
import rest from '../app/rest'

export class Hriste extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    state: {},
    actions: {},
  };

  render() {
    const clearEntities = rest.actions.zarizeni.clearEntities

    return (
      <div>
        <div style={{ fontSize: '3em' }}>
          State size: {JSON.stringify(this.props.state).length} chars long
          <IconButton tooltip="Vycistit state (entities)!"
            style={{ padding: '0px' }}
            onTouchTap={ () => clearEntities() }
          >
            <MyIcon color="red" forcedStyle={{ fontSize: '40px' }}>refresh</MyIcon>
          </IconButton>
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

export default connect(
  state => ({ state }),
  dispatch => ({ dispatch })
)(Hriste)
