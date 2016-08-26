/** Created by hhj on 20.12.15. */
import { createReducer as createTableReducer } from '@hhjcz/react-lib/lib/tabulka'
import defaultColumns from './defaultColumns'

const reducer = createTableReducer('CP2TYPE_LIST', defaultColumns)

export default reducer
