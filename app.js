const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const AuthRoute = require("./router")
const nodemailer = require("./nodemailer/nodemailer")


const app= express()

// app.use(bp.urlencoded({ extended: true }));
dotenv.config({ path: '.env' })

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const PORT = process.env.PORT || 8080
mongoose.connect(process.env.MONGO_URI, {
})

  .then(() => console.log(`Connected To Database`))
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => console.log(error));


app.use

app.use('/autho', AuthRoute)



app.get("/", (req, res) => {
  res.send("OK BOSS")
})
// app.listen(Port, () => console.log ('server stated !'));
