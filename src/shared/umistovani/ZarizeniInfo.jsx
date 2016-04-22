/** Created by hhj on 3/15/16. */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import MarkedLokalita from './MarkedLokalita'
import MyDraggable from '../lib/MyDraggable'
import { markPotencialniNepiop } from './markUtils'
import '../lib/Tabulka.styl'

export default class ZarizeniInfo extends React.Component {
  static propTypes = {
    zarizeni: PropTypes.object.isRequired
  };

  static defaultProps = {
    zarizeni: { umisteni: { lokalita: {} } }
  };

  render() {
    const { zarizeni } = this.props
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
        {
          // zarizeni.umisteni.lokalita && zarizeni.umisteni.lokalita.ixlok > 0 ?
          <div className="myTableRow">
            <div className="myTableRowItem uFlexGrow-1">Umístění:</div>
            <div className="myTableRowItem uFlexGrow-4">
              <MarkedLokalita lokalita={zarizeni.umisteni.lokalita} />
            </div>
          </div>
          // : null
        }
      </div>
    )
  }
}
