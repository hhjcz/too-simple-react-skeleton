/** Created by hhj on 2/3/16. */

export function actionCreatorsFor(actionTypes) {
  const actionCreators = Object.keys(actionTypes).reduce((result, key) => {
    if (key.indexOf('@') > -1 || key.indexOf('_') > -1) return result
    const creator = args => ({
      type: actionTypes[key],
      ...args
    })
    /* eslint-disable no-param-reassign */
    result[key] = creator

    return result
  }, {})

  return actionCreators
}

export default actionCreatorsFor
