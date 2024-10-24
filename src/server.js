const express = require("express")
const cors = require("cors")
const app = express()
const session = require('express-session');

app.use(session({
    secret: 'meu_segredo', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Defina como true se usar HTTPS
}));

const port = 3000

const routes = require("./routes")

app.use(express.json())
app.use(cors())
app.use(routes)

app.get("/", (req,res)=>{
    res.send("Continue the hard work!")
})

app.listen(port, (req, res)=> {
    console.log("Server running at the port "+ port)
})