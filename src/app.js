const express = require("express")
const handlebars = require("express-handlebars")
const routerProducts = require("./routes/products")
const routerCarts = require("./routes/carts")
const routerRealTimeProducts = require("./routes/realTimeProducts")

const app=express()

const PORT = 8080
app.listen(PORT,()=>{console.log("listening on port 8080")})

app.engine('.hbs', handlebars.engine({extname: '.hbs'}))
app.set('views',  './views')
app.set('view engine', '.hbs')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
app.use('/api/products',routerProducts)
app.use('/api/carts',routerCarts)
app.use('/api/realTimeProducts',routerRealTimeProducts)

// app.get('/', (req, res) => {
//     res.render('home')
// })