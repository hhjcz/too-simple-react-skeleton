/** Created by hhj on 12/17/15. */
import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import spies from 'chai-spies'

chai.use(chaiImmutable)
chai.use(spies)

// ignore import and require of these extensions on server (in node; deprecated but still functional):
const ignoreRequireExtensions = ['.scss', '.sass', '.css', '.styl']
ignoreRequireExtensions.forEach((ext) => {
  require.extensions[ext] = () => {
  }
})
