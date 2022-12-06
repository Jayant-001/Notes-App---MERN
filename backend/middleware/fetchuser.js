const jwt = require("jsonwebtoken");

JWT_SECRET = "iamjayant";

const fetchuser = (req, res, next) => {

    // Get the user from the awt token and add id to res object
    const token = req.header('auth-token')
    if(!token) {
        res.status(401).send({ error: "Invalid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send({ error: "Invalid token" })
    }

}

module.exports = fetchuser
