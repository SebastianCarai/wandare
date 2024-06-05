// This module is a middleware that checks if user token provided in the header is valid
// If the token is valid, an object => {id,username} is set as request body (req.body)
// If the token is not valid, send a 403 Unauthorized status

import jwt from 'jsonwebtoken';

const auth = {
    validateToken : async (req, res, next) => {

        const authHeader = req.headers.authorization;
        const authToken = authHeader.split(' ')[1];
    
        try {
            const tokenDetails = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
            console.log('-- Req.body BEFORE authcheck --');
            console.log(req.body);
            console.log('-- Req.body BEFORE authcheck --');
            req.body['tokenDetails'] = tokenDetails;
            console.log('-- Req.body AFTER authcheck --');
            console.log(req.body);
            console.log('-- Req.body AFTER authcheck --');
            next()
        } catch (error) {
            res.sendStatus(403);
        }
    },
    
    validateCookie :async (req, res, next) => {
    
        const authToken = req.cookies.token;
    
        try {
            const tokenDetails = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
            next()
        } catch (error) {
            res.sendStatus(403);
        }
    }
}

export default auth