import { Router } from 'express'
const router = Router();
import { getApplicationStats, getCurrentUser, updateUser } from '../controllers/userController.js';
import { validateUpdateUserInput,authorizePermissions } from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';
import uploads from '../middleware/multerMiddleware.js';

//console.log('in user router.......')
router.get('/current-user', getCurrentUser)
router.get('/admin/app-stats', [authorizePermissions('admin'), getApplicationStats] )
// to update the current user
router.patch('/update-user',checkForTestUser,uploads.single('avatar'), validateUpdateUserInput,updateUser)

export default router;