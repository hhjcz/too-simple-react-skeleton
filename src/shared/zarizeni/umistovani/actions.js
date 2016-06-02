/** Created by hhj on 3/22/16. */
import rest from '../../app/rest'
import * as zarizeniListActions from '../../zarizeni-list/actions'

const actions = {
  zarizeniList: zarizeniListActions,
  ...rest.actions,
}

export default actions
