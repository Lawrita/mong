const mongoose= require("mongoose")

const staffSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    dept: {type: String, require: true},
    location: {type: String,},
}, {timestamps: true})


const staff = mongoose.model("staff", staffSchema)

module.exports = staff