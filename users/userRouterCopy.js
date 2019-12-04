//LIBRARIES
const express = require('express');

//LOCAL FILES
const Users = require('./userDb')
const Posts =require('../posts/postDb')

//ESTABLISH ROUTER
const router = express.Router();

//CRUD OPS

router.post('/', validateUser, (req, res) => {
  // do your magic!
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
  // do your magic!
  const userId = req.params.id

  Users.getById(userId)
  .then(user => {
    if(!user){
      res.status(404).json({error: "User not found"})
    }else{
      Posts.insert(req.body)
      .then(newPost => {
        res.status(200).json(newPost)
      })
      .catch(err => {
        console.log("POST create post error", err)
        res.status(500).json({error: "Error creating a post, server"})
      })
    }
  })
  .catch(err => {
    console.log("POST finding user error", err)
    res.status(500).json({error: "Error finding user, server"})
  })
});

router.get('/', (req, res) => {
  // do your magic!
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
  // do your magic!
  const userId = req.params.id

  Users.getById(userId)
  .then(user => {
    if(!user){
      res.status(404).json({error: "User does not exist"})
    }else{
      res.status(200).json(user)
    }
    
  })
  .catch(err => {
    console.log('GET single user err', err)
    res.status(500).json({error: "Error specific user, server"})
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const userId = req.params.id

  Users.getById(userId)
  .then(user => {

    if(!user){
      res.status(404).json({error: "User not found"})
    }else{
      Users.getUserPosts(userId)
      .then(posts => {
        res.status(200).json(posts)
      })
      .catch(err => {
        console.log('GET user posts err', err)
        res.status(500).json({error: "Error retrieving posts, server"})
      })
    }
    
  })
  .catch(err => {
    console.log('GET single user err', err)
    res.status(500).json({error: "Error specific user, server"})
  })

});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const userId = req.params.id

  Users.getById(userId)
  .then(user => {
    if(!user){
      res.status(404).json({error: "User not found"})
    }else{
      Users.remove(userId)
      .then(countOfRemoved => {
        res.status(200).json(`Number of records removed ${countOfRemoved}`)
      })
      .catch(err => {
        console.log("DEL user error on remove function", err)
        res.status(500).json({error: "Error attempting to remove"})
      })
    }
  })
  .catch(err => {
    console.log("DEL user error on user ids", err)
    res.status(500).json({error: "Error attempting to find user on DEL"})
  })
});


router.put('/:id', validateUserId, (req, res) => { //I can change the users I made but not the seeds SQ Constraints?
  // do your magic!
  const userId = req.params.id
  const newBody = req.body

  Users.getById(userId)
  .then(user => {
    if(!user){
      res.status(404).json({error: "User not found"})
    }else{
      Users.update(userId, newBody)
      .then(count => {
        res.status(200).json({message: `Changes made to ${count} user`})
      })
      .catch(err => {
        console.log("PUT edit user error", err)
        res.status(500).json({error: "Error editing a user, server"})
      })
    }
  })
  .catch(err => {
    console.log("PUT finding user error", err)
    res.status(500).json({error: "Error finding user, server"})
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
     let reqUser = user
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

  if(!userBody){
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
  else if(!postBody.name){
    res.status(400).json({error: "missing required text field"})
  } 
  else{
      next()
  }
}

module.exports = router;
