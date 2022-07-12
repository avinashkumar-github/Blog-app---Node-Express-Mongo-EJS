module.exports = (app)=>{

    const router = require("express").Router();
    const Post = require("./model/Post")

    router.get("/about", (req, res)=>{
        // res.send({
        //     page: "about page"
        // })
        // res.sendFile(path.resolve(__dirname, "pages/about.html"));
        res.render("about");
    })
    
    // router.get("/post", (req, res)=>{
    //     // res.sendFile(path.resolve(__dirname, "pages/post.html"))
    //     res.render("post");
    // })
    
    router.get("/contact", (req, res)=>{
        // res.sendFile(path.resolve(__dirname, "pages/contact.html"))
        res.render("contact")
    })
    
    
    // router.post("/post/create", (req, res)=>{
    //     console.log(typeof(req.body))
    
    // })
    
    router.get("/", async (req, res)=>{
        // res.json({
        //     page: "home page"
        // })
        // res.sendFile(path.resolve(__dirname, "pages/index.html"));

        //-callback
        // Post.find({}, (err, posts)=>{
        //     console.log(posts);
        //     res.render('index', {posts})
        // })

        //async await
        const posts = await Post.find({});
        console.log(posts)
        res.render("index", {posts})
        
    });

    router.get("/post/:id", async (req, res)=>{
        // const posts = Post.findById(req.params.id, (err, data)=>{
        //     if(err){
        //         res.render("post", {error:true, posts:{}})
        //     }
        //     console.log(data)
        //     res.render("post", {error:false, posts:data});
        // })

        const post = await Post.findById(req.params.id);
        res.render("post", {post})

        
    })


    router.get("/post/create", (req, res)=>{
        res.render("create",{error: ''})
    })

    
    router.post("/post/create", (req, res)=>{
        console.log(req.body) 
        // Post.create(req.body,(err, post)=>{
        //     if(err){
        //         // res.json({
        //         //     msg: "Error creating post"
        //         // })
        //         // data = {msg:"Error creating post", data:{}};
        //         res.render("create", {msg:"Error creating post", data:{}})
        //         // return;
        //     }
        //     // data = {msg:"Post created",data:post};
        //     res.redirect("/")
        //     // res.send({data: post})


        // })

        // upload(req, res, function (err) {
        //     console.log(req.body) 
        //  return;    
        //     if (err instanceof multer.MulterError) {
        //       // A Multer error occurred when uploading.
        //       console.log(err)
        //       res.render("create", {error: err.message})
        //     } else if (err) {
        //         console.log("Error" , err)
        //         res.render("create", {error: err.message})
        //       // An unknown error occurred when uploading.
        //     }
        
        //     // console.log(req.file);

            
        //   })

        //   await Post.create({
        //     ...req.body,
        //     'image':`/posts/${req.file.filename}`
        //     });
        //     res.redirect("/");

        // try{
        //     console.log(req.body, req.file)
        // }catch(e){
        //     console.log(e.message)
        //     // throw new Error(e.message);
        //     res.render("create", {error: e.message})
        // }
        
    })

    router.use("/", router);
}