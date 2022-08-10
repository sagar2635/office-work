const express = require('express')
const bodyParser = require('body-parser')
const { validationResult } = require('express-validator')
const repo = require('./repository')
const { validateEmail } = require('./validator')
const signupTemplet = require('./signup')

const app = express()

const port = process.env.PORT || 3000

// The body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }))

// Get route to display HTML form to sign up
app.get('/signup', (req, res) => {
    res.send(signupTemplet({}))
})

// Post route to handle form submission logic and
app.post(
    '/signup',
    [validateEmail],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.send(signupTemplet({ errors }))
        }
        const { email, password } = req.body
        await repo.create({ email, password })
        res.send('Sign Up successfully')
    })

// Server setup
app.listen(port, () => {
    console.log(`Server start on port ${port}`)
})