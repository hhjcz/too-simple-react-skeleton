/** Created by hhj on 1/12/16. */
/* eslint-disable react/no-multi-comp */
import React, { PropTypes } from 'react'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, Pagination } from 'react-bootstrap'
import IconButton from 'material-ui/IconButton'
import MyIcon from '../lib/MyIcon'
import '../lib/icons.css'
import colors from '../app/colors'

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
    cursorAt: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onCursorChange: PropTypes.func.isRequired,
    reload: PropTypes.func.isRequired,
  };

  render() {
    const { zarizeniId, cursorAt, total, onCursorChange, reload } = this.props

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
            <IconButton
              tooltip="previous"
              onTouchTap={function() {
                onCursorChange(cursorAt > 1 ? cursorAt - 1 : 1)
              }}
            >
              <MyIcon color={colors.blueGrey600}>arrow_back</MyIcon>
            </IconButton>

            <IconButton tooltip="reload" onTouchTap={function() { reload() }}>
              <MyIcon color={colors.blueGrey800}>autorenew</MyIcon>
            </IconButton>

            <IconButton
              tooltip="next"
              onTouchTap={function() {
                onCursorChange(cursorAt < total ? cursorAt + 1 : cursorAt)
              }}
            >
              <MyIcon color={colors.blueGrey800}>arrow_forward</MyIcon>
            </IconButton>
            <Pagination
              items={total} activePage={cursorAt}
              prev next first last ellipsis bsSize="small" maxButtons={9}
              onSelect={function(eventKey) { onCursorChange(eventKey) }}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
