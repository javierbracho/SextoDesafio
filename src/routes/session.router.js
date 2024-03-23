import Express from "express";
import userModel from "../model/user.model.js"
import admin from "./user/admin.js"

const routerS = Express.Router()

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

routerS.get ("/logout", (req, res) => {
     if (req.session.login) {
        req.session.destroy()
     }
     res.redirect("/login")
})


export default routerS