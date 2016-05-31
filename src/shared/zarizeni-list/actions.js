/** Created by hhj on 20.12.15. */
import rest from '../app/rest'
import createTableActions from '../lib/tabulka/actionCreatorsFor'

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
