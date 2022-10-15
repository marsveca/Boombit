import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,

} from 'reactstrap';

export function Menu(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  

  return (
    <div>
      <Navbar color="light" light expand="xs">
        <NavbarBrand href="/">Boombit</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse horizontal={false} isOpen={isOpen} navbar>
          <Nav className="" navbar>
            <NavItem>
              <NavLink href="/usuarios/">Usuarios</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/actividades/">Actividades</NavLink>
            </NavItem>
            
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
