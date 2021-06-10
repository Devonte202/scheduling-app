import { useEffect, useState } from 'react';
import axios from 'axios';
import { Advertisement } from 'semantic-ui-react';
import { Jumbotron, Container, Nav, Navbar, Form, Button, FormControl } from 'react-bootstrap';

function App() {
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    const verifyConnection = async () => {
      try {
        const response = await axios.get('/api/checkConnection');
        setApiMessage(response.data.message);
      } catch (error) {
        console.error(error);
      }
    }
    verifyConnection();
  }, []);

  return (
    <div className="App">
      <Navbar style={{height: '70px'}} bg="light" expand="lg">
        <Navbar.Brand href="#home">Skedulrr</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#about">About Us</Nav.Link>
            <Nav.Link href="#plans">Plans</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Jumbotron style={{height: '575px', backgroundPosition: 'center', backgroundImage: 'url("https://assets-global.website-files.com/5a690960b80baa0001e05b0f/5ca4b074e9c52631fc36f901_Schedule-Time.png")'}} fluid>
        <Container>
        <h1>{apiMessage}</h1>
          <p>
            This is meant to be the landing page. Soon we'll abstract this to its own component. This is just proof of concept
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default App;
