const express = require('express')
const router = express.Router();

//Description of Route => Login Landing Page

router.get('/',(req,res) => {
    //changin the layout from main to login
    //layouts are stored inside layouts folder in views folder 
    res.render('login' , {
        layout : 'login'
    });
})

//Description of Route => Dashboard Page
router.get('/dashboard' , (req,res) => {
    res.render('dashboard');
})


module.exports = router;