/** Created by hhj on 1/29/16. */
import { List, Map } from 'immutable'

export const getSubState = endpointName => getState => {
  const state = (typeof getState === 'function') ? getState() : getState
  let subState = state.resources[endpointName]
  if (subState.toObject) subState = subState.toObject()
  return subState
}

export const getItems = (resource = {}) => {
  const entities = resource.entities || Map() // && resource.entities.toObject ? resource.entities.toObject() : resource.entities
  const items = (resource.items || List()).map(item => entities.get(`${item}`))

  return items
}

export const getItem = (resource = {}) => {
  // if (!resource.item) return {}
  const entities = resource.entities || Map() // && resource.entities.toObject ? resource.entities.toObject() : resource.entities

  return entities.get(`${resource.item}`) || {}
}
