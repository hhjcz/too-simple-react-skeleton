/**
 * Created by hhj on 12/23/15.
 */

import React from 'react'

export default class AppView extends React.Component {
  render() {
    return (
      <div id="app-view">
        <h1>Dohlestr</h1>

        <hr />

        {this.props.children}
      </div>
    )
  }
}
