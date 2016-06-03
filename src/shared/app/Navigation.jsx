/** Created by hhj on 1/12/16. */
/* eslint-disable react/no-multi-comp */
import React, { PropTypes } from 'react'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavbarBrand } from 'react-bootstrap'
import MyIcon from '../lib/MyIcon'
import '../lib/icons.css'

class ColoredIcon extends React.Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return <MyIcon color="grey">{this.props.children}</MyIcon>
  }
}

export default class Navigation extends React.Component {
  static propTypes = {};

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <NavbarBrand>
            {/* <i className="fa fa-music text-success" style={{ fontSize: '1em' }} /> */}
            Dohlestr ({process.env.NODE_ENV})
          </NavbarBrand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav bsStyle="tabs">
            <IndexLinkContainer to="/">
              <NavItem title="Domů">
                <ColoredIcon>home</ColoredIcon>
              </NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/zarizeni">
              <NavItem title="Seznam zařízení">
                <ColoredIcon>devices</ColoredIcon>
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/lokalita">
              <NavItem title="Seznam lokalit">
                <ColoredIcon>place</ColoredIcon>
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/udalost">
              <NavItem title="Události">
                <ColoredIcon>history</ColoredIcon>
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/hriste">
              <NavItem title="Hřiště">
                <ColoredIcon>golf_course</ColoredIcon>
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
