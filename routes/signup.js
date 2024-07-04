import crypto from 'crypto';
import bcrypt from 'bcrypt'
import db from '../externals/dbconnection.js'
import createToken from '../auth/jtw.js';
import { s3,bucketName } from '../externals/s3bucket.js';
import imageToS3 from '../externals/img_to_s3.js'

const registerUser = async (req,res) => {
    const {username, email, password, profileImage} = req.body;

    // Create image with key-value base 64 in order to pass it to s3 function
    const image = {
        base64: profileImage
    }

    const randomImageName = () => crypto.randomBytes(32).toString('hex');

    const imageName = randomImageName();
    await imageToS3(image, imageName, s3, bucketName);

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 13);

    try {

        // Check if there is a user with the username or email passed in form
        // If yes, redirect to form where error is shown
        const response = await db.query(`
        SELECT id, username, email
        FROM users
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
            'INSERT INTO users (username, password, email, profile_image) VALUES ($1,$2,$3, $4)', 
            [username, hashedPassword,email, imageName])
            try {
                const userInfo = await db.query(
                `SELECT id FROM users WHERE username=$1 or email=$2`,[username,email])

                const token = createToken({id: userInfo.rows[0].id, username: username})
                res.cookie('token', token);
                res.redirect(`http://localhost:5173/?token=${token}`);
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
