/** Created by hhj on 12/23/15. */
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Navigation from './Navigation'
import LoginForm from './LoginForm'
import rest from './rest'

export class App extends React.Component {

  static propTypes = {
    children: PropTypes.object,
    isAuthenticationRequired: PropTypes.bool,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
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

    const content = this.props.isAuthenticationRequired ? <LoginForm login={this.props.login} /> : this.props.children

    return (
      <div id="app-view" className="container-fluid">
        <Navigation logout={this.props.logout} />

        {content}

        <hr />

        <div>hhj 2016</div>

        {devTools}
      </div>
    )
  }
}

export default connect(
  state => ({ isAuthenticationRequired: state.resources.auth.isAuthenticationRequired }),
  dispatch => bindActionCreators(rest.actions.auth, dispatch)
)(App)
