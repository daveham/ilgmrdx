import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavbarBrand from 'react-bootstrap/lib/NavbarBrand';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

export default (props) => {
  return (
    <Navbar>
      <Nav>
        <NavbarBrand>
          InferenceLens
        </NavbarBrand>
        <IndexLinkContainer to='/'>
          <NavItem>Home</NavItem>
        </IndexLinkContainer>
        <LinkContainer to='/catalog'>
          <NavItem>Catalog</NavItem>
        </LinkContainer>
        <LinkContainer to='/counter'>
          <NavItem>Counter</NavItem>
        </LinkContainer>
        <LinkContainer to='/about'>
          <NavItem>About</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
};
