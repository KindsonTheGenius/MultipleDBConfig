const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('dist'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = 8111;
app.listen(port, () => console.log(`Server listening on port ${port}!`));
