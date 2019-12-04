//LIBRARIES
const express = require('express');

//LOCAL FILES
const Posts = require('./postDb')

//ESTABLISH ROUTER
const router = express.Router();


//CRUD OPS

let reqPost = {}

router.get('/', (req, res) => {
  Posts.get()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    console.log("This is GET ALL Posts error", err)
    res.status(500).json({error: "Error GET posts, server"})
  })

});

router.get('/:id', validatePostId, (req, res) => {
  Posts.getById(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    console.log("This is GET Single Post error", err)
    res.status(500).json({error: "Error GET a post, server"})
  })

});

router.delete('/:id', validatePostId, (req, res) => {

  Posts.remove(req.params.id)
  .then(count => {
    res.status(200).json(`Number of posts removed ${count}`)
  })
  .catch(err => {
    console.log("This is delete posts error", err)
    res.status(500).json({error: "Could not delete, server"})
  })
});

router.put('/:id', validatePostId, (req, res) => {
  
  Posts.update(req.params.id, req.body)
  .then(count => {
    if(count > 0){
      res.status(200).json(`Edited post ${req.params.id}`)
    }else{
      res.status(400).json("Something could not update")
    }
  })
  .catch(err => {
    console.log("This is PUT error for Posts", err)
    res.status(500).json({error: "Error editing post"})
  })
});


//MIDDLEWARE
// custom middleware

function validatePostId(req, res, next) {
  const postId = req.params.id

  Posts.getById(postId)
  .then(post => {

    if(!post){
      res.status(404).json({error: "Could not find post"})
    }
     else{
      reqPost = post
      next()
    }
  })
  .catch(err => {
    console.log("This is a validate post err", err)
    res.status(500).json({error: "Error validating post, server"})
  })
}

module.exports = router;

