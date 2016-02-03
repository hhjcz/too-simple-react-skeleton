/** Created by hhj on 1/28/16. */
import humps from 'humps'

function parseFilters(filters) {

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

function collection(state) {
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

function item(state) {
  return ''
}

const queryGenerator = {
  collection,
  item,
}

export default queryGenerator
