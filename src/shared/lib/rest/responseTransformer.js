/** Created by hhj on 2/2/16. */
import { camelize, camelizeKeys } from 'humps'

function collection(response) {
  const camelized = camelizeKeys(response)
  const normalizedResponse = {
    data: camelized.data || [],
    meta: camelized.meta || {}
  }
  if (normalizedResponse.meta.sort) {
    normalizedResponse.meta.sort = {
      dir: normalizedResponse.meta.sort.indexOf('-') > -1,
      by: camelize(normalizedResponse.meta.sort || '')
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
  const camelized = camelizeKeys(response)
  const normalizedResponse = {
    data: camelized,
    meta: camelized.meta || {}
  }

  return normalizedResponse
}

const responseTransformer = {
  collection,
  item
}

export default responseTransformer
