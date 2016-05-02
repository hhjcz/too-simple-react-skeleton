/** Created by hhj on 4/19/16. */
/* eslint-disable no-unused-expressions,no-unused-vars */
import { expect } from 'chai'
import render from '../render'

describe('server render', () => {
  const req = {
    url: '/'
  }
  const res = {
    status: () => { console.log(arguments) },
    end: () => { console.log(arguments) }
  }

  it('should render html page', () => {
    render(req, res, () => {})
    // console.log(html)
  })

})
