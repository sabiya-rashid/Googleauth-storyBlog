const express = require('express')
const router = express.Router()
const Story = require('../models/Story')
const {
    ensureAuth,
    ensureGuest
} = require('../middleware/auth')

//@desc   Login/Landing page
//@route  Get /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

//@desc   Login/Landing page
//@route  Get / Dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({
            user: req.user.id
        }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        })
    } catch (error) {
        console.log(error)
        res.render('500')
    }
})

module.exports = router