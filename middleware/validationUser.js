module.exports = {
    validateLoginForm : (req, res, next)=>{

        const {username, password} = req.body;
        if(username == '' || password == ''){
            
            return res.redirect("/user/login");
            throw new Error("All fields required!!");

        }

        next();    
    },

    validateRegisterForm: (req, res, next)=>{
        const {username, password, email} = req.body;
        if(username == '' || password == '' || email == ''){
           
           req.session.registerError = 'All fields are required';
           return res.redirect("/user/register");
        }

        next();
    }
}