const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema

const jwtSchema = new Schema({
    name: {
        type:String,
    },
    email: {
        type:String,
        unique:true,
        required:true
    },
    password : {
        type:String,
    },
    accessToken:{
        type:String
    },
    refreshToken:{
        type:String
    }
})



jwtSchema.pre('save', async function (next) {
    try {
   const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(this.password, salt)
     this.password = hashedPassword
     next()
    }catch(error) {
        next(error)
    }
})

jwtSchema.methods.isValidPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password)
    } catch (error) {
      throw error
    }
  }
const jwtDB = mongoose.model("jwtDB", jwtSchema)
module.exports =jwtDB