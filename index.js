const express = require('express');
const path = require('path')
const db = require("./database/db");
// Create the server
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html


// Serve our base route that returns a message
app.get('/api/checkConnection', async (req, res) => {
  try {
    const testMessage = 'Welcome to Skedulrr';
    res.status(200).json({message: testMessage});
  } catch (err) {
    console.log(err);
  }
})

app.get('/api/testDBConnection', (req, res) => {
  const queryText = 'SELECT * FROM test_table;';
        db.query(queryText).then(results => {res.json({query: results.rows[0]})});
})

// Serves Frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})


app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`)
})