/**
 * Created by hhj on 12/23/15.
 */

import React from 'react'
import {Link} from 'react-router'

export default class AppView extends React.Component {
  render() {
    return (
      <div id="app-view">
        <h1>Dohlestr</h1>
        <Link to="/">Home</Link>
        <Link to="zarizeni-list">List</Link>

        <hr />

        {this.props.children}

        <hr />

        <div>hhj - based on <a href="https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4#.dyjo0n2px">
            tutorial
          </a>
        </div>
      </div>
    )
  }
}
