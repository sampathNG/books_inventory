require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.json())

const ls = require("./routes/user")
const del = require("./routes/book")

app.use("/",ls)
app.use("/",del)


app.listen(process.env.port,console.log(`running on ${process.env.port}`))

