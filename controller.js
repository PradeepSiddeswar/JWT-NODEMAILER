const express = require('express')
const router = express.Router()
const jwtDB = require("./model/jwt")
const JWT = require("jsonwebtoken")
const app=express()
const nodemailer = require("nodemailer")





let refreshTokens = [];

exports.refresh = (req, res) => {
  //take the refresh token from the user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  JWT.verify(refreshToken, "myRefreshSecretKey", (err, jwts) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(jwts);
    const newRefreshToken = generateRefreshToken(jwts);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });

  //if everything is ok, create new access token, refresh token and send to user
};

const generateAccessToken = (jwts) => {
    return JWT.sign({ id: jwts.id, isAdmin: jwts.isAdmin }, "mySecretKey", {
      expiresIn: "5s",
    });
  };
  
  const generateRefreshToken = (jwts) => {
    return JWT.sign({ id: jwts.id, isAdmin: jwts.isAdmin }, "myRefreshSecretKey");
  };
  




exports.create = async (req,res) => {
    const accessToken = JWT.sign(
        {id: req.body.id, isAdmin: req.body.isAdmin },
        "mySecretKey", { expiresIn:"30m"}
    );
    const refreshToken = JWT.sign(
        {id: req.body.id, isAdmin: req.body.isAdmin },
        "myRefreshSecretKey", { expiresIn: "30m"},
    )
    // const accessToken = generateAccessToken(jwts);
    // const refreshToken = generateRefreshToken(jwts);
    // refreshTokens.push(refreshToken);
    // refreshTokens.push(refreshToken)

    if(!req.body) {
        res.status(400).send("Content connt be empty")
        return
       
        
    }
    const jwt = new jwtDB ({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        accessToken,
        refreshToken
    })
//      res.json({
// accessToken,
//      })
    jwt.save(jwt)
    .then(data => {
        res.status(400).send(data)
    }) 

    .catch(error => {
        res.status(500).send({
            message:error.message
        })
    })
}

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split("")[1];
        JWT.verify(token, "mySecretKey", (err, jwt) => {
            if(err) {
                return res.status(403).json("Token is not valid!");
            }
            req.jwt = jwt;
            next();
        });
    } else {
        res.status(401).json("You not authonticated!");
    }
}


app.delete("/verify/:id", verify, (req, res) => {
    if (req.body.id === req.params.id || req.jwt.isAdmin) {
      res.status(200).json("User has been deleted.");
    } else {
      res.status(403).json("You are not allowed to delete this user!");
    }
  });

// exports.delete=(req,res)=>{
//     const id =req.params.id
//     jwtDB.findByIdAndDelete(id)
// .then(data=>{
//     if(!data){
//         res.status(400).send(`user not found with id ${id}`)
//     }else{
//         res.send("user deleted successfully")
//     }
// })
// .catch(error=>{
// res.status(500).send({
//     message:error.message
// })
// })

// }

app.post("/api/logout", verify, (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully.");
  });


  // Nodemailer 

  // exports.nodemailer = async (req,res) => {
  //   const {siddeswarapradeep} = req.body;
  //   // create reusable transporter object using the default SMTP transport
  //   let transporter = nodemailer.createTransport({
  //       host: "smtp.ethereal.email",
  //       port: 587,
  //       secure: false, // true for 465, false for other ports
  //       auth: {
  //           user: 'rosario.doyle@ethereal.email', // ethereal user
  //           pass:'k49jpWEzuTAsGb1ky6', // ethereal password
  //       },
  //   });
    
  //   const msg = {
  //       from: '"The Exapress App" siddeswarapradeep@gmail.com', // sender address
  //       to: `${siddeswarapradeep}`, // list of receivers
  //       subject: "Sup", // Subject line
  //       text: "Long time no see", // plain text body
  //   }
  //   // send mail with defined transport object
  //   const info = await transporter.sendMail(msg);
  

  //   console.log("Message sent: %s", info.messageId);
  //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //   // Preview only available when sending through an Ethereal account
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  //    //Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
  //   res.send('Email Sent!')
  // }
   