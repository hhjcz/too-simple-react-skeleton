/** Created by hhj on 1/14/16. */

/**
 * Usage:
 *   debounce.call(this, fn, delay)
 * or
 *   debounce(fn, delay, this)
 * or
 *   debounce(fn, delay).bind(this)
 *
 * @param fn Function to be debounced
 * @param delay
 * @param _context
 * @returns {debounced} Debounced function as promise
 */
export default function debounce(fn, delay, __context) {
  let timeout
  const _context = __context || this

  const debounced = function(...args) {
    const context = _context || this
    clearTimeout(timeout)
    return new Promise(resolve => {
      timeout = setTimeout(() => {
        resolve(fn.apply(context, args))
      }, delay)
    })
  }

  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}
