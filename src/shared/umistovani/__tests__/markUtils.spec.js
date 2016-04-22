/** Created by hhj on 4/22/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import * as markUtils from '../markUtils'

describe.only('umistovani markUtils', () => {

  it('should mark nepi op', () => {
    markUtils.markPotencialniNepiop('neco 123456 neco2 98765neco3')
  })

})
