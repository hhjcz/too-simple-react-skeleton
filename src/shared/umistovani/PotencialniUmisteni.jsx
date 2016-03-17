/** Created by hhj on 3/17/16. */
import React, { PropTypes } from 'react'
import * as muiColors from 'material-ui/lib/styles/colors'
import FlatButton from 'material-ui/lib/flat-button'
import IconButton from 'material-ui/lib/icon-button'
import RaisedButton from 'material-ui/lib/raised-button'
import FloatingButton from 'material-ui/lib/floating-action-button'
import Divider from 'material-ui/lib/divider'

import MarkedLokalita from './MarkedLokalita'
import NepiOpy from './NepiOpy'
import MyIcon from '../lib/MyIcon'
import './PotencialniUmisteni.styl'

export default class PotencialniUmisteni extends React.Component {
  static propTypes = {
    seznamUmisteni: PropTypes.object.isRequired,
    lokalitaHint: PropTypes.object.isRequired,
    umistiZarizeni: PropTypes.func.isRequired,
    deleteAllUmisteni: PropTypes.func.isRequired,
  };

  static defaultProps = {
    seznamUmisteni: [],
  };

  render() {
    const { seznamUmisteni, lokalitaHint, umistiZarizeni, deleteAllUmisteni } = this.props

    return (
      <div>
        {
          seznamUmisteni.map(umisteni => <div key={umisteni.id}>
              <div className="umistovani adresa">
                <IconButton tooltip="Umístit!" style={{ padding: '0px' }} onTouchTap={ function () { umistiZarizeni(umisteni) } }>
                  <MyIcon color={muiColors.blue400}>done</MyIcon>
                </IconButton>
                <IconButton tooltip="Smazat!" onTouchTap={ function () { umistiZarizeni(umisteni) } }>
                  <MyIcon color={muiColors.blue400}>delete</MyIcon>
                </IconButton>
                <MarkedLokalita lokalitaHint={lokalitaHint} lokalita={umisteni.lokalita} key={umisteni.id} />
                <NepiOpy nepiOpy={umisteni.lokalita.nepiOpy} />
              </div>
              <Divider />
            </div>
          )
        }
        {
          seznamUmisteni.size > 0 ?
            <div style={{ paddingTop: '1em', display: 'flex', justifyContent: 'center' }}>
              <IconButton tooltip="Smazat všechna umístění" primary onTouchTap={ deleteAllUmisteni }><MyIcon color={muiColors.red300}>delete</MyIcon></IconButton>
            </div>
            : null
        }
      </div>
    )
  }
}
