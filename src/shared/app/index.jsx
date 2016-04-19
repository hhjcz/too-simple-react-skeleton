/** Created by hhj on 12/23/15. */
import React, { PropTypes } from 'react'
import Navigation from './Navigation'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

export default class App extends React.Component {

  static propTypes = {
    children: PropTypes.object
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  static childContextTypes = {
    router: React.PropTypes.object,
    muiTheme: React.PropTypes.object
  };

  getChildContext() {
    return {
      router: this.context.router,
      muiTheme: getMuiTheme()
    }
  }

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

        <div>hhj 2016</div>
        {
          devTools
        }
      </div>
    )
  }
}
