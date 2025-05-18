import { UnAuthenticatedError,BadReqestError, UnAuthorizedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";


export const authenticateUser = async ( req, res,next ) => {
    //console.log("finally in auth middleWare");
    // console.log(req.cookies);
    const { token } = req.cookies;
    if( !token ) throw new UnAuthenticatedError(' UnAuthentication Invalid ')
    // we have to varify the jwt is valid or not
    try{
        const { userID,role } = verifyJWT(token);
        const testUser = userID==='6826325228a1d3c7913873f4';
        // console.log(userID);
        // console.log(role);
        req.user = { userID,role,testUser };
        //console.log(req);
        next();
    } catch(error){
        throw new UnAuthenticatedError(' UnAuthentication Invalid ')
    }
    
}

const authrizePermission = (...roles) =>  {
    return (req,res,next ) => {
        if(!roles.includes(req.user.role)){
            throw new UnAuthorizedError('Unauthorized to access this route')
        }
        next();
    }
}

export const checkForTestUser = (req,res,next) =>{
    if(req.user.testUser) throw new BadReqestError('Demo User,Read Only...');
    next();
}