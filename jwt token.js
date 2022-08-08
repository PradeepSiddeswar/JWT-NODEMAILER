const JWT = require("jsonwebtoken")

module.exports = {
    // NEW TOKEN
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                name: "pradeep"
            }
            const secret = "some super secret"
             const options = {}
            JWT.sign(payload, secret, options,(err, token) => {
                if(err)reject(err)
                resolve(token)
            })
        })
    }
}