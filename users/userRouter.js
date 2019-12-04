//LIBRARIES
const express = require('express');

//LOCAL FILES
const Posts = require('./userDb')

//ESTABLISH ROUTER
const router = express.Router();

//CRUD OPS

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});


//MIDDLEWARE
//custom middleware

function validateUserId(req, res, next){

  next()
}

function validateUser(req, res, next){

  next()
}

function validatePost(req, res, next){

  next()
}

module.exports = router;
