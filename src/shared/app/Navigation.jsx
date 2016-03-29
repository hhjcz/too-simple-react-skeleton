/** Created by hhj on 1/12/16. */
import React from 'react'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavbarBrand } from 'react-bootstrap'
import MyIcon from '../lib/MyIcon'

export default class Navigation extends React.Component {
  static propTypes = {};

  render() {
    return (
      <Navbar>
        <Navbar.Collapse>
          <Nav bsStyle="pills">
            <NavbarBrand>Dohlestr ({process.env.NODE_ENV})</NavbarBrand>
            <IndexLinkContainer to="/">
              <NavItem><MyIcon color="grey">home</MyIcon></NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/zarizeni"><NavItem>Seznam</NavItem></LinkContainer>
            <LinkContainer to="/umistovani"><NavItem>Umísťovaní</NavItem></LinkContainer>
            <LinkContainer to="/hriste"><NavItem>Hřiště</NavItem></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
