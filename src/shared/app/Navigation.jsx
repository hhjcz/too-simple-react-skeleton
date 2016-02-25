/** Created by hhj on 1/12/16. */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, NavbarBrand } from 'react-bootstrap'

export default class Navigation extends React.Component {
  static propTypes = {};

  render() {
    return (
      <Navbar inverse>
        <Navbar.Collapse>
          <Nav bsStyle="pills">
            <NavbarBrand>Dohlestr ({process.env.NODE_ENV})</NavbarBrand>
            <NavItem eventKet={1}><Link to="/">Home</Link></NavItem>
            <NavItem eventKet={2}><Link to="/zarizeni">List</Link></NavItem>
            <NavItem eventKet={3}><Link to="/umistovani/1">Umistovani</Link></NavItem>
            <NavItem eventKet={4}><Link to="/hriste">Hriste</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
