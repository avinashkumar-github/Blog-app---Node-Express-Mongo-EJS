const Post = require("./../model/Post")
module.exports = {
    getPost : async (req, res) =>{
        const posts = await Post.find({}).populate("author");
        res.render("index", {posts})
    },
    viewPost : async (req, res)=>{
        const post = await Post.findById(req.params.id);
        res.render("post", {post})
    },
    createPost: (req, res)=>{
        const postError = req.flash('postError') || '';
        const data = req.flash("data")[0] || {};
        res.render("create",{postError, data})
    },
    savePost: async (req, res)=>{
        try{
            await Post.create({...req.body, author: req.session.userId});
            res.redirect("/")
        }catch(e){
            
            res.redirect("/post")
        }
                
    }
}