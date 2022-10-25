const express = require("express");

//es una conexion a la db
const pool = require("../database");

const {isLoggedIn}=require('../lib/auth')


const router = express.Router();



router.get('/add',isLoggedIn,(req,res)=>{
    res.render('links/add')
})

router.post('/add', isLoggedIn,async (req,res)=>{

   const {title,url,decription} =req.body
   const newLink={
    title,
    url,
    decription,
    user_id:req.user.id
   }
   await pool.query('insert into links set ?', [newLink]) //el ? le dice que los datos a continuacion son los que hay que almacenar 
   req.flash('success','Link saved seccess')
   res.redirect('/links')
 
  
})


router.get('/', isLoggedIn,async(req,res)=>{
   const links= await pool.query('select * from links where user_id =?',[req.user.id])
   console.log(links)
   res.render('links/list',{links})

})


router.get('/delete/:id',isLoggedIn,async(req,res)=>{
   const {id}=req.params
await pool.query('delete from links where id=?',[id]);
req.flash('success','Links Removed successfully')
res.redirect('/links')
})

router.get('/edit/:id',isLoggedIn,async(req,res)=>{
    const {id}=req.params
   
   const links= await pool.query('select * from links where id = ?',[id])

    res.render('links/edit',{link:links[0]})
})


router.post('/edit/:id', isLoggedIn,async(req,res)=>{
     const {id}=req.params
     const{title,url,decription}=req.body
     const newLink={
        title,
        url,
        decription
     }

     await  pool.query('update links set ? where id=?',[newLink,id])
req.flash('success','Link Updated successfully')
     res.redirect('/links')
    }
)

module.exports = router;
