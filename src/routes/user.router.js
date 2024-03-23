import Express from "express";
import userModel from "../model/user.model.js"

const routerU = Express.Router()

routerU.post("/user", async (req, res)=>{
    const {first_name, last_name, email, password, age} = req.body
    try {
        const findUser = await userModel.findOne({email: email})
        if(findUser) {
            return res.status(400).send({error: "El email ya se encuentra registrado"})
        }
        const newUser = await userModel.create ({
            first_name,
            last_name,
            password,
            email,
            age
        })

        req.session.login = true
        req.session.user = {...newUser._doc}

        res.redirect("/profile")
    } catch (error) {
        console.log("Error al crear el usuario", error)
        res.status(500).send({error: "error al guardar el usuario"})
        
    }
})


export default routerU