const express = require('express');
const fs = require('fs');
const readline = require('readline');

const app = express();
const PORT = 8080;

app.get('/data', (req, res) => {
  const { n, m } = req.query;
  const filePath = `/tmp/data/${n}.txt`;

  console.log('Request URL:', req.url);
  console.log('Query Parameters:', queryObject);


  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  if (m) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let lineNumber = 0;
    rl.on('line', (line) => {
      lineNumber++;
      if (lineNumber === parseInt(m)) {
        rl.close();
        res.send(line);
      }
    });

    rl.on('close', () => {
      res.status(404).send('Line not found');
    });
  } else {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Internal Server Error');
      } else {
        res.send(data);
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
