const fs = require('fs')
const path = require('path')
const roomRouter = require('./room')
const userRouter = require('./user')
const loginRouter = require('./login')
const signupRouter = require('./signup')
const roomGameRouter = require('./room-game')

const publicPath = path.join(__dirname, '../public')

//PÁGINA DONDE SE ENCUENTRAN TODAS LAS RUTAS//

const router = (req, res) => {
  const url = req.url
  if (isUserRoute(url)) {
    userRouter(req, res)
  } else if (isRoomRoute(url)) {
    roomRouter(req, res)
  } else if (isLoginRoute(url)) {
    loginRouter(req, res)
  } else if (isSignupRoute(url)) {
    signupRouter(req, res)
  } else if (isRoomGameRoute(url)) {
    roomGameRouter(req, res)
  } else if (req.url === '/') {
    fs.readFile(`${publicPath}/index.html`, 'UTF-8', (error, html) => {
      if (error) {
        console.log(error)
      }
      res.writeHead(301, { Location: '/login' })
      res.end()
    });
  } else if (req.url.match('.css$')) {
    const cssPath = path.join(__dirname, '../public/css', req.url)
    const fileStream = fs.createReadStream(cssPath, 'UTF-8')
    res.writeHead(200, { 'Content-Type': 'text/css' })
    fileStream.pipe(res)
  } else if (req.url.match('.js$')) {
    const cssPath = path.join(__dirname, '../public/js', req.url)
    const fileStream = fs.createReadStream(cssPath, 'UTF-8')
    res.writeHead(200, { 'Content-Type': 'text/javascript	' })
    fileStream.pipe(res)
  }
}

const isUserRoute = url => {
  return url === '/users' || url.match(/\/users\/([0-9]+)/)
}
const isRoomRoute = url => {
  return url === '/rooms' || url.match(/\/rooms\/([0-9]+)/);
}
const isLoginRoute = url => {
  return url === '/login'
}
const isSignupRoute = url => {
  return url === '/signup'
}
const isRoomGameRoute = url => {
  return url === '/room-game'
}

module.exports = router
