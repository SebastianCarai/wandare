// This module is a middleware that checks if user token provided in the header is valid
// If the token is valid, an object => {id,username} is set as request body (req.body)
// If the token is not valid, send a 403 Unauthorized status

import jwt from 'jsonwebtoken';

const auth = {
    validateToken : (req, res, next) => {

        console.log(req.headers);
        const authHeader = req.headers.authorization;
        const authToken = authHeader.split(' ')[1];
    
        try {
            const tokenDetails = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
            req.body['tokenDetails'] = tokenDetails;
            next()
        } catch (error) {
            res.sendStatus(403);
        }
    }
}

export default auth