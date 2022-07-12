require("dotenv").config();
const path = require("path");
const express = require("express");
const ejs = require("ejs");
const expressEjsLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session")
const MongoStore = require("connect-mongo")
const flash = require("connect-flash")

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())


mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const connection = mongoose.connection;

connection
.once("open", ()=>{
    console.log("Mongoose connection established")
}).on("error", (err)=>{
    console.log(`Error in connection ${err}`)
})


//After connection definition


app.use(session({
    secret: 'secret',
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_CONNECTION
    }),
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  }));


app.use(express.static("public"));
app.use(expressEjsLayouts)

app.use(flash());



app.set('views', path.join(__dirname, '/views'));
app.set("view engine", "ejs");

//Gobal middleware

app.use('*',(req, res, next)=>{
    
    res.locals.userId = req.session.userId;
    next();

})

require("./routes")(app);

app.listen(process.env.PORT, ()=>{
    console.log(`App running on ${process.env.PORT} port`)
})























// const http = require("http");
// const fs = require("fs");

// const homePage = fs.readFileSync("index.html");
// const aboutPage = fs.readFileSync("about.html");

// const server = http.createServer((req, res)=>{
//     console.log(req.url);
//     if(req.url === '/about'){
//         return res.end(aboutPage)
//     }else if(req.url === '/'){
//         return res.end(homePage)
//     }else{
//         res.writeHead(404);
//         return res.end("Page not found")
//     }
// });

// server.listen(3000,()=>{
//     console.log("Server is running at port 3000")
// });