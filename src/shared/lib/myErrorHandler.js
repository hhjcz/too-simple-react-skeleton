/** Created by hhj on 3/22/16. */
import '../../../node_modules/react-redux-toastr/src/less/react-redux-toastr.less'
import { toastr } from 'react-redux-toastr'

export default function myErrorHandler(error) {
  if (!error) return
  const message = error.message || error
  console.error(message)
  toastr.error(message)

  return
}
