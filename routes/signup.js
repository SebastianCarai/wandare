import bcrypt from 'bcrypt'
import db from '../dbconnection.js'
import createToken from '../auth/jtw.js'

const registerUser = async (req,res) => {
    const {username, email, password} = req.body;

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 13);

    try {

        // Check if there is a user with the username or email passed in form
        // If yes, redirect to form where error is shown
        const response = await db.query(`
        SELECT id, username, email
        FROM test_users
        WHERE username=$1 or email=$2
        `,[username,email])

        if(response.rows.length !== 0){
            console.log('user already exists');
            res.redirect('http://localhost:5173/register?error=1');
        }
        
        // If email and username are free -> insert new record in DB
        // If user creation succeeds -> take his id from DB in order to create the JWT 
        try {
            await db.query(
            'INSERT INTO test_users (username, password, email) VALUES ($1,$2,$3)', [username, hashedPassword,email])
            try {
                const userInfo = await db.query(
                `SELECT id FROM test_users WHERE username=$1 or email=$2`,[username,email])

                res.cookie('token', createToken({id: userInfo.rows[0].id, username: username}))
                res.redirect('http://localhost:5173/?success=true')
            } catch (error) {
                throw error
            }

        } catch (err) {
            throw err
        }
    } catch (error) {
        throw error
    }


}

export default registerUser
