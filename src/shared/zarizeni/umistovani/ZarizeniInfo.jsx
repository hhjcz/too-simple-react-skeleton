/** Created by hhj on 3/15/16. */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import IconButton from 'material-ui/IconButton'
import MyIcon from '@hhjcz/react-lib/lib/components/MyIcon'
import MyDraggable from '@hhjcz/react-lib/lib/components/MyDraggable'
import '@hhjcz/react-lib/lib/tabulka/Tabulka.styl'
import colors from '../../app/colors'
import MarkedLokalita from './MarkedLokalita'
import { markPotencialniNepiop } from './markUtils'

export default class ZarizeniInfo extends React.Component {
  static propTypes = {
    zarizeni: PropTypes.object.isRequired,
    zrusitUmisteni: PropTypes.func.isRequired,
  };

  static defaultProps = {
    zarizeni: { umisteni: { lokalita: {} } }
  };

  render() {
    const { zarizeni, zrusitUmisteni } = this.props
    return (
      <div className="col col-xs-6 myTable">
        <div className="myTableRow">
          <div className="myTableRowItem uFlexGrow-1">Jméno:</div>
          <div className="myTableRowItem uFlexGrow-4 text-info">
            <Link to={`/zarizeni/${zarizeni.id}`}>{markPotencialniNepiop(zarizeni.name)}</Link>
          </div>
        </div>
        <div className="myTableRow">
          <div className="myTableRowItem uFlexGrow-1">Info jméno:</div>
          <div className="myTableRowItem uFlexGrow-4 text-info">
            <Link to={`/zarizeni/${zarizeni.id}`}>{markPotencialniNepiop(zarizeni.infoName)}</Link>
          </div>
        </div>
        <div className="myTableRow">
          <div className="myTableRowItem uFlexGrow-1">Id:</div>
          <div className="myTableRowItem uFlexGrow-4">{zarizeni.id}</div>
        </div>
        <div className="myTableRow">
          <div className="myTableRowItem uFlexGrow-1">Mapa:</div>
          <MyDraggable value={zarizeni.defaultmap} className="myTableRowItem uFlexGrow-4">
            <a href={`http://orion.cesta/Orion/NetPerfMon/MapView.aspx?Map=${zarizeni.defaultmap}`}>
              {zarizeni.defaultmap}
            </a>
          </MyDraggable>
        </div>
        <div className="myTableRow">
          <div className="myTableRowItem uFlexGrow-1">Umístění:</div>
          {
            zarizeni.umisteni.lokalita && zarizeni.umisteni.lokalita.ixlok > 0 ? (
              <div className="myTableRowItem uFlexGrow-4">
                <Link to={`/lokalita/${zarizeni.umisteni.lokalita.ixlok}`}>
                  <MarkedLokalita lokalita={zarizeni.umisteni.lokalita} />
                </Link>
                <IconButton tooltip="Zrušit umístění" primary onTouchTap={zrusitUmisteni}>
                  <MyIcon color={colors.red200}>delete</MyIcon>
                </IconButton>
              </div>
            ) : null
          }
        </div>
      </div>
    )
  }
}
