const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  return res.send('hello ghg');
});

app.use('', require('./routes/movies'));
app.use('/auth', require('./routes/auth'));

app.listen(8080, () => {
  console.log('Now listening on port 8080');
});
