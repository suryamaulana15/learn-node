const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if(url === '/'){
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="post"> <input type="text" name="message"/><button type="submit">submit</button> </form></body>');
    res.write('</html>');
    return res.end();
  }
  if(url === '/message' && method === 'POST'){
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
    /*
    * mengganti  writeFileSyinc agar program bisa menggunakan asyinc sehingga tidak memblok alur program pada beberapa waktu
    * */
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Learn react</title></head>');
  res.write('<body>Create Html</body>');
  res.write('</html>');
  res.end();
}

// module.exports = requestHandler;

// module.exports = {
//   handler: handlerRequest,
//   someText: 'Some hard coded text'
// }

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';