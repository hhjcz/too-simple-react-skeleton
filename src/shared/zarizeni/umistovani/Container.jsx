/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import FetchIndicator from '@hhjcz/react-lib/lib/FetchIndicator'
import { selectors } from '@hhjcz/redux-rest'
import actions from './actions'
import Umistovani from './Umistovani'

export default class Container extends React.Component {

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
    Container.fetchActions.forEach(action => action({ params: this.props.params }))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      Container.fetchActions.forEach(action => action({ params: nextProps.params }))
    }
  }

  render() {
    const { zarizeniResource, umisteniResource, akrloksResource, portyZarizeniResource, actions } = this.props
    const zarizeni = selectors.selectItem(zarizeniResource)
    const seznamUmisteni = selectors.selectItems(umisteniResource)
    const seznamPortu = selectors.selectItems(portyZarizeniResource)
    const akrloks = selectors.selectItems(akrloksResource)

    return (
      <div id="umistovani">
        <div className="row">
          {/* <div className="col col-xs-6"> */}
          {/* <NedavneLokality /> */}
          {/* </div> */}
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

