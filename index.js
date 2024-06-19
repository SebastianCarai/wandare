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
import createPost from './post_requests/create_post/create-post.js';
import getPostDetails from './get_requests/post_details.js';


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '10mb'}));
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

// Handle user registration
app.post('/api/register-user', registerUser);

// Handle user login
app.post('/api/login', loginUser)

// Getting logged user info
app.get('/api/user-info',auth.validateToken, getLoggedUserInfo)

// !! Get user posts >> To be handled
app.get('/my-posts', auth.validateToken, getMyPosts)

// Create post
app.post('/api/create-post', upload.array('thumbnails[]'), auth.validateToken, createPost);

// Get post info
app.get('/api/posts/:id', auth.validateToken, getPostDetails)


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})