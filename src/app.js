import  Express  from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routes/user.router.js"
import sessionRouter from "./routes/session.router.js"
import viewsRouter from "./routes/views.router.js"
import productRouter from "./routes/products.router.js"
import dataBase from "../src/database.js"
import  ExpressHandlebars from "express-handlebars";
import initializePassport from "./config/passport.config.js";
import passport from "passport";

const app = Express()
const PUERTO = 8080;

app.engine("handlebars", ExpressHandlebars.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static("./src/public"))
app.use(cookieParser())
app.use(session ({
    secret: "coderhouse",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://jbracho07:coderhouse@cluster0.sd6827y.mongodb.net/E-Commerce?retryWrites=true&w=majority&appName=Cluster0",
        ttl: 100
    })
}))

initializePassport()
app.use (passport.initialize())
app.use(passport.session())

app.use("/", userRouter)
app.use ("/", sessionRouter)
app.use("/", viewsRouter)
app.use("/", productRouter)


app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
})

