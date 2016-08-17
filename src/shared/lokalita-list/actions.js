/** Created by hhj on 20.12.15. */
import createTableActions from 'react-lib/lib/tabulka/actionCreatorsFor'
import rest from '../app/rest'

module.exports = {
  ...createTableActions('LOKALITA_LIST'),
  ...rest.actions.lokalita,
}
