/**
 * Created by hhj on 12/28/15.
 */

const createMapStateToProps = subStateName => state => state[subStateName].toObject()

export default createMapStateToProps

