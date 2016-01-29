/** Created by hhj on 1/28/16. */
import humps from 'humps'

export function normalizeResponse(response) {
  const normalizedResponse = humps.camelizeKeys(response)
  normalizedResponse.data || (normalizedResponse.data = [])
  normalizedResponse.meta || (normalizedResponse.meta = {})
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

export function parseFilters(filters) {

  const apiFilters = filters.map((filter, filterName) => {
    let suffix = '', value = ''
    const comparator = filter.comparator || 'contains'

    if (comparator === 'contains' && filter.value !== null) {
      suffix = '-lk';
      value = `%${filter.value}%`;
    } else if (comparator === 'begins' && filter.value !== null) {
      suffix = '-lk';
      value = `${filter.value}%`;
    } else if (comparator === 'empty' && filter.value === false) {
      suffix = '-not';
      value = '';
    } else if (comparator === 'empty' && filter.value === true) {
      suffix = '-null';
      value = '';
    } else if (filter.value !== null) {
      suffix = '';
      value = filter.value;
    } else return null

    return {
      field: filterName + suffix,
      value: encodeURIComponent(value)
    }
  })

  return apiFilters;
}

export function serializeQueryParams(state) {
  const { pagination, sort, filters } = state
  const { page, perPage } = pagination ? pagination : {};

  let pageString = ''
  if (page > 0) {
    pageString = `?page=${page}`
  }

  let perPageString = ''
  if (perPage > 0) {
    perPageString = `&per_page=${perPage}`
  }

  let sortString = ''
  if (sort && sort.by) {
    sortString = `&_sort=${sort.dir ? '-' : ''}${humps.decamelize(sort.by)}`
  }

  let filtersString = ''
  if (filters && filters.map && filters.size > 0) {
    filtersString = '&' + parseFilters(filters)
        .map(filter => `${filter.field}=${filter.value}`).toArray().join('&')
  }

  return `${pageString}${perPageString}${sortString}${filtersString}`
}

/**
 * @returns {axios.Promise}
 */
export function fetchFromApi({ url, queryParams, dispatch, fetch, fetchCallbacks: { fetchRequested, fetchSuccess, fetchError } }) {

  dispatch(fetchRequested())

  return fetch(`${url}${queryParams}`)
    .then(
      response => {
        if (!response.ok) {
          reportError(`${response.status} ${response.statusText}`)
        }
        return response.json()  // parse json to object
      },
      error => {
        reportError(error)
      })
    .then(
      response => {
        const normalizedResponse = normalizeResponse(response)
        normalizedResponse.meta.queryParams = queryParams
        return dispatch(fetchSuccess(normalizedResponse))
      }
    )

  function reportError(errorMessage) {
    const msg = `Ajaaj, chybka api: ${errorMessage}`
    dispatch(fetchError(msg))
    // throw new Error(msg)
  }

}

export default {
  normalizeResponse,
  parseFilters,
  serializeQueryParams,
  fetchFromApi,
}
