import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import multer from 'multer';
import crypto from 'crypto';
import 'dotenv/config';
import registerUser from './routes/signup.js';
import loginUser from './routes/login.js';
import auth from './auth/validatetoken.js';
import getLoggedUserInfo from './get_requests/userinfo.js';
import getMyPosts from './get_requests/logged_user_posts.js';
import createPost from './post_requests/create-post.js';


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser())
// Defining CORS policies
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})


// Multer allows Express to get images data from the form when it's submitted
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
// Posting image to S3 Bucket
app.post('/api/create-image', upload.array('images'), async (req, res) => {

    // Defining variables to use s3 bucket
    const bucketName = process.env.BUCKET_NAME;
    const bucketRegion = process.env.BUCKET_REGION;
    const accessKey = process.env.ACCESS_KEY;
    const secretAccessKey = process.env.SECRET_ACCESS_KEY;

    const randomImageName = () => crypto.randomBytes(32).toString('hex');

    // Connecting the app with the s3 bucket
    const s3 = new S3Client({
        credentials:{
            accessKeyId: accessKey,
            secretAccessKey: secretAccessKey
        },
        region: bucketRegion
    })
    
    // req.file contains images data retrieved by multer 
    console.log(req.files);
    console.log(req.body);

    const images = req.files

    // for each image passed in the form
    for (const image of images){
        // create the object that will be sent to S3 with all the data
        const params = {
            Bucket: bucketName,
            Key: randomImageName(),
            Body: image.buffer,
            ContentType: image.mimetype
        }

        // Sending images to S3 and waiting for the reponse
        const command = new PutObjectCommand(params)
        try {
            const response = await s3.send(command);
            console.log('Image uploaded successfully ' + response);
        } catch (error) {
            console.log(error);
        }
    }

    res.sendStatus(200)
})

// Handle user registration
app.post('/register-user', registerUser);

// Handle user login
app.post('/api/login', loginUser)

// Getting logged user info
app.get('/api/user-info',auth.validateToken, getLoggedUserInfo)

app.get('/my-posts', auth.validateToken, getMyPosts)

app.post('/api/create-post', upload.array('images'), auth.validateCookie, createPost)


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})