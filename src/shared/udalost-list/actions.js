/** Created by hhj on 20.12.15. */
import createTableActions from 'react-lib/lib/tabulka/actionCreatorsFor'
import rest from '../app/rest'

module.exports = {
  ...createTableActions('UDALOST_LIST'),
  ...rest.actions,
}
