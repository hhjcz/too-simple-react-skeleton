/** Created by hhj on 12/23/15. */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import DevTools from './DevTools.jsx'

export default class App extends React.Component {

  static propTypes = {
    children: PropTypes.object
  }


  render() {
    return (
      <div id="app-view" className="container-fluid">
        <h1>Dohlestr</h1>
        <Link to="/">Home</Link>
        <Link to="/zarizeni">List</Link>

        <hr />

        {this.props.children}

        <hr />

        <div>hhj - based on
          <a href="https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4#.dyjo0n2px">
            tutorial
          </a>
        </div>
        {
          // defined in webpack configuration or node runtime environment
          (process.env.NODE_ENV !== 'production') ? <DevTools /> : null
        }
      </div>
    )
  }
}
