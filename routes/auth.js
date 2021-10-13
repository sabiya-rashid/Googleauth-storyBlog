const express = require('express')
const passport = require('passport')
const router = express.Router()


//@desc  Authwith Google
//@route  Get /auth/google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

//@desc   Google auth callback
//@route  Get /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.redirect('/dashboard')
    }
)

//@desc Logout user
//@route /auth/logout
router.get('/logout', (req, res) => {
    res.redirect('/')
    req.logout()
    req.session.destroy()
})
module.exports = router