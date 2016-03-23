/** Created by hhj on 12/17/15. */
import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import chaiAsPromised from 'chai-as-promised'
import spies from 'chai-spies'
import loadEnv from './src/server/loadEnv'

loadEnv()

chai.use(chaiImmutable)
chai.use(spies)
chai.use(chaiAsPromised)
chai.should()

// ignore import and require of these extensions on server (in node; deprecated but still functional):
const ignoreRequireExtensions = ['.scss', '.sass', '.css', '.less', '.styl']
ignoreRequireExtensions.forEach((ext) => {
  require.extensions[ext] = () => {   // eslint-disable-line arrow-body-style
  }
})
