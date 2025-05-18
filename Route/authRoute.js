import { Router } from 'express';
import { register, login,logOut } from '../controllers/authController.js'
import { validateRegisterInput,validationLoginInput } from '../middleware/validationMiddleware.js'

const router = Router();
// console.log("authRoute.js loaded");


router.post('/register', validateRegisterInput,register);
router.post('/login',validationLoginInput,  login);
router.get('/logout',logOut)

export default router;
// this is the router for the job routes