/** Created by hhj on 1/29/16. */
import uniqBy from 'lodash/uniqBy'
import createRest, { createFetch, Pagination, Sort } from '@hhjcz/redux-rest'
import { ZarizeniFactory } from './models/Zarizeni'
import { UmisteniFactory } from './models/Umisteni'
import { Lokalita } from './models/Lokalita'
import { NepiOp } from './models/NepiOp'
import { Udalost } from './models/Udalost'
import { Cp2Type } from './models/Cp2Type'
import errorHandler from '../lib/myErrorHandler'

export const RESOURCES_ROOT_TREE = 'resources'

export { selectItem, selectItems, selectIdAtCursor, selectResource } from '@hhjcz/redux-rest'

const serverBaseUrl = process.env.SERVER_BASE_URL
  || (process.env.IS_BROWSER ? window.SERVER_BASE_URL : null)
  || 'http://localhost:8089/api'

const depsContainer = {
  fetch: createFetch(serverBaseUrl),
  errorHandler,
}

const rest = createRest(
  {
    getRootTree: (state) => state[RESOURCES_ROOT_TREE],
    resources: {
      zarizeni: {
        url: '/zarizeni/:id/:nested',
        extraParams: { include: 'umisteni.lokalita' },
        itemTransformer: item => ZarizeniFactory(item),
        defaultState: { sort: new Sort({ dir: true, by: 'createdAt' }) },
        isStaticCollection: true
      },
      portyZarizeni: {
        url: '/zarizeni/:zarizeni_id/netvision/porty'
      },
      previousNetvisionIdentity: {
        url: '/zarizeni/:zarizeni_id/previous_netvision_identity'
      },
      umisteni: {
        url: '/umisteni/:id',
        extraParams: { include: 'lokalita.nepi_opy' },
        itemTransformer: item => UmisteniFactory(item),
        defaultState: { pagination: new Pagination({ perPage: 1000000 }) }
        // itemTransformer: item => item,
      },
      lokalita: {
        url: '/lokalita/:id',
        extraParams: { include: 'nepi_opy_count,umistena_zarizeni_count' },
        itemTransformer: item => new Lokalita(item),
        defaultState: { pagination: new Pagination({ perPage: 10 }) }
      },
      lokalitaForAutocomplete: {
        url: '/lokalita/:id',
        itemTransformer: item => new Lokalita(item),
        defaultState: { pagination: new Pagination({ perPage: 1000 }) }
      },
      zarizeniNaLokalite: {
        url: '/zarizeni/:id',
        itemTransformer: item => ZarizeniFactory(item),
        defaultState: { pagination: new Pagination({ perPage: 10000 }) }
      },
      nepiOpyNaLokalite: {
        url: '/nepi_op/:id',
        itemTransformer: item => new NepiOp(item),
        idField: 'ixop',
        defaultState: { pagination: new Pagination({ perPage: 10000 }) }
      },
      akrloks: {
        url: '/lokalita/:id',
        // itemTransformer: item => (item.akrlok ? item.akrlok.toLowerCase() : ''),
        collectionTransformer: collection => uniqBy((collection || []), item => item.akrlok),
        itemTransformer: item => new Lokalita(item),
        extraParams: { fields: 'akrlok,obec', 'akrlok-not': null, sort: 'obec' },
        defaultState: { pagination: new Pagination({ perPage: 10000000 }) },
        idField: 'akrlok'
      },
      udalost: {
        url: '/udalost/:id',
        itemTransformer: item => new Udalost(item),
        // extraParams: { group: 'data' },
      },
      cp2type: {
        url: '/orion/cp2type/:custom_poller_id/:sys_object_id',
        itemTransformer: item => new Cp2Type(item),
      },
      testEndpoint: {
        url: '/test/:id'
      }
    }
  },
  depsContainer
)

export default rest

