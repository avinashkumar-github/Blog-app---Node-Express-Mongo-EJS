const validationPost = (req, res, next) => {
    const {username, title, subtitle, content} = req.body;

    if(username === '' || title === '' || subtitle === ''|| content === ''){
        req.flash('postError', "All fields are required!!");
        req.flash("data", req.body)
        res.redirect("/post")
    }else{
        next();
    }    
}

module.exports = validationPost;