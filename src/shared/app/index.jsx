/** Created by hhj on 12/23/15. */
import React, { PropTypes } from 'react'

import Navigation from './Navigation'

export default class App extends React.Component {

  static propTypes = {
    children: PropTypes.object
  };


  render() {
    let devTools = ''
    // defined in webpack configuration or node runtime environment
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('./DevTools').default
      devTools = <DevTools />
    }

    return (
      <div id="app-view" className="container-fluid">
        <Navigation />

        {this.props.children}

        <hr />

        <div>hhj - based on
          <a href="https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4#.dyjo0n2px">
            tutorial
          </a>
        </div>
        {
          devTools
        }
      </div>
    )
  }
}
