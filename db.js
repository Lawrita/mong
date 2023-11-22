const mongoose = require("mongoose")

const connectDB = async()=>{
await mongoose.connect(process.env.MONGODB_url)
.then(()=>console.log("mongoDB connected..."))
}



module.exports = connectDB