const User = require("../model/User")

module.exports = async (req, res, next)=>{
    if(req.session.userId){
        const user = await User.findById(req.session.userId);
        if(!user){
            return res.redirect("/user/login")
        }

        next();
    }else{
        res.redirect("/user/login")
    }

    
    
}