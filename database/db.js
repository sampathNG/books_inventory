require("dotenv").config()
const knex = require("knex")({
    client: 'mysql2',
    connection: {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
})

knex.schema.createTable("users",(t)=>{
    t.increments("id").primary(),
    t.string("name"),
    t.string("role"),
    t.string("password")
}).then((data)=>{
    console.log("users table created")
}).catch((err)=>{
    console.log("already created")
})

knex.schema.createTable("book",(t)=>{
    t.increments("id").primary(),
    t.string("name"),
    t.integer("price"),
    t.float("rating")
}).then((data)=>{
    console.log("book table created")
}).catch((err)=>{
    console.log("already created")
})

module.exports = knex;