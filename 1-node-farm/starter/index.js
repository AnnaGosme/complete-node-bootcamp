const fs = require('fs');
const http = require('http');
const url = require('url');

///////////
// READING FILES
//Blocking, synchronous
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}.`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File has been written');

//Non-blocking, async
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('Error');
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2); // 2
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3); // 2

//       fs.writeFile('./text/final.txt',`${data2}\n${data3}`, 'utf-8', (err) => {
//         console.log('your file has been written')
//       })
//     });
//   });
// });
// console.log('Will read file'); // 1
////////////////

///////////
// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((request, response) => {
  const pathName = request.url;

  if (pathName === '/' || pathName === '/overview') {
    response.end('This is the overview');
  } else if (pathName === '/product') {
    response.end('This is the product');
  } else if (pathName === '/api') {
    response.writeHead(200, { 'Content-type': 'application/json' });
    response.end(data);
  } else {
    response.writeHead(404, {
      'Content-type': 'text/html',
      'custom-header': 'custom-header',
    });
    response.end('<h1>Page not found<h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});
