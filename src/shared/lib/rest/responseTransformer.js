/** Created by hhj on 2/2/16. */
import humps from 'humps'
import { normalize, Schema, arrayOf } from 'normalizr'

const zarizeni = new Schema('zarizeni')
const netvisionZarizeni = new Schema('netvisionZarizeni')
const orionZarizeni = new Schema('orionZarizeni')
const umisteni = new Schema('umisteni')
const lokalita = new Schema('lokality')

zarizeni.define({
  netvisionZarizeni,
  orionZarizeni,
  umisteni,
})

umisteni.define({
  lokalita,
})

function collection(response) {
  const camelized = humps.camelizeKeys(response)
  const nresponse = normalize(camelized, {
    data: arrayOf(zarizeni)
  })
  console.log('Normalized response: ', nresponse)
  const normalizedResponse = {
    items: nresponse.result.data || [],
    entities: nresponse.entities || [],
    meta: camelized.meta || {}
  }
  if (normalizedResponse.meta.sort) {
    normalizedResponse.meta.sort = {
      dir: normalizedResponse.meta.sort.indexOf('-') > -1,
      by: humps.camelize(normalizedResponse.meta.sort || '')
    }
  }
  if (normalizedResponse.meta.pagination) {
    normalizedResponse.meta.pagination = {
      ...normalizedResponse.meta.pagination,
      page: normalizedResponse.meta.pagination.currentPage,
    }
  }

  return normalizedResponse
}

function item(response) {
  const camelized = humps.camelizeKeys(response)
  const normalizedResponse = {
    item: camelized,
    meta: camelized.meta || {}
  }

  return normalizedResponse
}

const responseTransformer = {
  collection,
  item
}

export default responseTransformer
