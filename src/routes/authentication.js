const express = require("express");
const passport=require('passport')
const {isLoggedIn,isNotLogggedIn} = require('../lib/auth')
const router = express.Router();



router.get('/signup',isNotLogggedIn,(req,res)=>{

    res.render('./auth/signup')
})

router.get('/signin',isNotLogggedIn,(req,res)=>{

    res.render('./auth/signin')
})


router.post('/signup',passport.authenticate('local.signup',{
        successRedirect:'/profile',
        failureRedirect:'/signup',
        failureFlash:true
    })

)


router.post('/signin',(req,res,next)=>{
    passport.authenticate('local.signin',{

successRedirect:'/profile',
failureRedirect:'/signin',

failureFlash:true


    })(req,res,next)
})

router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('profile')


})

router.get('/logout',isLoggedIn,(req,res,next)=>{


    req.logOut(req.user,err=>{
        if(err) return next(err)
        res.redirect('/signin')
    })
   



})





module.exports = router;
