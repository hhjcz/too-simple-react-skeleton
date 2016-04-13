/** Created by hhj on 12/28/15. */

/**
 * @param getSubStateFn Function that selects sub tree from state tree
 *        (e.g. state => state.mySubState)
 */
const createMapStateToProps = getSubState => state => {
  let subState = getSubState(state)
  if (subState.toJS) subState = subState.toJS()

  return subState
}

export default createMapStateToProps
