/** Created by hhj on 4/6/16. */
import debounce from '../../lib/debounce'

export const propsHolder = { actions: {} }

export function fetchSeznamAkrloks() {
  const actions = propsHolder.actions
  if (!(actions.akrloks && actions.akrloks.fetchCollection)) return null
  return actions.akrloks.fetchCollection()
}


const fetchSeznamObci = debounce(substring => {
  substring = (substring || '').replace(' ', '').toLowerCase()

  return propsHolder.actions.lokalitaForAutocomplete.fetchCollection({
    params: { 'obec-lk': `${substring}%`, fields: 'obec', page: 1, perPage: 10000 },
  }).then(response => response.data.map(item => ({
    value: item.obec,
    group: ''
  })))
}, 500)


const fetchSeznamUlic = debounce(substring => {
  substring = (substring || '').replace(' ', '').toLowerCase()

  return propsHolder.actions.lokalitaForAutocomplete.fetchCollection({
    params: { 'trimmed_ulice-lk': `${substring}%`, fields: 'ulice', page: 1, perPage: 10000 },
  }).then(response => response.data.map(item => ({
    value: item.ulice,
    group: ''
  })))
}, 500)


export function autoCompleteFactory(fieldName) {
  switch (fieldName) {
    case 'obec':
      return value => {
        if ((value || '').length < 3) return '...alespoň 3 znaky...'
        return fetchSeznamObci(value)
      }

    case 'ulice':
      return value => {
        if ((value || '').length < 3) return '...alespoň 3 znaky...'
        return fetchSeznamUlic(value)
      }

    case 'akrlok':
      return value => propsHolder.akrloks
        .filter(lokalita => lokalita.akrlok.toLowerCase().indexOf(value.toLowerCase()) > -1)
        .map(lokalita => ({ value: lokalita.akrlok, group: lokalita.obec }))
        .toArray()

    default:
      return null
  }
}

