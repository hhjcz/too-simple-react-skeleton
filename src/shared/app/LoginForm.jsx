/** Created by hhj on 7/13/16. */
import React, { PropTypes } from 'react'

export default class LoginForm extends React.Component {
  static propTypes = {};

  static defaultProps = {};

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
                      <input type="email" className="form-control" name="email" ng-model="email" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-md-4 control-label">Password</label>

                    <div className="col-md-6">
                      <input type="password" className="form-control" name="password" ng-model="password" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-6 col-md-offset-4">
                      <span className="btn btn-primary" style={{ marginRight: '15px' }} ng-click="login()">
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
