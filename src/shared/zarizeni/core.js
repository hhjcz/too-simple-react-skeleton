/** Created by hhj on 12/18/15. */
import { Record } from 'immutable'

export const Zarizeni = Record({
  id: 1,
  name: '',
  ipAddress: '',
  createdAt: '',
  updatedAt: '',
  deletedAt: '',
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
