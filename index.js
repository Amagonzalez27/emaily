const express = require('express');
// a running express application
// app will listen to incoming request and route request to different handlers
const app = express();
app.get('/', (req, res) => {
  res.send({ bye: 'buddy' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
