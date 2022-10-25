//para almacenar tadas lqas rutas de la aplicacion


const express=require('express')
const router=express.Router() //metodo que devuelve un objeto



router.get('/',(req,res)=>{
    res.render('index')
})


module.exports=router