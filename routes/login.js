// 

import bcrypt from 'bcrypt'
import db from '../externals/dbconnection.js'
import createToken from '../auth/jtw.js'

const loginUser = async (req, res) =>{
    const {identifier, password} = req.body

    try {
        // Search in the db a user with the username or identifier passed in the form
        const user = await db.query(`
        SELECT id,username,email,password
        FROM users
        WHERE username=$1 or email=$1`, [identifier]);

        // If the response has no rows it means the user doesn't exist
        // Redirect to the form where error will be shown
        if(user.rows.length == 0){
            res.redirect('http://localhost:5173/?error=1')
        }
        // If response has rows it means the user exists
        // Check if passwords match 
        // >> If they match -> return cookie with token
        // >> If they don't match -> redirect to form where error will be shown 
        else{
            const userPassword = user.rows[0].password;
            const {id, username} = user.rows[0];
            const isMatch = await bcrypt.compare(password,userPassword)
            if(isMatch){
                const token = createToken({id: id, username: username})
                res.cookie('token', token);
                res.redirect(`http://localhost:5173/?token=${token}`);
            }
            else{
                res.redirect('http://localhost:5173/?error=2')
            }

        }
    } catch (err) {
        throw err
    }
}

export default loginUser