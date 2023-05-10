const http = require('http');

//const hostname = 'localhost';
const hostname = '192.168.222.134';
const port = 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end("ooooppppssssseeee!\nthis site can't be reach now,\nplease try again later. Thanks\nThis server is running on port 5000\n");

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
