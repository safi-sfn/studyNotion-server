const { config } = require("dotenv")
const mongoose = require("mongoose")
require("dotenv")/config()

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connection Successfully"))
    .catch((error)=>{
        console.log("DB Connection failed")
        console.error("error")
        process.exit(1)
    })
}