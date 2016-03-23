/** Created by hhj on 12/18/15. */
import { Record } from 'immutable'
import { UmisteniFactory } from './Umisteni'

export const Zarizeni = Record({
  id: 0,
  name: '',
  infoName: '',
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
  umisteni: UmisteniFactory(),
  // lokalitaHint: '',
})

export default Zarizeni

export function ZarizeniFactory(zarizeniObj = {}) {
  return new Zarizeni({
    ...(zarizeniObj.toObject ? zarizeniObj.toObject() : zarizeniObj),
    infoName: zarizeniObj.infoName || (zarizeniObj.netvisionZarizeni ? zarizeniObj.netvisionZarizeni.infoName : ''),
    defaultmap: zarizeniObj.netvisionZarizeni ? zarizeniObj.netvisionZarizeni.defaultmap : '',
    umisteni: UmisteniFactory(zarizeniObj.umisteni)
  })
}
