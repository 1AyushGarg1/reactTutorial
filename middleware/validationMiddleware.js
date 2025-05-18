import {body,param ,validationResult} from 'express-validator';
import {StatusCodes} from 'http-status-codes';
import { BadReqestError,NotFoundError, UnAuthorizedError } from '../errors/customErrors.js';
import { JOB_STATUS,JOB_TYPE } from '../utils/constants.js';
import job from '../models/jobModels.js';
import User from '../models/userModels.js'
import moognose from 'mongoose';
import userModels from '../models/userModels.js';

const withValidationErrors = (validateValues) => {
    return [validateValues, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            if(errorMessages[0].startsWith('no Job')){
                throw new NotFoundError(errorMessages);
            }
            else if(errorMessages[0].startsWith('You have no permission to')){
                throw new NotFoundError(errorMessages);
            }
            throw new BadReqestError(errorMessages);
            // this is a custom error that we created in the errors folder
        }
        next();
    }]
}
export const validateJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('Company name is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('jobLocation').notEmpty().withMessage('Job location is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('Job status is invalid'), 
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('Job type is required'),
]);

export const validateIdParam = withValidationErrors([
    param('id')
    .custom(async (value, {req})=> {
        const isvalidId = moognose.Types.ObjectId.isValid(value);
        if(!isvalidId){
            throw new BadReqestError('Invalid id format');
        }
        const jobExists  = await job.findById({_id: value});
        if(!jobExists){
            throw new NotFoundError(`No job with id: ${value}`);
        }
        const isAdmin = req.user.role === 'admin';
        const isOwner = req.user.userID === jobExists.createdby.toString();
        if(!isAdmin && !isOwner) throw new UnAuthorizedError('You have no permission to access this...........') 
    }),
])

const validateUserError = (validateValues) => {
    return [ validateValues, (req, res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            throw new BadReqestError(errorMessages);
        }
        next(); 
    }]
} 

export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required attibute'),
    body('email').notEmpty().withMessage('email is necessary ')
    .isEmail().withMessage("Invalid Email format")
    .custom(async(value)=>{
        const userExist = await User.findOne({email: value})
        if(userExist){
            throw new BadReqestError(`user with this email: ${value} already exist`);
        }
    }),
    body('password').notEmpty().withMessage('Password is required')
    .isLength({ min: 8})
    .withMessage('password must be at least 8 digits long'),
    body('location').notEmpty().withMessage("Location is required field") 
]);

export const validationLoginInput = withValidationErrors([
    body('email').notEmpty().withMessage('email is necessary ')
    .isEmail().withMessage("Invalid Email format"),
    body('password').notEmpty().withMessage('Password is required')
])


export const validateUpdateUserInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required attibute'),
    body('email').notEmpty().withMessage('email is necessary ')
    .isEmail().withMessage("Invalid Email format")
    .custom(async(value, { req })=>{
        const userExist = await User.findOne({email: value})
        if(userExist && userExist._id.toString() !== req.user.userID){
            throw new BadReqestError(`user with this email: ${value} already exist`);
        }
    }), 
    body('location').notEmpty().withMessage('location is required attibute'),
    body('lastName').notEmpty().withMessage('lastName is required attibute'),
]);


export const authorizePermissions = (...roles) => {
    return (req,res,next) => {
        console.log('authorizePermissions middleware called');
        console.log('req.user:', req.user);
        console.log("in validation middleware...........................");
        if(!roles.includes(req.user.role)){
            throw new UnAuthorizedError('Unauthorized access .......')
        }
        next();
    }
}