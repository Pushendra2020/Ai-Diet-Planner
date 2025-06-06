import app from "./app.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log("Server is running on Port ",process.env.PORT)
    })
})
.catch((error)=>{
    console.log("Failed to Connect :( ",error)
})