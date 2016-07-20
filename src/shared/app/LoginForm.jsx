/** Created by hhj on 7/13/16. */
import React, { PropTypes } from 'react'

export default class LoginForm extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  static defaultProps = {};

  constructor(props) {
    super(props)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.state = { email: '', password: '' }
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  handleLogin() {
    this.props.login(this.state.email, this.state.password)
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="panel panel-default">
              <div className="panel-heading">Login</div>
              <div className="panel-body">
                <form className="form-horizontal" role="form" method="POST" action="/auth/login">
                  <input type="hidden" name="_token" value="{{ csrf_token() }}" />

                  <div className="form-group">
                    <label className="col-md-4 control-label">E-Mail Address</label>

                    <div className="col-md-6">
                      <input
                        type="email" className="form-control"
                        value={this.state.email}
                        onChange={this.onEmailChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-md-4 control-label">Password</label>

                    <div className="col-md-6">
                      <input
                        type="password" className="form-control"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-6 col-md-offset-4">
                      <span className="btn btn-primary" style={{ marginRight: '15px' }} onClick={this.handleLogin}>
                        Login
                      </span>

                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
