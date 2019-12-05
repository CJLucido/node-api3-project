//LIBRARIES
const express = require('express');

//LOCAL FILES
const Users = require('./userDb')
const Posts =require('../posts/postDb')

//ESTABLISH ROUTER
const router = express.Router();

//CRUD OPS

let reqUser = {}

router.post('/', validateUser, (req, res) => {

   Users.insert(req.body)
      .then(newUser => {
        res.status(200).json(newUser)
      })
      .catch(err => {
        console.log("POST create user error", err)
        res.status(500).json({error: "Error creating a user, server"})
      })

});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
 
      Posts.insert(req.body)
      .then(newPost => {
        res.status(200).json(newPost)
      })
      .catch(err => {
        console.log("POST create post error", err)
        res.status(500).json({error: "Error creating a post, server"})
      })

});

router.get('/', (req, res) => {
 
  Users.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    console.log('GET users all err', err)
    res.status(500).json({error: "Error fetching all users, server"})
  })
});

router.get('/:id', validateUserId, (req, res) => {

      res.status(200).json(reqUser)

});

router.get('/:id/posts', validateUserId, (req, res) => {

      Users.getUserPosts(req.params.id)
      .then(posts => {
        res.status(200).json(posts)
      })
      .catch(err => {
        console.log('GET user posts err', err)
        res.status(500).json({error: "Error retrieving posts, server"})
      })


});

router.delete('/:id', validateUserId, (req, res) => {

      Users.remove(req.params.id)
      .then(countOfRemoved => {
        res.status(200).json(`Number of records removed ${countOfRemoved}`)
      })
      .catch(err => {
        console.log("DEL user error on remove function", err)
        res.status(500).json({error: "Error attempting to remove"})
      })

});


router.put('/:id', validateUserId, (req, res) => { //I can change the users I made but not the seeds SQ Constraints?

      Users.update(req.params.id, req.body)
      .then(count => {
        res.status(200).json({message: `Changes made to ${count} user`})
      })
      .catch(err => {
        console.log("PUT edit user error", err)
        res.status(500).json({error: "Error editing a user, server"})
      })

});


//MIDDLEWARE all local
//custom middleware

function validateUserId(req, res, next){
  const userId = req.params.id
  Users.getById(userId)
  .then(user => {
    if(!user){
      res.status(404).json({error: "invalid user id"})
    }else{
      reqUser = user
     next()
    }
  })
  .catch(err => {
    console.log("Finding user error", err)
    res.status(500).json({error: "Error finding user, server"})
  })
}

function validateUser(req, res, next){
  const userBody = req.body

  if(!userBody){//there is always a body being sent by postman even if I click none
    res.status(400).json({error: "missing user data"})
  }
  else if(!userBody.name){
    res.status(400).json({error: "missing required name field"})
  } 
  else{
      next()
  }
 
}

function validatePost(req, res, next){
  const postBody = req.body

  if(!postBody){
    res.status(400).json({error: "missing post data"})
  }
  else if(!postBody.text){
    res.status(400).json({error: "missing required text field"})
  } 
  else{
      next()
  }
}

module.exports = router;
