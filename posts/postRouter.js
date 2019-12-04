//LIBRARIES
const express = require('express');

//LOCAL FILES
const Posts = require('./postDb')

//ESTABLISH ROUTER
const router = express.Router();


//CRUD OPS

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});


//MIDDLEWARE
// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
