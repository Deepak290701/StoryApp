const express = require('express')
const router = express.Router();
const {ensureAuth,ensureGuest} = require('../middleware/auth');

//Description of Route => Login Landing Page

router.get('/',ensureGuest,(req,res) => {
    //changin the layout from main to login
    //layouts are stored inside layouts folder in views folder 
    res.render('login' , {
        layout : 'login'
    });
})

//Description of Route => Dashboard Page
router.get('/dashboard' , ensureAuth, (req,res) => {
    res.render('dashboard');
})


module.exports = router;