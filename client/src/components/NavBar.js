import { Nav, Navbar } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import logo from './skdr-logo-med.png';

const NavBar = () => {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="Skedulrr logo"
            />
          </Navbar.Brand>
          <h1 style={{color: 'black', marginRight: '30px'}}>Skedulrr</h1>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="#about">About Us</Nav.Link>
                <Nav.Link href="#plans">Plans</Nav.Link>
            </Nav>
            <Button basic color='green'>Sign Up</Button>
            <Button color='grey'>Login</Button>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
}

export default NavBar;
