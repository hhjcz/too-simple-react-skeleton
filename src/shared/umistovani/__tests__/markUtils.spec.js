/** Created by hhj on 4/22/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import * as markUtils from '../markUtils'

describe('umistovani markUtils', () => {

  it('should mark nepi op', () => {
    markUtils.markPotencialniNepiop('neco 123456 neco2 98765neco3')
    markUtils.markPotencialniNepiop('123456')
    markUtils.markPotencialniNepiop(123456)
    markUtils.markPotencialniNepiop('neco SA-3456 neco2')
    markUtils.markPotencialniNepiop('neco ETH3456 neco29876')
  })

})
