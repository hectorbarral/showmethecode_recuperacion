const fs = require('fs')
const path = require('path')

const SignupController = require('../controllers/signup')

function getReqData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = ''
      req.on('data', chunk => {
        body += chunk.toString()
      });
      req.on('end', () => {
        resolve(body)
      });
    } catch (error) {
      reject(error)
    }
  })
}

//PÁGINA DE REGISTRO//
const signupRouter = async (req, res) => {
  if (req.url === '/signup' && req.method === 'POST') {
    // Signup user
    const body = await getReqData(req)
    const signupData = JSON.parse(body)

    const user = SignupController.signupUser(signupData)
    if (user) {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end();
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 500
      res.end(JSON.stringify({ message: 'Error signup user' }))
    }
  } else if (req.url === '/signup' && req.method === 'GET') {
    // Render signup page
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    const templatePath = path.join(__dirname, '/../views/signup.html')
    fs.createReadStream(templatePath).pipe(res)
  }
};

module.exports = signupRouter
