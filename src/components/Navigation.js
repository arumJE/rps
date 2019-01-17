import React, {Component} from 'react';
import { Navbar, NavDropdown, MenuItem, Nav, NavItem } from 'react-bootstrap';

class Navigation extends Component {
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a className="logo" href="/"><span className="begin-logo">RP</span><span className="end-logo">S</span></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavDropdown eventKey={1} title="Help" id="basic-nav-dropdown">
                <MenuItem href="/contact" className="menuitem" eventKey={1.1}>Contact</MenuItem>
                <MenuItem divider />
              </NavDropdown>
              {this.props.authenticated
                ? (<Nav pullRight>
                    <NavItem eventKey={2} href="/dashboards">Dashboards</NavItem>
                    <NavItem eventKey={2} href="/logout">Logout</NavItem>
                  </Nav>)
                : (<Nav pullRight>
                    <NavItem eventKey={2} href="/login">Login</NavItem>
                  </Nav>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
