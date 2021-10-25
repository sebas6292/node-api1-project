// BUILD YOUR SERVER HERE
const express = require("express")

const User = require('./users/model')

const server = express()

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
        // console.log(user)
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({
            message:'error getting user id',
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
