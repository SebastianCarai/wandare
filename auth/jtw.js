// This module creates the JWT (Json Web Token)
// Function takes as argument and object with the user ID and username
// The token is created with a private key saved in the .env file

import jwt from 'jsonwebtoken'
import 'dotenv/config';

const createToken = function(user){
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});

    return token
}

export default createToken