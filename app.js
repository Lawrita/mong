const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./db")
const Staff = require("./model/staffModel")


dotenv.config()

const app = express()
app.use(express.json())

connectDB()






// APIs

app.get("/", (req, res)=>{
    return res.status(200).json({
        message: "welcome to our backend"
    })
})



// GET ALL
app.get("/staff", async(req, res)=>{

    const staff = await Staff.find()

   return res.status(200).json({
    message: "succesful",
    count: staff.length,
    staff
   })
})




// GET ONE

app.get("/:id", async(req, res)=>{

    


   try{
    const id = req.params.id


   const staff = await Staff.findById(id)

   return res.status(200).json({
    message: "success",
    staff
   })

   }catch(error){
return res.status(500).json({
    message: error.message
})
   }
})



// ADD ONE

app.post("/staff", async(req, res)=>{
   
    try{
        const {name, email, dept, location} =req.body

        const alreadyExisting = await Staff.findOne
        ({email})

        if(alreadyExisting){
            return res.status(400).json({
                message: "this staff account already exist"
            })
        }
        const newStaff = new Staff({name, email, dept, location})
        await newStaff.save()
    
        return res.status(200).json({
            message: "success"
        })
    } catch(error){
    return res.status(500).json({message: error.message})
    }
})



// UPDATE ONE

app.put("/staff/:id", async (req, res)=>{

try {
    const id = req.params.id
    const {name, email, dept, location} =req.body
    const updatedStaff = await Staff.findByIdAndUpdate({_id: id}, {name, email, dept, location}, {new: true})

    return res.status(200).json({
        message: "updated successfully", 
        updatedStaff
    })

}catch(error){
    return res.status(500).json({message: error.message})
    }

})

// DELETE ONE

app.delete("/staff/:id", async(req, res)=>{
    const id = req.params.id
    const deleted = await Staff.findByIdAndDelete(id)

    return res.status(200).json({message: "deleted successfuly"})
})








const PORT = process.env.PORT || 8000




app.listen(PORT, ()=>{
    console.log(`server started on port: ${PORT}`)
})