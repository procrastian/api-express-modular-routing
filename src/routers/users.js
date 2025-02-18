const express = require('express')
const { users } = require('../../data/index.js')
const usersRouter = express.Router()
let idNum = users.length 

const findUserByID = (id) => {
  const res = users.find((user) => {
    return user.id === Number(id)
  })
  return res
}

// 1 - GET - Retrieve a list of users
usersRouter.get('/', (req, res) => {
  return res.send({users})
})

// 2 - POST - Create a user
usersRouter.post('/', (req, res) => {
  const email = req.body.email
  idNum++
  const user = {
    id: Number(idNum),
    email: email
  }
  users.push(user)
  return res.status(201).send({user})
})

// 3 - Get a user by ID
usersRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const user = findUserByID(Number(id))

  if (user) {
    return res.send({user})
  } else {
    return res.status(404).send('A user with the provided ID does not exist')
  }
})

// 4 - DEL - Delete a user by ID
usersRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const user = findUserByID(Number(id))

  const userIdx = users.findIndex((item) => {
    return item === user
  })

  if (user) {
    const user = users.splice(userIdx, 1)[0]
    return res.send({user})
  } else {
    return res.status(404).send('A user with the provided ID does not exist')
  }
})

// 5 - PUT - Update a user by ID
usersRouter.put('/:id', (req, res) => {
  const { id } = req.params
  const user = findUserByID(Number(id))
  const body = req.body.email

  const userIdx = users.findIndex((item) => {
    return item === user
  })

  if (user) {
    users[userIdx].email = body
    return res.send({user})
  } else {
    return res.status(404).send('A user with the provided ID does not exist')
  }
})

module.exports = usersRouter