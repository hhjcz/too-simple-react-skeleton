/** Created by hhj on 20.12.15. */
import { actionCreatorsFor as createTableActions } from '@hhjcz/react-lib/lib/tabulka/actionCreatorsFor'
import rest from '../app/rest'

module.exports = {
  ...createTableActions('ZARIZENI_KE_SLOUCENI'),
  ...rest.actions.zarizeniKeSlouceni,
}
