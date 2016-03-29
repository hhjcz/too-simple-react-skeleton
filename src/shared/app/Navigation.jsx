/** Created by hhj on 1/12/16. */
import React from 'react'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavbarBrand } from 'react-bootstrap'

export default class Navigation extends React.Component {
  static propTypes = {};

  render() {
    return (
      <Navbar inverse>
        <Navbar.Collapse>
          <Nav bsStyle="pills">
            <NavbarBrand>Dohlestr ({process.env.NODE_ENV})</NavbarBrand>
            <IndexLinkContainer to="/"><NavItem>Home</NavItem></IndexLinkContainer>
            <LinkContainer to="/zarizeni"><NavItem>List</NavItem></LinkContainer>
            <LinkContainer to="/umistovani"><NavItem>Umistovani</NavItem></LinkContainer>
            <LinkContainer to="/hriste"><NavItem>Hriste</NavItem></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
