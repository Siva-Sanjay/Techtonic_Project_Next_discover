import http from 'http';

const data = JSON.stringify({
  name: "Mental Resilience",
  description: "test trend"
});

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/evaluate-trend',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('BODY:', body.substring(0, 1000));
  });
});

req.on('error', error => {
  console.error('ERROR:', error);
});

req.write(data);
req.end();
