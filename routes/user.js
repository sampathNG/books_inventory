const express = require('express')
const knex = require("../database/db")
const router = express.Router()
const  {generateToken,authenticateToken} = require("../auth/jwt")

// user signup

router.post("/signup",(req,res)=>{
    if(req.body.name === undefined || req.body.password === undefined ){
        res.send({"suggestion":"name and password both are require"})}
    else{
    knex.select("*").from("users").where({name:req.body.name}).then((data)=>{
        if(data.length<1){
            knex("users").insert({name:req.body.name,role:req.body.role,password:req.body.password})
            .then((data)=>{
                res.send(data)
                console.log(data)
            }).catch((err)=>{
                res.send(err)
            })
        }else{
            res.send("data already exist")
        }
    })
}

})


// user login

router.post("/login",(req,res)=>{
    if(req.body.name === undefined || req.body.password === undefined){
        res.send('name and password are required')
    }else{
        knex.select("*").from("users").where({name:req.body.name})
        .then((data)=>{
            const password = req.body.password
            if(password){
                const token = generateToken(req.body)
                res.send(data)
                console.log(token)
            }
        }).catch((err)=>{
            res.send(err)
            console.log(err)
        })
    }
})

module.exports = router;