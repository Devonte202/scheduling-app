const express = require('express');
const path = require('path')
// Create the server
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html


app.get('/api', async (req, res) => {
    try {
    const testMessage = 'Server Is Alive';
    res.status(200).send(testMessage);
} catch (err) {
    console.log(err);
  }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
  })
// Serve our base route that returns a message


app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`)
})