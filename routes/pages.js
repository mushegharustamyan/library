const express = require("express") ;
const loggedIn = require("../controllers/loggedin") ;
const logOut = require("../controllers/logout") ;
const router = express.Router() ;

router.get("/" , loggedIn,  (req,res) => {
    if (req.user) {
        res.render("index" , {loggedIn : true , user : req.user})
    } else {
        res.render("index" , {status : true , user : "no user"})
    }
})

router.get("/register" , (req , res) => {
    res.render("register")
})

router.get("/login" , (req , res) => {
    res.render("login")
})

router.get("/profile", loggedIn , (req , res) => {
    if (req.user) {
        res.render("profile" , {loggedIn : true , user : req.user})
    } else {
        res.render("profile" , {status : true , user : "no user"})
    }
})

router.get("/user" , loggedIn , (req ,res) => {
    if (req.user) {
        res.send({loggedIn : true , user : req.user})
    } else {
        res.send({status : true , user : "no user"})
    }
})

router.get("/book/:id" , loggedIn ,(req , res) => {
    if (req.user) {
        res.render("book" , {loggedIn : true , user : req.user , book : "1" })
    } else {
        res.render("book" , {status : true , user : "no user" , book : "1" })
    }
})

router.get("/order" , loggedIn , (req , res) => {
    if (req.user) {
        res.send({loggedIn:true , order : "Book is in order"})
    } else {
        res.send({loggedIn:false , order : "You need to log in"})
    }
})

router.get("/logOut" , logOut) ;

module.exports = router ;