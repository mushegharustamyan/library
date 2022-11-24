const jwt = require("jsonwebtoken") ;
const db = require("../routes/db-config") ;
const bcrypt = require("bcryptjs") ;

const login = async (req , res) => {
    const {email , password : password} = req.body ;
    if (!email || !password) {
        return res.json({status : "error" , error : "please enter your email or password"})
    } else {
        db.query("SELECT * FROM users WHERE email = ?" , [email] , async (err , results) => {
            if(err) {
                console.log(err)
            }

            if(!results[0] || !await bcrypt.compare(password , results[0].password)) {
                return res.json({status : "error" , error : "Incorrect email or password"})
            } else {
                const token = jwt.sign({id : results[0].id}, process.env.JWT_SECRET) ;

                const cookieOptions = {
                    expiresIn : process.COOKIE_EXPIRES, 
                    httpOnly : true ,
                } 

                res.cookie("userRegistered" , token , cookieOptions) ;
                return res.json({status : "success" , success : "User has been logged in"})
            }
        })
    }
}

module.exports = login ;