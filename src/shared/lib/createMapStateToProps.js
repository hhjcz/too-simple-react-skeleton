/** Created by hhj on 12/28/15. */

/**
 * @param getSubStateFn Function that selects sub tree from state tree
 *        (e.g. state => state.mySubState)
 */
const createMapStateToProps = getSubStateFn => state => {
  let subState = getSubStateFn(state)
  if (subState.toObject) subState = subState.toObject()

  return subState
}

export default createMapStateToProps
