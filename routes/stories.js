const express = require('express')
const router = express.Router();
const {ensureAuth,ensureGuest} = require('../middleware/auth');

const Story = require('../models/Story');


router.get('/add',ensureAuth,(req,res) => {
    res.render('stories/add')
})

router.post('/',ensureAuth,async (req,res) => {
    try{
        //With every request i have a user attached to it therefor, req.user
        req.body.user = req.user.id ;
        await Story.create(req.body);
        res.redirect('/dashboard');
    }
    catch(err) {
        console.log(err);
        res.render('error/500');
    }
});

//Show all stories
router.get('/',ensureAuth , async (req,res)=>{
    try{
        const stories = await Story.find({status : 'public'})
                                    .populate('user')
                                    .sort({createdAt: 'desc'})
                                    .lean()
        
        res.render('index',{
            stories
        })

    }catch(err){
        console.log(err);
        res.render('error/500');
    }
})


module.exports = router;