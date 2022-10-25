module.exports={
    isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }else{
            return res.redirect('/signin')
        }
    },

isNotLogggedIn(req, res,next){
    if(!req.isAuthenticated()){
        return next()
    }else{return res.redirect('/profile')}


            
    }



}



