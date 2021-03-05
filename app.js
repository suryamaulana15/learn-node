const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // console.log(req.url, req.method, req.headers);
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
      fs.writeFileSync('message.txt', message);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    });
     /*
     * di eksekusi setelah tidak ada perubahan,
     * menyebabkan insialisasi (res.(namaVariabel)) tidak dapat di jalankan
     * harus menggunakan return agar end langsung dijalankan tetapi akan memblok fungsi yg seharusnya dijalankan
     * */
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Learn react</title></head>');
  res.write('<body>Create Html</body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);