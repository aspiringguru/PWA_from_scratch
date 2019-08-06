var express = require('express')
var fs = require('fs')
var https = require('https')
var app = express()
app.use(express.static('./'));

app.get('/hello', function (req, res) {
  res.send('hello world')
})

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(4433, function () {
  console.log('Example app listening on port 3000! Go to https://localhost:3000/')
})
