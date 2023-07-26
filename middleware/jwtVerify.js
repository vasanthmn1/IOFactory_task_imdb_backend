const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const userModel = require('../model/userModel');
const asyncHandeler = require('express-async-handler')

const verifyToken = asyncHandeler(async (req, res, next) => {
    // const token = req.header('Authorization');

    // if (!token) {
    //     return res.status(401).json({ error: 'Access denied, token missing' });
    // }

    // try {
    // Verify the token
    // const decoded = await promisify(jwt.  verify)(token, process.env.JWT_SECRET_KEY);

    // // Check if the user exists in the database
    // const user = await userModel.findById(decoded.userId);

    // if (!user) {
    //     return res.status(401).json({ error: 'Invalid token' });
    // }

    // // Attach the user object to the request for future use
    // req.user = user;
    // next();
    // const token = req.headers.authorization;

    // if (!token) {
    //     return res.status(401).json({ error: 'Access denied, token missing' });
    // }


    // } catch (error) {
    //     console.error('Error verifying token:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }
    if (req.headers.authorization) {

        try {
            const verify = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY)


            console.log(verify)

            if (verify) {
                next()
            }
        } catch (error) {
            res.status(401).json({ message: "Unauthorized" })
        }
    } else {
        res.status(401).json({ message: "Unauthorized" })
    }
});
module.exports = {
    verifyToken
}