const validationAuth = require("./middleware/validationAuth");
const validationPost = require("./middleware/validationPost");
const postController = require("./controllers/post");
const userController = require("./controllers/user");
const validationUser = require("./middleware/validationUser");
const redirectOnLogin = require("./middleware/redirectOnLogin");


module.exports = (app)=>{

    const router = require("express").Router();


    router.get("/", postController.getPost);


    router.get("/about", (req, res)=>{
        res.render("about");
    })


    router.get("/contact", (req, res)=>{
        res.render("contact")
    })
    
    
    router.get("/post/:id", postController.viewPost)


    router.get("/post", validationAuth, postController.createPost)

    
    router.post("/post", validationAuth, validationPost, postController.savePost);


    //User route

    router.get("/user/register", redirectOnLogin, userController.getUserRegister);

    router.post("/user/register", redirectOnLogin, userController.postUserRegister);

    router.get("/user/login", redirectOnLogin, userController.getUserLogin)

    router.post("/user/login", redirectOnLogin, userController.postUserLogin)

    router.get("/user/logout", validationAuth, userController.userLogout)


    router.use((req, res)=>{
        return res.render('404')
    })

    app.use("/", router);
}