/** Created by hhj on 20.12.15. */
import { actionCreatorsFor as createTableActions } from '@hhjcz/react-lib/lib/tabulka/actionCreatorsFor'
import rest from '../app/rest'

export const confirmZmenenaIdentita = zarizeni => {
  rest.actions.previousNetvisionIdentity.destroy({
    params: { zarizeni_id: zarizeni.id }
  }).then(() =>
    rest.actions.zarizeni.fetchOne({
      params: { id: zarizeni.id }
    }))
}

module.exports = {
  ...module.exports,
  ...createTableActions('ZARIZENI_LIST'),
  ...rest.actions.zarizeni,
}
