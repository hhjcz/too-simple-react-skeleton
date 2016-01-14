/** Created by hhj on 1/14/16. */

/**
 * Usage:
 *   debounce.call(this, fn, delay)
 * or
 *   debounce(fn, delay, this)
 *
 * @param fn
 * @param delay
 * @param _context
 * @returns {debounced}
 */
export default function debounce(fn, delay, _context) {
  let timeout

  const debounced = function(...args) {
    const context = _context || this
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }

  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}
