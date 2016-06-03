/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import createMapStateToProps from '../../lib/createMapStateToProps'
import createMapDispatchToProps from '../../lib/createMapDispatchToProps'
import { getItems, getItem } from '../../app/rest'
import actions from './actions'
import NedavneLokality from './NedavneLokality'
import Umistovani from './Umistovani'
import FetchIndicator from '../../lib/FetchIndicator'

export class Container extends React.Component {

  static propTypes = {
    zarizeniResource: PropTypes.object,
    umisteniResource: PropTypes.object,
    portyZarizeniResource: PropTypes.object,
    akrloksResource: PropTypes.object,
    params: PropTypes.object,
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    zarizeniResource: { pagination: {} },
    portyZarizeniResource: {},
    umisteniResource: {},
    akrloksResource: {},
    params: {},
  };

  // server and client side fetch actions (see render.jsx & componentDidMount):
  static get fetchActions() {
    return [Container.fetchZarizeni]
  }

  static fetchZarizeni({ params }) {
    const zarizeniId = parseInt(params.id)

    return actions.zarizeni.fetchOne({ params: { id: zarizeniId } })
      .then(() => Promise.all([
        actions.umisteni.fetchCollection({ params: { zarizeniId } }),
        actions.portyZarizeni.fetchCollection({ params: { zarizeniId } })
      ]))
  }

  componentDidMount() {
    // browser fetching:
    Container.fetchActions.forEach(action => action({
      params: { cursorAt: this.props.zarizeniResource.pagination.cursorAt, ...this.props.params },
      dispatch: this.props.dispatch,
    }))
  }

  render() {
    const self = this
    const { zarizeniResource, umisteniResource, akrloksResource, portyZarizeniResource, actions } = this.props
    const zarizeni = getItem(zarizeniResource)
    const seznamUmisteni = getItems(umisteniResource)
    const seznamPortu = getItems(portyZarizeniResource)
    const akrloks = getItems(akrloksResource)

    return (
      <div id="umistovani">
        <div className="row">
          <div className="col col-xs-6">
          </div>
          <div className="col col-xs-6">
            <NedavneLokality />
          </div>
        </div>
        <Umistovani
          zarizeni={zarizeni} seznamUmisteni={seznamUmisteni} seznamPortu={seznamPortu} akrloks={akrloks}
          fetching={zarizeniResource.fetching || umisteniResource.fetching}
          actions={{ ...actions, reload: () => Container.fetchZarizeni({ params: { id: zarizeni.id } }) }}
        />
        <FetchIndicator fetching={zarizeniResource.fetching || umisteniResource.fetching} />
      </div>
    )
  }
}

export default connect(
  createMapStateToProps(state => ({
    zarizeniResource: state.resources.zarizeni,
    portyZarizeniResource: state.resources.portyZarizeni,
    umisteniResource: state.resources.umisteni,
    akrloksResource: state.resources.akrloks
  })),
  createMapDispatchToProps(actions)
)(Container)
