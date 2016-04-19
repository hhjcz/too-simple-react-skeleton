/** Created by hhj on 4/19/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import render from '../render'

describe('server render', () => {
  const req = {
    url: '/'
  }
  const res = {
    status: () => {console.log(arguments)},
    end: () => {console.log(arguments)}
  }

  it('should render html page', () => {
    const html = render(req, res, () => {})
    // console.log(html)
  })

})
