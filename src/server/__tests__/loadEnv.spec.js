/** Created by hhj on 1/26/16. */
import { expect } from 'chai'
import loadEnv from '../loadEnv'

describe('loadEnv', () => {
  it('should handle non existing file', () => {
    const env = loadEnv('non-existing-file')
    expect(env).to.be.empty
  })

  it('should load env from env.json', () => {
    const env = loadEnv('env.json')
    expect(typeof env).to.equal('object')
  })

  it('should merge variables into process.env', () => {
    const env = loadEnv('non-existing', { SOME_VARIABLE: 'SOME_VALUE' })
    expect(env.SOME_VARIABLE).to.equal('SOME_VALUE')
    expect(process.env.SOME_VARIABLE).to.equal('SOME_VALUE')
  })

  it('should prefer defined process.env variables', () => {
    process.env.OTHER_VARIABLE = 'DEFINED_VALUE'
    const env = loadEnv('non-existing', { OTHER_VARIABLE: 'NEW_VALUE' })
    expect(env.OTHER_VARIABLE).to.equal('DEFINED_VALUE')
    expect(process.env.OTHER_VARIABLE).to.equal('DEFINED_VALUE')
  })

})
