import mongoose from "mongoose";
import {DB_Name}  from "../constant.js";

const connectDB = async() =>{
    try {
        const connectionResponse=await mongoose.connect(
            `${process.env.MONGODB_URL}/${DB_Name}`
        )
        console.log("DataBase is connected To HoST : ",connectionResponse.connection.host)
    } catch (error) {
        console.log("Failed to connect to Data Base")
         process.exit(1);
    }
}

export default connectDB