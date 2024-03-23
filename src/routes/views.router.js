import Express  from "express";

const routerV = Express.Router()

routerV.get("/login", (req,res) => {
    if (req.session.login) {
        return res.redirect("/profile")
    }
    res.render("login")
});

routerV.get("/register", (req, res)=> {
    if(req.session.login) {
        return res.redirect("profile")
    }
    res.render("register")
});

routerV.get("/profile", (req,res) => {
    if(!req.session.login) {
        return res.redirect("/login")
    }
    res.render("profile", {user:req.session.user})
})

export default routerV