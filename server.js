//引入http模块
let url = require('url');
let fs = require('fs'); 
var http = require('http');
//设置主机名
var hostName = '176.122.178.23';
//设置端口
var port = 2019;
//创建服务
// var server = http.createServer(function(req, res) {
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('hello nodejs');
// });

let server = http.createServer((req, res) => {
  var pathname = url.parse(req.url).pathname; //获取url的pathname (/index.html)
  console.log('file:' + pathname.substring(1)); //将‘/’去掉
  fs.readFile(pathname.substring(1), function(err, data) {
    //fs模块加载文件
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/html'
      });
    } else {
      if (pathname.substring(1) == 'setservercookie.html') {
        res.writeHead(200, {
          'Set-Cookie': 'this is server set-cookie : ' + new Date(),
          'Content-Type': 'text/html'
        });
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
      }
      res.write(data.toString());
    }
    res.end();
  });
});
server.listen(port, hostName, function() {
  console.log(`服务器运行在http://${hostName}:${port}`);
});
