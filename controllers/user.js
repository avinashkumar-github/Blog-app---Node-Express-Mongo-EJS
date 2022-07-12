const User = require("./../model/User");
const bcrypt = require("bcrypt")

const user = {

    getUserRegister : (req, res) => {
        // const signupError = req.session.signupError
        const signupError = req.flash("signupError")
        const data = req.flash("registerData")[0] || {};
        console.log(data)
        res.render("register", {signupError, data})
    },
    postUserRegister : async (req, res) =>{
        try{
            // console.log(req.body)
            await User.create(req.body);
            res.redirect("/")         
        }catch(e){
            console.log(e.message)
            // req.session.signupError = e.message;
            req.flash("signupError", e.message);
            req.flash("registerData", req.body);
            res.redirect("/user/register");
        }
    },
    getUserLogin: (req, res)=>{
        const loginError = req.flash('loginError');
        const data = req.flash("data")[0] || {};
        console.log(data)
        res.render("login", {loginError, data})
    },
    postUserLogin: async (req, res)=>{
        const {username, password} = req.body;

        try{
            const user = await User.findOne({username});
            if(user){
                console.log(user);
                const matchPwd = await bcrypt.compare(password, user.password);
                if(matchPwd){
                    req.session.userId = user._id;
                    return res.redirect("/")
                }else{
                    req.flash('loginError','Incorrect Username or Password');
                    req.flash('data', req.body);
                    res.redirect("/user/login")
                }
            }else{
                req.flash('loginError','Incorrect Username or Password!!');
                req.flash('data', req.body);
                res.redirect("/user/login")
                throw new Error("No such user found!!")
            }
        }catch(e){

        }
        

    },
    userLogout : (req, res)=>{
         req.session.destroy((error)=>{
            res.redirect("/user/login");
         })
         
    }
}

module.exports = user;