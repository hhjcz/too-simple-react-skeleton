/** Created by hhj on 3/17/16. */
/* eslint-disable max-len */
import React, { PropTypes } from 'react'
import sortBy from 'lodash/sortBy'
import { List } from 'immutable'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
// import FlatButton from 'material-ui/lib/flat-button'
// import RaisedButton from 'material-ui/lib/raised-button'
// import FloatingButton from 'material-ui/lib/floating-action-button'
import MyIcon from '@hhjcz/react-lib/lib/components/MyIcon'
import colors from '../../app/colors'
import MarkedLokalita from './MarkedLokalita'
import NepiOpy from './NepiOpy'
import './PotencialniUmisteni.styl'

export default class PotencialniUmisteni extends React.Component {
  static propTypes = {
    seznamUmisteni: PropTypes.instanceOf(List).isRequired,
    lokalitaHint: PropTypes.object.isRequired,
    umistiZarizeni: PropTypes.func.isRequired,
    deleteAllUmisteni: PropTypes.func.isRequired,
  };

  static defaultProps = {
    seznamUmisteni: List(),
  };

  render() {
    const { seznamUmisteni, lokalitaHint, umistiZarizeni, deleteAllUmisteni } = this.props
    const sortedSeznamUmisteni = sortBy(seznamUmisteni.toArray(), umisteni => -umisteni.lokalita.nepiOpy.size)

    return (
      <div>
        {
          sortedSeznamUmisteni.map(umisteni =>
            <div key={umisteni.id}>
              <div className="umistovani adresa">
                <IconButton tooltip="Umístit!" style={{ padding: '0px' }} onTouchTap={function () { umistiZarizeni(umisteni) }}>
                  <MyIcon color={colors.blue400}>done</MyIcon>
                </IconButton>
                {/*
                 <IconButton tooltip="Smazat!" onTouchTap={ function () { umistiZarizeni(umisteni) } }>
                 <MyIcon color={colors.blue400}>delete</MyIcon>
                 </IconButton>
                 */}
                <MarkedLokalita lokalitaHint={lokalitaHint} lokalita={umisteni.lokalita} key={umisteni.id} />
                <NepiOpy nepiOpy={umisteni.lokalita.nepiOpy} />
              </div>
              <Divider />
            </div>
          )
        }
        {
          sortedSeznamUmisteni.length > 0 ?
            <div style={{ paddingTop: '1em', display: 'flex', justifyContent: 'center' }}>
              <IconButton tooltip="Smazat všechna umístění" primary onTouchTap={deleteAllUmisteni}><MyIcon color={colors.red300}>delete</MyIcon></IconButton>
            </div>
            : null
        }
      </div>
    )
  }
}
