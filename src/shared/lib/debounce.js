/** Created by hhj on 1/14/16. */

export default function debounce(fn, delay) {
  let timeout

  const debounced = function(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }

  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}
