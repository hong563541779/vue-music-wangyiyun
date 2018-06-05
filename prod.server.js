//  开发服务
var express = require('express')
var config = require('./config/index')
var app = express()
app.use(express.static('./dist'))

var port = 3000

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log(`server running @ http://localhost: ${port}`)
})
