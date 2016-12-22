import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import debugLib from 'debug';
const debug = debugLib('app:Toolbar');

export const Toolbar = () => {
  debug('render');
  return (
    <Navbar>
      <Nav>
        <Navbar.Brand>
          <a href='#'>InferenceLens</a>
        </Navbar.Brand>
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

export default Toolbar;