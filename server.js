import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary'

dotenv.config();
// This is a module to load environment variables from a .env file
// It allows you to use environment variables in your code

// fetch('https://www.course-api.com/react-useReducer-cart-project')
//   .then((response) => response.json())
//   .then((data) => console.log(data))

// Routers
import jobRouter from './Route/jobRoute.js';
import authRouter from './Route/authRoute.js';
import userRouter from './Route/userRoute.js';

//public
import { dirname } from 'path'
import { fileURLToPath } from 'url';  
import path from 'path' 


// middleware
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cookieParser());
app.use(express.json());
// This is a buildin Middleware to parse JSON bodies

if( process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  // This is a middleware to log HTTP requests
}
app.use(express.static(path.resolve(__dirname,'./public')))


// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.post('/', (req, res) => {
//   console.log(req);
//   res.json({
//     message: 'Data received',
//     data: req.body,
//   });
// });
//to show all the jobs
//to create a new job
// get single job 
//edit job
// delete job
// app.get('/api/v1/test',(req,res) => {
//   res.json({ message : 'test route called '});
// })

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users',authenticateUser,userRouter)

// this is a middleware to handle all the routes that are not defined
// it will return a 404 error

// app.get('*',(req,res)=>{
//   res.sendFile(path.resolve(__dirname,'./public','index.html'))
// })
app.get((req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public','index.html'))
})

app.use((req, res) => {
    res.status(404).json({
        message: 'Route does not exist',
    });
});


// 🔒 404 for unmatched API routes only
// app.use('/api', (req, res) => {
//   res.status(404).json({ message: 'API route does not exist' });
// });

// // 🌐 Catch-all for React Router (MUST come last)
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './public', 'index.html'));
// });



// Error handling middleware
app.use(errorHandlerMiddleware);
// this is a middleware to handle all the errors that are thrown in the app

try{
    await mongoose.connect(process.env.MONGO_URL);
        app.listen(5100, () => {
            console.log('Server is running on http://localhost:5100');
        });
} catch (error) {
    console.log(error);
    console.log('MongoDB connection failed');
}