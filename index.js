const express = require("express") ;
const cookie = require("cookie-parser") ;
const db = require("./routes/db-config") ;
const app = express() ;
const path = require("path");
const { route } = require("./routes/pages");
const router = require("./routes/pages");
const publicDirectory = path.join(__dirname , "/public")

app.use(express.static(publicDirectory))
app.use(cookie()) ;
app.use(express.json()) ;
app.use("/" , require("./routes/pages")) ;
app.use("/api" , require("./api")) ;
app.use("/auth" , require("./controllers/auth")) ;

app.set("view engine" , "hbs") ;
app.set("views" , "./views") ;
db.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("database is connected")
    }
})

app.listen(3080 , () => {
    console.log("server is running in 3080 port ")
})