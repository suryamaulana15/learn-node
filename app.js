const http = require('http');

const server = http.createServer((req, res) => {
  // console.log(req.url, req.method, req.headers);
  const url = req.url;
  if(url === '/'){
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="post"> <input type="text" name="message"/><button type="submit">submit</button> </form></body>');
    res.write('</html>');
    return res.end();
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Learn react</title></head>');
  res.write('<body>Create Html</body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);