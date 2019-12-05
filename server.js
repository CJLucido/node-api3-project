//LIBRARIES
const express = require('express');
const helmet = require('helmet')

//LOCAL FILES (ROUTERS)
const userRouter = require('./users/userRouter')
const userRouterCopy = require('./users/userRouterCopy')
const postRouter = require('./posts/postRouter')

//BUILD SERVER POWERED BY EXPRESS
const server = express();

///MIDDLEWARE
//global
server.use(express.json())
server.use(logger)

//routers
server.use("/api/posts", postRouter)
server.use('/api/users', userRouterCopy)

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl} on ${Date.now()}`)
  next()
}



///ENDPOINTS
server.get('/', helmet(), (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});



module.exports = server;
