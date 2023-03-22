const express = require("express")
const routerProducts = require("./routes/products")
const routerCarts = require("./routes/carts")

const app=express()

const PORT = 8080
app.listen(PORT,()=>{console.log("listening on port 8080")})

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
app.use('/api/products',routerProducts)
app.use('/api/carts',routerCarts)