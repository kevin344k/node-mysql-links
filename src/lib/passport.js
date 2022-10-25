const passport = require("passport");
const LocalStrategy = require("passport-local");
const pool=require('../database')
const helpers=require('../lib/helpers')


passport.use('local.signin',new LocalStrategy({

usernamefield:'username',
passwordfield:'password',

passReqToCallback:true

 },async(req,username,password,done)=>{
 
console.log(req.body)

 const rows= await pool.query('select * from users where username =? ',[username])

if(rows.length>0){
  console.log(rows[0])
  const user=rows[0]

  const validPassword=await  helpers.matchPassword(password,user.password)
  console.log(validPassword)
if(validPassword){
  done(null,user,req.flash('success','Welcome'+user.username))
}else{
  done(null,false,req.flash('message','incorrect password '))
}

}else{

  return done(null, false,req.flash('message','The username does not exists'))
}
  
 }))






passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernamefield: "username",
      passwordfield: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
        const {fullname}=req.body
      const newUser={
        username,
        password,
        fullname
      }


      newUser.password=await helpers.encryptPassword(password)

        const result=await pool.query('insert into users set ?',[newUser])
        newUser.id=result.insertId
        console.log(newUser.id)
        return  done(null,newUser)

    }
  )
);
  passport.serializeUser((user,done)=>{
  done(null,user.id)
//guardo el id del usuario
})
 passport.deserializeUser(async(id,done)=>{
 const rows=  await pool.query('select * from users where id = ?',[id])
//  uso el id para consultar el usurio con el id
  done(null,rows[0])
 })
