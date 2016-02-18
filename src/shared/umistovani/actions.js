/** Created by hhj on 20.12.15. */
import { actions as restActions } from '../app/rest';

const { fetchAll, fetchOne } = restActions.umisteni

module.exports = {
  ...module.exports,
  ...restActions.umisteni,
  fetchAll,
  fetchOne,
}
