const express = require('express')
const app = express()
const port = 5500


app.use(express("public"))

app.get('/SignUp', (req, res) => {
  res.sendFile('public/SignUp.html',{root: __dirname});
})
app.get('/LOGIN', (req, res) => {
  res.sendFile('public/LOGIN.html',{root: __dirname});
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})



