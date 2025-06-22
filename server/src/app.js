import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin:process.env.CORS_URL,
    credentials:true
}))

app.use(express.json({limit:"16kb"})) //Limit for how much json data will allowed one time.
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//Import Routs

import router from "./routes/user.routes.js"
import dietRouter from "./routes/diet.route.js"

//Declaring Routs


app.use("/api/v2/users",router)
app.use("/api/v2/diet", dietRouter)
export default app