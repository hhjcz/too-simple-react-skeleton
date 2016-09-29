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
  const netvisionZarizeni = zarizeniObj.netvisionZarizeni || {}
  const orionZarizeni = zarizeniObj.orionZarizeni || {}
  const name = netvisionZarizeni.name || orionZarizeni.name || ''
  const infoName = netvisionZarizeni.infoName || orionZarizeni.infoName || ''

  return new Zarizeni({
    ...(zarizeniObj.toObject ? zarizeniObj.toObject() : zarizeniObj),
    name: zarizeniObj.name || name,
    infoName: zarizeniObj.infoName || infoName,
    netvisionZarizeni,
    orionZarizeni,
    defaultmap: zarizeniObj.netvisionZarizeni ? zarizeniObj.netvisionZarizeni.defaultmap : '',
    umisteni: UmisteniFactory(zarizeniObj.umisteni)
  })
}
