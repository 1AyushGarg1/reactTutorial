import { StatusCodes } from "http-status-codes";
import User from '../models/userModels.js';
import job from '../models/jobModels.js';
import cloudinary from 'cloudinary'
import { promises as fs } from 'fs'
import { formatImage } from "../middleware/multerMiddleware.js";

export const getCurrentUser = async ( req, res ) => {
    console.log('...............get current user called');
    const currentUser = await User.findOne({ _id: req.user.userID });
    const userWithoutPassword = currentUser.toJSON();
    res.status(StatusCodes.OK).json({ userWithoutPassword })
}

export const getApplicationStats = async ( req, res ) => {
    //console.log("hurry we reach at the final stage..............");
    const users =  await User.countDocuments();
    const jobs = await job.countDocuments();
    //console.log(users);
    //console.log(jobs);
    res.status(StatusCodes.OK).json({ users, jobs }) 
}

export const updateUser = async ( req, res ) => {

    const user = await User.findById(req.user.userID); // Get existing user from DB
    const oldAvatarPublicId = user.avatarPublicId; // Store old image public_id
    //console.log(req.file)
    const newUser = { ...req.body };
    delete newUser.password;
    console.log("in update user controller...............................");
    //console.log(req.file)
    if(req.file){
        const file = formatImage(req.file)

        //const response = await cloudinary.v2.uploader.upload(req.file.path);
        //await fs.unlink(req.file.path); //this is used for disk storage 
        const response = await cloudinary.v2.uploader.upload(file);

        newUser.avatar = response.secure_url
        newUser.avatarPublicId = response.public_id
    }
    //console.log(newUser);
    const updatedUser = await User.findByIdAndUpdate(req.user.userID,newUser);
    if(req.file && updatedUser.avatarPublicId){
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)    
    }
    res.status(StatusCodes.OK).json({message: updatedUser})
}