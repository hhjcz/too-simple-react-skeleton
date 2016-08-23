/** Created by hhj on 20.12.15. */
import createTableActions from '@hhjcz/react-lib/lib/tabulka/actionCreatorsFor'
import rest from '../../app/rest'

module.exports = {
  ...module.exports,
  ...createTableActions('CP2TYPE_LIST'),
  ...rest.actions,
}

export function updateCp2Type(customPollerId, sysObjectId, autoAssign = 1) {
  const params = { customPollerId, sysObjectId }
  const body = { autoAssign }
  rest.actions.cp2type.update({ params, body })
    .then(() => rest.actions.cp2type.fetchOne({ params }))
}
