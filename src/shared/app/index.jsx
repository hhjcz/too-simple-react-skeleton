/** Created by hhj on 12/23/15. */
import React, { PropTypes } from 'react'

import Navigation from './Navigation'
import DevTools from './DevTools'

export default class App extends React.Component {

  static propTypes = {
    children: PropTypes.object
  };


  render() {
    return (
      <div id="app-view" className="container-fluid">
        <Navigation />

        {this.props.children}

        <hr />

        <div>hhj - based on <a href="https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4#.dyjo0n2px">
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
