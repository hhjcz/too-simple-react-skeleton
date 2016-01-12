/** Created by hhj on 1/12/16. */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

export default class Navigation extends React.Component {
  static propTypes = {};

  render() {
    return (
      <Navbar inverse>
        <Navbar.Collapse>
          <Nav bsStyle="tabs">
            <NavItem eventKet={1} href="/"><Link to="/">Home</Link></NavItem>
            <NavItem eventKet={2} href="/zarizeni"><Link to="/zarizeni">List</Link></NavItem>
            <NavItem eventKet={3} href="/hriste"><Link to="/hriste">Hriste</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
