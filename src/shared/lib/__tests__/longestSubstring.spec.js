/** Created by hhj on 2/16/16. */
import { expect } from 'chai'

import { find, mark } from '../longestSubstring'

describe('lib longestSubstring', () => {

  it('should find longest substring', () => {
    const common = find('slananynka do zeli', '____nany____')
    expect(common.sequence).to.equal('nany')
    expect(common.offset1).to.equal(3)
    expect(common.offset2).to.equal(4)
    expect(common.length).to.equal(4)
    expect(common.length2).to.equal(4)
    expect(common.length2).to.equal(4)
  })

  it('should mark substring', () => {
    const marked = mark('123_slovo 456', '777 jine_slovo 888')
    expect(marked.marked1).to.equal('123<b>_slovo</b> 456')
    expect(marked.marked2).to.equal('777 jine<b>_slovo</b> 888')
  })

})
