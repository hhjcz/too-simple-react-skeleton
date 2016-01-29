/** Created by hhj on 1/29/16. */
import { expect } from 'chai'
import { getActionBasename, actionPrefix } from '../utils'

describe('fetch utils', () => {

  it('should generate action prefix', () => {
    expect(getActionBasename('camelCaseName')).to.equal(`${actionPrefix}/CAMEL_CASE_NAME`)
    expect(getActionBasename('CamelCaseName')).to.equal(`${actionPrefix}/CAMEL_CASE_NAME`)
  })
})
