const express = require('express')
const knex = require("../database/db")
const router = express.Router()
const  {generateToken,authenticateToken} = require("../auth/jwt")

router.post("/pb",authenticateToken,(req,res)=>{
    
    knex("book").insert(req.body).then((data)=>{
        res.send("posts added")
    }).catch((err)=>{
        res.send(err)
    })

})

router.get("/gb",authenticateToken,(req,res)=>{
    knex.select("*").from("book")
    .then((data)=>{
        res.send(data)
        console.log(data)
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })
})


router.get("/gb/:id",authenticateToken,(req,res)=>{
    
    knex.select("*").from("book").where({id:req.params.id})
    .then((data)=>{
        res.send(data)
        console.log(data)
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })

})

router.delete("/db/:id",authenticateToken,(req,res)=>{
    
    knex.select("*").from('book').where({id:req.params.id}).del()
    .then((data)=>{
        res.send("deleted success")
        console.log("deleted")
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })

})


module.exports = router