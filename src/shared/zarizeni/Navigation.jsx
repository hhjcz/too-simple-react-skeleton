/** Created by hhj on 1/12/16. */
/* eslint-disable react/no-multi-comp */
import React, { PropTypes } from 'react'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
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
  static propTypes = {
    zarizeniId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };

  render() {
    const { zarizeniId } = this.props

    return (
      <Navbar>
        <Navbar.Collapse>
          <Nav bsStyle="tabs">
            <IndexLinkContainer to={`/zarizeni/${zarizeniId}`}>
              <NavItem title="Info">
                <ColoredIcon>info</ColoredIcon>
              </NavItem>
            </IndexLinkContainer>
            <LinkContainer to={`/zarizeni/${zarizeniId}/umistovani`}>
              <NavItem title="Umísťování">
                <ColoredIcon>place</ColoredIcon>
              </NavItem>
            </LinkContainer>
            <LinkContainer to={`/zarizeni/${zarizeniId}/port`}>
              <NavItem title="Porty">
                <ColoredIcon>usb</ColoredIcon>
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
