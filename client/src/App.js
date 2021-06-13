import { useEffect, useState } from 'react';
import axios from 'axios';
import { Jumbotron, Container } from 'react-bootstrap';
import NavBar from './components/NavBar';

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

  useEffect(() => {
    const verifyDBConnection = async () => {
      try {
        const response = await axios.get('/api/testDBConnection');
        console.log(response.data.query);
      } catch (error) {
        console.error(error);
      }
    }
    verifyDBConnection();
  }, []);

  return (
    <div className="App">
     <NavBar />
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
