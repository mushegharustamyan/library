const mysql = require("mysql") ;
const db = require("../routes/db-config") ;
const bcrypt = require("bcryptjs") ;

const register = async (req , res) => {
    const {email , password:Npassword , name , surname} = req.body ; 
    if (!email || !Npassword) {
        return res.json({status : "error" , error : "please enter your email or password"})
    } else {
        db.query("SELECT email FROM users WHERE email = ?" , [email] , async (err , results) => {
            if (err) {
                console.log(err)
            }

            if (results[0]) {
                res.json({status : "error" , error : "email is already in use"})
            } else {
                const password = await bcrypt.hash(Npassword , 8) ;
                db.query("INSERT INTO users SET ?" , {email : email , password : password , name ,surname} , (err , results) => {
                    if(err) {
                        console.log(err)
                    } else {
                        res.json({status : "success" , success : "User has been registered"})
                    }
                })
            }
        })
    }
}

module.exports = register ;