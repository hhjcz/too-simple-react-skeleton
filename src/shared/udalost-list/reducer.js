/** Created by hhj on 20.12.15. */
import defaultColumns from './defaultColumns'
import createTableReducer from '../lib/tabulka/createReducer'

const reducer = createTableReducer('UDALOST_LIST', defaultColumns)

export default reducer
