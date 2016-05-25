/** Created by hhj on 1/29/16. */
import uniqBy from 'lodash/uniqBy'
import myRest from '../lib/rest/index'
import createFetch from '../lib/rest/createFetch'
import { ZarizeniFactory } from './models/Zarizeni'
import { UmisteniFactory } from './models/Umisteni'
import { Lokalita } from './models/Lokalita'
import { Sort } from './models/Sort'
import { Pagination } from './models/Pagination'

export { getSubState, getItem, getItems } from '../lib/rest'

const serverBaseUrl = process.env.SERVER_BASE_URL
  || (process.env.IS_BROWSER ? window.SERVER_BASE_URL : null)
  || 'http://localhost:8089/api'

const rest = myRest({
  zarizeni: {
    url: '/zarizeni/:id',
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
  akrloks: {
    url: '/lokalita/:id',
    // itemTransformer: item => (item.akrlok ? item.akrlok.toLowerCase() : ''),
    collectionTransformer: collection => uniqBy((collection || []), item => item.akrlok),
    itemTransformer: item => new Lokalita(item),
    extraParams: { fields: 'akrlok,obec', 'akrlok-not': null, sort: 'obec' },
    defaultState: { pagination: new Pagination({ perPage: 10000000 }) },
    idField: 'akrlok'
  },
  testEndpoint: {
    url: '/test/:id'
  }
}).use('fetch', createFetch(serverBaseUrl))

export default rest

// export const actions = rest.actions
// export const reducers = rest.reducers
