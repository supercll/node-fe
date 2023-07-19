const fs = require('fs')
const url = require('url')
const controller = require('./controller')
module.exports = (req, res) => {
  // console.log(req.method)
  if (req.method == 'GET') {
    // console.log(req.url)
    // 请求头传参
    // console.log( url.parse(req.url,true).query.id)
    if (req.url == '/') {
      controller.index(res)
    } else {
      fs.readFile('./banner.png', function (err, data) {
        res.end(data)
      })
    }
  } else if (req.method == 'POST') {
    // 请求体中的
    // console.log('ppp');
    let data = ''
    req.on('data', function (d) {
      // console.log(d);
      data += d
    })
    req.on('end', function () {
      controller.user(require('querystring').parse(data), res)
    })

    res.end()
  }
}
