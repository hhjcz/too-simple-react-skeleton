/** Created by hhj on 20.12.15. */
import rest from '../app/rest'
import createTableActions from 'react-lib/lib/tabulka/actionCreatorsFor'

module.exports = {
  ...createTableActions('LOKALITA_LIST'),
  ...rest.actions.lokalita,
}
