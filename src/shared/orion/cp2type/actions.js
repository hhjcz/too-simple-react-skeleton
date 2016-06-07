/** Created by hhj on 20.12.15. */
import rest from '../../app/rest'
import createTableActions from '../../lib/tabulka/actionCreatorsFor'

module.exports = {
  ...createTableActions('CP2TYPE_LIST'),
  ...rest.actions,
}
