//LIBRARIES
const express = require('express');

//LOCAL FILES
const Users = require('./userDb')

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
  Users.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    console.log('GET users all err', err)
    res.status(500).json({error: "Error fetching all users, server"})
  })
});

router.get('/:id', (req, res) => {
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

router.get('/:id/posts', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

router.put('/:id', (req, res) => {
  // do your magic!
});


//MIDDLEWARE all local
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
