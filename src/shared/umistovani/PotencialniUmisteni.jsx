/** Created by hhj on 3/17/16. */
import React, { PropTypes } from 'react'
import MarkedLokalita from './MarkedLokalita'
import NepiOpy from './NepiOpy'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import FloatingButton from 'material-ui/lib/floating-action-button'
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
          seznamUmisteni.map(umisteni =>
            <div key={umisteni.id}>
              <div className="umistovani adresa">
                <MarkedLokalita lokalitaHint={lokalitaHint} lokalita={umisteni.lokalita} key={umisteni.id} />
                {/* <div className="btn btn-xs btn-success glyphicon glyphicon-ok" onClick={function () {self.umistitZarizeni(umisteni)}} />
                 <div className="btn btn-xs btn-success" onClick={function () {self.umistitZarizeni(umisteni)}}>
                 <MyIcon>done</MyIcon>
                 </div>
                 <FlatButton label="" secondary icon={<MyIcon>done</MyIcon>} /> */}
                <FloatingButton label="" mini secondary onTouchTap={ function () { umistiZarizeni(umisteni) } }>
                  <MyIcon>done</MyIcon>
                </FloatingButton>
                <FloatingButton label="" mini primary disable>
                  <MyIcon>delete</MyIcon>
                </FloatingButton>
              </div>
              <NepiOpy nepiOpy={umisteni.lokalita.nepiOpy} />
            </div>
          )
        }
        {
          seznamUmisteni.size > 0 ?
            <RaisedButton label="Smazat všechna umístění" primary onTouchTap={ deleteAllUmisteni } icon={<MyIcon>delete</MyIcon>} />
            /* <div className="btn btn-sm btn-danger" onClick={ function() { self.deleteAllUmisteni() } }>
             Smazat všechna umístění
             </div> */
            : null
        }
      </div>
    )
  }
}
