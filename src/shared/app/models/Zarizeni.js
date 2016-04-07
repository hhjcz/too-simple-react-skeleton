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
  previousNetvisionName: '',
  previousNetvisionIpAddress: '',
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
  const netvisionInfoName = zarizeniObj.netvisionZarizeni ? zarizeniObj.netvisionZarizeni.infoName : '' // eslint-disable-line max-len
  return new Zarizeni({
    ...(zarizeniObj.toObject ? zarizeniObj.toObject() : zarizeniObj),
    infoName: zarizeniObj.infoName || netvisionInfoName,
    defaultmap: zarizeniObj.netvisionZarizeni ? zarizeniObj.netvisionZarizeni.defaultmap : '',
    umisteni: UmisteniFactory(zarizeniObj.umisteni)
  })
}
