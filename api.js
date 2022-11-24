const express = require("express") ;
const books = require("./books")
const api = express.Router() ;

api.get("/books" , (req , res) => {
    res.send(JSON.stringify(books))
})

api.get("/books/:id" , (req , res) => {
    res.send(JSON.stringify(books.find((value) => value.id == req.params.id)))
})

module.exports = api ;