import { StatusCodes  } from "http-status-codes";
import User from '../models/userModels.js';
import { hashPassword,comparePassword } from "../utils/passwordUtils.js";
import { UnAuthenticatedError, UnAuthorizedError } from "../errors/customErrors.js";
import { createJWT } from '../utils/tokenUtils.js'

//console.log("controllers loaded successfully ");

export const register = async (req, res) => {
    //console.log("Hello in register router..........")
    
    req.body.password = await hashPassword(req.body.password);  

    const newUser = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({message: 'User created Successfully'})
};

export const login = async (req,res) => {
    const newUser = await User.findOne({email : req.body.email});
    if(!newUser){
        throw new UnAuthenticatedError('No such User Exist')
    }
    const isSame = await comparePassword(req.body.password,newUser.password);
    if(!isSame){
        throw new UnAuthorizedError('Login failed Email and Password doesnot matches')
    }

    // if everything is correct let's create a varible token
    const token = createJWT({userID:newUser._id, role: newUser.role});
    // console.log(" token is ....................................................")
    // console.log(token);
    // const OneDay = 1000*60*60*24;
    res.cookie('token',token,{
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: false,
        sameSite: 'Lax', // or 'Strict' if you want more CSRF protection
    });
    res.status (StatusCodes.OK).json({message: 'user logged in Successfully'});
    // res.status(StatusCodes.CREATED).json({message: 'User Exist and login successfully'})

};


export const logOut = (req,res) => {
    res.cookie('token','logOut',{
        httpOnly:true,
        expires: new Date(Date.now())
    });
    res.status(StatusCodes.OK).json({message: 'User Logout Successfully .....' })
}