const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const fileName = queryObject.n;
    const lineNumber = queryObject.m;

    console.log('Request URL:', req.url);
    console.log('Query Parameters:', queryObject);

    console.log('File Name:', fileName);

    if (!fileName) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('File name not provided');
        return;
    }

    const filePath = `./tmp/data/${fileName}.txt`;
    console.log('File Path:', filePath);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }

        console.log('File Content:', data);

        if (!lineNumber) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        } else {
            const lines = data.split('\n');
            console.log(lines.length)
            if (lineNumber <= lines.length) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(lines[lineNumber - 1]);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Line not found');
            }
        }
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
