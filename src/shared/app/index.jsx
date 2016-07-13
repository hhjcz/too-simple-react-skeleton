/** Created by hhj on 12/23/15. */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Navigation from './Navigation'
import LoginForm from './LoginForm'

export class App extends React.Component {

  static propTypes = {
    children: PropTypes.object,
    isAuthenticationRequired: PropTypes.bool,
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

    const content = this.props.isAuthenticationRequired ? <LoginForm /> : this.props.children

    return (
      <div id="app-view" className="container-fluid">
        <Navigation />

        {content}

        <hr />

        <div>hhj 2016</div>

        {devTools}
      </div>
    )
  }
}

export default connect(
  state => ({ isAuthenticationRequired: state.resources.auth.isAuthenticationRequired })
)(App)
