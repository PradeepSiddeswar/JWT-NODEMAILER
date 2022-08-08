const nodemailer = require("nodemailer")
const nodemailer = require("./nodemailer/nodemailer")

let mailTransporter = nodemailer.createTransport ({
    service:    "gmail",
    auth: {
        user:"siddeswarapradeep@gmail.com",
        pass:"kuederlkyrnbehca"
    }
})

let details = {
    from: "siddeswarapradeep@gmail.com",
    to: "siddeswarapradeep@gmail.com",
    subject:"testing our nodemailer",
    text:"testing out first sender"
}
 
mailTransporter.sendMail(details,(err) => {
    if(err) {
        console.log(" it has an error", err)
    }
    else{
        console.log("email has sent !")
    }
})

module.exports = nodemailer