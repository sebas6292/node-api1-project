// BUILD YOUR SERVER HERE
const express = require("express")

const User = require('./users/model')

const server = express()

server.use(express.json())

server.post('/api/users', (req, res) => {
    const user = req.body
    if (!user.name || !user.bio) {
        res.status(400).json({ 
            message: "Please provide name and bio for the user"
        })
    } else {
        User.insert(user)
        .then(createdUser => {
           res.status(201).json(createdUser)
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the user to the database",
                err: err.message,
                stack: err.stack,
        })
    })
    }
})

server.get('/api/users', (req, res) => {
    // console.log('getting all users')
    // res.json('users')
    User.find()
    .then(users => {
        // console.log(users)
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({
            message:'error getting users',
            err: err.message,
            stack: err.stack,
        })
    })
})

server.get('/api/users/:id', (req, res) => {
   User.findById(req.params.id)
    .then(user => {
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist",
            })
        }
        // console.log(user)
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({
            message: "error getting users",
            err: err.message,
            stack: err.stack,
        })
    })
})

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not here bro bro'
    })
})
module.exports = server; // EXPORT YOUR SERVER instead of {}
