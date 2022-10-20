// mode ketat 
'use strict';

// repository rabbit mq with worker queue https://github.com/Otavioensa/rabbit-workers
// medium tutorial https://medium.com/@otavioguastamacchia/implementing-worker-applications-with-rabbitmq-node-1a8b7ab98e47
import http from 'http';

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');

