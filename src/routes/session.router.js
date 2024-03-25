import Express from "express";
import userModel from "../model/user.model.js"
import admin from "./user/admin.js"
import hashbcrypt from "../utils/hashbcrypt.js"
import passport from "passport";

const routerS = Express.Router()

/*

routerS.post("/login", async (req, res)=>{
    const {email, password} = req.body
    try {
      if(email === admin.email && password === admin.password) {
         req.session.login = true;
         req.session.user = admin;
         res.redirect("/products")
      } else {
         const user = await userModel.findOne({email: email})
         if(user) {
            if(user.password === password) {
               req.session.login = true
               req.session.user = {...user._doc}
               res.redirect("/products")
            } else {
               res.status(401).send({error: "Contraseña no valida"})
            }
         } else {
            res.status(401).send({error: "Usuario no encontrado"})
         }
      }

    } catch (error) {
         res.status(500).send({error: "error al iniciar el sesion"})

    }
})
*/

routerS.post("/login", passport.authenticate("login", {failureRedirect: "/faillogin"})),
async(req, res) => {
   if(!req.user) {
      return res.status(400).send({status:"error "})
   }
   req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
  };

  req.session.login = true;
  res.redirect("/profile")
}

routerS.get("/faillogin", async (req, res)  => {
   res.send({error:"error al loguear"})
})


routerS.get ("/logout", (req, res) => {
     if (req.session.login) {
        req.session.destroy()
     }
     res.redirect("/login")
})


export default routerS