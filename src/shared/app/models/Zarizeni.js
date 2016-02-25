/** Created by hhj on 12/18/15. */
import { Record } from 'immutable'

export const Zarizeni = Record({
  id: 0,
  name: '',
  ipAddress: '',
  createdAt: '',
  updatedAt: '',
  deletedAt: '',
  defaultmap: '',
  netvisionZarizeni: {
    id: 0,
    name: '',
    ipAddress: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
    defaultmap: '',
  },
  orionZarizeni: {
    id: 0,
    name: '',
    ipAddress: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
  },
  // lokalitaHint: '',
})

export default Zarizeni

export function ZarizeniFactory(zarizeniObj = {}) {
  return new Zarizeni({
    ...(zarizeniObj.toObject ? zarizeniObj.toObject() : zarizeniObj),
    defaultmap: zarizeniObj.netvisionZarizeni ? zarizeniObj.netvisionZarizeni.defaultmap : ''
  })
}
