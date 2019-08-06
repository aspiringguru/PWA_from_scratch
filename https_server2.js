const httpsLocalhost = require("https-localhost")
const app = httpsLocalhost()
// app is an express app, do what you usually do with express
const port = 4433
app.listen(port)
app.serve('./')
console.log('Example app listening on port '+port+'! Go to https://localhost:'+port+'/')
